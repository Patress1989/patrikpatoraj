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
      <div className="pointer-events-none absolute inset-0 mesh-bg" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Lovable Expert · Voľné kapacity tento mesiac
        </div>

        <h1 className="animate-fade-up text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          Moderný responzívny web na mieru,<br className="hidden md:block" />
          ktorý mení návštevníkov na <span className="gradient-text">platiacich klientov.</span>
        </h1>

        <p className="animate-fade-up delay-100 mx-auto mt-7 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Využívam silu umelej inteligencie a platformy <span className="text-foreground font-semibold">Lovable</span> na doručenie komplexných webových riešení a startupových aplikácií v rekordnom čase.
        </p>

        <div className="animate-fade-up delay-200 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/formular" className="btn-primary group inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold">
            Chcem ukážku zdarma
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href="#balicky" className="glass inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-medium text-foreground hover:bg-white/10">
            Pozrieť Ceny WEB Balíkov
          </a>
        </div>

        <div className="animate-fade-up delay-300 mt-14 grid grid-cols-3 gap-4 border-t border-white/5 pt-8 text-center">
          <Stat value="5×" label="Rýchlejší vývoj" />
          <Stat value="100%" label="Responzívne" />
          <Stat value="24 h" label="Prvá ukážka" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-foreground md:text-3xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground md:text-sm">{label}</div>
    </div>
  );
}

/* =================== 3. PAIN POINTS =================== */
function PainPoints() {
  const pains = [
    { icon: Clock, title: "Pomalé načítanie", text: "Návštevníci odchádzajú skôr, než sa stránka stihne načítať. Strácate predaje každý deň." },
    { icon: Layout, title: "Zastaraný dizajn", text: "Web vyzerá ako z roku 2015. Klienti vás vnímajú ako neprofesionálov a idú ku konkurencii." },
    { icon: Target, title: "Nízka konverzia", text: "Návštevy sú, ale nikto nekupuje. Web nepredáva, len existuje." },
    { icon: MessageSquare, title: "Žiadna integrácia", text: "Nefunguje s vaším CRM, e-shopom ani databázou. Robíte všetko ručne." },
    { icon: Gauge, title: "Drahá údržba", text: "Každá zmena trvá týždne a stojí stovky eur. Web vás brzdí, namiesto toho aby vám pomáhal." },
  ];
  return (
    <Section eyebrow="Problém" title={<>Prečo váš súčasný web <span className="gradient-text">nepredáva?</span></>} subtitle={<>Väčšina podnikateľov má web, ktorý vyzerá pekne,<br />ale nerobí to, čo má. Tu je 5 najčastejších dôvodov.</>}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pains.map((p, i) => (
          <div key={i} className="glass group rounded-2xl p-6 transition-all hover:border-white/20">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 4. SOLUTION =================== */
function Solution() {
  return (
    <section id="riesenie" className="relative py-20 md:py-[52px]">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Zap className="h-3 w-3" /> Naše riešenie
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              <span className="gradient-text">Lovable</span> — moderný spôsob tvorby webov a aplikácií
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Lovable je platforma novej generácie, ktorá spája rýchlosť umelej inteligencie s kvalitou a flexibilitou ručného kódovania. Žiadne šablóny, žiadne kompromisy — iba čistý kód postavený na mieru vašej značke.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Plne responzívne weby a aplikácie",
                "Vlastná databáza a backend (Supabase)",
                "Integrácie s AI, platbami, emailmi",
                "Optimalizácia pre rýchlosť a SEO",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20"><Check className="h-3 w-3 text-primary" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up delay-100 relative">
            <div className="glass-strong relative rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code2, label: "React + TS" },
                  { icon: Database, label: "Supabase DB" },
                  { icon: Brain, label: "AI Gateway" },
                  { icon: Layers, label: "Edge funkcie" },
                ].map((x) => (
                  <div key={x.label} className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center">
                    <x.icon className="mx-auto h-6 w-6 text-primary" />
                    <div className="mt-2 text-xs font-medium text-foreground">{x.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-center">
                <div className="text-xs font-medium text-muted-foreground">Priemerný čas dodania</div>
                <div className="mt-1 text-3xl font-bold gradient-text">3 – 7 dní</div>
              </div>
            </div>
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================== 5. PROOF / NUMBERS =================== */
function Proof() {
  return (
    <Section eyebrow="Dôkaz" title={<>Čísla, ktoré <span className="gradient-text">hovoria za seba</span></>}>
      <div className="grid gap-5 md:grid-cols-4">
        {[
          { v: "5×", l: "Rýchlejší vývoj než klasická agentúra" },
          { v: "70 %", l: "Nižšia cena pri rovnakej kvalite" },
          { v: "< 1 s", l: "Načítanie stránky na pc, tablete aj mobile" },
          { v: "10 min.", l: "Čas, ktorý potrebujete na úpravu textu či fotky." },
        ].map((x) => (
          <div key={x.l} className="glass rounded-2xl p-6 text-center">
            <div className="text-4xl font-extrabold gradient-text md:text-5xl">{x.v}</div>
            <div className="mt-3 text-sm text-muted-foreground">{x.l}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/formular" className="btn-primary inline-flex items-center gap-2 rounded-xl px-7 py-4 text-base font-semibold">
          Chcem ukážku zdarma <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}

/* =================== 7. DESIRED OUTCOME =================== */
function DesiredOutcome() {
  return (
    <Section eyebrow="Výsledok" title={<>Predstavte si web, ktorý <span className="gradient-text">pracuje za vás</span></>}>
      <div className="grid gap-5 md:grid-cols-3">
        {[
          { icon: Rocket, title: "Automatizovaný predaj", text: "Nový klient prichádza, číta, presviedča sa a kupuje — bez vašej účasti." },
          { icon: Award, title: "Profesionálna značka", text: "Web vyzerá ako od top agentúry. Zvyšuje vašu autoritu a dôveryhodnosť na prvý pohľad." },
          { icon: Workflow, title: "Plne integrovaný systém", text: "Formuláre, platby, emaily a databáza spolupracujú ako jeden celok. Žiadne ručné prepisovanie." },
        ].map((x) => (
          <div key={x.title} className="glass rounded-2xl p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15"><x.icon className="h-6 w-6 text-primary" /></div>
            <h3 className="text-lg font-semibold">{x.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{x.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 8. CAPABILITIES =================== */
function Capabilities() {
  const items = [
    { icon: Layout, title: "Full-stack aplikácie", text: "Komplexné webové aplikácie s frontendom, backendom aj databázou." },
    { icon: Rocket, title: "SaaS riešenia", text: "Predplatné, používateľské účty, dashboardy — všetko pripravené." },
    { icon: Database, title: "Supabase databázy", text: "Bezpečné dáta, autentifikácia a real-time funkcie." },
    { icon: Sparkles, title: "Pokročilé UI/UX", text: "Moderné, prístupné a konverzne optimalizované rozhranie." },
    { icon: Workflow, title: "Automatizácia", text: "Edge funkcie, webhooky, integrácie s Stripe, Resend, OpenAI." },
    { icon: Shield, title: "Správa & údržba", text: "Mesačná podpora, aktualizácie a rýchle úpravy obsahu." },
  ];
  return (
    <Section eyebrow="Čo viem postaviť" title={<>Komplexné riešenia <span className="gradient-text">od A po Z</span></>}>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((x) => (
          <div key={x.title} className="glass rounded-2xl p-6 transition-all hover:bg-white/[0.07]">
            <x.icon className="h-7 w-7 text-primary" />
            <h3 className="mt-4 text-base font-semibold">{x.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{x.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 9. UNIQUENESS =================== */
function Uniqueness() {
  return (
    <Section eyebrow="Prečo práve ja" title={<>Maximálna efektivita vďaka <span className="gradient-text">Lovable</span></>}>
      <div className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 md:p-12 text-center">
        <Quote className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
          Bežný vývojár stavia ručne týždne. Agentúra účtuje tisíce eur a meškania.
          <br className="hidden md:block" />
          <span className="gradient-text font-semibold">Ja kombinujem AI + Lovable + 6 rokov skúseností</span> a doručujem profesionálne riešenia za zlomok ceny a času.
        </p>
      </div>
    </Section>
  );
}

/* =================== 10. MECHANISM (3 STEPS) =================== */
function Mechanism() {
  const steps = [
    { n: "01", title: "Ukážka zdarma", text: "Vyplníte formulár, do 24 h dostanete ukážku konceptu a cenovú ponuku." },
    { n: "02", title: "Vývoj", text: "Po schválení a symbolickej zálohe začnem stavať. Priebežne zdieľam pokrok." },
    { n: "03", title: "Odovzdanie", text: "Web spustím, doplatíte zvyšnú sumu, dostávate plný prístup ku kódu aj projektu." },
  ];
  return (
    <Section eyebrow="Ako to funguje" title={<>Jednoduchý <span className="gradient-text">3-krokový proces</span></>}>
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="glass relative rounded-2xl p-6">
            <div className="text-5xl font-extrabold gradient-text">{s.n}</div>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =================== 11. DIFFERENTIATION TABLE =================== */
function Differentiation() {
  const rows = [
    ["Čas vývoja", "4 – 8 týždňov", "3 – 7 dní"],
    ["Cena", "1 500 € – 5 000 €", "od 284 €"],
    ["Základné SEO", "Často doplatková služba", "Vždy v cene"],
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
      icon: Zap, name: "Štart", tag: "Pre začínajúcich",
      upfront: "35 €", final: "249 €", monthly: "29 €", delivery: "do 48 hodín",
      features: ["6-stránkový web (Hlavný + 5 podstránok)", "Plne responzívny", "Základné SEO", "Kontaktný formulár", "Hosting nastavenie"],
      highlight: false,
    },
    {
      icon: Star, name: "Biznis", tag: "Najobľúbenejšie",
      upfront: "210 €", final: "790 €", monthly: "59 €", delivery: "do 7 dní",
      features: ["Multi-page web alebo malá appka", "Databáza Supabase", "CMS pre úpravy obsahu", "Pokročilé SEO + analytika", "Integrácia emailov / platby"],
      highlight: true,
    },
    {
      icon: Crown, name: "Prémiový", tag: "Pre firmy",
      upfront: "30 – 50 %", final: "Od 1 500 €", monthly: "od 109 €", delivery: "do 30 dní",
      features: ["Full-stack aplikácia / SaaS", "Užívateľské účty + dashboard", "AI integrácia (chatbot, atď.)", "Stripe platby a predplatné", "Prioritná podpora"],
      highlight: false,
    },
  ];

  return (
    <section id="balicky" className="relative py-20 md:py-[52px]">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Ceny WEB Balíkov" title={<>Cenovo dostupné riešenia pre <span className="gradient-text">každý projekt</span></>} subtitle="Transparentné ceny. Žiadne skryté poplatky." />

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
                  <span className="text-2xl font-bold gradient-text">{(p.final === "Individuálna cena" || p.final.startsWith("Od")) ? "" : "+ "}{p.final}</span>
                  <span className="text-sm text-muted-foreground">po odovzdaní</span>
                </div>
                <div className="text-xs text-muted-foreground">voliteľne {p.monthly}/mes. správa</div>
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Clock className="h-3 w-3" /> Dodanie {p.delivery}
                </div>
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
          Bežný vývoj komplexných aplikácií <br />stojí <span className="line-through text-muted-foreground">1 500 € – 5 000 €</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Moje riešenie štartuje už na <span className="gradient-text font-bold text-xl">284 €</span>.<br />Profesionálna kvalita. Zlomok ceny. Niekoľkonásobne rýchlejšie.
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
    { name: "Martin K.", role: "Majiteľ výrobnej firmy", text: "Patrik nám vytvoril vizuálny konfigurátor z reálnych fotiek, ktorý klientom okamžite vypočíta cenu a vygeneruje PDF ponuku. Naša efektivita pri nacenovaní stúpla o 300 % – ušetrený čas, ktorý sme predtým trávili manuálnou prácou, je pre firmu kľúčový.", stars: 5 },
    { name: "Jana S.", role: "Business Development Manager", text: "Okrem moderného webu máme konečne poriadok v dopytoch vďaka vlastnému CRM systému. Automatizované e-maily klientom a jednoduchý export kontaktov nám šetria hodiny administratívy týždenne. Profesionálne riešenie, ktoré v podstate predáva za nás.", stars: 5 },
    { name: "Lucia P.", role: "Majiteľka eventovej agentúry", text: "Náš starý web bol pomalý a na mobiloch sa takmer nedal používať, kvôli čomu sme strácali dopyty. Patrik vytvoril bleskovú stránku, ktorá sa načíta pod sekundu. Odvtedy, čo je web online, vidíme, že ľudia na ňom trávia viac času a miera okamžitých odchodov (bounce rate) výrazne klesla. Moderný dizajn bol už len čerešničkou na torte.", stars: 5 },
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
  const paragraphs = [
    "Volám sa Patrik a v online svete sa pohybujem už viac ako 6 rokov. Počas pôsobenia ako externý dodávateľ pre veľkú firmu a správe webu pre rodinný biznis mojej manželky som na vlastnej koži pocítil frustráciu, ktorú zažíva väčšina podnikateľov.",
    "Vidím predražené faktúry od agentúr za jednoduché weby a chaos v desiatkach platforiem potrebných na bežné fungovanie. Keď som objavil Lovable, pravidlá hry sa zmenili. Pochopil som, že 99 % potrieb moderného webu dokážem vyriešiť za zlomok času a ceny, ktoré si pýtajú klasické agentúry.",
    "Moja efektivita nie je len teória – v priebehu jediného mesiaca som dokázal vytvoriť desiatky plne funkčných webov. Mojím cieľom je priniesť túto efektivitu aj vám.",
  ];

  return (
    <Section eyebrow="O mne" title={<>Patrik Patoraj — <span className="gradient-text">Lovable Expert</span></>}>
      <div className="glass-strong mx-auto max-w-5xl rounded-3xl p-6 md:p-12">
        <div className="grid gap-8 md:grid-cols-[260px_1fr] md:items-start md:gap-12">
          <div className="relative mx-auto aspect-square w-48 shrink-0 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/40 to-violet-500/40 shadow-lg ring-1 ring-primary/20 select-none md:w-full">
            <img
              src={patrikPhoto}
              alt="Patrik Patoraj"
              className="h-full w-full object-cover pointer-events-none select-none"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
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
    { q: "Komu patrí web po odovzdaní?", a: "100% vám. Dostávate plný prístup k celému projektu, repozitáru aj všetkým účtom (hosting, databáza). Neostávate vôbec závislý odo mňa." },
    { q: "Aké technológie používate?", a: "Frontend: React + TypeScript + Tailwind. Backend: Supabase (PostgreSQL, Auth, Edge Functions). AI: OpenAI / Lovable AI Gateway. Hosting: globálny CDN." },
    { q: "Ako rýchle sú úpravy obsahu po odovzdaní?", a: "Pri všetkých balíkoch si obsah viete meniť sami. Ak máte zakúpenú aj mesačnú správu, jednoduché zmeny aplikujem do 24 hodín. Komplexnejšie zmeny do 48 hodín." },
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
