import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/formular-vyplneny")({
  head: () => ({
    meta: [
      { title: "Ďakujem za váš dopyt — Patrik Patoraj" },
      { name: "description", content: "Vaša správa bola úspešne odoslaná. Do 24 hodín sa vám ozvem s prvými nápadmi." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Ďakujem za váš dopyt" },
      { property: "og:description", content: "Vaša správa bola úspešne odoslaná." },
    ],
  }),
  component: FormularVyplnenyPage,
});

function FormularVyplnenyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero banner */}
      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 mesh-bg opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 grid-pattern opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Patrik Patoraj
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Ďakujem za váš <span className="gradient-text">dopyt</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Vaša správa bola úspešne odoslaná.
          </p>
        </div>
      </section>

      {/* Confirmation card */}
      <main className="py-20 md:py-[22px]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" aria-hidden="true" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/40 bg-primary/10">
              <CheckCircle2 className="h-12 w-12 text-primary" strokeWidth={1.75} />
            </div>
          </div>

          <h2 className="text-3xl font-bold md:text-4xl">Všetko je v poriadku!</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground md:text-lg">
            Do 24 hodín sa vám ozvem s prvými nápadmi a návrhom riešenia.
            Teším sa na spoluprácu!
          </p>

          <div className="mt-10">
            <Link
              to="/"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              Späť na hlavnú stránku
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
