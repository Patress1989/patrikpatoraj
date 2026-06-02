import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getInquiriesCount } from "@/lib/inquiries.functions";
import { ArrowRight, ArrowLeft, Check, Loader2, Sparkles, Zap, Mail, Phone, Briefcase, Palette, Globe, User, ShieldCheck, Building2, FileText, ListChecks, Contact, ImagePlus, X, Upload } from "lucide-react";

export const Route = createFileRoute("/formular")({
  head: () => ({
    meta: [
      { title: "Bezplatná ukážka — Patrik Patoraj" },
      { name: "description", content: "Vyplňte krátky formulár a do 24 hodín dostanete ukážku konceptu zdarma." },
      { property: "og:title", content: "Bezplatná ukážka projektu" },
      { property: "og:description", content: "Krátky 3-krokový formulár — odpoveď do 24 hodín." },
    ],
  }),
  component: FormularPage,
});

const STEPS = [
  { n: 1, label: "O projekte" },
  { n: 2, label: "Vaše údaje" },
  { n: 3, label: "Hotovo" },
];

const BUSINESS_CHIPS = ["Barber", "Fitness", "Estetika", "Reštaurácia", "Remeslá", "E-shop", "Iné"];

const DRAFT_KEY = "formular_draft_v1";

const schemas = {
  // Step 1: project
  step1: z.object({
    business_area: z.string().trim().min(2, "Zadajte aspoň 2 znaky").max(200),
    company_name: z.string().trim().max(200).optional().or(z.literal("")),
    business_description: z.string().trim().max(1000).optional().or(z.literal("")),
    services_list: z.string().trim().max(2000).optional().or(z.literal("")),
    contact_info: z.string().trim().max(1000).optional().or(z.literal("")),
    preferred_colors: z.string().trim().max(200).optional().or(z.literal("")),
    existing_website: z.string().trim().max(255).optional().or(z.literal("")),
  }),
  // Step 2: contact
  step2: z.object({
    name: z.string().trim().min(2, "Zadajte aspoň 2 znaky").max(100, "Maximálne 100 znakov"),
    email: z.string().trim().email("Neplatný email").max(255),
    phone: z
      .string()
      .trim()
      .max(30)
      .optional()
      .or(z.literal(""))
      .refine((v) => !v || v.length >= 6, { message: "Zadajte platné telefónne číslo" }),
  }),
  // Step 3: gdpr
  step3: z.object({
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

const INITIAL_DATA: FormData = {
  name: "", email: "", phone: "",
  business_area: "", company_name: "", business_description: "",
  services_list: "", contact_info: "",
  preferred_colors: "", existing_website: "",
  photo_urls: [],
  gdpr_consent: false,
};

function FormularPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [data, setData] = useState<FormData>(INITIAL_DATA);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<FormData>;
      setData((d) => ({ ...d, ...parsed, gdpr_consent: false }));
    } catch {
      // ignore
    }
  }, []);

  // Autosave draft (without gdpr)
  useEffect(() => {
    try {
      const { gdpr_consent: _g, ...toSave } = data;
      localStorage.setItem(DRAFT_KEY, JSON.stringify(toSave));
    } catch {
      // ignore
    }
  }, [data]);

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
        const path = `submissions/${crypto.randomUUID()}.${ext}`;
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
    if (s === 1) result = schemas.step1.safeParse({
      business_area: data.business_area,
      company_name: data.company_name,
      business_description: data.business_description,
      services_list: data.services_list,
      contact_info: data.contact_info,
      preferred_colors: data.preferred_colors,
      existing_website: data.existing_website,
    });
    else if (s === 2) result = schemas.step2.safeParse({
      name: data.name,
      email: data.email,
      phone: data.phone,
    });
    else result = schemas.step3.safeParse({ gdpr_consent: data.gdpr_consent });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const next = () => {
    if (validateStep(step)) setStep((s) => Math.min(3, s + 1));
  };

  const prev = () => setStep((s) => Math.max(1, s - 1));

  // Detailnosť ukážky — 6 optional fields → 0..6 → 5 stupňov
  const optionalFilled = [
    data.company_name,
    data.business_description,
    data.services_list,
    data.contact_info,
    data.preferred_colors,
    data.existing_website,
  ].filter((v) => v && v.trim().length > 0).length;

  const detailLevel = (() => {
    if (optionalFilled === 0) return { dots: 0, pct: 0 };
    if (optionalFilled <= 2) return { dots: 1, pct: 20 };
    if (optionalFilled === 3) return { dots: 2, pct: 40 };
    if (optionalFilled === 4) return { dots: 3, pct: 60 };
    if (optionalFilled === 5) return { dots: 4, pct: 80 };
    return { dots: 5, pct: 100 };
  })();

  const submit = async () => {
    if (!validateStep(3)) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const submissionId = crypto.randomUUID();

      // 1. Insert into DB
      const { error: dbError } = await supabase
        .from("form_submissions")
        .insert({
          id: submissionId,
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          business_area: data.business_area,
          company_name: data.company_name || null,
          business_description: data.business_description || null,
          services_list: data.services_list || null,
          contact_info: data.contact_info || null,
          preferred_colors: data.preferred_colors || null,
          existing_website: data.existing_website || null,
          photo_urls: data.photo_urls.length ? data.photo_urls : null,
          gdpr_consent: data.gdpr_consent,
        });

      if (dbError) throw new Error(dbError.message);

      // 2. Trigger emails (best-effort)
      try {
        await fetch('/api/form-emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ submissionId, data }),
        });
      } catch (emailErr) {
        console.warn("Email send failed (submission saved):", emailErr);
      }

      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }

      navigate({ to: "/formular-vyplneny" });
      return;
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
              <Sparkles className="h-3.5 w-3.5" /> Bezplatná ukážka
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Pár otázok a pustíme sa do toho</h1>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Vyplnenie zaberie 2 minúty. Do 24 hodín vám pošleme ukážku konceptu a cenovú ponuku.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              ✓ Už som pomohol 27+ malým firmám získať klientov cez web
            </p>
          </div>

          {/* Progress */}
          <div className="mt-10">
            <div className="flex items-start">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex flex-1 items-start">
                  <div className="flex w-9 shrink-0 flex-col items-center">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all ${
                      step > s.n ? "border-primary bg-primary text-primary-foreground" :
                      step === s.n ? "border-primary bg-primary/20 text-primary" :
                      "border-white/10 bg-white/5 text-muted-foreground"
                    }`}>
                      {step > s.n ? <Check className="h-4 w-4" /> : s.n}
                    </div>
                    <span className={`mt-2 text-center text-xs ${step >= s.n ? "text-foreground" : "text-muted-foreground"}`}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`mx-3 mt-[18px] h-0.5 flex-1 transition-all ${step > s.n ? "bg-primary" : "bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card */}
          <div className="glass-strong mt-8 rounded-3xl p-7 md:p-10">
            {step === 1 && (
              <Step
                title="Povedzte mi o projekte"
                subtitle="Stačí oblasť podnikania. Čím viac doplníte, tým presnejšiu ukážku pripravím."
              >
                <div className="-mt-2 mb-2 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Detailnosť ukážky:</span>
                    <span className="tracking-widest">
                      {"●".repeat(detailLevel.dots)}{"○".repeat(5 - detailLevel.dots)}
                    </span>
                    <span>{detailLevel.pct}%</span>
                  </div>
                </div>

                <Field icon={Briefcase} label="Oblasť podnikania" required error={errors.business_area}>
                  <div className="mb-2">
                    <p className="mb-1.5 text-xs text-muted-foreground">Rýchla voľba:</p>
                    <div className="flex flex-wrap gap-2">
                      {BUSINESS_CHIPS.map((chip) => {
                        const active = data.business_area === chip;
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => {
                              if (chip === "Iné") {
                                update("business_area", "");
                                const el = document.getElementById("business_area_input") as HTMLInputElement | null;
                                el?.focus();
                              } else {
                                update("business_area", chip);
                              }
                            }}
                            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                              active
                                ? "border-primary bg-primary/20 text-primary"
                                : "border-white/10 bg-white/5 text-foreground hover:bg-primary/10"
                            }`}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <input
                    id="business_area_input"
                    type="text"
                    value={data.business_area}
                    onChange={(e) => update("business_area", e.target.value)}
                    placeholder="Napr. Barber, Fitness tréner, Fyzioterapeut, Škôlka"
                    className="input-field"
                    autoFocus
                  />
                </Field>

                <Field icon={Building2} label="Názov firmy / projektu" hint="Voliteľné">
                  <input type="text" value={data.company_name} onChange={(e) => update("company_name", e.target.value)} placeholder="Napr. Risali s.r.o., StudioX, Barber Bratislava" className="input-field" />
                </Field>

                <Field icon={FileText} label="O čom je váš biznis?" hint="Voliteľné">
                  <textarea
                    value={data.business_description}
                    onChange={(e) => update("business_description", e.target.value)}
                    placeholder="Stručne popíšte, čo robíte a pre koho."
                    className="input-field min-h-[90px] resize-y"
                    rows={3}
                  />
                </Field>

                <Field icon={ImagePlus} label="Vaše logo a fotky" hint="Voliteľné · max 10 fotiek, 5 MB / fotka">
                  <p className="mb-2 text-xs text-muted-foreground">
                    Ak nemáte vlastné, použijem kvalitné ilustračné obrázky.
                  </p>
                  <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-center transition-colors hover:bg-white/10">
                    {uploading ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : (
                      <Upload className="h-5 w-5 text-primary" />
                    )}
                    <span className="text-sm font-medium text-foreground">
                      {uploading ? "Nahrávam..." : "Kliknite alebo presuňte fotky sem"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {data.photo_urls.length}/{MAX_PHOTOS} · JPG, PNG, WEBP do 5 MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      disabled={uploading || data.photo_urls.length >= MAX_PHOTOS}
                      onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
                    />
                  </label>
                  {uploadError && <p className="mt-2 text-xs text-destructive">{uploadError}</p>}
                  {data.photo_urls.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                      {data.photo_urls.map((url) => (
                        <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-white/10 bg-white/5">
                          <img src={url} alt="Nahraná fotka" className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(url)}
                            aria-label="Odstrániť fotku"
                            className="absolute right-1 top-1 rounded-full bg-background/80 p-1 text-foreground opacity-0 transition-opacity hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Field>

                <Field icon={ListChecks} label="Zoznam služieb / Cenník" hint="Voliteľné">
                  <textarea
                    value={data.services_list}
                    onChange={(e) => update("services_list", e.target.value)}
                    placeholder="Čo presne chcete na webe ponúkať. Napr.: Strihanie 15€, Brada 10€, ..."
                    className="input-field min-h-[90px] resize-y"
                    rows={3}
                  />
                </Field>

                <Field icon={Contact} label="Kontaktné údaje" hint="Voliteľné">
                  <textarea
                    value={data.contact_info}
                    onChange={(e) => update("contact_info", e.target.value)}
                    placeholder="Telefón, adresa, Instagram / Facebook, otváracie hodiny..."
                    className="input-field min-h-[90px] resize-y"
                    rows={3}
                  />
                </Field>

                <Field icon={Palette} label="Preferované farby" hint="Voliteľné" error={errors.preferred_colors}>
                  <input type="text" value={data.preferred_colors} onChange={(e) => update("preferred_colors", e.target.value)} placeholder="Napr. modrá + biela, alebo HEX kód" className="input-field" />
                </Field>
                <Field icon={Globe} label="Existujúci web" hint="Voliteľné" error={errors.existing_website}>
                  <input type="text" value={data.existing_website} onChange={(e) => update("existing_website", e.target.value)} placeholder="https://..." className="input-field" />
                </Field>
              </Step>
            )}

            {step === 2 && (
              <Step title="Ako sa voláte a kde vás zastihnem?" subtitle="Tieto údaje použijem len na komunikáciu k vášmu projektu.">
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
                <Field icon={Mail} label="E-mail" required error={errors.email}>
                  <input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="vas@email.sk" className="input-field" />
                </Field>
                <Field icon={Phone} label="Telefón" hint="voliteľné — pre rýchlejšiu odpoveď" error={errors.phone}>
                  <input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+421 ..." className="input-field" />
                </Field>
              </Step>
            )}

            {step === 3 && (
              <Step title="Posledný krok" subtitle="Skontrolujte si zhrnutie a potvrďte súhlas.">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
                  {data.name && <SummaryRow label="Meno" value={data.name} />}
                  {data.email && <SummaryRow label="E-mail" value={data.email} />}
                  {data.phone && <SummaryRow label="Telefón" value={data.phone} />}
                  {data.business_area && <SummaryRow label="Oblasť" value={data.business_area} />}
                  {data.company_name && <SummaryRow label="Firma" value={data.company_name} />}
                  {data.business_description && <SummaryRow label="Popis biznisu" value={data.business_description} />}
                  {data.services_list && <SummaryRow label="Služby/Cenník" value={data.services_list} />}
                  {data.contact_info && <SummaryRow label="Kontaktné údaje" value={data.contact_info} />}
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

              {step < 3 ? (
                <button type="button" onClick={next} className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold">
                  Pokračovať <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button type="button" onClick={submit} disabled={submitting} className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold disabled:opacity-60">
                  {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Odosielam...</>) : (<>Pošlite mi moju ukážku zdarma <Zap className="h-4 w-4 fill-current" /></>)}
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
    </div>
  );
}

function Step({ title, subtitle, children }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
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
