import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "রাহাত হাসান",
    role: "ফ্রিল্যান্সার",
    content: "Zero Code কোর্স করার পর আমি এখন Fiverr-এ Landing Page বানিয়ে মাসে ৫০,০০০+ টাকা আয় করছি। AI টুলস দিয়ে কাজ করা এত সহজ হবে কখনো ভাবিনি!",
    rating: 5,
  },
  {
    id: 2,
    name: "ফারহানা আক্তার",
    role: "স্টুডেন্ট",
    content: "কোনো কোডিং ব্যাকগ্রাউন্ড ছিল না আমার। কিন্তু এই কোর্স থেকে শিখে এখন নিজের E-commerce স্টোর চালাচ্ছি। সাপোর্ট টিম অসাধারণ!",
    rating: 5,
  },
  {
    id: 3,
    name: "সাকিব আহমেদ",
    role: "উদ্যোক্তা",
    content: "MicroSaaS মডিউল থেকে আইডিয়া নিয়ে একটা প্রজেক্ট বানিয়েছি যেটা এখন আমাকে প্যাসিভ ইনকাম দিচ্ছে। Best investment ever!",
    rating: 5,
  },
  {
    id: 4,
    name: "নাফিসা জামান",
    role: "গ্রাফিক ডিজাইনার",
    content: "ডিজাইন করতাম, এখন ডিজাইন + ডেভেলপমেন্ট দুটোই করি। ক্লায়েন্টরা আগের চেয়ে বেশি দাম দেয়। একদম worth it!",
    rating: 5,
  },
  {
    id: 5,
    name: "মেহেদী হাসান",
    role: "সফটওয়্যার ইঞ্জিনিয়ার",
    content: "আমি একজন ডেভেলপার হয়েও AI কোডিং দেখে অবাক হয়েছি। এখন কোড লেখার গতি ১০ গুণ বেড়ে গেছে!",
    rating: 5,
  },
  {
    id: 6,
    name: "তানিয়া সুলতানা",
    role: "ডিজিটাল মার্কেটার",
    content: "কোডিং জানতাম না, তাই ক্লায়েন্টদের ওয়েবসাইট সার্ভিস দিতে পারতাম না। এখন নিজেই ল্যান্ডিং পেজ বানিয়ে দিচ্ছি।",
    rating: 5,
  },
  {
    id: 7,
    name: "ইমরান খান",
    role: "ছাত্র",
    content: "পড়াশোনার পাশাপাশি কিছু করার ইচ্ছা ছিল। Zero Code কোর্সটি আমার সেই স্বপ্ন পূরণ করেছে। এখন নিজের খরচ নিজেই চালাচ্ছি।",
    rating: 5,
  },
  {
    id: 8,
    name: "সুমাইয়া রহমান",
    role: "গৃহিণী",
    content: "বাসায় বসে কাজ করার সুযোগ খুঁজছিলাম। এই কোর্সটি এত সহজে বোঝানো হয়েছে যে আমি এখন ফ্রিল্যান্সিং করতে পারছি।",
    rating: 5,
  },
  {
    id: 9,
    name: "রাফি আহমেদ",
    role: "Web Developer",
    content: "ReactJS নিয়ে সবসময় ভয় লাগত। কিন্তু ভাইয়ার বোঝানোর ক্ষমতা অসাধারণ। এখন যেকোনো প্রজেক্ট কনফিডেন্সের সাথে করি।",
    rating: 5,
  },
  {
    id: 10,
    name: "আরিফুল ইসলাম",
    role: "Business Owner",
    content: "নিজের ব্যবসার জন্য ওয়েবসাইট দরকার ছিল। ডেভেলপার হায়ার না করে নিজেই বানিয়ে ফেললাম। অনেক টাকা সাশ্রয় হয়েছে।",
    rating: 5,
  },
  {
    id: 11,
    name: "নুসরাত জাহান",
    role: "Content Creator",
    content: "আমার ব্লগের জন্য কাস্টম ফিচার দরকার ছিল। AI দিয়ে এত দ্রুত সলিউশন বের করা সম্ভব, তা এখানে না শিখলে জানতাম না।",
    rating: 5,
  },
  {
    id: 12,
    name: "জুবায়ের হোসেন",
    role: "Freelancer (Upwork)",
    content: "Upwork-এ আগে কাজ পেতে কষ্ট হতো। কিন্তু এখন আধুনিক টেক স্ট্যাক ব্যবহার করায় ক্লায়েন্টরা ইম্প্রেসড হচ্ছে।",
    rating: 5,
  },
  {
    id: 13,
    name: "সানিয়া মির্জা",
    role: "UX Designer",
    content: "UX ডিজাইনের পাশাপাশি কোডিং কিছুটা জানতাম। তবে AI দিয়ে সেটাকে নেক্সট লেভেলে নিয়ে যাওয়ার ট্রিকগুলো এই কোর্সেই পেয়েছি।",
    rating: 5,
  },
  {
    id: 14,
    name: "আব্দুল্লাহ আল মামুন",
    role: "Startup Founder",
    content: "আমাদের স্টার্টআপের MVP মাত্র ৭ দিনে দাঁড় করিয়েছি এই কোর্সের টেকনিক ব্যবহার করে। অবিশ্বাস্য হলেও সত্যি!",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            সফল শিক্ষার্থীরা
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ছাত্রদের <span className="gradient-text">অভিজ্ঞতা</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            আমাদের শিক্ষার্থীরা কী বলছেন
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="bg-card rounded-2xl border shadow-lg p-8 md:p-12 transition-all duration-500">
              <Quote className="w-12 h-12 text-primary/20 mb-6" />

              <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-8 min-h-[100px]">
                "{testimonials[currentIndex].content}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xl">
                      {testimonials[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-warning text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/30 w-2.5"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
