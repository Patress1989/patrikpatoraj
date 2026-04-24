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
            <p className="text-sm">Posledná aktualizácia: 22. 4. 2026</p>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">1. Identifikácia poskytovateľa</h2>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                <li><strong className="text-foreground">Obchodné meno:</strong> Risali s.r.o.</li>
                <li><strong className="text-foreground">Sídlo:</strong> Bartošová Lehôtka 172, 967 01 Bartošová Lehôtka</li>
                <li><strong className="text-foreground">IČO:</strong> 55 708 901 | <strong className="text-foreground">DIČ:</strong> 212 206 9048</li>
                <li><strong className="text-foreground">Zápis:</strong> zapísaná v OR OS Banská Bystrica, oddiel Sro, vložka č. 47290/S</li>
                <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:info@patrikpatoraj.sk" className="text-primary hover:underline">info@patrikpatoraj.sk</a></li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed">(ďalej len „Zhotoviteľ“)</p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">2. Technologický stack</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Zhotoviteľ poskytuje služby v oblasti digitálneho vývoja s využitím platforiem <strong className="text-foreground">Lovable, GitHub a Supabase</strong>. Objednávateľ berie na vedomie, že dielo je závislé na týchto platformách tretích strán a Zhotoviteľ nezodpovedá za ich výpadky, zmeny cenníkov ani ukončenie poskytovania služieb.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">3. Povinná súčinnosť</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Pre odovzdanie webu do plného vlastníctva je Objednávateľ povinný vytvoriť si a udržiavať účty na platformách <strong className="text-foreground">GitHub</strong> (zdrojový kód) a <strong className="text-foreground">Supabase</strong> (databáza, ak je súčasťou balíka). Bez vytvorenia týchto prístupov nie je možné dielo technicky odovzdať.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                Pre vizuálnu správu a rýchle úpravy webu cez AI rozhranie odporúčame vytvoriť konto v platforme Lovable cez pozývací odkaz:{" "}
                <a
                  href="https://lovable.dev/invite/SPBXBVT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  https://lovable.dev/invite/SPBXBVT
                </a>
                .
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">4. Charakter AI kódu</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Zdrojový kód diela je generovaný za pomoci umelej inteligencie. Zhotoviteľ <strong className="text-foreground">garantuje funkčnosť diela podľa dohodnutej špecifikácie</strong>, nezodpovedá však za estetickú štruktúru zdrojového kódu.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">5. Platobné modely a vlastníctvo</h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed">
                <li>
                  <strong className="text-foreground">Predplatné (39 €/mes. + 284 € aktivácia):</strong> Web zostáva po celú dobu trvania predplatného majetkom Zhotoviteľa. Objednávateľ má právo web aktívne využívať v rozsahu služby.
                </li>
                <li>
                  <strong className="text-foreground">Jednorazová kúpa (Základný 284 €, Štandardný 984 €, Prémiový od 1 500 €):</strong> Autorské práva a kontrola nad zdrojovým kódom prechádzajú na Objednávateľa <strong className="text-foreground">až po 100 % uhradení dohodnutej ceny</strong>. Dovtedy je dielo výhradným majetkom Risali s.r.o.
                </li>
              </ol>
              <p className="mt-4 text-sm leading-relaxed">
                Zhotoviteľ nie je platiteľom DPH. Všetky ceny uvedené v cenníku alebo v individuálnej cenovej ponuke sú konečné. V prípade, ak sa Zhotoviteľ v priebehu trvania zmluvného vzťahu stane platiteľom DPH, k dohodnutej cene bude pripočítaná DPH v zákonnej výške.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">6. Odkup diela z predplatného</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Objednávateľ má právo kedykoľvek prejsť z modelu predplatného na model vlastníctva po doplatení plnej sumy zvoleného balíka (napr. <strong className="text-foreground">284 €</strong> pri Základnom balíku).
              </p>
              <p className="mt-3 text-sm leading-relaxed italic">
                Predošlé mesačné platby sa <strong className="not-italic text-foreground">nezapočítavajú</strong> do kúpnej ceny — predstavujú odplatu za poskytnutý servis, hosting a údržbu.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">7. Servis a technické úpravy</h2>
              <p className="mt-3 text-sm leading-relaxed">
                V rámci balíka <strong className="text-foreground">Web bez starostí (39 €/mes.)</strong> je zahrnutých <strong className="text-foreground">5 technických úprav mesačne</strong> (zmeny textov, fotiek, drobné úpravy sekcií). Nevyčerpané úpravy sa neprenášajú do nasledujúceho mesiaca.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                Úpravy nad rámec balíka, ako aj rozšírenia funkcionality, sú účtované podľa aktuálnej hodinovej sadzby Zhotoviteľa po vzájomnom odsúhlasení rozsahu.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">8. Garancia dodania a reklamácie</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Lehota dodania začína plynúť prvým pracovným dňom po pripísaní zálohy/aktivačného poplatku a dodaní kompletných podkladov vrátane prístupov podľa bodu 3. Objednávateľ má právo na bezplatné odstránenie technických chýb nahlásených do <strong className="text-foreground">14 dní</strong> od odovzdania diela.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">9. SEO a marketingové výsledky</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Zhotoviteľ garantuje korektné technické nastavenie SEO (meta tagy, sitemap, štruktúrovaný obsah), <strong className="text-foreground">negarantuje</strong> však konkrétne pozície vo vyhľadávačoch ani objem návštevnosti — tieto závisia od algoritmov tretích strán a trhových podmienok.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">10. Referencie</h2>
              <p className="mt-3 text-sm leading-relaxed">
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
