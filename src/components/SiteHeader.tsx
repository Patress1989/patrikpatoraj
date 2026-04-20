import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-4">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-5 py-3">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold tracking-tight">Patrik Patoraj</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a href="#riesenie" className="text-muted-foreground transition-colors hover:text-foreground">Riešenie</a>
            <a href="#balicky" className="text-muted-foreground transition-colors hover:text-foreground">Cenové WEB Balíky</a>
            <a href="#faq" className="text-muted-foreground transition-colors hover:text-foreground">FAQ</a>
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
          <div className="glass-strong mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden">
            <a href="#riesenie" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5">Riešenie</a>
            <a href="#balicky" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5">Cenové WEB Balíky</a>
            <a href="#faq" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5">FAQ</a>
            
            <Link to="/formular" onClick={() => setOpen(false)} className="btn-primary mt-1 rounded-lg px-3 py-2 text-center text-sm font-semibold">
              Ukážka zdarma
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
