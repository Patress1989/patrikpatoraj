import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { ArrowLeft, ArrowRight, Check, Shield, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { createCheckoutClientSecret, getStripe } from "@/lib/stripe";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/objednavka")({
  head: () => ({
    meta: [
      { title: "Objednávka — Web bez starostí | Patrik Patoraj" },
      {
        name: "description",
        content:
          "Aktivujte si moderný web na predplatné — 99 € jednorazovo + 39 €/mesačne. Bez viazanosti, kedykoľvek možnosť odkúpiť.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Objednávka — Web bez starostí" },
      {
        property: "og:description",
        content: "99 € aktivácia + 39 €/mes. Bez viazanosti.",
      },
    ],
  }),
  component: ObjednavkaPage,
});

type Step = 1 | 2 | 3;

type FormState = {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  // Step 2
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isCompany: boolean;
  companyName: string;
  companyAddress: string;
  ico: string;
  dic: string;
  icDph: string;
  gdprConsent: boolean;
};

const initialForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  postalCode: "",
  country: "Slovensko",
  isCompany: false,
  companyName: "",
  companyAddress: "",
  ico: "",
  dic: "",
  icDph: "",
  gdprConsent: false,
};

function validateStep1(f: FormState): Record<string, string> {
  const e: Record<string, string> = {};
  if (!f.firstName.trim()) e.firstName = "Zadajte meno";
  else if (f.firstName.length > 100) e.firstName = "Max. 100 znakov";
  if (!f.lastName.trim()) e.lastName = "Zadajte priezvisko";
  else if (f.lastName.length > 100) e.lastName = "Max. 100 znakov";
  if (!f.email.trim()) e.email = "Zadajte e-mail";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Neplatný e-mail";
  return e;
}

function validateStep2(f: FormState): Record<string, string> {
  const e: Record<string, string> = {};
  if (!f.phone.trim()) e.phone = "Zadajte telefón";
  else if (!/^[+0-9 ()/-]{6,20}$/.test(f.phone.trim())) e.phone = "Neplatné telefónne číslo";
  if (!f.street.trim()) e.street = "Zadajte ulicu a číslo";
  if (!f.city.trim()) e.city = "Zadajte mesto";
  if (!f.postalCode.trim()) e.postalCode = "Zadajte PSČ";
  else if (!/^\d{3}\s?\d{2}$/.test(f.postalCode.trim())) e.postalCode = "Neplatné PSČ (napr. 967 01)";
  if (!f.country.trim()) e.country = "Zadajte krajinu";
  if (!f.gdprConsent) e.gdprConsent = "Vyžaduje sa súhlas";

  if (f.isCompany) {
    if (!f.companyName.trim()) e.companyName = "Zadajte názov spoločnosti";
    if (!f.ico.trim()) e.ico = "Zadajte IČO";
    else if (!/^\d{6,8}$/.test(f.ico.trim())) e.ico = "IČO má 6 – 8 číslic";
    if (!f.dic.trim()) e.dic = "Zadajte DIČ";
    else if (!/^\d{9,10}$/.test(f.dic.trim())) e.dic = "DIČ má 9 – 10 číslic";
    if (f.icDph.trim() && !/^SK\d{10}$/i.test(f.icDph.trim()))
      e.icDph = "IČ DPH má formát SK + 10 číslic";
  }
  return e;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-destructive">{msg}</p>;
}

function StepDot({ active, done, n, label }: { active: boolean; done: boolean; n: number; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
          done
            ? "bg-primary text-primary-foreground"
            : active
            ? "bg-primary/20 text-primary ring-2 ring-primary"
            : "bg-white/10 text-muted-foreground"
        }`}
      >
        {done ? <Check className="h-3.5 w-3.5" /> : n}
      </div>
      <span
        className={`text-xs font-medium ${
          active || done ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function ObjednavkaPage() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stripeError, setStripeError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as string]) {
      setErrors((prev) => {
        const { [key as string]: _omit, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep1(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep2(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStripeError(null);
      setStep(3);
    }
  };

  const fetchClientSecret = useCallback(async () => {
    try {
      return await createCheckoutClientSecret({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        street: form.street.trim(),
        city: form.city.trim(),
        postalCode: form.postalCode.trim(),
        country: form.country.trim(),
        isCompany: form.isCompany,
        companyName: form.companyName.trim() || undefined,
        companyAddress: form.companyAddress.trim() || undefined,
        ico: form.ico.trim() || undefined,
        dic: form.dic.trim() || undefined,
        icDph: form.icDph.trim() || undefined,
        gdprConsent: form.gdprConsent,
        returnUrl: `${window.location.origin}/objednavka/dakujeme?session_id={CHECKOUT_SESSION_ID}`,
      });
    } catch (e) {
      const msg = (e as Error).message;
      setStripeError(msg);
      throw e;
    }
    // form values used inside; safe to depend on form object reference identity
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const checkoutOptions = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  return (
    <div className="min-h-screen bg-background">
      <PaymentTestModeBanner />
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Späť na hlavnú stránku
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* LEFT — Summary */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" /> Web bez starostí
            </div>
            <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Objednávka <span className="gradient-text">predplatného</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground md:text-lg">
              Moderný web bez vysokej vstupnej investície. Fixná mesačná platba, ktorá sa
              nemení s rastom vašej firmy.
            </p>

            {/* Order summary */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Zhrnutie objednávky
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-foreground">Aktivačný poplatok</div>
                    <div className="text-xs text-muted-foreground">
                      Jednorazovo — úvodné nastavenie, doména, hosting, publikácia
                    </div>
                  </div>
                  <div className="whitespace-nowrap font-bold text-foreground">99,00&nbsp;€</div>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold text-foreground">
                      Web bez starostí — predplatné
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Mesačne — hosting, doména, údržba, 5 technických úprav
                    </div>
                  </div>
                  <div className="whitespace-nowrap font-bold text-foreground">
                    39,00&nbsp;€
                    <span className="ml-1 text-xs font-normal text-muted-foreground">/ mes.</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex items-baseline justify-between">
                  <div className="text-sm font-semibold text-foreground">Dnes zaplatíte</div>
                  <div className="text-2xl font-extrabold text-foreground">138,00&nbsp;€</div>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  (99 € aktivácia + 39 € prvé mesačné predplatné)
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Potom 39&nbsp;€ mesačne, automaticky. Predplatné môžete kedykoľvek zrušiť.
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Bez viazanosti — predplatné kedykoľvek zrušíte",
                "Kedykoľvek možnosť odkúpiť web do plného vlastníctva",
                "5 technických úprav mesačne v cene",
                "Bezpečná platba cez Stripe",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5" />
              Nie som platiteľom DPH. Ceny sú konečné.
            </div>
          </div>

          {/* RIGHT — Form / Checkout */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              {/* Step indicator */}
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <StepDot n={1} active={step === 1} done={step > 1} label="Osobné údaje" />
                <div className="hidden h-px w-6 bg-white/10 md:block" />
                <StepDot n={2} active={step === 2} done={step > 2} label="Fakturácia" />
                <div className="hidden h-px w-6 bg-white/10 md:block" />
                <StepDot n={3} active={step === 3} done={false} label="Platba" />
              </div>

              {step === 1 && (
                <form onSubmit={handleStep1} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Osobné údaje</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Použijeme ich na vystavenie faktúry a komunikáciu.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Meno *</Label>
                      <Input
                        id="firstName"
                        required
                        autoComplete="given-name"
                        value={form.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                      />
                      <FieldError msg={errors.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Priezvisko *</Label>
                      <Input
                        id="lastName"
                        required
                        autoComplete="family-name"
                        value={form.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                      />
                      <FieldError msg={errors.lastName} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="vy@example.sk"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                    <FieldError msg={errors.email} />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
                  >
                    Pokračovať na fakturačné údaje
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleStep2} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Fakturačné údaje</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Adresa, ktorá bude uvedená na faktúre.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefón *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+421 900 000 000"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                    <FieldError msg={errors.phone} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street">Ulica a číslo *</Label>
                    <Input
                      id="street"
                      required
                      autoComplete="street-address"
                      value={form.street}
                      onChange={(e) => update("street", e.target.value)}
                    />
                    <FieldError msg={errors.street} />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">Mesto *</Label>
                      <Input
                        id="city"
                        required
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                      />
                      <FieldError msg={errors.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">PSČ *</Label>
                      <Input
                        id="postalCode"
                        required
                        autoComplete="postal-code"
                        placeholder="967 01"
                        value={form.postalCode}
                        onChange={(e) => update("postalCode", e.target.value)}
                      />
                      <FieldError msg={errors.postalCode} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Krajina *</Label>
                    <Input
                      id="country"
                      required
                      autoComplete="country-name"
                      value={form.country}
                      onChange={(e) => update("country", e.target.value)}
                    />
                    <FieldError msg={errors.country} />
                  </div>

                  {/* Company toggle */}
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                    <label className="flex cursor-pointer items-start gap-3">
                      <Checkbox
                        checked={form.isCompany}
                        onCheckedChange={(v) => update("isCompany", v === true)}
                        id="isCompany"
                        className="mt-0.5"
                      />
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          Firemné údaje (nakupujem na IČO)
                        </div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          Zaškrtnite, ak chcete faktúru na spoločnosť.
                        </div>
                      </div>
                    </label>

                    {form.isCompany && (
                      <div className="mt-5 space-y-4 border-t border-white/10 pt-5">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Názov spoločnosti *</Label>
                          <Input
                            id="companyName"
                            required={form.isCompany}
                            autoComplete="organization"
                            value={form.companyName}
                            onChange={(e) => update("companyName", e.target.value)}
                          />
                          <FieldError msg={errors.companyName} />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="companyAddress">
                            Sídlo spoločnosti{" "}
                            <span className="text-xs font-normal text-muted-foreground">
                              (nepovinné — ak iné než vyššie)
                            </span>
                          </Label>
                          <Input
                            id="companyAddress"
                            value={form.companyAddress}
                            onChange={(e) => update("companyAddress", e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="ico">IČO *</Label>
                            <Input
                              id="ico"
                              required={form.isCompany}
                              inputMode="numeric"
                              placeholder="12345678"
                              value={form.ico}
                              onChange={(e) => update("ico", e.target.value)}
                            />
                            <FieldError msg={errors.ico} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dic">DIČ *</Label>
                            <Input
                              id="dic"
                              required={form.isCompany}
                              inputMode="numeric"
                              placeholder="2120000000"
                              value={form.dic}
                              onChange={(e) => update("dic", e.target.value)}
                            />
                            <FieldError msg={errors.dic} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="icDph">
                            IČ DPH{" "}
                            <span className="text-xs font-normal text-muted-foreground">
                              (nepovinné — ak ste platca DPH)
                            </span>
                          </Label>
                          <Input
                            id="icDph"
                            placeholder="SK2120000000"
                            value={form.icDph}
                            onChange={(e) => update("icDph", e.target.value)}
                          />
                          <FieldError msg={errors.icDph} />
                        </div>
                      </div>
                    )}
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 text-xs text-muted-foreground">
                    <Checkbox
                      checked={form.gdprConsent}
                      onCheckedChange={(v) => update("gdprConsent", v === true)}
                      id="gdprConsent"
                      className="mt-0.5"
                    />
                    <span>
                      Súhlasím s{" "}
                      <Link to="/obchodne-podmienky" className="underline">
                        obchodnými podmienkami
                      </Link>{" "}
                      a{" "}
                      <Link to="/gdpr" className="underline">
                        spracovaním osobných údajov
                      </Link>
                      .
                    </span>
                  </label>
                  <FieldError msg={errors.gdprConsent} />

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Späť
                    </button>
                    <button
                      type="submit"
                      className="btn-primary inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
                    >
                      Pokračovať na platbu
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && (
                <div>
                  {stripeError ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                      <div className="font-semibold">Nepodarilo sa otvoriť platbu</div>
                      <div className="mt-1 text-xs opacity-90">{stripeError}</div>
                      <button
                        onClick={() => {
                          setStripeError(null);
                          setStep(2);
                        }}
                        className="mt-3 text-xs underline"
                      >
                        Späť k fakturačným údajom
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="mb-4 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Upraviť fakturačné údaje
                      </button>
                      <div id="checkout" className="overflow-hidden rounded-xl bg-white">
                        <EmbeddedCheckoutProvider stripe={getStripe()} options={checkoutOptions}>
                          <EmbeddedCheckout />
                        </EmbeddedCheckoutProvider>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
