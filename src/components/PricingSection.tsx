import { Check, Zap } from "lucide-react";

const features = [
  "7 komplexných modulov",
  "Praktické cvičenia a úlohy",
  "PDF bonusy a video materiály",
  "Certifikát o absolvovaní",
  "Online formát — učte sa kedykoľvek",
  "Prístup k aktualizáciám kurzu",
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 md:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-glow-pink/5 blur-[120px]" />

      <div className="relative mx-auto max-w-xl px-6">
        <div className="gradient-border overflow-hidden rounded-3xl bg-surface">
          <div className="bg-gradient-to-r from-glow-orange/10 via-glow-pink/10 to-glow-cyan/10 px-8 py-6 text-center">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" />
              Kompletný kurz
            </div>
            <div className="mt-4 flex items-baseline justify-center gap-1">
              <span className="text-5xl font-extrabold text-foreground">990</span>
              <span className="text-2xl font-bold text-muted-foreground">€</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Jednorazová platba • Doživotný prístup
            </p>
          </div>

          <div className="px-8 py-8">
            <ul className="space-y-3.5">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-surface-foreground">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="mailto:info@patrikpatoraj.sk?subject=Záujem o AI kurz"
              className="mt-8 block w-full rounded-xl bg-gradient-to-r from-glow-orange to-glow-pink py-3.5 text-center text-base font-bold text-primary-foreground shadow-lg transition-all hover:shadow-glow-orange/30 hover:brightness-110"
            >
              Mám záujem o kurz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
