import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Sparkles, ArrowRight, Zap, Code2, Database, Layout, Workflow, Shield,
  Check, X, Star, Rocket, Crown, ChevronDown, Quote, Clock, Target, Award, Users, Gauge, Layers, Brain, MessageSquare,
  ShieldCheck, Eye, Key, Gift,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Patrik Patoraj — Moderné weby na mieru, ktoré vám prinesú klientov" },
      { name: "description", content: "Moderný a rýchly web, ktorý za vás predáva. Hotový do 7 dní, za zlomok ceny agentúry. Bez komplikácií, bez technických starostí." },
      { property: "og:title", content: "Patrik Patoraj — Moderné weby na mieru, ktoré vám prinesú klientov" },
      { property: "og:description", content: "Web, ktorý vyzerá profesionálne, načíta sa pod 1 sekundu a mení návštevníkov na platiacich klientov. Hotový za pár dní." },
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
        <Portfolio />
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
          Vďaka modernej technológii a umelej inteligencii postavím váš web či online systém v priebehu dní — nie mesiacov. Profesionálna kvalita za zlomok ceny agentúry.
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
              Moderný web, ktorý <span className="gradient-text">pracuje za vás</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Žiadne šablóny ani kompromisy. Postavím vám web na mieru — taký, ktorý vyzerá profesionálne, rýchlo sa načíta a robí presne to, čo váš biznis potrebuje. Vy sa staráte o klientov, web sa stará o zvyšok.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Dokonalé zobrazenie na mobile, tablete aj počítači",
                "Bezpečné ukladanie kontaktov a objednávok od zákazníkov",
                "Prepojenie s fakturáciou, e-mailmi či platobnou bránou",
                "Profesionálne SEO — aby vás klienti našli na Google",
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
                  { icon: Layout, label: "Krásny dizajn" },
                  { icon: Gauge, label: "Bleskové načítanie" },
                  { icon: Shield, label: "Bezpečnosť dát" },
                  { icon: Workflow, label: "Automatizácie" },
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
    { icon: Layout, title: "Moderné weby na mieru", text: "Od jednoduchej vizitky až po komplexnú online prezentáciu, ktorá vám prinesie viac dopytov." },
    { icon: Rocket, title: "Online systémy a aplikácie", text: "Klientske zóny, rezervačné systémy, vlastné CRM či nástroje šité na mieru vášmu biznisu." },
    { icon: Database, title: "Bezpečné dáta a zákazníci", text: "Vaše kontakty, objednávky a údaje uložené pod prísnym zámkom — pripravené kedykoľvek po ruke." },
    { icon: Sparkles, title: "Dizajn, ktorý predáva", text: "Prehľadný a moderný vzhľad, ktorý buduje dôveru a vedie návštevníka k objednávke." },
    { icon: Workflow, title: "Automatizácie, ktoré šetria čas", text: "Prepojenie s fakturáciou, e-mailmi a platbami — administratíva sa rieši sama." },
    { icon: Shield, title: "Správa a aktualizácie", text: "Mesačná podpora, drobné úpravy a technický dohľad. Žiadne starosti — len výsledky." },
  ];
  return (
    <Section eyebrow="Čo pre vás postavím" title={<>Komplexné riešenia <span className="gradient-text">od A po Z</span></>}>
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
    <Section eyebrow="Prečo práve ja" title={<>Profesionálny výsledok <span className="gradient-text">za zlomok ceny a času</span></>}>
      <div className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 md:p-12 text-center">
        <Quote className="mx-auto h-10 w-10 text-primary" />
        <p className="mt-6 text-lg leading-relaxed text-foreground md:text-xl">
          Bežná agentúra stavia web týždne až mesiace a účtuje tisíce eur.
          <br className="hidden md:block" />
          <span className="gradient-text font-semibold">Ja kombinujem 6 rokov skúseností s najmodernejšími nástrojmi</span> a doručím vám rovnako kvalitný web v priebehu pár dní — za zlomok ceny.
        </p>
      </div>
    </Section>
  );
}

/* =================== 10. MECHANISM (4 STEPS) =================== */
function Mechanism() {
  const steps = [
    {
      n: "01",
      icon: ShieldCheck,
      title: "Založenie vášho „digitálneho trezoru“",
      text: "Na začiatku si vytvoríte bezplatné účty na GitHub a Supabase. Slúžia ako bezpečné úložisko pre kód a dáta vášho webu. Od prvého dňa ste tak 100 % majiteľom projektu vy, nie ja.",
      highlight: false,
    },
    {
      n: "02",
      icon: Zap,
      title: "Bleskové dodanie a okamžité úpravy",
      text: "Web staviam s pomocou najmodernejších nástrojov a umelej inteligencie. To znamená, že prvú ukážku máte v rukách za pár dní a akúkoľvek zmenu v budúcnosti zapracujem takmer okamžite.",
      highlight: false,
    },
    {
      n: "03",
      icon: Eye,
      title: "Jednoduchá správa obsahu (Risali.app)",
      text: "Po spustení získate prístup do Risali.app — jednoduchého správcu obsahu, kde si v pár klikoch upravíte ceny, texty, obrázky aj veľkosť písma. Bez kódu, bez čakania na vývojára. Na zložitejšie úpravy a technický dohľad som tu ja so svojím profesionálnym zázemím.",
      highlight: true,
    },
    {
      n: "04",
      icon: Key,
      title: "Odovzdanie kľúčov a sloboda",
      text: "Po dokončení prepojím hotový web s vašou doménou. Dostávate plne funkčný web, ku ktorému máte prístup a „list vlastníctva“ len vy. Získavate moderné riešenie bez akejkoľvek závislosti na dodávateľovi.",
      highlight: false,
    },
  ];
  return (
    <section id="ako-to-funguje" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Ako to funguje
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
            4 kroky k <span className="gradient-text">nezávislosti a rýchlosti</span>
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Transparentný proces, v ktorom od prvého dňa držíte kľúče vy.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.n}
                className={
                  s.highlight
                    ? "glass-strong relative rounded-2xl p-6 border-primary/40 shadow-[0_0_40px_-10px_var(--primary)]"
                    : "glass relative rounded-2xl p-6"
                }
              >
                {s.highlight && (
                  <div className="absolute -top-3 left-6 rounded-full border border-primary/40 bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    Naša výhoda
                  </div>
                )}
                <div
                  className={
                    s.highlight
                      ? "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary shadow-[0_0_24px_-4px_var(--primary)]"
                      : "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-foreground"
                  }
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className={s.highlight ? "text-xs font-bold gradient-text" : "text-xs font-bold text-muted-foreground"}>
                  KROK {s.n}
                </div>
                <h3 className="mt-2 text-base font-semibold leading-snug">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            );
          })}
        </div>

        <div className="glass-strong mx-auto mt-10 max-w-3xl rounded-2xl p-6 text-center md:p-8">
          <Quote className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-4 text-base leading-relaxed text-foreground md:text-lg">
            „Môj cieľ je, aby ste svojmu webu rozumeli a mali nad ním kontrolu.
            Budem vaším technickým partnerom, ale <span className="gradient-text font-semibold">kľúče od celého systému budete držať vy</span>.“
          </p>
        </div>
      </div>
    </section>
  );
}

/* =================== 11. DIFFERENTIATION TABLE =================== */
function Differentiation() {
  const rows = [
    ["Čas vývoja", "4 – 8 týždňov", "3 – 7 dní"],
    ["Cena", "1 500 € - 2 000 €", "od 590 €"],
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
  const webPackages = [
    {
      icon: Layout,
      name: "Profesionálna vizitka",
      price: "590 €",
      tag: "Pre začínajúcich",
      highlight: false,
      features: [
        "Kompletná firemná prezentácia (6 podstránok)",
        "Dokonalé zobrazenie na mobiloch aj počítačoch",
        "Nastavenie pre Google, aby vás klienti ľahko našli",
        "Zberný formulár (dopyty priamo na váš e-mail)",
        "Kompletné technické spustenie bez vašich starostí",
      ],
    },
    {
      icon: Rocket,
      name: "Zarábajúci automat",
      price: "1 390 €",
      tag: "Najobľúbenejšie",
      highlight: true,
      features: [
        "Všetko z balíka Profesionálna vizitka",
        "Bezpečné ukladanie kontaktov a dát od zákazníkov",
        "Jednoduchý systém na vlastnú úpravu textov a fotiek",
        "Automatické prepojenie s vašou fakturáciou (SuperFaktúra/iDoklad)",
        "Integrácia e-mailového marketingu (Ecomail/SmartEmailing)",
        "Platobná brána pre okamžité platby kartou",
      ],
    },
    {
      icon: Crown,
      name: "Systém na mieru",
      price: "od 2 900 €",
      tag: "Pre náročných",
      highlight: false,
      features: [
        "Vývoj unikátnej webovej aplikácie podľa potrieb biznisu",
        "Uzamknuté klientske zóny a osobné profily",
        "Inteligentné AI funkcie, ktoré šetria hodiny práce",
        "Komplexné automatizácie biznis procesov",
        "Prioritná technická podpora",
      ],
    },
  ];

  const risaliPlans = [
    {
      icon: Gift,
      name: "Free",
      price: "0 €",
      period: "/ navždy",
      highlight: false,
      features: [
        "Jednoduchá správa obsahu webu",
        "Základný prehľad kontaktov a dopytov",
        "Prístup do aplikácie Risali.app bez záväzkov",
        "Ideálne na vyskúšanie systému",
      ],
    },
    {
      icon: Gauge,
      name: "Štandard",
      price: "19 €",
      period: "/ mesačne",
      highlight: false,
      features: [
        "Kompletný prístup do aplikácie Risali.app",
        "Prehľadný dashboard s kontaktmi a objednávkami",
        "Hotové napojenie na SuperFaktúru a Ecomail",
        "Bleskový web: konverzia obrázkov do .webp jedným klikom",
        "Jednoduchá správa SEO a lokálneho (GEO) cielenia",
        "Správa webu a aktualizácie v cene",
      ],
    },
    {
      icon: Sparkles,
      name: "Pro",
      price: "49 €",
      period: "/ mesačne",
      highlight: true,
      features: [
        "Všetko zo Štandard plánu",
        "Individuálne prispôsobenie funkcií pre vašu firmu",
        "Pokročilé automatizácie na pozadí",
        "Technický dohľad nad vašimi dátami a prioritná podpora",
      ],
    },
  ];

  return (
    <section id="balicky" className="relative py-20 md:py-[52px]">
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Cenník"
          title={<>Vyberte si riešenie, ktoré <span className="gradient-text">posunie váš biznis</span></>}
          subtitle="Jednorazové webové balíky do vlastníctva alebo mesačné riadiace centrum Risali.app. Transparentne, bez skrytých poplatkov."
        />

        {/* ============== A. WEBOVÉ BALÍKY (Jednorazová platba) ============== */}
        <div className="mt-12">
          <div className="mb-5 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Webové balíky do vlastníctva · Jednorazová platba</span>
            <div className="h-px w-8 bg-white/10" />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {webPackages.map((p) => (
              <div
                key={p.name}
                className={`glass relative flex flex-col rounded-3xl p-7 transition-all hover:bg-white/[0.07] ${
                  p.highlight ? "ring-2 ring-primary" : ""
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                    ⭐ Najobľúbenejšie
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.tag}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-foreground">{p.price}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">jednorazovo · plné vlastníctvo</div>
                </div>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/5 pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/formular"
                  className={`mt-7 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    p.highlight
                      ? "btn-primary text-primary-foreground"
                      : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
                  }`}
                >
                  Chcem nezáväznú ukážku zdarma
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ============== B. RISALI.APP (Mesačné predplatné) ============== */}
        <div className="mt-24">
          <div className="mb-5 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Risali.app · Mesačné predplatné</span>
            <div className="h-px w-8 bg-white/10" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-extrabold md:text-3xl">
              Riadiace centrum <span className="gradient-text">vášho biznisu</span>
            </h3>
            <p className="mt-3 text-sm text-muted-foreground md:text-base">
              Koniec chaosu v tabuľkách. Majte svoje objednávky, maily a nastavenia webu pod palcom v jednom prehľadnom systéme.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3 md:max-w-5xl md:mx-auto">
            {risaliPlans.map((p) => (
              <div
                key={p.name}
                className={`glass relative flex flex-col rounded-3xl p-7 transition-all hover:bg-white/[0.07] ${
                  p.highlight ? "ring-2 ring-primary" : ""
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                    Odporúčané
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-lg font-bold">Plán {p.name}</div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-foreground">{p.price}</span>
                  <span className="text-sm text-muted-foreground">{p.period}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">bez viazanosti</div>

                <ul className="mt-6 flex-1 space-y-2.5 border-t border-white/5 pt-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/formular"
                  className={`mt-7 block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all ${
                    p.highlight
                      ? "btn-primary text-primary-foreground"
                      : "border border-white/10 bg-white/5 text-foreground hover:bg-white/10"
                  }`}
                >
                  Chcem nezáväznú ukážku zdarma
                </Link>
              </div>
            ))}
          </div>

          {/* Doplnková služba */}
          <div className="mt-8 mx-auto md:max-w-4xl">
            <div className="glass relative overflow-hidden rounded-2xl border border-primary/20 p-5 md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">Doplnková služba</span>
                    <h4 className="text-base font-bold text-foreground md:text-lg">
                      Napojenie vášho vlastného systému
                    </h4>
                    <span className="text-sm font-semibold text-foreground">100 € – 300 € jednorazovo</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Máte už vlastné CRM alebo špecifický softvér? Bez problémov ho prepojíme s Risali.app, aby ste mali všetko na jednom mieste. Cena závisí od technickej náročnosti.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Nie som platcom DPH. Ceny sú konečné a transparentné.
        </p>
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
          Bežný vývoj jednostránkového webu <br />stojí <span className="line-through text-muted-foreground">1 500 € - 2 000 €</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Moje riešenie štartuje už na <span className="gradient-text font-bold text-xl">590 €</span>.<br />Profesionálna kvalita. Zlomok ceny. Niekoľkonásobne rýchlejšie.
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
    { name: "Pavol Knut Navrátil", role: "Tvorca digitálneho obsahu", text: "Celkom dobré, Patrik... Poviem ti, že ani ja nemám toľko zeleného (špičkové výsledky v prísnom technickom audite Google Lighthouse) na svojom webe ako máš ty. Som dávno nevidel tak precízne nastavenia. Bravo. Budem odporúčať tvoju osobu pre tých, čo potrebujú nové weby.", stars: 5 },
    { name: "Lucia P.", role: "Majiteľka eventovej agentúry", text: "Spolupráca s Patrikom bola jednoducho perfektná. Náš nový web je nielen krásny a responzívny, ale vďaka prepojeniu na Ecomail a SuperFaktúru mi ušetril asi polovicu zbytočnej administratívy. Od tvorby cenových ponúk až po faktúry – všetko je teraz oveľa jednoduchšie. Odkedy sme web spustili, výrazne sa nám zvýšil počet dopytov. Patrik komunikuje na jednotku, zmeny zapracoval neuveriteľne rýchlo a za výbornú cenu. Maximálna spokojnosť, odporúčam každému podnikateľovi!", stars: 5 },
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
import patrikPhoto from "@/assets/patrik-patoraj-photo.webp";

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
              width={384}
              height={384}
              loading="lazy"
              decoding="async"
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
import balonovysvetImg from "@/assets/projects/balonovysvet.webp";
import mammotion1Img from "@/assets/projects/mammotion1.webp";
import charismaImg from "@/assets/projects/charisma.webp";

function Portfolio() {
  const projects = [
    {
      title: "Balónový svet",
      description: "Profesionálne balónové dekorácie pre eventy po celom Slovensku. Napojenie na EcoMail a Superfakúru",
      url: "https://balonovysvet.eu",
      image: balonovysvetImg,
      tag: "Služby & Eventy",
    },
    {
      title: "Hattech – Mammotion",
      description: "Autorizovaný predajca robotických kosačiek a bazénových vysávačov Mammotion.",
      url: "https://mammotion1.sk",
      image: mammotion1Img,
      tag: "Digitálny katalóg",
    },
    {
      title: "Charisma Experience",
      description: "Predajná stránka tréningu charizmy s rezerváciou vstupeniek. Intergrovaný Stirpe, vlastné CMR a napojenie na Superfaktúru.",
      url: "https://charisma.nlp-akademia.sk",
      image: charismaImg,
      tag: "Vzdelávanie",
    },
  ];

  return (
    <Section
      eyebrow="Hotové projekty"
      title={<>Weby, ktoré som <span className="text-primary">postavil pre klientov</span></>}
      subtitle="Pozrite si reálne ukážky webov, ktoré aktuálne fungujú a prinášajú klientom výsledky."
    >
      <div className="grid gap-8 md:grid-cols-3">
        {projects.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={p.image}
                alt={`Náhľad webu ${p.title}`}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {p.tag}
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="text-base text-muted-foreground">{p.description}</p>
              <div className="mt-auto pt-2 text-sm font-medium text-primary">
                Pozrieť web →
              </div>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

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
