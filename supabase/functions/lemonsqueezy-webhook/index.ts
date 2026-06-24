import { createClient } from "npm:@supabase/supabase-js@2";

const WEBHOOK_SECRET = Deno.env.get("LEMONSQUEEZY_WEBHOOK_SECRET")!;
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

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

  try {
    if (!email) {
      return new Response(JSON.stringify({ received: true, skipped: "sin email" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const activo = ["active", "on_trial"].includes(status);

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
            .update({ activo, ls_customer_id: customerId, ls_subscription_id: subscriptionId })
            .eq("email", email);
          if (updateError) throw new Error(`update accesos: ${JSON.stringify(updateError)}`);
        } else {
          const { error: insertError } = await supabase.from("accesos").insert({
            email,
            nombre: attrs?.user_name || email.split("@")[0],
            activo,
            ls_customer_id: customerId,
            ls_subscription_id: subscriptionId,
          });
          if (insertError) throw new Error(`insert accesos: ${JSON.stringify(insertError)}`);
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
