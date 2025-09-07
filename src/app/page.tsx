import { HeroSection } from "@/components/sections/hero-section";
import { ProblemsSection } from "@/components/sections/problems-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { SecuritySection } from "@/components/sections/security-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { CtaSection } from "@/components/sections/cta-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export default function Home() {
  const { isExpanded } = useSidebar();
  
  return (
    <div 
      className={cn(
        "flex flex-col min-h-[100dvh]",
        isExpanded ? 'lg:pl-64' : 'lg:pl-20',
        'transition-[padding-left] duration-300 ease-in-out'
      )}
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
