import { createClient } from "npm:@supabase/supabase-js@2";

const LS_API_KEY = Deno.env.get("LEMONSQUEEZY_API_KEY")!;
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
    const { email } = await req.json();
    if (!email) {
      return new Response(JSON.stringify({ error: "email es requerido" }), { status: 400, headers: CORS_HEADERS });
    }

    const { data: acceso, error } = await supabase
      .from("accesos")
      .select("ls_subscription_id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (error) throw error;
    if (!acceso?.ls_subscription_id) {
      return new Response(
        JSON.stringify({ error: "No encontramos una suscripción asociada a este email." }),
        { status: 404, headers: CORS_HEADERS },
      );
    }

    const r = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${acceso.ls_subscription_id}`, {
      headers: {
        Authorization: `Bearer ${LS_API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    });
    if (!r.ok) {
      const errText = await r.text();
      throw new Error(`Lemon Squeezy ${r.status}: ${errText}`);
    }
    const data = await r.json();
    const url = data.data?.attributes?.urls?.customer_portal;
    if (!url) throw new Error("Lemon Squeezy no devolvió la URL del portal.");

    return new Response(JSON.stringify({ url }), {
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
