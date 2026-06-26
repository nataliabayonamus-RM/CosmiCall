import { createClient } from "npm:@supabase/supabase-js@2";

const WEBHOOK_SECRET = Deno.env.get("LEMONSQUEEZY_WEBHOOK_SECRET")!;
const META_PIXEL_ID = Deno.env.get("META_PIXEL_ID");
const META_ACCESS_TOKEN = Deno.env.get("META_ACCESS_TOKEN");
const META_TEST_EVENT_CODE = Deno.env.get("META_TEST_EVENT_CODE"); // opcional, quitar cuando ya esté en real
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function sha256(text: string) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sendMetaPurchaseEvent(email: string, value: number, currency: string) {
  if (!META_PIXEL_ID || !META_ACCESS_TOKEN) return;

  const hashedEmail = await sha256(email);
  const body = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        action_source: "system_generated",
        user_data: { em: [hashedEmail] },
        custom_data: { currency, value },
      },
    ],
    ...(META_TEST_EVENT_CODE ? { test_event_code: META_TEST_EVENT_CODE } : {}),
  };

  const r = await fetch(
    `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  const resultText = await r.text();
  if (!r.ok) {
    console.error("Meta CAPI error:", resultText);
  } else {
    console.log("Meta CAPI ok:", resultText);
  }
}

async function verifySignature(rawBody: string, signature: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody));
  const digest = Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, "0")).join("");
  return digest === signature;
}

Deno.serve(async (req) => {
  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") || "";

  const valid = await verifySignature(rawBody, signature);
  if (!valid) {
    console.error("Firma de webhook inválida");
    return new Response("Firma inválida", { status: 400 });
  }

  const payload = JSON.parse(rawBody);
  const eventName = payload.meta?.event_name;
  const attrs = payload.data?.attributes;
  const subscriptionId = String(payload.data?.id || "");
  const email = attrs?.user_email?.toLowerCase();
  const customerId = String(attrs?.customer_id || "");
  const status = attrs?.status; // active, on_trial, past_due, cancelled, expired, paused, unpaid
  const plan = attrs?.variant_name || attrs?.product_name || null;
  // Si está cancelada pero aún no llegó la fecha de fin (ends_at), Lemon Squeezy ya cobró ese período:
  // el acceso se mantiene activo hasta que expire por sí solo.
  const cancelledButNotEnded = status === "cancelled" && attrs?.ends_at && new Date(attrs.ends_at) > new Date();
  const expiresAt = ["active", "on_trial", "past_due"].includes(status) || cancelledButNotEnded
    ? attrs?.renews_at || attrs?.ends_at || null
    : attrs?.ends_at || null;

  try {
    if (!email) {
      return new Response(JSON.stringify({ received: true, skipped: "sin email" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const activo = ["active", "on_trial"].includes(status) || cancelledButNotEnded;

    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_cancelled":
      case "subscription_expired": {
        const { data: existing, error: selectError } = await supabase
          .from("accesos")
          .select("email")
          .eq("email", email)
          .maybeSingle();
        if (selectError) throw new Error(`select accesos: ${JSON.stringify(selectError)}`);

        if (existing) {
          const { error: updateError } = await supabase
            .from("accesos")
            .update({
              activo,
              ls_customer_id: customerId,
              ls_subscription_id: subscriptionId,
              plan,
              expires_at: expiresAt,
            })
            .eq("email", email);
          if (updateError) throw new Error(`update accesos: ${JSON.stringify(updateError)}`);
        } else {
          const { error: insertError } = await supabase.from("accesos").insert({
            email,
            nombre: attrs?.user_name || email.split("@")[0],
            activo,
            ls_customer_id: customerId,
            ls_subscription_id: subscriptionId,
            plan,
            expires_at: expiresAt,
          });
          if (insertError) throw new Error(`insert accesos: ${JSON.stringify(insertError)}`);
        }

        if (eventName === "subscription_created") {
          const value = Number(attrs?.first_subscription_item?.price ?? attrs?.total ?? 0) / 100;
          const currency = String(attrs?.currency || "USD");
          await sendMetaPurchaseEvent(email, value, currency);
        }
        break;
      }
    }
    return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
});
