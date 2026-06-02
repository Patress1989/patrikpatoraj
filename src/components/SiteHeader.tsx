import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-patrikpatoraj.webp";

const navItems = [
  { hash: "riesenie", label: "Riešenie" },
  { hash: "ako-to-funguje", label: "Ako to funguje" },
  { hash: "balicky", label: "Ceny WEB Balíkov" },
  { hash: "faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  // On home: use plain hash anchors (smooth in-page scroll).
  // On other routes: link to "/#hash" so the browser navigates home and scrolls.
  const hrefFor = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div className="flex items-center justify-between rounded-2xl px-5 py-3 border border-white/10 backdrop-blur-2xl backdrop-saturate-150" style={{ background: "oklch(0.18 0.03 255 / 0.85)" }}>
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <img
              src={logo}
              alt="Patrik Patoraj logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold tracking-tight">Patrik Patoraj</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            {navItems.map((item) => (
              <a
                key={item.hash}
                href={hrefFor(item.hash)}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/formular"
              className="btn-primary hidden rounded-xl px-4 py-2 text-sm font-semibold md:inline-flex"
            >
              Ukážka zdarma
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground md:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden border border-white/10 backdrop-blur-2xl" style={{ background: "oklch(0.18 0.03 255 / 0.92)" }}>
            {navItems.map((item) => (
              <a
                key={item.hash}
                href={hrefFor(item.hash)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}

            <Link
              to="/formular"
              onClick={() => setOpen(false)}
              className="btn-primary mt-1 rounded-lg px-3 py-2 text-center text-sm font-semibold"
            >
              Ukážka zdarma
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
