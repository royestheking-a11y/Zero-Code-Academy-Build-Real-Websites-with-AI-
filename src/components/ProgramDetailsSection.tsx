import { 
  Zap, 
  Bot, 
  MessageCircle, 
  Database, 
  Workflow,
  Users,
  Rocket,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const learnings = [
  "৪০+ বেসিক থেকে প্রফেশনাল ওয়ার্কফ্লো ডিজাইন",
  "AI+RAG ইন্টিগ্রেশন: নিজের ডেটা দিয়ে কনভার্সেশনাল এজেন্ট তৈরি",
  "Messenger Full Bot (বাংলাদেশ মার্কেট ফোকাসড)",
  "ইনবক্স, কমেন্ট, অর্ডার একই জায়গায় অটোমেট",
  "মাল্টি-এজেন্ট স্ট্রাকচার",
  "রিয়েল-ওয়ার্ল্ড প্রজেক্ট (নিয়মিত নতুন যুক্ত হয়)"
];

const projects = [
  "Messenger F-Commerce Automation",
  "কাস্টমার সাপোর্ট বট",
  "Facebook/Instagram অটো রিপ্লাই",
  "নিজের বিজনেসে AI ইন্টিগ্রেশন",
];

export const ProgramDetailsSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            প্রোগ্রাম বিবরণ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            n8n অটোমেশন — <span className="gradient-text">ভবিষ্যতের প্রযুক্তি</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            আপনার ব্যবসা ও ক্যারিয়ারের জন্য স্মার্ট অটোমেশন
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - What is Automation */}
          <div className="space-y-8">
            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">অটোমেশন কী?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                অটোমেশন মানে হলো কাজকে সিস্টেম দিয়ে নিজে নিজে করানো। উদাহরণ: প্রতিদিন রিপোর্ট পাঠানো, মেইল পাঠানো, ডেটাবেস আপডেট করা — এগুলো মানুষ না করে সিস্টেম করলে সময় বাঁচে, ভুল কমে।
              </p>
            </div>

            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Workflow className="w-5 h-5 text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground">কেন n8n?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Zapier/Make.com closed-source এবং দামী। n8n open-source, মানে custom node, নিজের logic, এমনকি পুরো system modify করা যায়।
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Drag-and-drop + full freedom
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Self-hosted option
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  No monthly limits
                </li>
              </ul>
            </div>

            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">n8n কীভাবে কাজ করে?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                আপনি তৈরি করবেন একটি Workflow (আপনার অনুযায়ী কাজের পরিকল্পনা)। এতে থাকবে Trigger (কাজ শুরু হওয়ার শর্ত) এবং Action (যে কাজটি হবে)। একবার সেট করলে সব কাজ চলবে অটোমেটিকভাবে।
              </p>
            </div>
          </div>

          {/* Right Column - What you'll learn */}
          <div className="space-y-8">
            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-warning" />
                </div>
                <h3 className="text-xl font-bold text-foreground">এই প্রোগ্রামে যা শিখবেন</h3>
              </div>
              <ul className="space-y-3">
                {learnings.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold text-foreground">রিয়েল-ওয়ার্ল্ড প্রজেক্ট</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 rounded-lg px-3 py-2 text-sm text-foreground"
                  >
                    {project}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                ফাইনাল রেজাল্ট: নিজের AI টিম বানান যারা ২৪/৭ আপনার হয়ে কাজ করবে।
              </p>
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">
                প্রোগ্রাম শেষে সার্টিফিকেট পাবেন
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                এবং নিজেই প্রফেশনাল অটোমেশন এক্সপার্ট হিসেবে তৈরি হবেন
              </p>
              <Link to="/enroll">
                <Button variant="cta">এখনই এনরোল করুন</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
