import { jsPDF } from "jspdf";
import type { Tables } from "@/integrations/supabase/types";

type Brief = Tables<"web_briefs">;

const yn = (v: boolean | null | undefined) =>
  v === true ? "Áno" : v === false ? "Nie" : "—";
const val = (v: string | null | undefined) =>
  v && v.trim().length > 0 ? v : "—";

export function generateBriefPdf(p: Brief): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const maxWidth = pageWidth - marginX * 2;
  let y = 60;

  const addLine = (
    text: string,
    opts?: { size?: number; bold?: boolean; color?: [number, number, number]; gap?: number },
  ) => {
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
    if (y > pageHeight - 80) {
      doc.addPage();
      y = 60;
    }
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(2);
    doc.line(marginX, y, marginX + 24, y);
    y += 14;
    addLine(title, { size: 13, bold: true, color: [15, 23, 42], gap: 4 });
  };

  const row = (label: string, value: string) => addLine(`${label}: ${value}`, { size: 11 });

  // Header bar
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 36, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Brief k webu — Patrik Patoraj", marginX, 23);

  y = 60;
  addLine("Pomôcka k webu — sumár odpovedí", { size: 18, bold: true, color: [15, 23, 42], gap: 2 });
  addLine(
    new Date(p.created_at).toLocaleDateString("sk-SK", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    { size: 10, color: [100, 116, 139], gap: 6 },
  );

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
    row("Aktuálna platobná brána", val((p as any).payment_gateway_current));
    row("Ochota prejsť na Stripe", yn((p as any).payment_gateway_switch_stripe));
  }
  row("CRM / e-mailing integrácia", yn(p.needs_crm_integration));
  if (p.needs_crm_integration) {
    row("E-mail / CRM nástroj", val((p as any).email_provider_current));
    row("Detail CRM", val(p.crm_details));
    row("Ochota použiť Resend", yn((p as any).email_switch_resend));
  }
  row("Fakturačný systém", yn(p.needs_invoicing));
  if (p.needs_invoicing) {
    row("Aktuálny fakturačný systém", val((p as any).invoicing_system));
    row("Akceptuje odporúčanie (FAPI/SuperFaktúra)", yn((p as any).invoicing_switch_recommended));
  }
  row("Analytika", yn(p.needs_analytics));
  if (p.needs_analytics) row("Analytické nástroje", val((p as any).analytics_tools));
  row("Viacjazyčnosť", yn(p.multilingual));
  if (p.multilingual) row("Jazyky", val(p.languages));
  row("Kontaktný formulár", yn(p.contact_form));
  row("Newsletter formulár", yn(p.newsletter_form));
  row("Špeciálne funkcie", val(p.special_features));

  section("Integrácie a rozšírenia");
  row("Interný CRM systém", yn((p as any).has_internal_crm));
  if ((p as any).has_internal_crm) row("Detail interného CRM", val((p as any).internal_crm_details));
  row("Iné integrácie", val((p as any).other_integrations));
  row("AI asistent na stránke", yn((p as any).wants_ai_assistant));
  if ((p as any).wants_ai_assistant) row("Účel AI asistenta", val((p as any).ai_assistant_purpose));
  row("Vlastná aplikácia", yn((p as any).wants_custom_app));
  if ((p as any).wants_custom_app) row("Detail aplikácie", val((p as any).custom_app_details));
  row("Rezervačný systém", yn((p as any).wants_booking_system));
  row("Členská zóna", yn((p as any).wants_member_area));
  row("Blog / magazín", yn((p as any).wants_blog));
  row("Preferované úložisko dát", val((p as any).data_storage_preference));
  row("Preferencia hostingu", val((p as any).hosting_preference));

  section("Záver");
  row("Cieľová skupina", val(p.target_audience));
  row("Konkurenčná výhoda", val(p.unique_selling_point));
  row("Údržbový balík", yn(p.maintenance_package));
  row("Rozpočet", val(p.budget_range));
  row("Termín", val(p.deadline));
  row("Poznámky", val(p.notes));

  y += 10;
  addLine(`ID briefu: ${p.id}`, { size: 9, color: [148, 163, 184] });

  return doc;
}

export function downloadBriefPdf(p: Brief) {
  const doc = generateBriefPdf(p);
  const safeName = (p.name || "klient").replace(/[^\p{L}\p{N}_-]+/gu, "_").slice(0, 40);
  doc.save(`brief-${safeName}.pdf`);
}
