import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo-patrikpatoraj.webp";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/5 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-[24px]">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Patrik Patoraj logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                loading="lazy"
              />
              <div className="text-lg font-bold text-foreground">Patrik Patoraj</div>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Moderné weby a aplikácie na mieru postavené cez najmodernejšie technológie vrátane AI. Rýchlo, profesionálne a za zlomok ceny agentúry.
            </p>
            <Link
              to="/formular"
              className="btn-primary mt-6 inline-flex rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              Začať projekt
            </Link>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Kontakty</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@patrikpatoraj.sk" className="hover:text-foreground">info@patrikpatoraj.sk</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+421915070771" className="hover:text-foreground">+421 915 070 771</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Bartošová Lehôtka 172<br />967 01 Bartošová Lehôtka</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-foreground">Firma</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Risali s.r.o.</li>
              <li>IČO: 55708901</li>
              <li>DIČ: 2122069048</li>
              <li className="pt-3">
                <Link to="/gdpr" className="hover:text-foreground">Ochrana údajov</Link>
              </li>
              <li>
                <Link to="/obchodne-podmienky" className="hover:text-foreground">Obchodné podmienky</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/5 pt-6 text-center text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Risali s.r.o. — Všetky práva vyhradené.</div>
          <Link to="/pomocka" className="text-muted-foreground transition-colors hover:text-foreground">
            Pomôcka k webu
          </Link>
          <button
            type="button"
            onClick={() => window.__cookieConsentOpen?.()}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Nastavenia cookies
          </button>
        </div>
      </div>
    </footer>
  );
}
