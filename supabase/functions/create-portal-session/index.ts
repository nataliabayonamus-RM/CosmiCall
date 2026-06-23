import Stripe from "npm:stripe@14";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, { apiVersion: "2024-06-20" });
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS_HEADERS });

  try {
    const { email, return_url } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "email es requerido" }), { status: 400, headers: CORS_HEADERS });
    }

    const { data: acceso, error } = await supabase
      .from("accesos")
      .select("stripe_customer_id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (error) throw error;
    if (!acceso?.stripe_customer_id) {
      return new Response(
        JSON.stringify({ error: "No encontramos una suscripción de Stripe asociada a este email." }),
        { status: 404, headers: CORS_HEADERS },
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: acceso.stripe_customer_id,
      return_url: return_url || "https://cosmicall.app",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e.message || String(e) }), {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  }
});
