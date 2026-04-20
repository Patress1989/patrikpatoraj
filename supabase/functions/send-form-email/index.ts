// Edge function: send-form-email
// Sends a notification email to info@patrikpatoraj.sk and a confirmation
// email to the client. Uses Resend connector (via Lovable connector gateway)
// when RESEND_API_KEY is available; otherwise logs and exits gracefully so
// submissions are never blocked.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const ADMIN_EMAIL = "info@patrikpatoraj.sk";
const FROM_EMAIL = "Patrik Patoraj <onboarding@resend.dev>";
// ^ Replace with verified domain (e.g. noreply@patrikpatoraj.sk) once Resend
//   domain is verified.

interface Payload {
  submissionId?: string;
  name: string;
  email: string;
  phone: string;
  business_area: string;
  preferred_colors?: string;
  existing_website?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function adminEmailHtml(p: Payload): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#f1f5f9;border-radius:16px;">
      <h1 style="color:#3b82f6;margin:0 0 16px;">🎉 Nový dopyt z webu</h1>
      <p style="color:#94a3b8;margin:0 0 24px;">Cez formulár na patrikpatoraj.sk prišiel nový dopyt.</p>
      <table style="width:100%;border-collapse:collapse;background:rgba(255,255,255,0.05);border-radius:12px;overflow:hidden;">
        <tbody>
          <tr><td style="padding:12px 16px;color:#94a3b8;border-bottom:1px solid rgba(255,255,255,0.05);">Meno</td><td style="padding:12px 16px;color:#f1f5f9;border-bottom:1px solid rgba(255,255,255,0.05);"><strong>${escapeHtml(p.name)}</strong></td></tr>
          <tr><td style="padding:12px 16px;color:#94a3b8;border-bottom:1px solid rgba(255,255,255,0.05);">E-mail</td><td style="padding:12px 16px;color:#f1f5f9;border-bottom:1px solid rgba(255,255,255,0.05);">${escapeHtml(p.email)}</td></tr>
          <tr><td style="padding:12px 16px;color:#94a3b8;border-bottom:1px solid rgba(255,255,255,0.05);">Telefón</td><td style="padding:12px 16px;color:#f1f5f9;border-bottom:1px solid rgba(255,255,255,0.05);">${escapeHtml(p.phone)}</td></tr>
          <tr><td style="padding:12px 16px;color:#94a3b8;border-bottom:1px solid rgba(255,255,255,0.05);">Oblasť</td><td style="padding:12px 16px;color:#f1f5f9;border-bottom:1px solid rgba(255,255,255,0.05);">${escapeHtml(p.business_area)}</td></tr>
          ${p.preferred_colors ? `<tr><td style="padding:12px 16px;color:#94a3b8;border-bottom:1px solid rgba(255,255,255,0.05);">Farby</td><td style="padding:12px 16px;color:#f1f5f9;border-bottom:1px solid rgba(255,255,255,0.05);">${escapeHtml(p.preferred_colors)}</td></tr>` : ""}
          ${p.existing_website ? `<tr><td style="padding:12px 16px;color:#94a3b8;">Existujúci web</td><td style="padding:12px 16px;color:#f1f5f9;">${escapeHtml(p.existing_website)}</td></tr>` : ""}
        </tbody>
      </table>
      ${p.submissionId ? `<p style="color:#64748b;font-size:12px;margin:24px 0 0;">ID: ${escapeHtml(p.submissionId)}</p>` : ""}
    </div>
  `;
}

function clientEmailHtml(p: Payload): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#0f172a;color:#f1f5f9;border-radius:16px;">
      <h1 style="color:#3b82f6;margin:0 0 16px;font-size:28px;">Ďakujem za váš dopyt, ${escapeHtml(p.name)}! 🎉</h1>
      <p style="color:#cbd5e1;line-height:1.6;margin:0 0 16px;">Práve som dostal váš dopyt cez formulár a som veľmi rád, že ste si vybrali práve mňa.</p>
      <p style="color:#cbd5e1;line-height:1.6;margin:0 0 24px;">Do <strong style="color:#3b82f6;">48 hodín</strong> vám pošlem ukážku konceptu vášho projektu spolu s cenovou ponukou na mieru.</p>
      <div style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);border-radius:12px;padding:16px;margin:24px 0;">
        <p style="margin:0;color:#f1f5f9;font-size:14px;"><strong>Čo bude nasledovať:</strong></p>
        <ol style="margin:8px 0 0;padding-left:20px;color:#cbd5e1;font-size:14px;line-height:1.8;">
          <li>Pripravím vám ukážku konceptu zdarma</li>
          <li>Pošlem cenovú ponuku na mieru</li>
          <li>Po vašom súhlase začnem stavať</li>
        </ol>
      </div>
      <p style="color:#cbd5e1;line-height:1.6;margin:24px 0 0;">Ak medzitým máte otázky, neváhajte odpísať priamo na tento e-mail alebo zavolať na <a href="tel:+421915070771" style="color:#3b82f6;">+421 915 070 771</a>.</p>
      <p style="color:#cbd5e1;line-height:1.6;margin:24px 0 0;">S pozdravom,<br><strong style="color:#f1f5f9;">Patrik Patoraj</strong><br><span style="color:#94a3b8;font-size:13px;">Lovable Expert · Risali s.r.o.</span></p>
    </div>
  `;
}

async function sendEmail(to: string | string[], subject: string, html: string): Promise<{ ok: boolean; error?: string }> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    return { ok: false, error: "Resend connector not configured (RESEND_API_KEY missing). Connect Resend in Cloud → Connectors." };
  }

  const response = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return { ok: false, error: `Resend API ${response.status}: ${body}` };
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = (await req.json()) as Payload;

    // Basic validation
    if (!payload.name || !payload.email || !payload.phone || !payload.business_area) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send admin notification
    const adminResult = await sendEmail(
      ADMIN_EMAIL,
      `🎉 Nový dopyt: ${payload.name} (${payload.business_area})`,
      adminEmailHtml(payload),
    );

    // Send client confirmation
    const clientResult = await sendEmail(
      payload.email,
      "Ďakujem za váš dopyt — odpoveď do 48 h",
      clientEmailHtml(payload),
    );

    const ok = adminResult.ok && clientResult.ok;
    if (!ok) {
      console.warn("Email send failed:", { admin: adminResult, client: clientResult });
    }

    return new Response(
      JSON.stringify({
        success: ok,
        admin: adminResult,
        client: clientResult,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("send-form-email error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
