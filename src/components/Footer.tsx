import { Brain } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <div className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-bold">AI Kurzy pre každého</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Patrik Patoraj. Všetky práva vyhradené.
        </p>
      </div>
    </footer>
  );
}
