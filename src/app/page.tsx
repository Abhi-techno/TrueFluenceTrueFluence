"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { ProblemsSection } from "@/components/sections/problems-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { SecuritySection } from "@/components/sections/security-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CtaSection } from "@/components/sections/cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <div 
      className="flex flex-col min-h-[100dvh]"
    >
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      <FeaturesSection />
      <SecuritySection />
      <TestimonialsSection />
      <PricingSection />
      <CtaSection />
    </div>
  );
}
