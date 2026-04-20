import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ArrowLeft, Check, Loader2, Sparkles, Mail, Phone, Briefcase, Palette, Globe, User, ShieldCheck, PartyPopper, Building2, FileText, ListChecks, Contact, ImagePlus, X, Upload } from "lucide-react";

export const Route = createFileRoute("/formular")({
  head: () => ({
    meta: [
      { title: "Bezplatná ukážka — Patrik Patoraj" },
      { name: "description", content: "Vyplňte krátky formulár a do 48 hodín dostanete ukážku konceptu zdarma." },
      { property: "og:title", content: "Bezplatná ukážka projektu" },
      { property: "og:description", content: "Krátky 4-krokový formulár — odpoveď do 48 hodín." },
    ],
  }),
  component: FormularPage,
});

const STEPS = [
  { n: 1, label: "Meno" },
  { n: 2, label: "Kontakt" },
  { n: 3, label: "Projekt" },
  { n: 4, label: "Súhlas" },
];

const schemas = {
  step1: z.object({
    name: z.string().trim().min(2, "Zadajte aspoň 2 znaky").max(100, "Maximálne 100 znakov"),
  }),
  step2: z.object({
    email: z.string().trim().email("Neplatný email").max(255),
    phone: z.string().trim().min(6, "Zadajte platné telefónne číslo").max(30),
  }),
  step3: z.object({
    business_area: z.string().trim().min(2, "Zadajte aspoň 2 znaky").max(200),
    company_name: z.string().trim().max(200).optional().or(z.literal("")),
    business_description: z.string().trim().max(1000).optional().or(z.literal("")),
    services_list: z.string().trim().max(2000).optional().or(z.literal("")),
    contact_info: z.string().trim().max(1000).optional().or(z.literal("")),
    preferred_colors: z.string().trim().max(200).optional().or(z.literal("")),
    existing_website: z.string().trim().max(255).optional().or(z.literal("")),
  }),
  step4: z.object({
    gdpr_consent: z.literal(true, { errorMap: () => ({ message: "Musíte súhlasiť so spracovaním údajov" }) }),
  }),
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  business_area: string;
  company_name: string;
  business_description: string;
  services_list: string;
  contact_info: string;
  preferred_colors: string;
  existing_website: string;
  photo_urls: string[];
  gdpr_consent: boolean;
};

function FormularPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>({
    name: "", email: "", phone: "",
    business_area: "", company_name: "", business_description: "",
    services_list: "", contact_info: "",
    preferred_colors: "", existing_website: "",
    photo_urls: [],
    gdpr_consent: false,
  });

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const MAX_PHOTOS = 10;
  const MAX_SIZE = 5 * 1024 * 1024;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadError(null);

    const remaining = MAX_PHOTOS - data.photo_urls.length;
    if (remaining <= 0) {
      setUploadError(`Maximálne ${MAX_PHOTOS} fotiek.`);
      return;
    }
    const toUpload = Array.from(files).slice(0, remaining);

    for (const f of toUpload) {
      if (!f.type.startsWith("image/")) {
        setUploadError("Povolené sú len obrázky.");
        return;
      }
      if (f.size > MAX_SIZE) {
        setUploadError(`Súbor "${f.name}" presahuje 5 MB.`);
        return;
      }
    }

    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of toUpload) {
        const ext = file.name.split(".").pop() || "jpg";
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("project-photos")
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) throw upErr;
        const { data: pub } = supabase.storage.from("project-photos").getPublicUrl(path);
        uploaded.push(pub.publicUrl);
      }
      setData((d) => ({ ...d, photo_urls: [...d.photo_urls, ...uploaded] }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Nahrávanie zlyhalo");
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (url: string) => {
    setData((d) => ({ ...d, photo_urls: d.photo_urls.filter((u) => u !== url) }));
  };

  const validateStep = (s: number): boolean => {
    let result;
    if (s === 1) result = schemas.step1.safeParse({ name: data.name });
    else if (s === 2) result = schemas.step2.safeParse({ email: data.email, phone: data.phone });
    else if (s === 3) result = schemas.step3.safeParse({
      business_area: data.business_area,
      company_name: data.company_name,
      business_description: data.business_description,
      services_list: data.services_list,
      contact_info: data.contact_info,
      preferred_colors: data.preferred_colors,
      existing_website: data.existing_website,
    });
    else result = schemas.step4.safeParse({ gdpr_consent: data.gdpr_consent });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(4, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!validateStep(4)) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Insert into DB
      const { data: row, error: dbError } = await supabase
        .from("form_submissions")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          business_area: data.business_area,
          preferred_colors: data.preferred_colors || null,
          existing_website: data.existing_website || null,
          gdpr_consent: data.gdpr_consent,
        })
        .select("id")
        .single();

      if (dbError) throw new Error(dbError.message);

      // 2. Trigger email (best-effort, don't block on failure)
      try {
        await supabase.functions.invoke("send-form-email", {
          body: { submissionId: row.id, ...data },
        });
      } catch (emailErr) {
        console.warn("Email send failed (submission saved):", emailErr);
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Nastala neočakávaná chyba");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <ThankYou />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Bezplatná ukážka
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Pár otázok a pustíme sa do toho</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Vyplnenie zaberie 1 minútu. Do 48 hodín vám pošleme ukážku konceptu a cenovú ponuku.
            </p>
          </div>

          {/* Progress */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex flex-1 items-center">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                    step > s.n ? "border-primary bg-primary text-primary-foreground" :
                    step === s.n ? "border-primary bg-primary/20 text-primary" :
                    "border-white/10 bg-white/5 text-muted-foreground"
                  }`}>
                    {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`mx-2 h-0.5 flex-1 transition-all ${step > s.n ? "bg-primary" : "bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              {STEPS.map((s) => (
                <span key={s.n} className={step >= s.n ? "text-foreground" : ""}>{s.label}</span>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="glass-strong mt-8 rounded-3xl p-7 md:p-10">
            {step === 1 && (
              <Step title="Ako sa voláte?" subtitle="Aby vás vedel správne osloviť.">
                <Field icon={User} label="Meno a priezvisko" required error={errors.name}>
                  <input
                    type="text"
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Napr. Ján Novák"
                    className="input-field"
                    autoFocus
                  />
                </Field>
              </Step>
            )}

            {step === 2 && (
              <Step title="Ako vás zastihneme?" subtitle="Tieto údaje použijeme len na komunikáciu k vášmu projektu.">
                <Field icon={Mail} label="E-mail" required error={errors.email}>
                  <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="vas@email.sk" className="input-field" autoFocus />
                </Field>
                <Field icon={Phone} label="Telefón" required error={errors.phone}>
                  <input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+421 ..." className="input-field" />
                </Field>
              </Step>
            )}

            {step === 3 && (
              <Step title="Povedzte nám o projekte" subtitle="Stačí krátko. Detaily doladíme spolu.">
                <Field icon={Briefcase} label="Oblasť podnikania" required error={errors.business_area}>
                  <input type="text" value={data.business_area} onChange={(e) => update("business_area", e.target.value)} placeholder="Napr. fitness, e-shop, realitná kancelária" className="input-field" autoFocus />
                </Field>
                <Field icon={Palette} label="Preferované farby" hint="Voliteľné" error={errors.preferred_colors}>
                  <input type="text" value={data.preferred_colors} onChange={(e) => update("preferred_colors", e.target.value)} placeholder="Napr. modrá + biela, alebo HEX kód" className="input-field" />
                </Field>
                <Field icon={Globe} label="Existujúci web" hint="Voliteľné" error={errors.existing_website}>
                  <input type="text" value={data.existing_website} onChange={(e) => update("existing_website", e.target.value)} placeholder="https://..." className="input-field" />
                </Field>
              </Step>
            )}

            {step === 4 && (
              <Step title="Posledný krok" subtitle="Skontrolujte si zhrnutie a potvrďte súhlas.">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
                  <SummaryRow label="Meno" value={data.name} />
                  <SummaryRow label="E-mail" value={data.email} />
                  <SummaryRow label="Telefón" value={data.phone} />
                  <SummaryRow label="Oblasť" value={data.business_area} />
                  {data.preferred_colors && <SummaryRow label="Farby" value={data.preferred_colors} />}
                  {data.existing_website && <SummaryRow label="Web" value={data.existing_website} />}
                </div>

                <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                  <input
                    type="checkbox"
                    checked={data.gdpr_consent}
                    onChange={(e) => update("gdpr_consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-primary"
                  />
                  <span className="text-sm text-foreground">
                    Súhlasím so spracovaním osobných údajov v zmysle{" "}
                    <Link to="/gdpr" className="text-primary underline-offset-2 hover:underline">zásad GDPR</Link>.
                    <span className="text-destructive">*</span>
                  </span>
                </label>
                {errors.gdpr_consent && <p className="mt-2 text-sm text-destructive">{errors.gdpr_consent}</p>}

                {submitError && (
                  <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {submitError}
                  </div>
                )}
              </Step>
            )}

            {/* Nav */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={step === 1 || submitting}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" /> Späť
              </button>

              {step < 4 ? (
                <button type="button" onClick={next} className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold">
                  Pokračovať <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="button" onClick={submit} disabled={submitting} className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold disabled:opacity-60">
                  {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Odosielam...</>) : (<>Odoslať dopyt <Check className="h-4 w-4" /></>)}
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <ShieldCheck className="mr-1 inline h-3.5 w-3.5" />
            Vaše údaje sú v bezpečí. Nezdieľame ich s tretími stranami.
          </p>
        </div>
      </main>
      <SiteFooter />

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          background: oklch(1 0 0 / 0.05);
          border: 1px solid oklch(1 0 0 / 0.1);
          border-radius: 0.75rem;
          color: var(--color-foreground);
          font-size: 0.95rem;
          transition: all 0.2s;
          outline: none;
        }
        .input-field::placeholder { color: var(--color-muted-foreground); opacity: 0.6; }
        .input-field:focus {
          border-color: var(--color-primary);
          background: oklch(1 0 0 / 0.08);
          box-shadow: 0 0 0 3px oklch(0.65 0.2 255 / 0.15);
        }
      `}</style>
    </div>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold md:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

function Field({ icon: Icon, label, required, hint, error, children }: {
  icon: React.ComponentType<{ className?: string }>; label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          <Icon className="h-3.5 w-3.5 text-primary" />
          {label} {required && <span className="text-destructive">*</span>}
        </label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-white/5 py-2 last:border-b-0 first:pt-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function ThankYou() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="flex min-h-screen items-center justify-center px-6 pt-32 pb-20">
        <div className="animate-fade-up text-center">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-2xl" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-violet-500 shadow-2xl shadow-primary/40">
              <PartyPopper className="h-12 w-12 text-white" />
            </div>
          </div>

          <h1 className="mt-8 text-3xl font-extrabold md:text-5xl">
            Ďakujeme! <span className="gradient-text">Máme to.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground md:text-lg">
            Váš dopyt sme úspešne prijali. Do <strong className="text-foreground">48 hodín</strong> vám pošlem na e-mail ukážku konceptu a cenovú ponuku.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={() => navigate({ to: "/" })} className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
              Späť na hlavnú stránku
            </button>
            <Link to="/kurz" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-foreground hover:bg-white/10">
              Pozrieť AI kurz
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
