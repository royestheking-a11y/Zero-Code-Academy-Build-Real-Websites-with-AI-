import { 
  GraduationCap, 
  Megaphone, 
  ShoppingCart, 
  Briefcase, 
  Code, 
  Building2,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const audiences = [
  {
    icon: GraduationCap,
    title: "ফ্রেশার",
    subtitle: "নতুন স্কিল শিখে ক্যারিয়ার শুরু করুন",
    description: "আপনি যদি একেবারে নতুন হন, তাহলে AI অটোমেশন আপনার জন্য সেরা শুরুর জায়গা হতে পারে। এই স্কিল শেখার জন্য আগের কোনো অভিজ্ঞতা দরকার নেই। আপনি শিখেই লোকাল মার্কেটে ছোট বিজনেসদের জন্য অটোমেশন সেটআপ করে দিতে পারেন।",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Megaphone,
    title: "ডিজিটাল মার্কেটার",
    subtitle: "ক্লায়েন্টদের পেজ ম্যানেজমেন্ট অটোমেট করুন",
    description: "ডিজিটাল মার্কেটিং সার্ভিসে আপনার ক্লায়েন্টদের পেজ ইনবক্স, কমেন্টস ম্যানেজমেন্ট অটোমেট করে অতিরিক্ত চার্জ করতে পারেন। AI এজেন্ট দিয়ে কাস্টমার সাপোর্ট অটোমেট করে প্রিমিয়াম সার্ভিস অফার করুন।",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ShoppingCart,
    title: "ই-কমার্স ব্যবসায়ী",
    subtitle: "অর্ডার ও কাস্টমার সাপোর্ট অটোমেট করুন",
    description: "অর্ডার প্রসেসিং, ইনভেন্টরি ম্যানেজমেন্ট, এবং কাস্টমার সাপোর্ট অটোমেট করুন। AI এজেন্ট দিয়ে আপনার ই-কমার্স বিজনেস স্কেল করুন। AI চ্যাটবট দিয়ে কাস্টমার কোয়েরি হ্যান্ডেল করুন।",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Briefcase,
    title: "ফ্রিল্যান্সার",
    subtitle: "AI অটোমেশন সার্ভিস দিয়ে আয় করুন",
    description: "AI অটোমেশন একটি হাই-ডিমান্ড স্কিল যা দিয়ে আপনি বাজারে সহজেই ক্লায়েন্ট পেতে পারবেন। ফাইভার, আপওয়ার্কে AI অটোমেশন সার্ভিস দিয়ে উচ্চ মূল্যে প্রজেক্ট পেতে পারবেন।",
    color: "from-orange-500 to-amber-500"
  },
  {
    icon: Code,
    title: "ওয়েব ডেভেলপার",
    subtitle: "n8n দিয়ে ব্যাকএন্ড অটোমেশন করুন",
    description: "ওয়েব ডেভেলপাররা n8n ব্যবহার করে সহজেই ব্যাকএন্ড অটোমেশন, API ইন্টিগ্রেশন, ও ডেটা প্রসেসিং করতে পারেন। কোড ছাড়াই বিভিন্ন সার্ভিস কানেক্ট করুন।",
    color: "from-red-500 to-rose-500"
  },
  {
    icon: Building2,
    title: "এজেন্সি মালিক",
    subtitle: "ক্লায়েন্টদের জন্য অটোমেশন সলিউশন তৈরি করুন",
    description: "আপনার এজেন্সির ক্লায়েন্টদের জন্য হাই-ভ্যালু AI ও অটোমেশন সলিউশন দিতে শিখুন। চ্যাটবট, লিড জেনারেশন ফানেল, অর্ডার প্রসেসিং অটোমেট করুন।",
    color: "from-indigo-500 to-violet-500"
  },
];

export const TargetAudienceSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            কাদের জন্য
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            কাদের জন্য <span className="gradient-text">এই প্রোগ্রামটি?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            এই প্রোগ্রামটি তাদের জন্য যারা AI অটোমেশন দিয়ে নিজের বিজনেস, ক্যারিয়ার, অথবা ফ্রিল্যান্সিং করতে চান
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-card border rounded-2xl p-6 hover:border-primary transition-all hover:shadow-lg group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${audience.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <audience.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{audience.title}</h3>
              <p className="text-primary font-medium text-sm mb-3">{audience.subtitle}</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
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
