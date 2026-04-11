import { Brain } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2 text-foreground">
          <Brain className="h-7 w-7 text-primary" />
          <span className="text-lg font-bold tracking-tight">AI Kurzy</span>
        </a>
        <a
          href="#pricing"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
        >
          Kúpiť kurz
        </a>
      </div>
    </header>
  );
}
