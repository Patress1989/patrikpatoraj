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
              <h2 className="text-lg font-semibold text-foreground">2. Predmet služieb a technologický stack</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Zhotoviteľ poskytuje služby v oblasti digitálneho vývoja s využitím moderných technológií umelej inteligencie (AI) a platforiem tretích strán (Low-code/No-code). Rozsah služieb je definovaný balíkmi:
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">Základný (284 €):</strong> 6-stránkový moderný web, responzivita, základné SEO, kontaktný formulár.</li>
                <li><strong className="text-foreground">Biznis (1000 €):</strong> Funkcie balíka Základný + viacej podstránok, napojenie z feedu dodávateľa – databáza (Supabase), redakčný systém (CMS), CRM integrácia a platobné brány.</li>
                <li><strong className="text-foreground">Prémiový (Individuálne):</strong> Komplexné SaaS aplikácie, AI integrácie a automatizácie.</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">3. Garancia dodania „48 hodín“</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Lehota začína plynúť prvým pracovným dňom nasledujúcim po:
              </p>
              <ol className="mt-3 list-inside list-decimal space-y-1.5 text-sm leading-relaxed">
                <li>Pripísaní dohodnutej zálohy na účet Zhotoviteľa.</li>
                <li>Dodaní kompletných podkladov a zabezpečení potrebnej súčinnosti (vytvorenie účtov podľa bodu 7).</li>
              </ol>
              <p className="mt-3 text-sm leading-relaxed italic">
                Ak Objednávateľ nedodá podklady alebo prístupy včas, lehota sa predlžuje o čas omeškania.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">4. Platobné podmienky a prevod vlastníctva</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">Záloha:</strong> 50 % z ceny diela vopred (nevratná po začatí prác).</li>
                <li><strong className="text-foreground">Doplatok:</strong> Splatný po sprístupnení diela na testovacej doméne.</li>
                <li><strong className="text-foreground">Vlastníctvo:</strong> Autorské práva a kontrola nad zdrojovým kódom v GitHub repozitári prechádzajú na Objednávateľa až po 100 % uhradení ceny. Dovtedy je kód výhradným majetkom Risali s.r.o.</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">5. Technické špecifiká a zodpovednosť</h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">Tretie strany:</strong> Zhotoviteľ využíva platformy Lovable, GitHub a Supabase. Nezodpovedá za výpadky, zmeny cien alebo ukončenie služieb týchto tretích strán.</li>
                <li><strong className="text-foreground">Charakter AI kódu:</strong> Objednávateľ berie na vedomie, že kód je generovaný za pomoci AI. Zhotoviteľ nezodpovedá za estetickú štruktúru kódu, ale za jeho funkčnosť podľa zadania.</li>
                <li><strong className="text-foreground">Zásahy do kódu:</strong> Zhotoviteľ nezodpovedá za chyby vzniknuté zásahom Objednávateľa do GitHub repozitára alebo prostredia Lovable po odovzdaní.</li>
                <li><strong className="text-foreground">SEO:</strong> Zhotoviteľ garantuje technické nastavenie, nie pozície vo vyhľadávačoch.</li>
              </ol>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">6. Reklamácie a servis</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Objednávateľ má právo na bezplatné odstránenie technických chýb nahlásených do 14 dní od odovzdania. Neskoršie zmeny sú účtované podľa aktuálnej hodinovej sadzby Zhotoviteľa.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">7. Technická súčinnosť a odovzdanie (Povinné)</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Pre úspešné fungovanie a odovzdanie webu je Objednávateľ povinný si vytvoriť a udržiavať nasledujúce účty (v bezplatných alebo platených verziách podľa potrieb projektu):
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">GitHub:</strong> Pre uloženie a vlastníctvo zdrojového kódu.</li>
                <li>
                  <strong className="text-foreground">Lovable:</strong> Pre vizuálnu správu a rýchle úpravy webu cez AI rozhranie. Konto si vytvorte cez pozývací odkaz:{" "}
                  <a
                    href="https://lovable.dev/invite/SPBXBVT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    https://lovable.dev/invite/SPBXBVT
                  </a>
                  .
                </li>
                <li><strong className="text-foreground">Supabase:</strong> Pre správu databáz a používateľov (ak je súčasťou balíka).</li>
                <li><strong className="text-foreground">Hosting (Netlify/Vercel):</strong> Pre samotný beh webovej stránky.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed italic">
                Bez vytvorenia týchto prístupov nie je možné dielo technicky odovzdať do vlastníctva Objednávateľa.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">8. Mesačná správa a „Exit stratégia“</h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">Servisný poplatok:</strong> Ak si Objednávateľ dohodne mesačnú správu, tá zahŕňa licenciu nástrojov (v rámci konta Zhotoviteľa), hostingovú réžiu a drobné úpravy.</li>
                <li><strong className="text-foreground">Ukončenie spolupráce:</strong> Pri ukončení mesačnej správy zostáva funkčný zdrojový kód Objednávateľovi v jeho GitHub repozitári. Projekt v nástroji Lovable bude archivovaný alebo odstránený, ak sa zmluvné strany nedohodnú na jeho prevode na platený účet Objednávateľa.</li>
              </ol>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">9. Referencie</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Zhotoviteľ si vyhradzuje právo uviesť dielo v portfóliu a umiestniť do pätičky odkaz „Vytvoril patrikpatoraj.sk“, pokiaľ nie je písomne dohodnuté inak.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
