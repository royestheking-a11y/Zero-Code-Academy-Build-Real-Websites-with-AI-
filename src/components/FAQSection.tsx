import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "কোর্সটি কাদের জন্য?",
    answer: "এই কোর্সটি তাদের জন্য যারা কোনো কোডিং ব্যাকগ্রাউন্ড ছাড়াই ওয়েব অ্যাপ, মোবাইল অ্যাপ বা SaaS তৈরি করতে চান। স্টুডেন্ট, ফ্রিল্যান্সার, উদ্যোক্তা — সবার জন্য উপযোগী।",
  },
  {
    question: "কোর্সটি কি লাইভ নাকি রেকর্ডেড?",
    answer: "কোর্সটি প্রি-রেকর্ডেড, তাই আপনি আপনার সুবিধামতো সময়ে শিখতে পারবেন। তবে Discord গ্রুপে লাইভ সাপোর্ট পাবেন এবং প্রশ্ন করতে পারবেন।",
  },
  {
    question: "কোর্সের ভ্যালিডিটি কতদিন?",
    answer: "লাইফটাইম অ্যাক্সেস! একবার এনরোল করলে সারাজীবন কোর্স ও আপডেট পাবেন। নতুন মডিউল যুক্ত হলে সেগুলোও ফ্রি।",
  },
  {
    question: "পেমেন্ট মেথড কী কী?",
    answer: "বিকাশ, নগদ, রকেট এবং সব ধরনের মোবাইল ব্যাংকিং। ক্রেডিট/ডেবিট কার্ডও সাপোর্টেড।",
  },
  {
    question: "সাপোর্ট কীভাবে পাবো?",
    answer: "Discord কমিউনিটিতে ২৪/৭ সাপোর্ট। এছাড়া ১:১ মেন্টরশিপ সেশন বুক করতে পারবেন।",
  },
  {
    question: "রিফান্ড পলিসি কী?",
    answer: "৭ দিনের মানি ব্যাক গ্যারান্টি। কোর্স পছন্দ না হলে ৭ দিনের মধ্যে পূর্ণ রিফান্ড পাবেন।",
  },
  {
    question: "কোর্স শেষে কি সার্টিফিকেট পাবো?",
    answer: "হ্যাঁ! সব মডিউল কমপ্লিট করলে অফিসিয়াল সার্টিফিকেট পাবেন যা LinkedIn-এ অ্যাড করতে পারবেন।",
  },
  {
    question: "ফ্রিল্যান্সিং করতে পারবো?",
    answer: "অবশ্যই! কোর্সে ফ্রিল্যান্সিং গাইড আছে। অনেক শিক্ষার্থী কোর্স শেষে Fiverr/Upwork-এ কাজ পাচ্ছেন।",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            সাধারণ প্রশ্ন
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            <span className="gradient-text">জিজ্ঞাসিত প্রশ্ন</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            সচরাচর জিজ্ঞাসিত প্রশ্নাবলী
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border rounded-xl px-6 overflow-hidden"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
