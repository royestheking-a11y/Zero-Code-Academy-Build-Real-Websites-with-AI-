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
import MarketplaceSection from "@/components/home/MarketplaceSection";

import { SEO } from "@/components/SEO";

const Index = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Zero Code Academy",
    "alternateName": "Vibe Code Academy",
    "url": "https://zerocodeacademy.vercel.app",
    "logo": "https://zerocodeacademy.vercel.app/og-image.png",
    "sameAs": [
      "https://facebook.com/groups/zerocodeacademy",
      "https://youtube.com/@zerocodeacademy"
    ]
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Zero Code to Vibe Code - AI Web Development",
    "description": "Learn to build professional websites in 24 hours using AI tools like Vibe Code (Lovable) without traditional coding.",
    "provider": {
      "@type": "Organization",
      "name": "Zero Code Academy",
      "sameAs": "https://zerocodeacademy.vercel.app"
    },
    "offers": {
      "@type": "Offer",
      "category": "Paid",
      "priceCurrency": "BDT",
      "price": "2500",
      "url": "https://zerocodeacademy.vercel.app/enroll"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT24H"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Home"
        description="Learn to build professional websites in 24 hours without coding using AI tools. Join Zero Code Academy today."
        keywords={["No-code web development", "AI coding course", "Lovable", "Vibe Code", "React without coding", "Bangla web dev course"]}
        structuredData={[organizationSchema, courseSchema]}
      />
      <Header />
      <main>
        <HeroSection />
        <MarketplaceSection />
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
