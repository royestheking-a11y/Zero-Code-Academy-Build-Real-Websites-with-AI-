import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-bg-subtle" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

      <div className="container-custom relative z-20 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>বাংলাদেশের প্রথম AI-পাওয়ার্ড কোডিং কোর্স</span>
            <span className="hidden sm:inline"> | Zero Code Required</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            একটিও লাইন কোড না লিখেই শিখুন{" "}
            <span className="gradient-text">AI-পাওয়ার্ড কোডিং!</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Zero Code — রিয়েল প্রজেক্ট বানিয়ে শিখুন। AI টুলস ব্যবহার করে ওয়েব অ্যাপ, মোবাইল অ্যাপ, SaaS সবকিছু তৈরি করুন কোনো কোডিং ছাড়াই!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link to="/enroll">
              <Button variant="cta" size="xl" className="group">
                এনরোল করুন
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="xl" className="group">
                <Play className="w-5 h-5" />
                ডেমো দেখুন
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-3">
                {[
                  "https://api.dicebear.com/7.x/micah/svg?seed=Felix&backgroundColor=b6e3f4",
                  "https://api.dicebear.com/7.x/notionists/svg?seed=Aneka&backgroundColor=c0aede",
                  "https://api.dicebear.com/7.x/personas/svg?seed=John&backgroundColor=d1d4f9",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=ffd5dc",
                  "https://api.dicebear.com/7.x/lorelei/svg?seed=Robert&backgroundColor=ffdfbf"
                ].map((src, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                  >
                    <img src={src} alt="Student" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">৪৫০০+</p>
                <p className="text-sm text-muted-foreground">শিক্ষার্থী</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-border" />
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_2px_rgba(234,179,8,0.5)]">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <div className="text-left">
                <p className="font-bold text-foreground">৪.৯/৫</p>
                <p className="text-sm text-muted-foreground">রেটিং</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements - Hidden on smaller screens, shown on xl but positioned carefully */}
        <div className="absolute top-[10%] left-4 hidden xl:block animate-float z-0 pointer-events-none">
          <div className="bg-card/80 backdrop-blur-sm p-4 rounded-xl shadow-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">AI দিয়ে কোডিং</p>
                <p className="text-xs text-muted-foreground">No Code Required</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[15%] right-4 hidden xl:block animate-float z-0 pointer-events-none" style={{ animationDelay: "2s" }}>

          <div className="bg-card p-4 rounded-xl shadow-lg border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <span className="text-success font-bold">৳</span>
              </div>
              <div>
                <p className="font-semibold text-sm">ফ্রিল্যান্সিং রেডি</p>
                <p className="text-xs text-muted-foreground">ইনকাম শুরু করুন</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
