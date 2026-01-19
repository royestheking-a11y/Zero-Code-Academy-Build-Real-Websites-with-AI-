import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { features } from "@/data/features";
import { ArrowLeft, ArrowRight, CheckCircle, Wrench, Check } from "lucide-react";

export default function FeatureDetail() {
  const { featureId } = useParams();
  const feature = features.find(f => f.id === featureId);

  if (!feature) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container-custom text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">ফিচার পাওয়া যায়নি</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                হোমে ফিরে যান
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = feature.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container-custom">
          {/* Back Link */}
          <Link
            to="/#features"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            সব ফিচার দেখুন
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Feature Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
                <IconComponent className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {feature.title}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {feature.fullDescription}
              </p>
            </div>

            {/* Benefits */}
            <div className="bg-card border rounded-2xl p-8 mb-8">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
                এই ফিচার থেকে আপনি যা পাবেন
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feature.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-secondary/30 p-4 rounded-lg"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-secondary/30 rounded-2xl p-8 mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Wrench className="w-6 h-6 text-primary" />
                ব্যবহৃত টুলস ও প্ল্যাটফর্ম
              </h2>
              <div className="flex flex-wrap gap-3">
                {feature.tools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-card border rounded-lg text-foreground font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                এই ফিচার এবং আরও অনেক কিছু শিখুন
              </h2>
              <p className="text-muted-foreground mb-6">
                Zero Code কোর্সে এনরোল করুন এবং সম্পূর্ণ AI কোডিং জার্নি শুরু করুন
              </p>
              <Link to="/enroll">
                <Button variant="cta" size="xl" className="group">
                  এখনই এনরোল করুন — মাত্র ৯৯৯৳
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}
