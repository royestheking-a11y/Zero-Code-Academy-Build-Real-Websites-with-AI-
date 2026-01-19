import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle, Sparkles, Clock, ArrowRight, Star, Zap, Crown, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
// import { contentStore, PricingPackage } from "@/lib/contentStore"; // Deprecated
import { usePricing, useOffer } from "@/hooks/useContent";

export const PricingSection = () => {
  const { data: packages = [] } = usePricing();
  const { data: offerData } = useOffer();
  const [timeLeft, setTimeLeft] = useState<{ hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    // Timer logic depends on offerData
    if (!offerData?.isActive || !offerData?.endTime) {
      setTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const difference = +new Date(offerData.endTime) - +new Date();
      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60))),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return null;
    };

    // Initial calc
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [offerData]); // Re-run when offerData loads


  const getIcon = (pkgId: string) => {
    if (pkgId === "basic") return Star;
    if (pkgId === "standard") return Zap;
    if (pkgId === "premium") return Crown;
    if (pkgId === "enterprise") return Crown;
    return Star;
  };

  return (
    <section id="pricing" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            বিশেষ অফার
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            আপনার জন্য <span className="gradient-text">সঠিক প্ল্যান</span> বেছে নিন
          </h2>
          <p className="text-muted-foreground text-lg">
            সীমিত সময়ের জন্য বিশেষ ছাড়!
          </p>
        </div>

        {/* Countdown Timer - Bigger & Dynamic */}
        {timeLeft && offerData?.isActive && (
          <div className="max-w-2xl mx-auto bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6 mb-12 animate-pulse-slow">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3 text-destructive">
                <Clock className="w-8 h-8" />
                <span className="text-xl md:text-2xl font-bold">অফার শেষ হচ্ছে:</span>
              </div>
              <div className="flex justify-center gap-4">
                {[
                  { value: timeLeft.hours, label: "ঘণ্টা" },
                  { value: timeLeft.minutes, label: "মিনিট" },
                  { value: timeLeft.seconds, label: "সেকেন্ড" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-background border-2 border-destructive/10 rounded-xl px-4 py-3 font-mono font-bold text-3xl md:text-5xl text-destructive shadow-sm min-w-[80px] md:min-w-[100px]">
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <span className="text-sm md:text-base font-medium text-destructive/80 mt-2 block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const Icon = getIcon(pkg.id);
            return (
              <div key={pkg.id} className="relative">
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="gradient-bg px-4 py-1.5 rounded-full text-primary-foreground text-sm font-bold flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      সবচেয়ে জনপ্রিয়
                    </div>
                  </div>
                )}

                <div className={`bg-card rounded-2xl border-2 ${pkg.popular ? "border-primary shadow-xl" : "border-border"} p-6 h-full flex flex-col ${pkg.popular ? "pt-10" : ""}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${pkg.popular ? "gradient-bg" : "bg-primary/10"}`}>
                      <Icon className={`w-5 h-5 ${pkg.popular ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg text-muted-foreground line-through">
                        ৳{pkg.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold gradient-text">{pkg.price}</span>
                      <span className="text-xl text-muted-foreground">৳</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">এককালীন পেমেন্ট</p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6 flex-1">
                    {pkg.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                        <span className="text-sm text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link to="/enroll" state={{ packageId: pkg.id }} className="block">
                    <Button
                      variant={pkg.popular ? "cta" : "outline"}
                      className="w-full group"
                    >
                      এনরোল করুন
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="mt-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg shadow-primary/5 hover:border-primary/40 transition-colors">
            <div className="bg-primary/10 p-4 rounded-full shrink-0">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">
                ৭ দিনের মানি ব্যাক গ্যারান্টি!
              </h3>
              <p className="text-muted-foreground text-sm">
                আমরা আমাদের কোর্সের কোয়ালিটি নিয়ে ১০০% আত্মবিশ্বাসী। তবুও যদি আপনি সন্তুষ্ট না হন, এনরোল করার ৭ দিনের মধ্যে সম্পূর্ণ টাকা ফেরত পাবেন। কোনো প্রশ্ন করা হবে না।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
