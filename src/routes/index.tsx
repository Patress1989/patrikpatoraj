import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ModulesSection } from "@/components/ModulesSection";
import { BonusesSection } from "@/components/BonusesSection";
import { PricingSection } from "@/components/PricingSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Kurzy pre každého — Patrik Patoraj" },
      { name: "description", content: "Naučte sa využívať umelú inteligenciu v bežnom živote, práci aj tvorbe. Online kurz s praktickými cvičeniami." },
      { property: "og:title", content: "AI Kurzy pre každého — Patrik Patoraj" },
      { property: "og:description", content: "Naučte sa využívať umelú inteligenciu v bežnom živote, práci aj tvorbe." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroSection />
        <ModulesSection />
        <BonusesSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
