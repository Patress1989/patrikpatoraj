import { FileText, Clock, Smartphone } from "lucide-react";

const bonuses = [
  {
    icon: FileText,
    title: "100 príkazov pre ChatGPT",
    description: "PDF s jednoduchými promptami na každý deň",
  },
  {
    icon: Clock,
    title: "25 spôsobov ako šetriť čas",
    description: "PDF s dennou rutinou optimalizovanou cez AI",
  },
  {
    icon: Smartphone,
    title: "AI vždy poruke",
    description: "Video návod — ako mať AI aj v mobile",
  },
];

export function BonusesSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Bonusy <span className="gradient-text">zadarmo</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {bonuses.map((bonus, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-surface p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-glow-orange/20 to-glow-cyan/20">
                <bonus.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{bonus.title}</h3>
              <p className="text-sm text-muted-foreground">{bonus.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
