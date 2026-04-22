import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/objednavka/dakujeme")({
  head: () => ({
    meta: [
      { title: "Ďakujeme za objednávku | Patrik Patoraj" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  const { session_id } = Route.useSearch();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-4 py-20 md:py-32">
        <div className="text-center">
          <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
            <CheckCircle2 className="h-9 w-9 text-primary" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold md:text-5xl">
            Ďakujeme za <span className="gradient-text">objednávku!</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Vaša platba prebehla úspešne. Na váš e-mail sme zaslali potvrdenie a faktúru.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
            <div className="text-sm font-semibold text-foreground">Čo bude nasledovať?</div>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>1. Do 24 hodín vás kontaktujem e-mailom.</li>
              <li>2. Spolu prejdeme zadanie a vyberieme doménu.</li>
              <li>3. Spustím prvú verziu vášho webu zvyčajne do 5–7 dní.</li>
            </ol>
            {session_id && (
              <div className="mt-5 truncate text-xs text-muted-foreground">
                ID transakcie: <span className="font-mono">{session_id}</span>
              </div>
            )}
          </div>

          <Link
            to="/"
            className="btn-primary mt-10 inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold"
          >
            Späť na hlavnú stránku <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
