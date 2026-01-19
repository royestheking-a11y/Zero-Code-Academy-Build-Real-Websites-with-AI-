import { Facebook, Youtube, MessageCircle, Mail, Phone, AlertTriangle, CheckCircle, Shield, Check } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Warning Notice */}
      <div className="bg-destructive/90 text-destructive-foreground py-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <AlertTriangle className="w-6 h-6" />
              <span className="font-bold text-lg">সতর্কবার্তা</span>
            </div>
            <div className="text-sm leading-relaxed">
              আমাদের ডিজাইন ও টেক্সট হুবহু কপি করে অনেকে বিভ্রান্ত করার চেষ্টা করছে।
              <strong> Zero Code-এর শুধুমাত্র এই একটি ওয়েবসাইট ও পেজ রয়েছে। কপি পেজে কিনে প্রতারিত হবেন না।</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Why Enroll Section */}
      <div className="bg-background/5 py-8 border-b border-background/10">
        <div className="container-custom">
          <h4 className="font-bold text-lg mb-6 text-center">কেন আমাদের থেকে এনরোল করবেন?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Shield, text: "ডেডিকেটেড সাপোর্ট ও মেন্টরশিপ" },
              { icon: MessageCircle, text: "অফিসিয়াল ডিসকর্ড প্রাইভেট কমিউনিটি" },
              { icon: CheckCircle, text: "লাইফটাইম প্রোগ্রাম অ্যাক্সেস ও আপডেট" },
              { icon: AlertTriangle, text: "প্রতারিত না হতে সরাসরি এখান থেকেই এনরোল করুন" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-background/5 rounded-lg p-3">
                {item.icon === CheckCircle ? (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                ) : (
                  <item.icon className="w-5 h-5 text-primary shrink-0" />
                )}
                <span className="text-sm text-background/90">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/Footer logo.png"
                  alt="Zero Code"
                  className="h-12 w-auto object-contain"
                  width="180"
                  height="48"
                  loading="lazy"
                />
              </div>
              <p className="text-background/70 leading-relaxed mb-6">
                বাংলাদেশের প্রথম AI-পাওয়ার্ড কোডিং প্লাটফর্ম। কোনো কোড না লিখেই শিখুন ওয়েব ডেভেলপমেন্ট।
              </p>
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://discord.gg/ka2EKTbR" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">দ্রুত লিংক</h4>
              <ul className="space-y-3">
                {[
                  { label: "হোম", href: "/" },
                  { label: "কোর্সসমূহ", href: "/#modules" },
                  { label: "ফিচার্স", href: "/#features" },
                  { label: "প্যাকেজ", href: "/#pricing" },
                  { label: "জিজ্ঞাসিত প্রশ্ন", href: "/#faq" },
                  { label: "ডেমো দেখুন", href: "/demo" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-background/70 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Student & Admin */}
            <div>
              <h4 className="font-bold text-lg mb-4">অ্যাকাউন্ট</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/enroll" className="text-background/70 hover:text-primary transition-colors">
                    এনরোল করুন
                  </Link>
                </li>
                <li>
                  <Link to="/student-dashboard" className="text-background/70 hover:text-primary transition-colors">
                    স্টুডেন্ট ড্যাশবোর্ড
                  </Link>
                </li>
                <li>
                  <Link to="/admin" className="text-background/70 hover:text-primary transition-colors">
                    অ্যাডমিন লগইন
                  </Link>
                </li>
              </ul>

              <h4 className="font-bold text-lg mb-4 mt-8">আইনি</h4>
              <ul className="space-y-3">
                {[
                  { label: "প্রাইভেসি পলিসি", href: "/privacy-policy" },
                  { label: "টার্মস অফ সার্ভিস", href: "/terms-of-service" },
                  { label: "রিফান্ড পলিসি", href: "/refund-policy" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="text-background/70 hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">যোগাযোগ</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-background/70">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>zeroocode.bd@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 text-background/70">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+880 1604710170</span>
                </li>
                <li className="flex items-center gap-3 text-background/70">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span>Discord কমিউনিটি</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/10 pt-8">
            <div className="text-center">
              <p className="text-background/70 text-sm flex flex-col md:block items-center gap-2">
                <span>© ২০২৫ Zero Code. সর্বস্বত্ব সংরক্ষিত।</span>
                <span className="hidden md:inline mx-2">|</span>
                <a
                  href="https://rizqaratech.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  রিজকারা টেক কর্তৃক নির্মিত
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
