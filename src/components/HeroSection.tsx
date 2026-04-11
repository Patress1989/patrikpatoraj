import heroBrain from "@/assets/hero-brain.png";
import { Sparkles, Users, BookOpen } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-glow-orange/5 blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-glow-cyan/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Text */}
          <div className="text-center md:text-left">
            <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Online kurz • Lektor: Patrik Patoraj
            </div>
            <h1 className="animate-fade-up-delay-1 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              AI pre <span className="gradient-text">každého</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              Ako využiť umelú inteligenciu v bežnom živote, práci aj tvorbe — jednoducho, prakticky a bez technických znalostí.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <a
                href="#pricing"
                className="w-full rounded-xl bg-gradient-to-r from-glow-orange to-glow-pink px-8 py-3.5 text-center text-base font-bold text-primary-foreground shadow-lg transition-all hover:shadow-glow-orange/30 hover:brightness-110 sm:w-auto"
              >
                Začať za 990 €
              </a>
              <a
                href="#modules"
                className="w-full rounded-xl border border-border bg-surface px-8 py-3.5 text-center text-base font-medium text-foreground transition-all hover:bg-accent sm:w-auto"
              >
                Obsah kurzu ↓
              </a>
            </div>

            {/* Stats */}
            <div className="animate-fade-up-delay-3 mt-10 flex justify-center gap-8 md:justify-start">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-glow-cyan" />
                <span>7 modulov</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-glow-pink" />
                <span>Online formát</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="animate-float flex justify-center">
            <img
              src={heroBrain}
              alt="AI mozog — vizualizácia umelej inteligencie"
              width={1024}
              height={1024}
              className="w-full max-w-md drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
