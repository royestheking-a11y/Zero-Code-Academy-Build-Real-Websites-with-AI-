import { Shield, Users, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const TrustSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">বাংলাদেশের #১ AI অটোমেশন প্রোগ্রাম</span>
          </div>

          {/* Main Text */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-relaxed mb-6">
            আমরা বাংলাদেশের সবচেয়ে বিশ্বস্ত এবং সেরা এআই অটোমেশন প্রোগ্রাম! আমরা শুধু প্রোগ্রাম বিক্রি করি না, 
            <span className="gradient-text"> আমরা আপনার ক্যারিয়ার এবং সফলতার দায়িত্ব নিই।</span>
          </h2>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            <div className="bg-card border rounded-xl p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">২০০+</p>
              <p className="text-muted-foreground text-sm">গ্লোবাল ও লোকাল ক্লায়েন্ট</p>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-success" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">৪৫০০+</p>
              <p className="text-muted-foreground text-sm">সফল শিক্ষার্থী</p>
            </div>
            <div className="bg-card border rounded-xl p-6">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <p className="text-3xl font-bold text-foreground mb-1">১০০%</p>
              <p className="text-muted-foreground text-sm">সন্তুষ্টি গ্যারান্টি</p>
            </div>
          </div>

          {/* Success Story */}
          <div className="bg-card border rounded-2xl p-6 md:p-8 text-left mb-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              আমরা এ পর্যন্ত <strong className="text-foreground">২০০+ গ্লোবাল এবং লোকাল ক্লায়েন্টের</strong> জন্য কাস্টম অটোমেশন সলিউশন তৈরি করেছি। আমরা যা প্র্যাকটিক্যালি করি এবং যা স্কেলেবল, ঠিক সেই ইন্ডাস্ট্রি-গ্রেড নলেজই আমরা আপনাদের শিখিয়ে থাকি।
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-success">সফলতার গল্প:</strong> অনেকে লোকাল মার্কেটে ফ্রিল্যান্সিং করে ভালো মানের ক্লায়েন্ট হ্যান্ডেল করছে এবং নিজেদের ইনকাম নিশ্চিত করছে।
            </p>
          </div>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl font-medium text-foreground italic mb-8">
            "আপনি শুধু শিখছেন না, আপনি একজন <span className="gradient-text">প্রফেশনাল অটোমেশন এক্সপার্ট</span> হিসেবে নিজেকে তৈরি করছেন।"
          </blockquote>

          {/* CTA */}
          <Link to="/enroll">
            <Button variant="cta" size="xl" className="group">
              এখনই এনরোল করুন
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
