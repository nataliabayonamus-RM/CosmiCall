import { createClient } from "npm:@supabase/supabase-js@2";

const HOTMART_HOTTOK = Deno.env.get("HOTMART_HOTTOK")!;
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const ACTIVATING_EVENTS = ["PURCHASE_APPROVED", "PURCHASE_COMPLETE", "SUBSCRIPTION_CHANGED"];
const DEACTIVATING_EVENTS = [
  "PURCHASE_CANCELED",
  "PURCHASE_REFUNDED",
  "PURCHASE_CHARGEBACK",
  "PURCHASE_EXPIRED",
  "SUBSCRIPTION_CANCELLATION",
];

Deno.serve(async (req) => {
  const payload = await req.json();

  const hottok = payload.hottok || new URL(req.url).searchParams.get("hottok");
  if (hottok !== HOTMART_HOTTOK) {
    console.error("Hottok inválido");
    return new Response("Hottok inválido", { status: 400 });
  }

  const eventName = payload.event;
  const data = payload.data;
  const email = data?.buyer?.email?.toLowerCase();
  const name = data?.buyer?.name;
  const subscriberCode = String(data?.subscription?.subscriber?.code || data?.purchase?.transaction || "");
  const plan = data?.subscription?.plan?.name || data?.product?.name || null;
  // Hotmart no siempre envía la fecha exacta de fin; si no viene, dejamos que la próxima
  // notificación (renovación o cancelación) actualice expires_at.
  const expiresAt = data?.subscription?.date_next_charge
    ? new Date(data.subscription.date_next_charge).toISOString()
    : null;

  try {
    if (!email) {
      return new Response(JSON.stringify({ received: true, skipped: "sin email" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (ACTIVATING_EVENTS.includes(eventName) || DEACTIVATING_EVENTS.includes(eventName)) {
      const activo = ACTIVATING_EVENTS.includes(eventName);

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
            hotmart_subscriber_code: subscriberCode,
            plan,
            expires_at: expiresAt,
          })
          .eq("email", email);
        if (updateError) throw new Error(`update accesos: ${JSON.stringify(updateError)}`);
      } else {
        const { error: insertError } = await supabase.from("accesos").insert({
          email,
          nombre: name || email.split("@")[0],
          activo,
          hotmart_subscriber_code: subscriberCode,
          plan,
          expires_at: expiresAt,
        });
        if (insertError) throw new Error(`insert accesos: ${JSON.stringify(insertError)}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
});
