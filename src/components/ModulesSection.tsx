import { Brain, MessageSquare, Home, Palette, Video, Shield, Rocket } from "lucide-react";

const modules = [
  {
    icon: Brain,
    title: "Zoznámte sa s AI",
    items: [
      "Čo je AI – jednoducho, bez technických pojmov",
      "Kde sa s ňou už denne stretávate",
      "Ako vám AI môže šetriť čas a peniaze",
      "Najznámejšie nástroje (ChatGPT, Copilot, Canva AI, DALL·E, Gemini)",
    ],
  },
  {
    icon: MessageSquare,
    title: "Ako hovoriť s AI",
    items: [
      "Ako písať jednoduché príkazy (prompty)",
      "Praktické tipy: ako sa pýtať, opravovať a dopĺňať",
      "Vzorové ukážky – od receptu po text na prianie",
      "Cvičenie: nechajte AI napísať niečo za vás",
    ],
  },
  {
    icon: Home,
    title: "AI v každodennom živote",
    items: [
      "Plánovanie dovolenky, nákupov, rozpočtu",
      "Zjednodušenie e-mailov a komunikácie",
      "AI pre rodičov – nápady na hry, rozprávky",
      "AI pre prácu – prepisy, poznámky, životopis",
    ],
  },
  {
    icon: Palette,
    title: "AI pre kreativitu a vizuály",
    items: [
      "Generovanie obrázkov bez znalostí grafiky",
      "Úprava fotiek, pozadí a predmetov",
      "Tvorba pozvánok a plagátov v Canve s AI",
      "Premena vašich nápadov na vizuál",
    ],
  },
  {
    icon: Video,
    title: "AI vo videu, hudbe a zábave",
    items: [
      "Video z textu aj bez skúseností",
      "AI hlas – audiopríbeh alebo podcast",
      "Titulky, efekty, úpravy videa",
      "Využitie pre hobby a voľný čas",
    ],
  },
  {
    icon: Shield,
    title: "Bezpečnosť a limity AI",
    items: [
      "Kedy AI klame alebo si vymýšľa",
      "Ochrana dát a súkromia",
      "Etické hranice – kde AI použiť a kde nie",
      "Ako rozpoznať deepfake a falošný obsah",
    ],
  },
  {
    icon: Rocket,
    title: "Praktické úlohy a scenáre",
    items: [
      "Vytvor si vlastného AI pomocníka",
      "Generuj nápady na darčeky a príspevky",
      "Uprav fotku, napíš text, vytvor plagát",
      'Krátke výzvy: "Sprav to s AI"',
    ],
  },
];

export function ModulesSection() {
  return (
    <section id="modules" className="relative py-20 md:py-32">
      <div className="pointer-events-none absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-glow-blue/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Čo sa <span className="gradient-text">naučíte</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            7 modulov plných praktických znalostí, cvičení a reálnych scenárov.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod, i) => (
            <div
              key={i}
              className="gradient-border group rounded-2xl bg-surface p-6 transition-all hover:-translate-y-1 hover:glow-soft"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <mod.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">
                Modul {i + 1}: {mod.title}
              </h3>
              <ul className="space-y-2">
                {mod.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
