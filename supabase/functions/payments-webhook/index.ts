import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";

// deno-lint-ignore no-explicit-any
let _supabase: any = null;
function getSupabase(): any {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

async function markOrderPaid(sessionObj: any) {
  const orderId = sessionObj?.metadata?.order_id as string | undefined;
  const sessionId = sessionObj?.id as string | undefined;
  if (!orderId && !sessionId) return;

  const update = {
    payment_status: "paid",
    updated_at: new Date().toISOString(),
  };

  const query = getSupabase().from("order_submissions").update(update);
  const { error } = orderId
    ? await query.eq("id", orderId)
    : await query.eq("stripe_session_id", sessionId!);

  if (error) console.error("Failed to mark order paid:", error);
}

async function markOrderFailed(sessionId: string | undefined) {
  if (!sessionId) return;
  const { error } = await getSupabase()
    .from("order_submissions")
    .update({ payment_status: "failed", updated_at: new Date().toISOString() })
    .eq("stripe_session_id", sessionId);
  if (error) console.error("Failed to mark order failed:", error);
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = new URL(req.url);
  const env = (url.searchParams.get("env") || "sandbox") as StripeEnv;

  try {
    const event = await verifyWebhook(req, env);
    console.log("Stripe event:", event.type, "env:", env);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as any;
        console.log("Checkout completed:", session.id);
        await markOrderPaid(session);
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        console.log("Subscription event:", event.type, (event.data.object as any).id);
        break;
      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        console.log("Payment failed:", invoice.id);
        // Mark linked order as failed if checkout session is referenced
        const sid = invoice?.subscription_details?.metadata?.order_id;
        if (sid) {
          await getSupabase()
            .from("order_submissions")
            .update({ payment_status: "failed", updated_at: new Date().toISOString() })
            .eq("id", sid);
        } else {
          await markOrderFailed(invoice?.checkout_session as string | undefined);
        }
        break;
      }
      default:
        console.log("Unhandled event:", event.type);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
