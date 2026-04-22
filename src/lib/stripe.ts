import { loadStripe, type Stripe } from "@stripe/stripe-js";
import { supabase } from "@/integrations/supabase/client";

const clientToken = import.meta.env.VITE_PAYMENTS_CLIENT_TOKEN as string | undefined;
const environment = clientToken?.startsWith("pk_test_") ? "sandbox" : "live";

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    if (!clientToken) {
      throw new Error("VITE_PAYMENTS_CLIENT_TOKEN is not set");
    }
    stripePromise = loadStripe(clientToken);
  }
  return stripePromise;
}

export function getStripeEnvironment(): string {
  return environment;
}

export async function createCheckoutClientSecret(opts: {
  customerEmail?: string;
  returnUrl?: string;
}): Promise<string> {
  const { data, error } = await supabase.functions.invoke("create-checkout", {
    body: { ...opts, environment: getStripeEnvironment() },
  });
  if (error || !data?.clientSecret) {
    throw new Error(error?.message || "Nepodarilo sa vytvoriť checkout reláciu");
  }
  return data.clientSecret as string;
}
