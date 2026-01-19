import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ToolsCarousel } from "@/components/ToolsCarousel";
import { ModulesSection } from "@/components/ModulesSection";
import { TargetAudienceSection } from "@/components/TargetAudienceSection";
import { ComparisonSection } from "@/components/ComparisonSection";
import { ProgramDetailsSection } from "@/components/ProgramDetailsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { PricingSection } from "@/components/PricingSection";
import { TrustSection } from "@/components/TrustSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { EnrollmentToast } from "@/components/EnrollmentToast";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ToolsCarousel />
        <ModulesSection />
        <TargetAudienceSection />
        <ComparisonSection />
        <ProgramDetailsSection />
        <TestimonialsSection />
        <PricingSection />
        <TrustSection />
        <FAQSection />
      </main>
      <Footer />

      <EnrollmentToast />
    </div>
  );
};

export default Index;
