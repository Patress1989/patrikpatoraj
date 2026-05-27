import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FileText, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/obchodne-podmienky")({
  head: () => ({
    meta: [
      { title: "Obchodné podmienky — Patrik Patoraj" },
      { name: "description", content: "Všeobecné obchodné podmienky spoločnosti Risali s.r.o. pre poskytovanie služieb digitálneho vývoja." },
      { property: "og:title", content: "Obchodné podmienky" },
      { property: "og:description", content: "Všeobecné obchodné podmienky spoločnosti Risali s.r.o." },
    ],
  }),
  component: ObchodnePodmienkyPage,
});

function ObchodnePodmienkyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Späť na hlavnú stránku
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Všeobecné obchodné podmienky</h1>
          </div>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <p className="text-base">Posledná aktualizácia: 25. 5. 2026</p>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">1. Identifikácia poskytovateľa</h2>
              <ul className="mt-3 space-y-1.5 text-base leading-relaxed">
                <li><strong className="text-foreground">Obchodné meno:</strong> Risali s.r.o.</li>
                <li><strong className="text-foreground">Sídlo:</strong> Bartošová Lehôtka 172, 967 01 Bartošová Lehôtka</li>
                <li><strong className="text-foreground">IČO:</strong> 55 708 901 | <strong className="text-foreground">DIČ:</strong> 212 206 9048</li>
                <li><strong className="text-foreground">Zápis:</strong> zapísaná v OR OS Banská Bystrica, oddiel Sro, vložka č. 47290/S</li>
                <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:info@patrikpatoraj.sk" className="text-primary hover:underline">info@patrikpatoraj.sk</a></li>
              </ul>
              <p className="mt-3 text-base leading-relaxed">(ďalej len „Zhotoviteľ“)</p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">2. Technologický stack</h2>
              <p className="mt-3 text-base leading-relaxed">
                Zhotoviteľ poskytuje služby v oblasti digitálneho vývoja s využitím platforiem <strong className="text-foreground">Lovable, GitHub a Supabase</strong>, doplnených o vlastnú aplikáciu <strong className="text-foreground">Risali.app</strong>. Objednávateľ berie na vedomie, že dielo je závislé na platformách tretích strán a Zhotoviteľ nezodpovedá za ich výpadky, zmeny cenníkov ani ukončenie poskytovania služieb.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">3. Povinná súčinnosť</h2>
              <p className="mt-3 text-base leading-relaxed">
                Pre odovzdanie webu do plného vlastníctva je Objednávateľ povinný vytvoriť si a udržiavať účty na platformách <strong className="text-foreground">GitHub</strong> (zdrojový kód) a <strong className="text-foreground">Supabase</strong> (databáza, ak je súčasťou balíka). Bez vytvorenia týchto prístupov nie je možné dielo technicky odovzdať.
              </p>
              <p className="mt-3 text-base leading-relaxed text-white">
                Pre vizuálnu správu a rýchle úpravy webu sa využíva aplikácia Risali.app.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">4. Charakter AI kódu</h2>
              <p className="mt-3 text-base leading-relaxed">
                Zdrojový kód diela je generovaný za pomoci umelej inteligencie. Zhotoviteľ <strong className="text-foreground">garantuje funkčnosť diela podľa dohodnutej špecifikácie</strong>, nezodpovedá však za estetickú štruktúru zdrojového kódu.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">5. Webové balíky — jednorazová platba a vlastníctvo</h2>
              <p className="mt-3 text-base leading-relaxed">
                Webové balíky sú jednorazové dielo dodané do plného vlastníctva Objednávateľa po úhrade dohodnutej ceny:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-base leading-relaxed">
                <li><strong className="text-foreground">Profesionálna vizitka — 590 €:</strong> firemná prezentácia (do 6 podstránok), responzívny dizajn, základné SEO, zberný formulár, technické spustenie.</li>
                <li><strong className="text-foreground">Zarábajúci automat — 1 390 €:</strong> všetko z balíka Profesionálna vizitka + databáza kontaktov, jednoduchý systém na úpravu obsahu, napojenie na fakturáciu (SuperFaktúra/iDoklad), e-mailový marketing (Ecomail/SmartEmailing) a platobnú bránu.</li>
                <li><strong className="text-foreground">Systém na mieru — od 2 900 €:</strong> individuálny vývoj webovej aplikácie, klientske zóny, AI funkcie, automatizácie a prioritná podpora. Presná cena podľa rozsahu zadania.</li>
              </ul>
              <p className="mt-4 text-base leading-relaxed">
                Autorské práva a kontrola nad zdrojovým kódom prechádzajú na Objednávateľa <strong className="text-foreground">až po 100 % uhradení dohodnutej ceny</strong>. Dovtedy je dielo výhradným majetkom Risali s.r.o.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                <strong className="text-foreground">Platobné podmienky:</strong> Vopred sa hradí <strong className="text-foreground">30 % záloha</strong>, na základe ktorej sa začína na projekte pracovať. Záloha je <strong className="text-foreground">nevratná</strong>. O začatí prác na projekte je Objednávateľ informovaný e-mailom. Zvyšná časť <strong className="text-foreground">70 %</strong> sa hradí po odovzdaní projektu a 100 % spokojnosti Objednávateľa.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                <strong className="text-foreground">Úpravy po odovzdaní:</strong> Po odovzdaní projektu má Objednávateľ nárok na jednoduché úpravy v cene diela <strong className="text-foreground">do 14 dní</strong> od odovzdania.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                Zhotoviteľ nie je platiteľom DPH. Všetky ceny v cenníku alebo individuálnej ponuke sú konečné. Ak sa Zhotoviteľ stane platiteľom DPH, k dohodnutej cene bude pripočítaná DPH v zákonnej výške.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">6. Risali.app — mesačné predplatné</h2>
              <p className="mt-3 text-base leading-relaxed">
                Risali.app je vlastná aplikácia Zhotoviteľa na správu obsahu webu, kontaktov, objednávok a napojení. Poskytuje sa formou mesačného predplatného <strong className="text-foreground">bez viazanosti</strong>:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-2 text-base leading-relaxed">
                <li><strong className="text-foreground">Free — 0 €:</strong> základná správa obsahu, štatistiky návštevnosti, prehľad kontaktov a dopytov.</li>
                <li><strong className="text-foreground">Štandard — 19 € / mesačne:</strong> kompletný prístup do Risali.app, dashboard, napojenie na SuperFaktúru a Ecomail, konverzia obrázkov do .webp, správa SEO a GEO, aktualizácie webu v cene.</li>
                <li><strong className="text-foreground">Pro — 49 € / mesačne:</strong> všetko zo Štandardu + individuálne prispôsobenie funkcií, pokročilé automatizácie, technický dohľad a prioritná podpora.</li>
              </ul>
              <p className="mt-4 text-base leading-relaxed">
                Predplatné Risali.app je nezávislé od vlastníctva webu — Objednávateľ ho môže používať bez ohľadu na to, či vlastní zdrojový kód, alebo nie. Zrušiť predplatné je možné kedykoľvek ku koncu zúčtovacieho obdobia; už uhradené mesačné platby sa nevracajú.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">7. Doplnková služba — napojenie vlastného systému</h2>
              <p className="mt-3 text-base leading-relaxed">
                Na žiadosť Objednávateľa Zhotoviteľ zabezpečí napojenie vlastného CRM alebo iného softvéru na Risali.app. Cena tejto jednorazovej služby je <strong className="text-foreground">100 € – 300 €</strong> podľa technickej náročnosti a je odsúhlasená vopred.
              </p>
              <p className="mt-3 text-base leading-relaxed">
                Úpravy nad rámec dohodnutého rozsahu balíka alebo predplatného sa účtujú podľa aktuálnej hodinovej sadzby Zhotoviteľa po vzájomnom odsúhlasení.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">8. Garancia dodania a reklamácie</h2>
              <p className="mt-3 text-base leading-relaxed">
                Lehota dodania začína plynúť prvým pracovným dňom po pripísaní zálohy/aktivačného poplatku a dodaní kompletných podkladov vrátane prístupov podľa bodu 3. Objednávateľ má právo na bezplatné odstránenie technických chýb nahlásených do <strong className="text-foreground">14 dní</strong> od odovzdania diela.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">9. SEO a marketingové výsledky</h2>
              <p className="mt-3 text-base leading-relaxed">
                Zhotoviteľ garantuje korektné technické nastavenie SEO (meta tagy, sitemap, štruktúrovaný obsah), <strong className="text-foreground">negarantuje</strong> však konkrétne pozície vo vyhľadávačoch ani objem návštevnosti — tieto závisia od algoritmov tretích strán a trhových podmienok.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground">10. Referencie</h2>
              <p className="mt-3 text-base leading-relaxed">
                Zhotoviteľ si vyhradzuje právo uviesť dielo vo svojom portfóliu a umiestniť do pätičky webu odkaz „Vytvoril patrikpatoraj.sk“, pokiaľ nebolo písomne dohodnuté inak.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
