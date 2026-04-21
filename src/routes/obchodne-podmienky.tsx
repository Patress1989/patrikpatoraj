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
            <p className="text-sm">Posledná aktualizácia: {new Date().toLocaleDateString("sk-SK")}</p>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">1. Identifikácia poskytovateľa</h2>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                <li><strong className="text-foreground">Obchodné meno:</strong> Risali s.r.o.</li>
                <li><strong className="text-foreground">Sídlo:</strong> Bartošová Lehôtka 172, 967 01 Bartošová Lehôtka</li>
                <li><strong className="text-foreground">IČO:</strong> 55 708 901</li>
                <li><strong className="text-foreground">DIČ:</strong> 212 206 9048</li>
                <li><strong className="text-foreground">Zápis:</strong> zapísaná v OR OS Banská Bystrica, oddiel Sro, vložka č. 47290/S</li>
                <li><strong className="text-foreground">E-mail:</strong> <a href="mailto:info@patrikpatoraj.sk" className="text-primary hover:underline">info@patrikpatoraj.sk</a></li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed">(ďalej len „Zhotoviteľ“)</p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">2. Predmet služieb a definícia balíkov</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Zhotoviteľ poskytuje služby v oblasti digitálneho vývoja. Rozsah služieb je definovaný podľa zvoleného balíka:
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">Základný (284 €):</strong> Zahŕňa 6-stránkový moderný web, plnú responzivitu pre mobilné zariadenia a tablety, základnú SEO optimalizáciu, kontaktný formulár a nastavenie hostingu.</li>
                <li><strong className="text-foreground">Štandardný (podľa ponuky):</strong> Zahŕňa funkcie balíka Základný plus databázové riešenie (Supabase), redakčný systém (CMS) na správu obsahu, CRM systém pre správu dopytov, pokročilé SEO a integráciu platobných brán.</li>
                <li><strong className="text-foreground">Prémiový (Individuálne):</strong> Zahŕňa komplexné softvérové riešenia, SaaS aplikácie na mieru, pokročilé AI integrácie a automatizáciu biznis procesov.</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">3. Garancia dodania „48 hodín“</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Pre balík Základný garantuje Zhotoviteľ dodanie do 48 hodín. Táto lehota začína plynúť prvým pracovným dňom nasledujúcim po:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
                <li>Pripísaní dohodnutej zálohy na účet Zhotoviteľa.</li>
                <li>Dodaní kompletných podkladov (texty, logo, obrázky, prístupy) zo strany Objednávateľa.</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed">
                Ak Objednávateľ nedodá podklady včas, garantovaná lehota sa predlžuje o čas omeškania.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">4. Platobné podmienky a ochrana Zhotoviteľa</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">Záloha:</strong> Objednávateľ sa zaväzuje uhradiť zálohu vo výške 50 % z ceny diela (ak nie je dohodnuté inak) vopred. Táto záloha slúži na rezerváciu termínu a je nevratná v prípade zrušenia objednávky zo strany Objednávateľa po začatí prác.</li>
                <li><strong className="text-foreground">Doplatok:</strong> Zvyšná časť ceny je splatná po odovzdaní diela (sprístupnení na testovacej doméne).</li>
                <li><strong className="text-foreground">Vlastníctvo:</strong> Všetky autorské práva a zdrojový kód prechádzajú na Objednávateľa až po 100 % uhradení celkovej ceny. Dovtedy je web majetkom Risali s.r.o.</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">5. Technické podmienky a zodpovednosť</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed">
                <li><strong className="text-foreground">Tretie strany:</strong> Zhotoviteľ nezodpovedá za výpadky spôsobené externými službami (hosting, registrátori domén, výpadky AI API ako OpenAI/Claude).</li>
                <li><strong className="text-foreground">Zásahy do kódu:</strong> Zhotoviteľ nezodpovedá za chyby vzniknuté neodborným zásahom Objednávateľa do zdrojového kódu po odovzdaní.</li>
                <li><strong className="text-foreground">SEO:</strong> Zhotoviteľ garantuje technické nastavenie SEO, nezodpovedá však za konkrétne umiestnenie vo výsledkoch vyhľadávania, ktoré závisí od algoritmov tretích strán (Google).</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">6. Reklamácie a servis</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Objednávateľ má právo na bezplatné odstránenie technických chýb (vád kódu), ktoré nahlási do 14 dní od odovzdania diela. Neskoršie úpravy alebo zmeny dizajnu/obsahu nad rámec balíka sú považované za servisné práce účtované samostatne.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">7. Technická požiadavka pre odovzdanie</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Pre úspešné odovzdanie hotového projektu a následnú správu webu je potrebné, aby ste si vytvorili konto v aplikácii Lovable cez tento pozývací odkaz:{" "}
                <a
                  href="https://lovable.dev/invite/SPBXBVT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  https://lovable.dev/invite/SPBXBVT
                </a>
                . Po dokončení prác Vám cez tento systém budem môcť plne odovzdať prístup k správe webu.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">8. Referencie</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Zhotoviteľ si vyhradzuje právo uviesť dielo vo svojom portfóliu a umiestniť do pätičky webu krátky odkaz „Vytvoril patrikpatoraj.sk“, pokiaľ nebolo písomne dohodnuté inak.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
