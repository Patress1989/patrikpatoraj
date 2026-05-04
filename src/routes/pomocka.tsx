import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowRight, ArrowLeft, Check, Loader2, Sparkles,
  User, Mail, Phone, Building2, Briefcase, Globe, Palette,
  Type, Image as ImageIcon, FileText, Settings2, Languages,
  Target, Trophy, Wrench, Wallet, Calendar, MessageSquare, ShieldCheck,
  CreditCard, Receipt, Send, Database, BarChart3, Bot, AppWindow,
  CalendarCheck, Lock, BookOpen, Server, Plug,
} from "lucide-react";

export const Route = createFileRoute("/pomocka")({
  head: () => ({
    meta: [
      { title: "Pomôcka k webu — presná predstava + cenová ponuka | Patrik Patoraj" },
      { name: "description", content: "Vyplňte krátky brief — pomôže nám obom presne identifikovať, čo chcete a koľko to bude stáť." },
      { property: "og:title", content: "Pomôcka k webu — Brief pre cenovú ponuku" },
      { property: "og:description", content: "Krok za krokom k presnej predstave o webe a transparentnej cene." },
    ],
  }),
  component: PomockaPage,
});

const STEPS = [
  { n: 1, label: "Kontakt" },
  { n: 2, label: "Firma" },
  { n: 3, label: "Ciele" },
  { n: 4, label: "Dizajn" },
  { n: 5, label: "Funkcie" },
  { n: 6, label: "Integrácie" },
  { n: 7, label: "Záver" },
];

const GOAL_OPTIONS = [
  "Získanie nových klientov",
  "Online predaj produktov / služieb",
  "Opätovné nákupy existujúcich zákazníkov",
  "Zber e-mailov / newsletter",
  "Budovanie značky a povedomia",
  "Rast sledovateľov na sociálnych sieťach",
];

const PAYMENT_GATEWAYS = ["Stripe", "GoPay", "Besteron / Comgate", "TrustPay", "PayPal", "Iné", "Žiadnu"];
const INVOICING_SYSTEMS = ["FAPI", "SuperFaktúra", "iDoklad", "Fakturoid", "KROS / Omega", "Vlastný systém", "Iný", "Žiadny"];
const EMAIL_PROVIDERS = ["Resend", "Mailchimp", "Mailerlite", "Ecomail", "SmartEmailing", "Brevo (Sendinblue)", "Iný", "Žiadny"];
const ANALYTICS_TOOLS = ["Google Analytics", "Meta / FB Pixel", "Plausible / Umami", "Hotjar / Clarity", "Iné", "Žiadne"];
const HOSTING_OPTIONS = ["Lovable Cloud", "Vercel / Netlify", "Vlastný hosting (WebSupport, ...)", "Neviem, navrhnite"];
const DATA_STORAGE = ["Lovable Cloud (DB)", "Google tabuľky", "Airtable / Notion", "Vlastný systém", "Neviem, navrhnite"];

type FormData = {
  name: string; email: string; phone: string; company_name: string;
  is_starting: boolean | null;
  has_brand: boolean | null;
  business_one_liner: string;
  has_existing_site: boolean | null;
  existing_site_url: string;
  existing_site_issues: string;
  goals: string[];
  self_edit: boolean | null;
  preferred_colors: string;
  preferred_typography: string;
  has_own_photos: boolean | null;
  has_own_texts: boolean | null;
  reference_sites: string;
  main_features: string;
  sells_products: boolean | null;
  payment_gateway_current: string;
  payment_gateway_switch_stripe: boolean | null;
  needs_crm_integration: boolean | null;
  crm_details: string;
  email_provider_current: string;
  email_switch_resend: boolean | null;
  needs_invoicing: boolean | null;
  invoicing_system: string;
  invoicing_switch_recommended: boolean | null;
  needs_analytics: boolean | null;
  analytics_tools: string;
  multilingual: boolean | null;
  languages: string;
  contact_form: boolean | null;
  newsletter_form: boolean | null;
  special_features: string;
  has_internal_crm: boolean | null;
  internal_crm_details: string;
  other_integrations: string;
  wants_ai_assistant: boolean | null;
  ai_assistant_purpose: string;
  wants_custom_app: boolean | null;
  custom_app_details: string;
  wants_booking_system: boolean | null;
  wants_member_area: boolean | null;
  wants_blog: boolean | null;
  data_storage_preference: string;
  hosting_preference: string;
  target_audience: string;
  unique_selling_point: string;
  maintenance_package: boolean | null;
  budget_range: string;
  deadline: string;
  notes: string;
  gdpr_consent: boolean;
};

const initial: FormData = {
  name: "", email: "", phone: "", company_name: "",
  is_starting: null, has_brand: null, business_one_liner: "",
  has_existing_site: null, existing_site_url: "", existing_site_issues: "",
  goals: [], self_edit: null,
  preferred_colors: "", preferred_typography: "",
  has_own_photos: null, has_own_texts: null, reference_sites: "",
  main_features: "", sells_products: null,
  payment_gateway_current: "", payment_gateway_switch_stripe: null,
  needs_crm_integration: null, crm_details: "",
  email_provider_current: "", email_switch_resend: null,
  needs_invoicing: null, invoicing_system: "", invoicing_switch_recommended: null,
  needs_analytics: null, analytics_tools: "",
  multilingual: null, languages: "",
  contact_form: null, newsletter_form: null, special_features: "",
  has_internal_crm: null, internal_crm_details: "",
  other_integrations: "",
  wants_ai_assistant: null, ai_assistant_purpose: "",
  wants_custom_app: null, custom_app_details: "",
  wants_booking_system: null, wants_member_area: null, wants_blog: null,
  data_storage_preference: "", hosting_preference: "",
  target_audience: "", unique_selling_point: "",
  maintenance_package: null, budget_range: "", deadline: "", notes: "",
  gdpr_consent: false,
};

const stepSchemas = {
  1: z.object({
    name: z.string().trim().min(2, "Zadajte aspoň 2 znaky").max(100),
    email: z.string().trim().email("Neplatný e-mail").max(255),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    company_name: z.string().trim().max(200).optional().or(z.literal("")),
  }),
  7: z.object({
    gdpr_consent: z.literal(true, { errorMap: () => ({ message: "Musíte súhlasiť so spracovaním údajov" }) }),
  }),
};

function PomockaPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const toggleGoal = (g: string) => {
    setData((d) => ({
      ...d,
      goals: d.goals.includes(g) ? d.goals.filter((x) => x !== g) : [...d.goals, g],
    }));
  };

  const validateStep = (s: number): boolean => {
    const schema = stepSchemas[s as 1 | 6];
    if (!schema) return true;
    const result = schema.safeParse(data);
    if (!result.success) {
      const fe: Record<string, string> = {};
      result.error.errors.forEach((e) => {
        if (e.path[0]) fe[e.path[0] as string] = e.message;
      });
      setErrors(fe);
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(STEPS.length, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!validateStep(6)) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const insertPayload = {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company_name: data.company_name || null,
        is_starting: data.is_starting,
        has_brand: data.has_brand,
        business_one_liner: data.business_one_liner || null,
        has_existing_site: data.has_existing_site,
        existing_site_url: data.existing_site_url || null,
        existing_site_issues: data.existing_site_issues || null,
        goals: data.goals.length ? data.goals : null,
        self_edit: data.self_edit,
        preferred_colors: data.preferred_colors || null,
        preferred_typography: data.preferred_typography || null,
        has_own_photos: data.has_own_photos,
        has_own_texts: data.has_own_texts,
        reference_sites: data.reference_sites || null,
        main_features: data.main_features || null,
        sells_products: data.sells_products,
        needs_crm_integration: data.needs_crm_integration,
        crm_details: data.crm_details || null,
        needs_invoicing: data.needs_invoicing,
        needs_analytics: data.needs_analytics,
        multilingual: data.multilingual,
        languages: data.languages || null,
        contact_form: data.contact_form,
        newsletter_form: data.newsletter_form,
        special_features: data.special_features || null,
        target_audience: data.target_audience || null,
        unique_selling_point: data.unique_selling_point || null,
        maintenance_package: data.maintenance_package,
        budget_range: data.budget_range || null,
        deadline: data.deadline || null,
        notes: data.notes || null,
        gdpr_consent: data.gdpr_consent,
      };
      const { data: inserted, error } = await supabase
        .from("web_briefs")
        .insert(insertPayload)
        .select("id")
        .single();
      if (error) throw new Error(error.message);

      // Fire-and-forget: send PDF summary to client + admin.
      // Do not block redirect if email fails.
      supabase.functions
        .invoke("send-brief-email", {
          body: { ...insertPayload, briefId: inserted?.id },
        })
        .catch((e) => console.warn("send-brief-email failed:", e));

      navigate({ to: "/formular-vyplneny" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Nastala neočakávaná chyba");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Pomôcka k webu
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Brief pre presnú cenovú ponuku</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Krok za krokom si ujasníme, čo presne potrebujete. Vďaka tomu vám pripravím
              presnú ponuku bez prekvapení a vy budete mať jasnú predstavu o výsledku.
            </p>
          </div>

          {/* Progress */}
          <div className="mt-10">
            <div className="flex items-start">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex flex-1 items-start">
                  <div className="flex w-9 shrink-0 flex-col items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                        step > s.n
                          ? "border-primary bg-primary text-primary-foreground"
                          : step === s.n
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-white/10 bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                    </div>
                    <span
                      className={`mt-2 text-center text-[11px] ${
                        step >= s.n ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`mx-2 mt-[18px] h-0.5 flex-1 transition-all ${
                        step > s.n ? "bg-primary" : "bg-white/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="glass-strong mt-8 rounded-3xl p-6 md:p-9">
            {step === 1 && (
              <Section title="Kontakt" subtitle="Aby som vás vedel kontaktovať s ponukou.">
                <Field icon={User} label="Meno a priezvisko" required error={errors.name}>
                  <input className="input-field" autoFocus value={data.name} onChange={(e) => update("name", e.target.value)} placeholder="Ján Novák" />
                </Field>
                <Field icon={Mail} label="E-mail" required error={errors.email}>
                  <input type="email" className="input-field" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="vas@email.sk" />
                </Field>
                <Field icon={Phone} label="Telefón" hint="Voliteľné">
                  <input type="tel" className="input-field" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+421 ..." />
                </Field>
                <Field icon={Building2} label="Názov firmy / projektu" hint="Voliteľné">
                  <input className="input-field" value={data.company_name} onChange={(e) => update("company_name", e.target.value)} placeholder="Napr. Risali s.r.o." />
                </Field>
              </Section>
            )}

            {step === 2 && (
              <Section title="O firme" subtitle="Pomôže mi pochopiť, kde sa práve nachádzate.">
                <YesNo label="Ste začínajúca firma?" value={data.is_starting} onChange={(v) => update("is_starting", v)} />
                <YesNo label="Máte logo a vlastný brand?" value={data.has_brand} onChange={(v) => update("has_brand", v)} />
                <Field icon={Briefcase} label="Opíšte svoju firmu jednou vetou" hint="Voliteľné">
                  <textarea className="input-field min-h-[80px] resize-y" value={data.business_one_liner} onChange={(e) => update("business_one_liner", e.target.value)} placeholder="Napr. Robíme férové tetovania v Bratislave." />
                </Field>
                <YesNo label="Máte už existujúci web?" value={data.has_existing_site} onChange={(v) => update("has_existing_site", v)} />
                {data.has_existing_site && (
                  <>
                    <Field icon={Globe} label="URL existujúceho webu">
                      <input className="input-field" value={data.existing_site_url} onChange={(e) => update("existing_site_url", e.target.value)} placeholder="https://..." />
                    </Field>
                    <Field icon={MessageSquare} label="Aké vnímate jeho hlavné nedostatky?">
                      <textarea className="input-field min-h-[80px] resize-y" value={data.existing_site_issues} onChange={(e) => update("existing_site_issues", e.target.value)} placeholder="Napr. zastaraný dizajn, pomalý, nefunguje na mobile..." />
                    </Field>
                  </>
                )}
              </Section>
            )}

            {step === 3 && (
              <Section title="Ciele webu" subtitle="Čo má web priniesť? Vyberte všetko, čo sedí.">
                <div className="space-y-2">
                  {GOAL_OPTIONS.map((g) => {
                    const checked = data.goals.includes(g);
                    return (
                      <label
                        key={g}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors ${
                          checked ? "border-primary/60 bg-primary/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <input type="checkbox" checked={checked} onChange={() => toggleGoal(g)} className="mt-0.5 h-4 w-4 accent-primary" />
                        <span className="text-sm text-foreground">{g}</span>
                      </label>
                    );
                  })}
                </div>
                <YesNo label="Budete chcieť robiť drobné zmeny na webe svojpomocne?" value={data.self_edit} onChange={(v) => update("self_edit", v)} />
              </Section>
            )}

            {step === 4 && (
              <Section title="Dizajn" subtitle="Pomôže mi nasmerovať vizuál.">
                <Field icon={Palette} label="Preferované farby" hint="Voliteľné">
                  <input className="input-field" value={data.preferred_colors} onChange={(e) => update("preferred_colors", e.target.value)} placeholder="Napr. tmavomodrá + biela, alebo HEX" />
                </Field>
                <Field icon={Type} label="Preferovaný typ písma" hint="Voliteľné">
                  <input className="input-field" value={data.preferred_typography} onChange={(e) => update("preferred_typography", e.target.value)} placeholder="Napr. moderné sans-serif, serif, rukopisné..." />
                </Field>
                <YesNo label="Máte vlastné fotky použiteľné na web?" value={data.has_own_photos} onChange={(v) => update("has_own_photos", v)} />
                <YesNo label="Máte vlastné texty použiteľné na web?" value={data.has_own_texts} onChange={(v) => update("has_own_texts", v)} />
                <Field icon={ImageIcon} label="Referenčné weby (ktoré sa vám páčia)" hint="Voliteľné · ideálne 2-3 odkazy">
                  <textarea className="input-field min-h-[80px] resize-y" value={data.reference_sites} onChange={(e) => update("reference_sites", e.target.value)} placeholder="https://...&#10;https://..." />
                </Field>
              </Section>
            )}

            {step === 5 && (
              <Section title="Funkcie webu" subtitle="Čo má web vedieť?">
                <Field icon={Settings2} label="Aké hlavné funkcie má web spĺňať?" hint="Voliteľné">
                  <textarea className="input-field min-h-[90px] resize-y" value={data.main_features} onChange={(e) => update("main_features", e.target.value)} placeholder="Napr. rezervácia termínov, blog, galéria, online platba..." />
                </Field>
                <YesNo label="Bude sa na webe realizovať predaj produktov / služieb?" value={data.sells_products} onChange={(v) => update("sells_products", v)} />
                <YesNo label="Prepojenie s CRM / e-mailingom (Mailchimp, Mailerlite, Ecomail...)?" value={data.needs_crm_integration} onChange={(v) => update("needs_crm_integration", v)} />
                {data.needs_crm_integration && (
                  <Field icon={MessageSquare} label="Akým systémom?" hint="Voliteľné">
                    <input className="input-field" value={data.crm_details} onChange={(e) => update("crm_details", e.target.value)} placeholder="Napr. Ecomail" />
                  </Field>
                )}
                <YesNo label="Prepojenie s fakturačným systémom?" value={data.needs_invoicing} onChange={(v) => update("needs_invoicing", v)} />
                <YesNo label="Analytické nástroje (Google Analytics, FB Pixel)?" value={data.needs_analytics} onChange={(v) => update("needs_analytics", v)} />
                <YesNo label="Web vo viacerých jazykoch?" value={data.multilingual} onChange={(v) => update("multilingual", v)} />
                {data.multilingual && (
                  <Field icon={Languages} label="V akých jazykoch?">
                    <input className="input-field" value={data.languages} onChange={(e) => update("languages", e.target.value)} placeholder="SK, EN, DE..." />
                  </Field>
                )}
                <YesNo label="Kontaktný formulár?" value={data.contact_form} onChange={(v) => update("contact_form", v)} />
                <YesNo label="Formulár na odber newslettera?" value={data.newsletter_form} onChange={(v) => update("newsletter_form", v)} />
                <Field icon={Wrench} label="Iné špeciálne funkcie?" hint="Voliteľné">
                  <textarea className="input-field min-h-[80px] resize-y" value={data.special_features} onChange={(e) => update("special_features", e.target.value)} placeholder="Napr. členská zóna, kalkulačka, AI chat..." />
                </Field>
              </Section>
            )}

            {step === 6 && (
              <Section title="Záver" subtitle="Posledné otázky a odošleme.">
                <Field icon={Target} label="Opíšte vašu cieľovú skupinu" hint="Voliteľné">
                  <textarea className="input-field min-h-[80px] resize-y" value={data.target_audience} onChange={(e) => update("target_audience", e.target.value)} placeholder="Komu predávate? Vek, lokalita, záujmy..." />
                </Field>
                <Field icon={Trophy} label="Čím sa odlišujete od konkurencie?" hint="Voliteľné">
                  <textarea className="input-field min-h-[80px] resize-y" value={data.unique_selling_point} onChange={(e) => update("unique_selling_point", e.target.value)} placeholder="V čom ste lepší / iní?" />
                </Field>
                <YesNo label="Záujem o balíček správy webu? (aktualizácie, zálohy, ochrana, optimalizácia)" value={data.maintenance_package} onChange={(v) => update("maintenance_package", v)} />
                <Field icon={Wallet} label="Orientačný rozpočet" hint="Voliteľné, pomôže mi navrhnúť realistickú ponuku">
                  <input className="input-field" value={data.budget_range} onChange={(e) => update("budget_range", e.target.value)} placeholder="Napr. do 1 000 €, 1 000 – 3 000 €, 3 000+ €" />
                </Field>
                <Field icon={Calendar} label="Kedy by ste chceli mať web hotový?" hint="Voliteľné">
                  <input className="input-field" value={data.deadline} onChange={(e) => update("deadline", e.target.value)} placeholder="Napr. do 2 mesiacov, na jar..." />
                </Field>
                <Field icon={MessageSquare} label="Doplňujúce poznámky" hint="Voliteľné">
                  <textarea className="input-field min-h-[80px] resize-y" value={data.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Čokoľvek dôležité, čo sme nepokryli." />
                </Field>

                <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={data.gdpr_consent}
                    onChange={(e) => update("gdpr_consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Súhlasím so spracovaním osobných údajov za účelom prípravy cenovej ponuky.
                    <ShieldCheck className="ml-1 inline h-3.5 w-3.5 text-primary" />
                  </span>
                </label>
                {errors.gdpr_consent && <p className="text-xs text-destructive">{errors.gdpr_consent}</p>}
                {submitError && <p className="text-sm text-destructive">{submitError}</p>}
              </Section>
            )}

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={step === 1 || submitting}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/10 disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Späť
              </button>
              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={next}
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold"
                >
                  Pokračovať <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  Odoslať brief
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  icon: Icon, label, required, hint, error, children,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-primary" />}
        <label className="text-sm font-medium text-foreground">
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        {hint && <span className="text-xs text-muted-foreground">· {hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function YesNo({
  label, value, onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-foreground">{label}</p>
      <div className="flex gap-2">
        {[
          { v: true, l: "Áno" },
          { v: false, l: "Nie" },
        ].map((opt) => {
          const active = value === opt.v;
          return (
            <button
              key={opt.l}
              type="button"
              onClick={() => onChange(opt.v)}
              className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-white/10 bg-white/5 text-foreground hover:bg-white/10"
              }`}
            >
              {opt.l}
            </button>
          );
        })}
      </div>
    </div>
  );
}
