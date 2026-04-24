import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUBSCRIPTION_PRICE_ID = "web_subscription_monthly";
const ACTIVATION_PRICE_ID = "web_activation_fee_one_time";

type OrderInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country?: string;
  isCompany?: boolean;
  companyName?: string;
  companyAddress?: string;
  ico?: string;
  dic?: string;
  icDph?: string;
  gdprConsent: boolean;
};

function validate(input: any): { ok: true; data: OrderInput } | { ok: false; error: string } {
  if (!input || typeof input !== "object") return { ok: false, error: "Neplatné dáta" };
  const required = ["firstName", "lastName", "email", "phone", "street", "city", "postalCode"];
  for (const k of required) {
    if (!input[k] || typeof input[k] !== "string" || !input[k].trim()) {
      return { ok: false, error: `Chýba povinné pole: ${k}` };
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return { ok: false, error: "Neplatný e-mail" };
  }
  if (input.gdprConsent !== true) {
    return { ok: false, error: "Vyžaduje sa súhlas so spracovaním osobných údajov" };
  }
  if (input.isCompany) {
    if (!input.companyName?.trim()) return { ok: false, error: "Chýba názov spoločnosti" };
    if (!input.ico?.trim() || !/^\d{6,8}$/.test(input.ico.trim())) {
      return { ok: false, error: "Neplatné IČO (6 – 8 číslic)" };
    }
    if (!input.dic?.trim() || !/^\d{9,10}$/.test(input.dic.trim())) {
      return { ok: false, error: "Neplatné DIČ (9 – 10 číslic)" };
    }
    if (input.icDph && !/^SK\d{10}$/i.test(input.icDph.trim())) {
      return { ok: false, error: "Neplatné IČ DPH (formát SK + 10 číslic)" };
    }
  }
  return { ok: true, data: input as OrderInput };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { returnUrl, environment, ...rest } = body;

    const v = validate(rest);
    if (!v.ok) {
      return new Response(JSON.stringify({ error: v.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const data = v.data;

    const env = (environment || "sandbox") as StripeEnv;
    const stripe = createStripeClient(env);

    // Insert order using service role (bypasses RLS)
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: orderRow, error: insertErr } = await supabase
      .from("order_submissions")
      .insert({
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        street: data.street.trim(),
        city: data.city.trim(),
        postal_code: data.postalCode.trim(),
        country: (data.country || "SK").trim(),
        is_company: !!data.isCompany,
        company_name: data.isCompany ? data.companyName?.trim() : null,
        company_address: data.isCompany ? data.companyAddress?.trim() || null : null,
        ico: data.isCompany ? data.ico?.trim() : null,
        dic: data.isCompany ? data.dic?.trim() : null,
        ic_dph: data.isCompany ? data.icDph?.trim() || null : null,
        gdpr_consent: true,
      })
      .select("id")
      .single();

    if (insertErr || !orderRow) {
      console.error("order insert error:", insertErr);
      return new Response(JSON.stringify({ error: "Nepodarilo sa uložiť objednávku" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const orderId = orderRow.id as string;

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

    const metadata: Record<string, string> = {
      order_id: orderId,
      is_company: data.isCompany ? "true" : "false",
    };
    if (data.isCompany) {
      if (data.companyName) metadata.company_name = data.companyName.trim().slice(0, 500);
      if (data.ico) metadata.ico = data.ico.trim();
      if (data.dic) metadata.dic = data.dic.trim();
      if (data.icDph) metadata.ic_dph = data.icDph.trim();
    }

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
      customer_email: data.email.trim().toLowerCase(),
      metadata,
      subscription_data: { metadata },
    });

    // Persist Stripe session id
    await supabase
      .from("order_submissions")
      .update({ stripe_session_id: session.id })
      .eq("id", orderId);

    return new Response(
      JSON.stringify({ clientSecret: session.client_secret, orderId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("create-checkout error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
