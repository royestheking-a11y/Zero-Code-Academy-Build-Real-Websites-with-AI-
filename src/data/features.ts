import { 
  Sparkles, 
  FolderKanban, 
  Briefcase, 
  Server, 
  Users, 
  ShoppingCart,
  Zap,
  Globe,
  LucideIcon
} from "lucide-react";

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  fullDescription: string;
  benefits: string[];
  tools: string[];
}

export const features: Feature[] = [
  {
    id: "ai-coding",
    icon: Sparkles,
    title: "AI দিয়ে কোডিং",
    description: "ChatGPT, Claude, Bolt, Lovable দিয়ে যেকোনো অ্যাপ তৈরি করুন",
    fullDescription: "AI টুলস ব্যবহার করে কোনো কোডিং জ্ঞান ছাড়াই প্রফেশনাল মানের ওয়েব অ্যাপ্লিকেশন তৈরি করুন। ChatGPT, Claude, Bolt.new, এবং Lovable এর মতো শক্তিশালী AI টুলস দিয়ে আপনার আইডিয়াকে বাস্তবে রূপান্তর করুন।",
    benefits: [
      "কোনো কোডিং জ্ঞান লাগবে না",
      "দ্রুত প্রোটোটাইপ তৈরি করুন",
      "প্রফেশনাল মানের কোড জেনারেট করুন",
      "রিয়েল-টাইমে AI সাপোর্ট পান"
    ],
    tools: ["ChatGPT", "Claude AI", "Bolt.new", "Lovable", "Cursor AI"]
  },
  {
    id: "real-projects",
    icon: FolderKanban,
    title: "বাস্তব প্রজেক্ট",
    description: "ToDo App, E-commerce, SaaS — রিয়েল প্রজেক্ট বানিয়ে শিখুন",
    fullDescription: "থিওরি নয়, হাতে-কলমে শেখার মাধ্যমে বাস্তব জীবনে ব্যবহারযোগ্য প্রজেক্ট তৈরি করুন। প্রতিটি মডিউলে একটি করে সম্পূর্ণ প্রজেক্ট বানাবেন যা আপনার পোর্টফোলিওতে যোগ করতে পারবেন।",
    benefits: [
      "পোর্টফোলিও রেডি প্রজেক্ট",
      "বাস্তব সমস্যা সমাধান করুন",
      "ক্লায়েন্টদের দেখানোর মতো কাজ",
      "সম্পূর্ণ প্রজেক্ট সোর্স কোড"
    ],
    tools: ["ToDo App", "Money Manager", "E-commerce Store", "Portfolio Site", "SaaS Dashboard"]
  },
  {
    id: "freelancing-guide",
    icon: Briefcase,
    title: "ফ্রিল্যান্সিং গাইড",
    description: "ক্লায়েন্ট পাওয়া থেকে ডেলিভারি পর্যন্ত সম্পূর্ণ গাইড",
    fullDescription: "ফ্রিল্যান্সিং শুরু করার A to Z গাইড। Fiverr, Upwork-এ প্রোফাইল সেটআপ থেকে শুরু করে ক্লায়েন্ট পাওয়া, প্রাইসিং, এবং সফল ডেলিভারি পর্যন্ত সবকিছু শিখুন।",
    benefits: [
      "মার্কেটপ্লেস প্রোফাইল অপটিমাইজেশন",
      "ক্লায়েন্ট কমিউনিকেশন স্কিল",
      "প্রাইসিং স্ট্র্যাটেজি",
      "রিপিট ক্লায়েন্ট পাওয়ার টিপস"
    ],
    tools: ["Fiverr", "Upwork", "LinkedIn", "Freelancer.com", "Local Clients"]
  },
  {
    id: "lifetime-hosting",
    icon: Server,
    title: "লাইফটাইম হোস্টিং",
    description: "ফ্রি ডোমেইন ও হোস্টিং সেটআপ শিখুন",
    fullDescription: "আপনার প্রজেক্ট লাইফটাইম ফ্রি হোস্টিং করুন Vercel, Netlify, এবং Railway এর মতো প্ল্যাটফর্মে। কাস্টম ডোমেইন কানেক্ট করা থেকে SSL সেটআপ পর্যন্ত সবকিছু শিখবেন।",
    benefits: [
      "লাইফটাইম ফ্রি হোস্টিং",
      "কাস্টম ডোমেইন সেটআপ",
      "SSL সার্টিফিকেট",
      "অটোমেটিক ডিপ্লয়মেন্ট"
    ],
    tools: ["Vercel", "Netlify", "Railway", "Supabase", "GitHub"]
  },
  {
    id: "mentorship",
    icon: Users,
    title: "১:১ মেন্টরশিপ",
    description: "ডেডিকেটেড সাপোর্ট ও Discord কমিউনিটি",
    fullDescription: "একা শেখা কঠিন — তাই আমরা দিচ্ছি সরাসরি মেন্টরশিপ সাপোর্ট। Discord কমিউনিটিতে ২৪/৭ সাহায্য পান, সাপ্তাহিক লাইভ Q&A সেশনে যোগ দিন।",
    benefits: [
      "সরাসরি মেন্টর সাপোর্ট",
      "Discord কমিউনিটি অ্যাক্সেস",
      "সাপ্তাহিক লাইভ Q&A",
      "কোড রিভিউ সার্ভিস"
    ],
    tools: ["Discord", "Zoom", "Screen Share", "Code Review"]
  },
  {
    id: "saas-ecommerce",
    icon: ShoppingCart,
    title: "SaaS & E-commerce",
    description: "MicroSaaS, E-commerce স্টোর তৈরি করুন",
    fullDescription: "নিজের SaaS প্রোডাক্ট বা E-commerce স্টোর তৈরি করুন এবং প্যাসিভ ইনকাম শুরু করুন। পেমেন্ট গেটওয়ে ইন্টিগ্রেশন, সাবস্ক্রিপশন সিস্টেম, এবং ইনভেন্টরি ম্যানেজমেন্ট শিখুন।",
    benefits: [
      "সম্পূর্ণ E-commerce স্টোর",
      "পেমেন্ট গেটওয়ে সেটআপ",
      "MicroSaaS আইডিয়া",
      "সাবস্ক্রিপশন সিস্টেম"
    ],
    tools: ["Stripe", "SSLCommerz", "Shopify", "WooCommerce", "Gumroad"]
  },
  {
    id: "ai-automation",
    icon: Zap,
    title: "AI অটোমেশন",
    description: "n8n, Make দিয়ে ওয়ার্কফ্লো অটোমেট করুন",
    fullDescription: "বারবার করা কাজগুলো অটোমেট করুন AI এবং অটোমেশন টুলস দিয়ে। n8n, Make (Integromat) এবং Zapier ব্যবহার করে ওয়ার্কফ্লো তৈরি করুন যা আপনার সময় বাঁচাবে।",
    benefits: [
      "টাইম-সেভিং অটোমেশন",
      "ওয়ার্কফ্লো তৈরি করুন",
      "AI এজেন্ট বানান",
      "ইমেইল/সোশ্যাল অটোমেশন"
    ],
    tools: ["n8n", "Make", "Zapier", "IFTTT", "Activepieces"]
  },
  {
    id: "global-market",
    icon: Globe,
    title: "গ্লোবাল মার্কেট",
    description: "আন্তর্জাতিক ক্লায়েন্টদের সাথে কাজ করুন",
    fullDescription: "শুধু বাংলাদেশ নয়, পুরো বিশ্বের ক্লায়েন্টদের সাথে কাজ করার সুযোগ তৈরি করুন। ইংরেজি কমিউনিকেশন, ইন্টারন্যাশনাল পেমেন্ট, এবং গ্লোবাল মার্কেটিং শিখুন।",
    benefits: [
      "ডলারে ইনকাম করুন",
      "গ্লোবাল ক্লায়েন্ট নেটওয়ার্ক",
      "ইন্টারন্যাশনাল পেমেন্ট",
      "রিমোট ওয়ার্ক স্কিল"
    ],
    tools: ["PayPal", "Wise", "Payoneer", "International Clients"]
  },
];
