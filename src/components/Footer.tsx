import { Brain, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-primary" />
          <span className="font-bold">AI Kurzy pre každého</span>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
          <span className="font-medium text-foreground">Patrik Patoraj</span>
          <a href="mailto:risali@patrikpatoraj.sk" className="flex items-center gap-1.5 transition-colors hover:text-primary">
            <Mail className="h-3.5 w-3.5" />
            risali@patrikpatoraj.sk
          </a>
          <a href="tel:+421915070771" className="flex items-center gap-1.5 transition-colors hover:text-primary">
            <Phone className="h-3.5 w-3.5" />
            +421 915 070 771
          </a>
        </div>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Patrik Patoraj. Všetky práva vyhradené.
        </p>
      </div>
    </footer>
  );
}
