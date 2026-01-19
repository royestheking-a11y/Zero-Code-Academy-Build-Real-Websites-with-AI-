import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, CheckCircle, Shield, Clock, Users, Sparkles, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import { usePricing, useCoupons } from "@/hooks/useContent";
import { PricingPackage } from "@/types/content";

interface Enrollment {
  id: string;
  name: string;
  email: string;
  mobile: string;
  coupon: string;
  price: number;
  discount: number;
  status: string;
  enrolledAt: string;
  packageId?: string;
  accessLimit?: number;
}

export default function Enroll() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPkg, setSelectedPkg] = useState<PricingPackage | null>(null);

  const { data: packages = [] } = usePricing();
  const { data: coupons = [] } = useCoupons();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    coupon: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get package from router state or default to standard
    if (packages.length > 0) {
      const pkgId = location.state?.packageId || "standard";
      const found = packages.find(p => p.id === pkgId) || packages.find(p => p.id === 'standard') || packages[1] || packages[0];
      setSelectedPkg(found || null);
    }
  }, [location.state, packages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.mobile) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সব ফিল্ড পূরণ করুন",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const existingEnrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");
    const emailExists = existingEnrollments.some((e: Enrollment) => e.email === formData.email);

    if (emailExists) {
      toast({
        title: "ত্রুটি",
        description: "এই ইমেইল দিয়ে ইতিমধ্যে এনরোল করা হয়েছে",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    // Dynamic Price Calculation
    const basePrice = selectedPkg?.price || 999;
    let price = basePrice;
    let discount = 0;

    // Dynamic Coupon Validation
    // const coupons = contentStore.getCoupons(); // Replaced by hook
    const matchedCoupon = coupons.find(c =>
      c.code.toUpperCase() === formData.coupon.trim().toUpperCase() && c.isActive
    );

    if (matchedCoupon) {
      discount = matchedCoupon.discountAmount;
      price = Math.max(0, basePrice - discount); // Ensure price doesn't go below 0
    } else if (formData.coupon.trim()) {
      // If code was entered but invalid (optional: show toast warning? or just ignore)
      // For better UX, let's warn if code is invalid
      toast({
        title: "ইনভ্যালিড কুপন",
        description: "আপনার দেওয়া কুপন কোডটি সঠিক নয় বা মেয়াদোত্তীর্ণ",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }

    const studentData = {
      ...formData,
      price,
      originalPrice: selectedPkg?.originalPrice,
      discount,
      packageId: selectedPkg?.id,
      accessLimit: selectedPkg?.accessLimit || 999, // IMPORTANT: Save limit
      packageName: selectedPkg?.name
    };

    setIsSubmitting(false);
    navigate("/payment", { state: { studentData } });
  };

  if (!selectedPkg) return null; // Or loading spinner

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Enroll Now"
        description="Join Zero Code Academy and start your journey to becoming a professional web developer without coding."
        keywords={["Enroll Zero Code", "Web development course admission", "Buy course"]}
      />
      <Header />

      <main className="pt-28 pb-20">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left - Form */}
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  এনরোলমেন্ট - {selectedPkg.name} প্যাকেজ
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Zero Code-এ <span className="gradient-text">জয়েন করুন</span>
                </h1>
                <p className="text-muted-foreground mb-8">
                  ফর্মটি পূরণ করুন এবং আপনার AI কোডিং জার্নি শুরু করুন
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">আপনার নাম *</Label>
                    <Input
                      id="name"
                      placeholder="সম্পূর্ণ নাম লিখুন"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">ইমেইল *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">মোবাইল নম্বর *</Label>
                    <Input
                      id="mobile"
                      placeholder="01XXXXXXXXX"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coupon">কুপন কোড (ঐচ্ছিক)</Label>
                    <Input
                      id="coupon"
                      placeholder="কুপন কোড থাকলে দিন"
                      value={formData.coupon}
                      onChange={(e) => setFormData({ ...formData, coupon: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="cta"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "প্রসেসিং..." : `এনরোল করুন — ৳${selectedPkg.price}`}
                  </Button>
                </form>

                <div className="flex items-center gap-6 mt-8 pt-8 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-success" />
                    <span>সিকিউর পেমেন্ট</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>ইনস্ট্যান্ট অ্যাক্সেস</span>
                  </div>
                </div>
              </div>

              {/* Right - Benefits */}
              <div>
                <div className="bg-card border rounded-2xl p-8 sticky top-28">
                  <div className="text-center mb-8 pb-8 border-b">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium mb-4">
                      <Sparkles className="w-4 h-4" />
                      <span>বিশেষ অফার</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-2xl text-muted-foreground line-through">৳{selectedPkg.originalPrice.toLocaleString()}</span>
                      <span className="text-4xl font-bold text-primary">৳{selectedPkg.price.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">একবারই পেমেন্ট — {selectedPkg.name} অ্যাক্সেস</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-foreground mb-4">আপনি যা পাচ্ছেন:</h3>
                    {selectedPkg.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-sm">১০০% মানি ব্যাক গ্যারান্টি</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">৭ দিনের মধ্যে সম্পূর্ণ টাকা ফেরত</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
