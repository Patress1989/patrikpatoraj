import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Sparkles, ArrowRight, Zap, Code2, Database, Layout, Workflow, Shield,
  Check, X, Star, Rocket, Crown, ChevronDown, Quote, Clock, Target, Award, Users, Gauge, Layers, Brain, MessageSquare,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patrik Patoraj — Moderné weby a aplikácie cez Lovable" },
      { name: "description", content: "Moderný responzívny web na mieru, ktorý mení návštevníkov na platiacich klientov. Full-stack aplikácie postavené cez Lovable v rekordnom čase." },
      { property: "og:title", content: "Patrik Patoraj — Moderné weby a aplikácie cez Lovable" },
      { property: "og:description", content: "Využívam silu AI a platformy Lovable na doručenie komplexných webových riešení v rekordnom čase." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <PainPoints />
        <Solution />
        <Proof />
        <DesiredOutcome />
        <Capabilities />
        <Uniqueness />
        <Mechanism />
        <Differentiation />
        <Guarantee />
        <Pricing />
        <PriceAnchor />
        <Reviews />
        <CaseStudies />
        <Bonuses />
        <Authority />
        <TargetAudience />
        <Urgency />
        <FAQ />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* =================== 1. HERO + 2. SUBHEADLINE + 6. CTA #1 =================== */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 py-[12px]">
...
    ["Základné SEO", "Často doplatková", "Vždy v cene"],
    ["Rýchlosť načítania", "Často pomalý (ťažký kód, starý hosting)", "Bleskový (optimalizovaný kód & moderná infraštruktúra)"],
    ["Úpravy obsahu", "Týždne, drahé", "Hodiny, lacné"],
    ["Návratnosť investície", "Mesiace až roky", "Týždne až mesiace"],
  ];
  return (
    <Section eyebrow="Porovnanie" title={<>Bežná agentúra <span className="text-muted-foreground">vs.</span> <span className="gradient-text">Lovable web</span></>}>
      <div className="glass-strong overflow-hidden rounded-2xl">
        <div className="grid grid-cols-3 border-b border-white/5 bg-white/5 px-4 py-4 text-sm font-semibold md:px-6">
          <div className="text-muted-foreground">Parameter</div>
          <div className="text-muted-foreground">Bežný web</div>
          <div className="text-primary">Lovable web</div>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 border-b border-white/5 px-4 py-4 text-sm last:border-b-0 md:px-6">
            <div className="font-medium text-foreground">{r[0]}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><X className="h-4 w-4 text-destructive shrink-0" />{r[1]}</div>
            <div className="flex items-center gap-2 text-foreground"><Check className="h-4 w-4 text-primary shrink-0" />{r[2]}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 12. GUARANTEE =================== */
function Guarantee() {
  return (
    <Section eyebrow="Garancia" title={<>Žiadne riziko. <span className="gradient-text">Ukážka je zdarma.</span></>}>
      <div className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 text-center md:p-12">
        <Shield className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-5 text-2xl font-bold md:text-3xl">Platíte až po schválení konceptu</h3>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Najprv vám pripravím ukážku konceptu úplne <span className="text-foreground font-semibold">zdarma</span>. Až keď ju odsúhlasíte, platíte symbolickú zálohu a začínam stavať. Doplatok až po odovzdaní.
        </p>
      </div>
    </Section>
  );
}

/* =================== 13. PRICING =================== */
function Pricing() {
  const plans = [
    {
      icon: Zap, name: "BASIC", tag: "Pre štart",
      upfront: "25 €", final: "100 €", monthly: "10 €",
      features: ["10-stránkový web", "Plne responzívny", "Základné SEO", "Kontaktný formulár", "Hosting nastavenie"],
      highlight: false,
    },
    {
      icon: Star, name: "STANDARD", tag: "Najobľúbenejšie",
      upfront: "100 €", final: "500 €", monthly: "20 €",
      features: ["Multi-page web alebo malá appka", "Databáza Supabase", "CMS pre úpravy obsahu", "Pokročilé SEO + analytika", "Integrácia emailov / platby"],
      highlight: true,
    },
    {
      icon: Crown, name: "PREMIUM", tag: "Pre firmy",
      upfront: "200 €", final: "Individuálna cena", monthly: "20 €",
      features: ["Full-stack aplikácia / SaaS", "Užívateľské účty + dashboard", "AI integrácia (chatbot, atď.)", "Stripe platby a predplatné", "Prioritná podpora"],
      highlight: false,
    },
  ];

  return (
    <section id="balicky" className="relative py-20 md:py-[52px]">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Balíčky" title={<>Cenovo dostupné riešenia pre <span className="gradient-text">každý projekt</span></>} subtitle="Transparentné ceny. Žiadne skryté poplatky." />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative rounded-3xl p-7 transition-all ${p.highlight ? "glass-strong ring-2 ring-primary scale-[1.02]" : "glass hover:bg-white/[0.07]"}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  {p.tag}
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.highlight ? "bg-primary/25" : "bg-primary/15"}`}>
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-lg font-bold">{p.name}</div>
                  {!p.highlight && <div className="text-xs text-muted-foreground">{p.tag}</div>}
                </div>
              </div>

              <div className="mt-6 space-y-1.5">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-foreground">{p.upfront}</span>
                  <span className="text-sm text-muted-foreground">vopred</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold gradient-text">{p.final === "Individuálna cena" ? "" : "+ "}{p.final}</span>
                  <span className="text-sm text-muted-foreground">po odovzdaní</span>
                </div>
                <div className="text-xs text-muted-foreground">voliteľne {p.monthly}/mes. správa</div>
              </div>

              <ul className="mt-6 space-y-2.5 border-t border-white/5 pt-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}
                  </li>
                ))}
              </ul>

              <Link to="/formular" className={`mt-7 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${p.highlight ? "btn-primary" : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10"}`}>
                Vybrať {p.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================== 14. PRICE ANCHOR + 15. CTA #2 =================== */
function PriceAnchor() {
  return (
    <Section>
      <div className="glass-strong mx-auto max-w-4xl rounded-3xl p-8 text-center md:p-12">
        <div className="text-sm font-medium uppercase tracking-wider text-primary">Cenový rozdiel</div>
        <h2 className="mt-3 text-2xl font-bold md:text-4xl">
          Bežný vývoj komplexných aplikácií <br />stojí <span className="line-through text-muted-foreground">1 500 € - 5 000 €</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Moje riešenie štartuje už na <span className="gradient-text font-bold text-xl">125 €</span>.<br />Profesionálna kvalita. Zlomok ceny. Niekoľkonásobne rýchlejšie.
        </p>
        <Link to="/formular" className="btn-primary mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold">
          Začať projekt <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* =================== 16. REVIEWS =================== */
function Reviews() {
  const reviews = [
    { name: "Martin K.", role: "Zakladateľ startupu", text: "Za 10 dní sme mali kompletnú SaaS aplikáciu vrátane platieb. Agentúra nám dávala 4 mesiace a 12 000 €.", stars: 5 },
    { name: "Eva P.", role: "Marketing manažérka", text: "Nový web nám okamžite zdvihol konverzie o 40 %. Profesionálny prístup od prvého kontaktu.", stars: 5 },
    { name: "Lucia Andrášiová", role: "balonovysvet.eu", text: "Konečne web, ktorý sa načíta okamžite a vyzerá moderne. Patrik dodal presne to, čo som potreboval.", stars: 5 },
  ];
  return (
    <Section eyebrow="Recenzie" title={<>Čo hovoria <span className="gradient-text">moji klienti</span></>} subtitle="Ukážkové referencie">
      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.name} className="glass rounded-2xl p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: r.stars }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground">"{r.text}"</p>
            <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                {r.name.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 17. CASE STUDIES =================== */
function CaseStudies() {
  const cases = [
    { title: "FitnessHub SaaS", tag: "SaaS · 14 dní", grad: "from-blue-500/30 to-cyan-500/30" },
    { title: "Realitná agentúra Pro", tag: "Web · 7 dní", grad: "from-violet-500/30 to-blue-500/30" },
    { title: "AI Recipe Generator", tag: "AI App · 10 dní", grad: "from-cyan-500/30 to-violet-500/30" },
    { title: "Booking systém kaviarne", tag: "App · 12 dní", grad: "from-blue-500/30 to-violet-500/30" },
    { title: "E-shop pre značku oblečenia", tag: "E-commerce · 14 dní", grad: "from-violet-500/30 to-cyan-500/30" },
    { title: "Portál pre konferenciu", tag: "Web · 5 dní", grad: "from-cyan-500/30 to-blue-500/30" },
  ];
  return (
    <Section eyebrow="Ukážky prác" title={<>Realizované <span className="gradient-text">projekty</span></>} subtitle="Ukážkové portfólio">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => (
          <div key={c.title} className="group glass overflow-hidden rounded-2xl">
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${c.grad}`}>
              <div className="absolute inset-0 grid-pattern opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-12 w-12 text-white/40 transition-transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs font-medium text-primary">{c.tag}</div>
              <div className="mt-1 text-base font-semibold text-foreground">{c.title}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 18. BONUSES =================== */
function Bonuses() {
  const bonuses = [
    { icon: Target, title: "Základné SEO", text: "Meta tagy, sitemap, sociálne náhľady — všetko v cene." },
    { icon: Gauge, title: "Google Analytics", text: "Nastavenie analytiky a meranie konverzií zdarma." },
    { icon: Shield, title: "SSL + bezpečnosť", text: "Šifrovanie a zabezpečené formuláre v každom balíku." },
  ];
  return (
    <Section eyebrow="Bonusy v cene" title={<>Extra hodnota, ktorú <span className="gradient-text">dostanete zdarma</span></>}>
      <div className="grid gap-5 md:grid-cols-3">
        {bonuses.map((b) => (
          <div key={b.title} className="glass rounded-2xl p-6">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <b.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-base font-semibold">{b.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 19. AUTHORITY =================== */
import patrikPhoto from "@/assets/patrik-photo.png";

function Authority() {
  const [photo, setPhoto] = useState<string | null>(() => {
    if (typeof window === "undefined") return patrikPhoto;
    return localStorage.getItem("authority-photo") || patrikPhoto;
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Fotka musí mať maximálne 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhoto(result);
      try {
        localStorage.setItem("authority-photo", result);
      } catch {
        // storage full — ignore
      }
    };
    reader.readAsDataURL(file);
  };

  const paragraphs = [
    "Volám sa Patrik a v online svete sa pohybujem už viac ako 6 rokov. Počas pôsobenia ako externý dodávateľ pre veľkú firmu a správe webu pre rodinný biznis mojej manželky som na vlastnej koži pocítil frustráciu, ktorú zažíva väčšina podnikateľov.",
    "Vidím predražené faktúry od agentúr za jednoduché weby a chaos v desiatkach platforiem potrebných na bežné fungovanie. Keď som objavil Lovable, pravidlá hry sa zmenili. Pochopil som, že 99 % potrieb moderného webu dokážem vyriešiť za zlomok času a ceny, ktoré si pýtajú klasické agentúry.",
    "Moja efektivita nie je len teória – v priebehu jediného mesiaca som dokázal vytvoriť desiatky plne funkčných webov. Mojím cieľom je priniesť túto efektivitu aj vám.",
  ];

  return (
    <Section eyebrow="O mne" title={<>Patrik Patoraj — <span className="gradient-text">Lovable Expert</span></>}>
      <div className="glass-strong mx-auto max-w-5xl rounded-3xl p-6 md:p-12">
        <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-start md:gap-12">
          <label className="group relative mx-auto block aspect-square w-48 shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-primary/40 to-violet-500/40 shadow-lg ring-1 ring-primary/20 md:w-full">
            {photo ? (
              <img src={photo} alt="Patrik Patoraj" className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-5xl font-bold text-white">PP</span>
            )}
            <span className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {photo ? "Zmeniť fotku" : "Nahrať fotku"}
            </span>
            <input type="file" accept="image/*" onChange={handleUpload} className="sr-only" />
          </label>
          <div className="space-y-4 md:space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90 md:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* =================== 20. TARGET AUDIENCE =================== */
function TargetAudience() {
  return (
    <Section eyebrow="Pre koho je to" title={<>Táto ponuka je pre <span className="gradient-text">vás, ak...</span></>}>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { icon: Rocket, title: "Startupy", text: "Potrebujete rýchlo MVP alebo SaaS aplikáciu, aby ste otestovali nápad na trhu." },
          { icon: Zap, title: "Inovátori", text: "Máte víziu a chcete ju zhmotniť do funkčného produktu bez technických prekážok." },
          { icon: Users, title: "Rastúce firmy", text: "Chcete moderný web alebo internú aplikáciu, ktorá vás posunie pred konkurenciu." },
        ].map((x) => (
          <div key={x.title} className="glass rounded-2xl p-6">
            <x.icon className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-lg font-semibold">{x.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{x.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 21. URGENCY =================== */
function Urgency() {
  return (
    <Section>
      <div className="glass-strong mx-auto max-w-3xl rounded-3xl border-primary/30 p-8 text-center md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <Clock className="h-3.5 w-3.5" /> Obmedzená kapacita
        </div>
        <h3 className="mt-5 text-2xl font-bold md:text-3xl">
          Tento mesiac mám voľné už len <span className="gradient-text">3 miesta</span>
        </h3>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Pracujem maximálne so 7 klientmi paralelne, aby som garantoval kvalitu a rýchlosť. Rezervujte si miesto skôr, než ich obsadia iní.
        </p>
        <Link to="/formular" className="btn-primary mt-7 inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold">
          Zarezervovať miesto <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* =================== FAQ =================== */
function FAQ() {
  const items = [
    { q: "Komu patrí web po odovzdaní?", a: "100 % vám. Dostávate plný prístup ku kódu, repozitáru aj všetkým účtom (hosting, databáza). Nikdy ste závislý odo mňa." },
    { q: "Aké technológie používate?", a: "Frontend: React + TypeScript + Tailwind. Backend: Supabase (PostgreSQL, Auth, Edge Functions). AI: OpenAI / Lovable AI Gateway. Hosting: globálny CDN." },
    { q: "Ako rýchle sú úpravy obsahu po odovzdaní?", a: "Pri Standard a Premium balíku máte vlastný admin panel a obsah si meníte sami. Pri Basic balíku robím úpravy ja — bežne do 24 — 48 hodín." },
    { q: "Čo ak sa mi koncept ukážky nebude páčiť?", a: "Nič neplatíte. Prvotná ukážka je úplne zdarma a bez záväzkov. Začínate platiť až po odsúhlasení konceptu." },
    { q: "Pracujete iba so slovenskými klientmi?", a: "Nie. Spolupracujem s klientmi z celej EÚ. Komunikácia v slovenčine, češtine alebo angličtine." },
    { q: "Robíte aj e-shopy?", a: "Áno — od jednoduchých produktových stránok po plné e-shopy s platbami cez Stripe a správou objednávok." },
  ];
  return (
    <section id="faq" className="relative py-20 md:py-[52px]">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader eyebrow="FAQ" title={<>Časté <span className="gradient-text">otázky</span></>} subtitle="Všetko, čo potrebujete vedieť pred začatím spolupráce." />
        <div className="mt-12 space-y-3">
          {items.map((it, i) => <FAQItem key={i} {...it} />)}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="text-base font-semibold text-foreground">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">
          {a}
        </div>
      )}
    </div>
  );
}

/* =================== 21. FINAL CTA =================== */
function FinalCTA() {
  return (
    <section className="relative py-20 md:py-[52px]">
      <div className="pointer-events-none absolute inset-0 mesh-bg" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          Pripravený mať web, ktorý <span className="gradient-text">predáva za vás?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          Začnite ukážkou zdarma. Žiadne riziko, žiadny záväzok. Iba moderný web, ktorý vám prinesie viac klientov.
        </p>
        <Link to="/formular" className="btn-primary mt-10 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold">
          Chcem ukážku zdarma <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-4 text-xs text-muted-foreground">Odpoveď do 24 hodín · Bez platby vopred</p>
      </div>
    </section>
  );
}

/* =================== Section helpers =================== */
function Section({ eyebrow, title, subtitle, children }: {
  eyebrow?: string; title?: React.ReactNode; subtitle?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="relative py-20 md:py-[52px]">
      <div className="mx-auto max-w-6xl px-6">
        {(eyebrow || title) && <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />}
        <div className={eyebrow || title ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title?: React.ReactNode; subtitle?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
          {eyebrow}
        </div>
      )}
      {title && <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>}
      {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
    </div>
  );
}
