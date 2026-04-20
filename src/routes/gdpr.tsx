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
            <p className="text-sm">Posledná aktualizácia: {new Date().toLocaleDateString("sk-SK")}</p>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">1. Prevádzkovateľ</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Prevádzkovateľom osobných údajov je <strong className="text-foreground">Risali s.r.o.</strong>, so sídlom Bartošová Lehôtka 172, 967 01 Bartošová Lehôtka, IČO: 55708901, DIČ: 2122069048. Kontakt: <a href="mailto:info@patrikpatoraj.sk" className="text-primary hover:underline">info@patrikpatoraj.sk</a>.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">2. Aké údaje spracúvame</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Spracúvame iba údaje, ktoré nám dobrovoľne poskytnete cez kontaktný formulár: meno, e-mailovú adresu, telefónne číslo, oblasť podnikania a voliteľne preferované farby a URL existujúceho webu.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">3. Účel spracúvania</h2>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm leading-relaxed">
                <li>Spracovanie vášho dopytu a vypracovanie cenovej ponuky.</li>
                <li>Komunikácia ohľadom realizácie projektu.</li>
                <li>Plnenie zmluvných a zákonných povinností.</li>
              </ul>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">4. Doba uchovávania</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Údaje uchovávame po dobu nevyhnutnú na splnenie účelu spracúvania, najdlhšie však 5 rokov od posledného kontaktu, prípadne dlhšie ak to vyžaduje zákon.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">5. Vaše práva</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Máte právo na prístup k vašim údajom, ich opravu, vymazanie, obmedzenie spracúvania, prenositeľnosť údajov, namietať spracúvanie a podať sťažnosť dozornému orgánu (Úrad na ochranu osobných údajov SR).
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">6. Príjemcovia údajov</h2>
              <p className="mt-3 text-sm leading-relaxed">
                Vaše údaje neposkytujeme tretím stranám okrem nevyhnutných sprostredkovateľov (poskytovatelia hostingu a e-mailových služieb), ktorí spĺňajú požiadavky GDPR.
              </p>
            </section>

            <section className="glass rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-foreground">7. Kontakt</h2>
              <p className="mt-3 text-sm leading-relaxed">
                S akoukoľvek otázkou ohľadom spracúvania vašich údajov sa môžete obrátiť na <a href="mailto:info@patrikpatoraj.sk" className="text-primary hover:underline">info@patrikpatoraj.sk</a>.
              </p>
            </section>

            <p className="text-xs italic">
              Tento dokument je placeholder a má informatívny charakter. Pre plnú právnu zhodnosť odporúčame konzultáciu s právnikom.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
