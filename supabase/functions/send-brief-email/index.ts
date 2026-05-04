// Edge function: send-brief-email
// Generates a PDF summary of the web brief and sends it via Resend to both
// the client and the admin as an email attachment.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { jsPDF } from "https://esm.sh/jspdf@2.5.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const ADMIN_EMAIL = "info@patrikpatoraj.sk";
const FROM_EMAIL = "Patrik Patoraj <onboarding@resend.dev>";

interface BriefPayload {
  briefId?: string;
  name: string;
  email: string;
  phone?: string | null;
  company_name?: string | null;
  is_starting?: boolean | null;
  has_brand?: boolean | null;
  business_one_liner?: string | null;
  has_existing_site?: boolean | null;
  existing_site_url?: string | null;
  existing_site_issues?: string | null;
  goals?: string[] | null;
  self_edit?: boolean | null;
  preferred_colors?: string | null;
  preferred_typography?: string | null;
  has_own_photos?: boolean | null;
  has_own_texts?: boolean | null;
  reference_sites?: string | null;
  main_features?: string | null;
  sells_products?: boolean | null;
  payment_gateway_current?: string | null;
  payment_gateway_switch_stripe?: boolean | null;
  needs_crm_integration?: boolean | null;
  crm_details?: string | null;
  email_provider_current?: string | null;
  email_switch_resend?: boolean | null;
  needs_invoicing?: boolean | null;
  invoicing_system?: string | null;
  invoicing_switch_recommended?: boolean | null;
  needs_analytics?: boolean | null;
  analytics_tools?: string | null;
  multilingual?: boolean | null;
  languages?: string | null;
  contact_form?: boolean | null;
  newsletter_form?: boolean | null;
  special_features?: string | null;
  has_internal_crm?: boolean | null;
  internal_crm_details?: string | null;
  other_integrations?: string | null;
  wants_ai_assistant?: boolean | null;
  ai_assistant_purpose?: string | null;
  wants_custom_app?: boolean | null;
  custom_app_details?: string | null;
  wants_booking_system?: boolean | null;
  wants_member_area?: boolean | null;
  wants_blog?: boolean | null;
  data_storage_preference?: string | null;
  hosting_preference?: string | null;
  target_audience?: string | null;
  unique_selling_point?: string | null;
  maintenance_package?: boolean | null;
  budget_range?: string | null;
  deadline?: string | null;
  notes?: string | null;
}

function yn(v: boolean | null | undefined): string {
  if (v === true) return "Áno";
  if (v === false) return "Nie";
  return "—";
}

function val(v: string | null | undefined): string {
  return v && v.trim().length > 0 ? v : "—";
}

function generatePdf(p: BriefPayload): string {
  // Use a font that handles Slovak diacritics. jsPDF default helvetica
  // doesn't include them well, but encoding via WinAnsi works for SK chars.
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const maxWidth = pageWidth - marginX * 2;
  let y = 60;

  const addLine = (text: string, opts?: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number }) => {
    const size = opts?.size ?? 11;
    doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
    doc.setFontSize(size);
    if (opts?.color) doc.setTextColor(...opts.color);
    else doc.setTextColor(30, 30, 30);
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const ln of lines) {
      if (y > pageHeight - 60) {
        doc.addPage();
        y = 60;
      }
      doc.text(ln, marginX, y);
      y += size + 4;
    }
    if (opts?.gap) y += opts.gap;
  };

  const section = (title: string) => {
    y += 6;
    if (y > pageHeight - 80) { doc.addPage(); y = 60; }
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(2);
    doc.line(marginX, y, marginX + 24, y);
    y += 14;
    addLine(title, { size: 13, bold: true, color: [15, 23, 42], gap: 4 });
  };

  const row = (label: string, value: string) => {
    addLine(`${label}: ${value}`, { size: 11 });
  };

  // Header
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 36, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Brief k webu — Patrik Patoraj", marginX, 23);

  y = 60;
  addLine("Pomocka k webu — sumár odpovedí", { size: 18, bold: true, color: [15, 23, 42], gap: 2 });
  addLine(new Date().toLocaleDateString("sk-SK", { day: "2-digit", month: "long", year: "numeric" }), { size: 10, color: [100, 116, 139], gap: 6 });

  section("Kontakt");
  row("Meno", val(p.name));
  row("E-mail", val(p.email));
  row("Telefón", val(p.phone));
  row("Firma / projekt", val(p.company_name));

  section("O firme");
  row("Začínajúca firma", yn(p.is_starting));
  row("Má logo a brand", yn(p.has_brand));
  row("Opis firmy", val(p.business_one_liner));
  row("Existujúci web", yn(p.has_existing_site));
  if (p.has_existing_site) {
    row("URL existujúceho webu", val(p.existing_site_url));
    row("Hlavné nedostatky", val(p.existing_site_issues));
  }

  section("Ciele webu");
  row("Vybrané ciele", p.goals && p.goals.length ? p.goals.join(", ") : "—");
  row("Drobné zmeny svojpomocne", yn(p.self_edit));

  section("Dizajn");
  row("Preferované farby", val(p.preferred_colors));
  row("Typografia", val(p.preferred_typography));
  row("Vlastné fotky", yn(p.has_own_photos));
  row("Vlastné texty", yn(p.has_own_texts));
  row("Referenčné weby", val(p.reference_sites));

  section("Funkcie webu");
  row("Hlavné funkcie", val(p.main_features));
  row("Predaj produktov / služieb", yn(p.sells_products));
  if (p.sells_products) {
    row("Aktuálna platobná brána", val(p.payment_gateway_current));
    row("Ochota prejsť na Stripe", yn(p.payment_gateway_switch_stripe));
  }
  row("CRM / e-mailing integrácia", yn(p.needs_crm_integration));
  if (p.needs_crm_integration) {
    row("E-mail / CRM nástroj", val(p.email_provider_current));
    row("Detail CRM", val(p.crm_details));
    row("Ochota použiť Resend", yn(p.email_switch_resend));
  }
  row("Fakturačný systém", yn(p.needs_invoicing));
  if (p.needs_invoicing) {
    row("Aktuálny fakturačný systém", val(p.invoicing_system));
    row("Akceptuje odporúčanie (FAPI/SuperFaktúra)", yn(p.invoicing_switch_recommended));
  }
  row("Analytika", yn(p.needs_analytics));
  if (p.needs_analytics) row("Analytické nástroje", val(p.analytics_tools));
  row("Viacjazyčnosť", yn(p.multilingual));
  if (p.multilingual) row("Jazyky", val(p.languages));
  row("Kontaktný formulár", yn(p.contact_form));
  row("Newsletter formulár", yn(p.newsletter_form));
  row("Špeciálne funkcie", val(p.special_features));

  section("Integrácie a rozšírenia");
  row("Interný CRM systém", yn(p.has_internal_crm));
  if (p.has_internal_crm) row("Detail interného CRM", val(p.internal_crm_details));
  row("Iné integrácie", val(p.other_integrations));
  row("AI asistent na stránke", yn(p.wants_ai_assistant));
  if (p.wants_ai_assistant) row("Účel AI asistenta", val(p.ai_assistant_purpose));
  row("Vlastná aplikácia", yn(p.wants_custom_app));
  if (p.wants_custom_app) row("Detail aplikácie", val(p.custom_app_details));
  row("Rezervačný systém", yn(p.wants_booking_system));
  row("Členská zóna", yn(p.wants_member_area));
  row("Blog / magazín", yn(p.wants_blog));
  row("Preferované úložisko dát", val(p.data_storage_preference));
  row("Preferencia hostingu", val(p.hosting_preference));

  section("Záver");
  row("Cieľová skupina", val(p.target_audience));
  row("Konkurenčná výhoda", val(p.unique_selling_point));
  row("Údržbový balík", yn(p.maintenance_package));
  row("Rozpočet", val(p.budget_range));
  row("Termín", val(p.deadline));
  row("Poznámky", val(p.notes));

  if (p.briefId) {
    y += 10;
    addLine(`ID briefu: ${p.briefId}`, { size: 9, color: [148, 163, 184] });
  }

  return doc.output("datauristring").split(",")[1]; // base64 only
}

function clientHtml(name: string): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#0f172a;color:#f1f5f9;border-radius:16px;">
      <h1 style="color:#3b82f6;margin:0 0 16px;font-size:26px;">Ďakujem za vyplnenie briefu, ${escapeHtml(name)}! 🎉</h1>
      <p style="color:#cbd5e1;line-height:1.6;margin:0 0 16px;">V prílohe nájdete <strong>PDF sumár vašich odpovedí</strong> — môžete si ho odložiť pre vlastnú evidenciu.</p>
      <p style="color:#cbd5e1;line-height:1.6;margin:0 0 16px;">Na základe týchto údajov vám pripravím <strong style="color:#3b82f6;">presnú cenovú ponuku</strong> a ozvem sa do 48 hodín.</p>
      <p style="color:#cbd5e1;line-height:1.6;margin:24px 0 0;">Ak medzitým máte otázky, odpíšte priamo na tento e-mail alebo zavolajte na <a href="tel:+421915070771" style="color:#3b82f6;">+421 915 070 771</a>.</p>
      <p style="color:#cbd5e1;line-height:1.6;margin:24px 0 0;">S pozdravom,<br><strong style="color:#f1f5f9;">Patrik Patoraj</strong><br><span style="color:#94a3b8;font-size:13px;">Risali s.r.o.</span></p>
    </div>
  `;
}

function adminHtml(name: string, email: string): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0f172a;color:#f1f5f9;border-radius:16px;">
      <h1 style="color:#3b82f6;margin:0 0 12px;">📋 Nový brief k webu</h1>
      <p style="color:#cbd5e1;margin:0 0 8px;"><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) vyplnil/a pomôcku k webu.</p>
      <p style="color:#94a3b8;margin:0;">PDF sumár v prílohe. Detail nájdete v CRM → Formuláre.</p>
    </div>
  `;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function sendEmail(to: string, subject: string, html: string, pdfBase64: string, filename: string) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
    return { ok: false, error: "Resend connector not configured" };
  }
  const res = await fetch(`${GATEWAY_URL}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": RESEND_API_KEY,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      attachments: [
        { filename, content: pdfBase64 },
      ],
    }),
  });
  if (!res.ok) {
    return { ok: false, error: `Resend ${res.status}: ${await res.text()}` };
  }
  return { ok: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const payload = (await req.json()) as BriefPayload;
    if (!payload.name || !payload.email) {
      return new Response(JSON.stringify({ error: "Missing name or email" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const pdfBase64 = generatePdf(payload);
    const safeName = payload.name.replace(/[^\p{L}\p{N}_-]+/gu, "_").slice(0, 40) || "klient";
    const filename = `brief-${safeName}.pdf`;

    const clientResult = await sendEmail(
      payload.email,
      "Vaše odpovede z briefu k webu — PDF v prílohe",
      clientHtml(payload.name),
      pdfBase64,
      filename,
    );
    const adminResult = await sendEmail(
      ADMIN_EMAIL,
      `📋 Nový brief: ${payload.name}`,
      adminHtml(payload.name, payload.email),
      pdfBase64,
      filename,
    );

    return new Response(JSON.stringify({
      success: clientResult.ok && adminResult.ok,
      client: clientResult, admin: adminResult,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("send-brief-email error:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : "Unknown" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
