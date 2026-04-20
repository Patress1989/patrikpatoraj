import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ModulesSection } from "@/components/ModulesSection";
import { BonusesSection } from "@/components/BonusesSection";
import { PricingSection } from "@/components/PricingSection";

export const Route = createFileRoute("/kurz")({
  head: () => ({
    meta: [
      { title: "AI Kurz pre každého — Patrik Patoraj" },
      { name: "description", content: "Online kurz AI pre každého. Naučte sa využívať umelú inteligenciu v práci aj v bežnom živote." },
      { property: "og:title", content: "AI Kurz pre každého — Patrik Patoraj" },
      { property: "og:description", content: "Online kurz AI pre každého. Praktické cvičenia, 7 modulov, doživotný prístup." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: KurzPage,
});

function KurzPage() {
  // Reuse the original course landing layout but with site nav
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="pt-20">
        <HeroSection />
        <ModulesSection />
        <BonusesSection />
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  );
}

// Avoid unused import errors if Header isn't needed
void Header;
