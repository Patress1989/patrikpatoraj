import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { ArrowLeft, Check, Shield, Sparkles, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { createCheckoutClientSecret, getStripe } from "@/lib/stripe";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

function ObjednavkaPage() {
  const [email, setEmail] = useState("");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    try {
      return await createCheckoutClientSecret({
        customerEmail: email || undefined,
        returnUrl: `${window.location.origin}/objednavka/dakujeme?session_id={CHECKOUT_SESSION_ID}`,
      });
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      throw e;
    }
  }, [email]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStarted(true);
  };

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

            {/* Trust */}
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

          {/* RIGHT — Checkout */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              {!started ? (
                <form onSubmit={handleStart} className="space-y-5">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                      <Zap className="h-3.5 w-3.5" />
                      Krok 1 z 2
                    </div>
                    <h2 className="mt-3 text-xl font-bold text-foreground">
                      Zadajte svoj e-mail
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Použijeme ho na zaslanie potvrdenia a faktúry.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vy@example.sk"
                      autoComplete="email"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
                  >
                    Pokračovať na platbu
                  </button>

                  <p className="text-center text-xs text-muted-foreground">
                    Pokračovaním súhlasíte s{" "}
                    <Link to="/obchodne-podmienky" className="underline">
                      obchodnými podmienkami
                    </Link>{" "}
                    a{" "}
                    <Link to="/gdpr" className="underline">
                      spracovaním osobných údajov
                    </Link>
                    .
                  </p>
                </form>
              ) : (
                <div>
                  {error ? (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                      <div className="font-semibold">Nepodarilo sa otvoriť platbu</div>
                      <div className="mt-1 text-xs opacity-90">{error}</div>
                      <button
                        onClick={() => {
                          setError(null);
                          setStarted(false);
                        }}
                        className="mt-3 text-xs underline"
                      >
                        Skúsiť znova
                      </button>
                    </div>
                  ) : (
                    <div id="checkout" className="overflow-hidden rounded-xl bg-white">
                      <EmbeddedCheckoutProvider
                        stripe={getStripe()}
                        options={{ fetchClientSecret }}
                      >
                        <EmbeddedCheckout />
                      </EmbeddedCheckoutProvider>
                    </div>
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
