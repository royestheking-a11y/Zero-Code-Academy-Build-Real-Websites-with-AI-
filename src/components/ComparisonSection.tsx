import { Check, X } from "lucide-react";

const comparisons = [
  { feature: "ফ্রি ৩ বছরের n8n অ্যাক্সেস", us: true, others: false },
  { feature: "Discord কমিউনিটি (BD-তে সবচেয়ে বড়)", us: true, others: false },
  { feature: "ফ্রি AI টুলস ($500 মূল্যের)", us: true, others: false },
  { feature: "লাইভ ১:১ সাপোর্ট", us: true, others: false },
  { feature: "আনলিমিটেড প্রজেক্ট", us: true, others: true },
  { feature: "নতুন আপডেট ভিডিও", us: true, others: false },
  { feature: "কমিউনিটি রিকোয়েস্ট প্রজেক্ট", us: true, others: false },
];

export const ComparisonSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            তুলনা
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            আমরা যা দিচ্ছি <span className="gradient-text">vs অন্যরা</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            কেন আমাদের প্রোগ্রাম ইউনিক?
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-muted/50 border-b">
              <div className="p-4 font-semibold text-foreground">ফিচার</div>
              <div className="p-4 font-semibold text-center">
                <span className="gradient-text">আমরা</span>
              </div>
              <div className="p-4 font-semibold text-center text-muted-foreground">অন্যরা</div>
            </div>

            {/* Table Body */}
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 ${index !== comparisons.length - 1 ? "border-b" : ""
                  } hover:bg-muted/20 transition-colors`}
              >
                <div className="p-4 text-foreground">{item.feature}</div>
                <div className="p-4 flex justify-center">
                  {item.us ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
                      <X className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-center">
                  {item.others ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Check className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20 opacity-50">
                      <X className="w-5 h-5 text-white stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Text */}
          <p className="text-center text-muted-foreground mt-8">
            শুধু অটোমেশন শেখা নয়, <span className="text-primary font-semibold">রিয়েল-ওয়ার্ল্ড স্কিল</span> শিখুন!
          </p>
        </div>
      </div>
    </section>
  );
};
