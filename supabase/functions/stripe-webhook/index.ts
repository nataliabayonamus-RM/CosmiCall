import Stripe from "npm:stripe@14";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

async function setAccesoByCustomer(customerId: string, fields: Record<string, unknown>) {
  const { error } = await supabase.from("accesos").update(fields).eq("stripe_customer_id", customerId);
  if (error) console.error("Error actualizando acceso:", error);
}

Deno.serve(async (req) => {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret);
  } catch (e) {
    console.error("Firma de webhook inválida:", e);
    return new Response("Firma inválida", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const email = session.customer_details?.email;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string;
        if (email) {
          const { data: existing } = await supabase
            .from("accesos")
            .select("email")
            .eq("email", email.toLowerCase())
            .maybeSingle();

          if (existing) {
            await supabase
              .from("accesos")
              .update({ activo: true, stripe_customer_id: customerId, stripe_subscription_id: subscriptionId })
              .eq("email", email.toLowerCase());
          } else {
            await supabase.from("accesos").insert({
              email: email.toLowerCase(),
              nombre: session.customer_details?.name || email.split("@")[0],
              activo: true,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
            });
          }
        }
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const activo = sub.status === "active" || sub.status === "trialing";
        await setAccesoByCustomer(sub.customer as string, {
          activo,
          stripe_subscription_id: sub.id,
          plan: sub.items.data[0]?.price?.nickname || null,
        });
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await setAccesoByCustomer(sub.customer as string, { activo: false });
        break;
      }
    }
    return new Response(JSON.stringify({ received: true }), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message || String(e) }), { status: 500 });
  }
});
