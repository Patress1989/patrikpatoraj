import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Shield, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/gdpr")({
  head: () => ({
    meta: [
      { title: "Ochrana osobných údajov — Patrik Patoraj" },
      { name: "description", content: "Zásady ochrany osobných údajov a spracúvania v zmysle GDPR." },
      { property: "og:title", content: "Ochrana osobných údajov" },
      { property: "og:description", content: "Zásady ochrany osobných údajov v zmysle GDPR." },
    ],
  }),
  component: GdprPage,
});

function GdprPage() {
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
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold md:text-4xl">Ochrana osobných údajov</h1>
          </div>

          <div className="mt-8 space-y-6 text-muted-foreground">
            <p className="text-sm">Účinné od: 21. apríla 2026</p>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">1. Kto sme?</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Sme spoločnosť: <strong className="text-foreground">Risali s.r.o.</strong>
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                <li><strong className="text-foreground">Sídlo:</strong> Bartošová Lehôtka 172, 967 01 Bartošová Lehôtka</li>
                <li><strong className="text-foreground">IČO:</strong> 55 708 901</li>
                <li><strong className="text-foreground">DIČ:</strong> 212 206 9048</li>
                <li><strong className="text-foreground">Web:</strong> patrikpatoraj.sk</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed">
                Pri poskytovaní našich digitálnych služieb, vývoji webov a prevádzkovaní našej stránky spracúvame osobné údaje v súlade s nariadením Európskeho parlamentu a Rady (EÚ) 2016/679 (GDPR).
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">2. Aké údaje spracúvame a prečo?</h2>

              <h3 className="mt-4 text-base font-semibold text-foreground">A. Kontaktovanie cez formulár alebo sociálne siete</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Pokiaľ nás kontaktujete so záujmom o tvorbu webu, konfigurátora alebo AI riešenia, budeme pracovať s údajmi, ktoré nám poskytnete.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
                <li><strong className="text-foreground">Rozsah údajov:</strong> Meno, priezvisko, e-mail, telefónne číslo, prípadne názov firmy a text vašej správy.</li>
                <li><strong className="text-foreground">Dôvod:</strong> Príprava cenovej ponuky, konzultácia technického zadania a komunikácia o detailoch spolupráce.</li>
                <li><strong className="text-foreground">Právny základ:</strong> Plnenie zmluvy alebo vykonanie opatrení pred uzavretím zmluvy na vašu žiadosť.</li>
                <li><strong className="text-foreground">Doba spracúvania:</strong> Pokiaľ nenadviažeme spoluprácu, údaje budeme spracúvať najdlhšie 3 roky od poslednej komunikácie.</li>
              </ul>

              <h3 className="mt-4 text-base font-semibold text-foreground">B. Realizácia projektu a správa služieb</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Ak si u nás objednáte tvorbu webu alebo iný softvérový vývoj, spracúvame údaje potrebné na fakturáciu a technickú realizáciu (napr. nastavenie hostingu alebo CMS).
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
                <li><strong className="text-foreground">Dôvod:</strong> Dodanie digitálnych služieb, prístup do administratívnych rozhraní, fakturácia a plnenie zákonných povinností (účtovníctvo).</li>
                <li><strong className="text-foreground">Právny základ:</strong> Plnenie zmluvy a plnenie zákonnej povinnosti.</li>
                <li><strong className="text-foreground">Doba spracúvania:</strong> Počas doby poskytovania služby a následne 10 rokov v zmysle zákona o účtovníctve.</li>
              </ul>

              <h3 className="mt-4 text-base font-semibold text-foreground">C. Newsletter a technologické novinky (Marketing)</h3>
              <p className="mt-2 text-sm leading-relaxed">
                Pokiaľ ste naším zákazníkom, môžeme vám zasielať tipy z oblasti webového vývoja, automatizácie a AI trendov, ktoré môžu pomôcť vášmu biznisu.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
                <li><strong className="text-foreground">Právny základ:</strong> Oprávnený záujem (marketingová komunikácia so zákazníkmi).</li>
                <li><strong className="text-foreground">Doba spracúvania:</strong> 3 roky od poslednej spolupráce. Z odberu sa môžete kedykoľvek odhlásiť priamo v pätičke e-mailu.</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">3. Kto nám pomáha so spracovaním (Sprostredkovatelia)?</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Pri vývoji moderných riešení využívame overené nástroje, ktoré nám pomáhajú s infraštruktúrou, automatizáciou a bezpečnosťou:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
                <li>Supabase / PostgreSQL (databázové riešenia a ukladanie dát)</li>
                <li>Make.com (automatizácia procesov a prepojenie systémov)</li>
                <li>Stripe, Inc. (spracovanie platieb za balíky a služby)</li>
                <li>Ecomail.cz s.r.o. / Mailchimp (nástroje na e-mailovú komunikáciu)</li>
                <li>Meta Platforms, Inc. (analýza návštevnosti a reklama)</li>
                <li>Google Ireland Ltd. (Google Analytics, Google Search Console)</li>
              </ul>
              <p className="mt-3 text-sm leading-relaxed">
                Údaje spracúvame primárne v EÚ. Pri niektorých cloudových službách (Stripe, Meta) môže dochádzať k prenosu do USA, ktorý je zabezpečený v súlade s Data Privacy Framework.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">4. Súbory Cookies</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Na webe používame cookies pre jeho bleskové fungovanie a analýzu návštevnosti.
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed">
                <li><strong className="text-foreground">Nevyhnutné:</strong> Potrebné pre technický beh stránky.</li>
                <li><strong className="text-foreground">Analytické a marketingové:</strong> Pomáhajú nám merať výkon webu (spúšťame len s vaším súhlasom cez cookie lištu).</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">5. Vaše práva</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Máte právo žiadať o prístup k svojim údajom, ich opravu, vymazanie, obmedzenie spracúvania alebo prenosnosť. Taktiež môžete vzniesť námietku proti spracúvaniu na základe oprávneného záujmu.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                Ak máte otázky k tomu, ako chránime vaše súkromie, napíšte nám na: <a href="mailto:info@patrikpatoraj.sk" className="text-primary hover:underline">info@patrikpatoraj.sk</a>.
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                Ak nie ste spokojní s tým, ako údaje spracúvame, máte právo podať sťažnosť na Úrad na ochranu osobných údajov SR.
              </p>
            </section>

            <p className="text-xs italic">Tieto zásady sú účinné od 21. apríla 2026.</p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
