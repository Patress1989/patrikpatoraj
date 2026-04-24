import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUBSCRIPTION_PRICE_ID = "web_subscription_monthly";
const ACTIVATION_PRICE_ID = "web_activation_fee_one_time";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customerEmail, returnUrl, environment } = await req.json();

    const env = (environment || "sandbox") as StripeEnv;
    const stripe = createStripeClient(env);

    // Resolve both prices
    const [subPrices, activationPrices] = await Promise.all([
      stripe.prices.list({ lookup_keys: [SUBSCRIPTION_PRICE_ID] }),
      stripe.prices.list({ lookup_keys: [ACTIVATION_PRICE_ID] }),
    ]);

    if (!subPrices.data.length) {
      return new Response(JSON.stringify({ error: "Subscription price not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!activationPrices.data.length) {
      return new Response(JSON.stringify({ error: "Activation fee price not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const subscriptionPrice = subPrices.data[0];
    const activationPrice = activationPrices.data[0];

    // Subscription mode: activation fee is added as a one-time line item on the
    // first invoice alongside the recurring subscription price (39 EUR / month).
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      ui_mode: "embedded",
      line_items: [
        { price: activationPrice.id, quantity: 1 },
        { price: subscriptionPrice.id, quantity: 1 },
      ],
      return_url:
        returnUrl ||
        `${req.headers.get("origin")}/objednavka/dakujeme?session_id={CHECKOUT_SESSION_ID}`,
      ...(customerEmail && { customer_email: customerEmail }),
    });

    return new Response(JSON.stringify({ clientSecret: session.client_secret }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("create-checkout error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
