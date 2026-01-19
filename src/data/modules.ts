import {
  Layout,
  AppWindow,
  Database,
  Bot,
  Rocket,
  Cloud,
  Palette,
  Briefcase,
  LucideIcon
} from "lucide-react";

export interface Module {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  fullDescription: string;
  topics: string[];
  projects: string[];
  duration: string;
  durationWeeks: number; // For easy date calculation
  lessons: number;
  available: boolean;
  startDate?: string;
  endDate?: string;
  icon: LucideIcon;

  // New Fields for Revamp
  videoUrl?: string;       // YouTube Embed URL (or ID)
  liveClassLink?: string;  // Zoom/Meet Link
  resourceLink?: string;   // Drive/Dropbox Link for notes/slides
  viewCount?: number;      // Total views
}

export const modules: Module[] = [
  {
    id: "foundation",
    number: 1,
    title: "মডিউল ১: Zero Code ফাউন্ডেশন + প্রথম অ্যাপ",
    shortTitle: "Zero Code ফাউন্ডেশন",
    description: "AI টুলস পরিচিতি এবং প্রথম ওয়েব অ্যাপ তৈরি",
    fullDescription: "এই মডিউলে আপনি Zero Code কোডিং এর বেসিক কনসেপ্ট শিখবেন। AI টুলস যেমন Bolt.new, Lovable, এবং Cursor এর সাথে পরিচিত হবেন এবং আপনার প্রথম ওয়েব অ্যাপ্লিকেশন তৈরি করবেন।",
    topics: [
      "Bolt.new, Lovable, Cursor পরিচিতি",
      "প্রম্পট ইঞ্জিনিয়ারিং বেসিক",
      "প্রথম Landing Page তৈরি",
      "GitHub ও Vercel সেটআপ",
      "AI টুলস এর সঠিক ব্যবহার",
      "বেসিক ওয়েব ডেভেলপমেন্ট কনসেপ্ট"
    ],
    projects: ["Personal Landing Page", "Simple Portfolio Site"],
    duration: "২ সপ্তাহ",
    durationWeeks: 2,
    lessons: 12,
    available: true,
    startDate: "2024-01-20",
    endDate: "2024-02-03",
    icon: Layout
  },
  {
    id: "practical-apps",
    number: 2,
    title: "মডিউল ২: প্র্যাকটিক্যাল অ্যাপ বিল্ডিং",
    shortTitle: "প্র্যাকটিক্যাল অ্যাপ",
    description: "TodoList, Money Manager, Portfolio Website",
    fullDescription: "এই মডিউলে আপনি হাতে-কলমে তিনটি গুরুত্বপূর্ণ প্রজেক্ট তৈরি করবেন। ToDo App দিয়ে CRUD অপারেশন, Money Manager দিয়ে ডাটা ম্যানেজমেন্ট, এবং Portfolio Website দিয়ে প্রফেশনাল প্রেজেন্টেশন শিখবেন।",
    topics: [
      "ToDo অ্যাপ সম্পূর্ণ প্রজেক্ট",
      "Money Manager অ্যাপ",
      "Professional Portfolio Site",
      "Responsive Design মাস্টারি",
      "State Management বেসিক",
      "UI/UX বেস্ট প্র্যাকটিস"
    ],
    projects: ["ToDo App", "Money Manager", "Professional Portfolio"],
    duration: "৩ সপ্তাহ",
    durationWeeks: 3,
    lessons: 18,
    available: true,
    icon: AppWindow
  },
  {
    id: "intermediate-database",
    number: 3,
    title: "মডিউল ৩: ইন্টারমিডিয়েট + Database",
    shortTitle: "Database & Auth",
    description: "Supabase, Server State, Authentication",
    fullDescription: "এই মডিউলে আপনি ব্যাকএন্ড ইন্টিগ্রেশন শিখবেন। Supabase ব্যবহার করে ডাটাবেস সেটআপ, ইউজার অথেন্টিকেশন, এবং রিয়েল-টাইম ডাটা সিঙ্ক করতে পারবেন।",
    topics: [
      "Supabase সেটআপ ও ব্যবহার",
      "User Authentication সিস্টেম",
      "CRUD অপারেশন",
      "Real-time Data Sync",
      "Row Level Security",
      "Storage ও File Upload"
    ],
    projects: ["Notes App with Auth", "Real-time Chat App"],
    duration: "৩ সপ্তাহ",
    durationWeeks: 3,
    lessons: 20,
    available: true,
    icon: Database
  },
  {
    id: "ai-mastery-hosting",
    number: 4,
    title: "মডিউল ৪: AI টুল মাস্টারি & হোস্টিং",
    shortTitle: "AI মাস্টারি",
    description: "Advanced AI Tools, Custom Domain, Deployment",
    fullDescription: "এই মডিউলে আপনি এডভান্সড AI টুলস এবং প্রোডাকশন ডিপ্লয়মেন্ট শিখবেন। ChatGPT API ইন্টিগ্রেশন, কাস্টম AI চ্যাটবট তৈরি, এবং প্রফেশনাল হোস্টিং সেটআপ করতে পারবেন।",
    topics: [
      "ChatGPT API Integration",
      "Custom AI Chatbot তৈরি",
      "Domain & DNS সেটআপ",
      "Production Deployment",
      "Performance Optimization",
      "SEO Basics"
    ],
    projects: ["AI Chatbot", "Production-Ready App"],
    duration: "২ সপ্তাহ",
    durationWeeks: 2,
    lessons: 14,
    available: true,
    icon: Bot
  },
  {
    id: "advanced-projects",
    number: 5,
    title: "মডিউল ৫: এডভান্সড প্রজেক্ট",
    shortTitle: "এডভান্সড প্রজেক্ট",
    description: "E-commerce, MicroSaaS, AI Application",
    fullDescription: "এই মডিউলে আপনি কমার্শিয়াল-গ্রেড প্রজেক্ট তৈরি করবেন। E-commerce স্টোর, MicroSaaS অ্যাপ্লিকেশন, এবং AI-Powered অ্যাপ বানিয়ে ইনকাম শুরু করতে পারবেন।",
    topics: [
      "সম্পূর্ণ E-commerce Store",
      "Payment Gateway Integration",
      "MicroSaaS প্রজেক্ট",
      "AI-Powered Application",
      "Subscription System",
      "Admin Dashboard"
    ],
    projects: ["E-commerce Store", "MicroSaaS App", "AI Application"],
    duration: "৪ সপ্তাহ",
    durationWeeks: 4,
    lessons: 25,
    available: true,
    icon: Rocket
  },
  {
    id: "saas-development",
    number: 6,
    title: "মডিউল ৬: SaaS ডেভেলপমেন্ট",
    shortTitle: "SaaS ডেভেলপমেন্ট",
    description: "Full SaaS Application Development",
    fullDescription: "এই মডিউলে আপনি সম্পূর্ণ SaaS (Software as a Service) অ্যাপ্লিকেশন তৈরি করতে শিখবেন। মাল্টি-টেন্যান্ট আর্কিটেকচার, সাবস্ক্রিপশন সিস্টেম, এবং স্কেলেবল ইনফ্রাস্ট্রাকচার সেটআপ করবেন।",
    topics: [
      "SaaS Architecture",
      "Subscription System",
      "Multi-tenant Setup",
      "Analytics Dashboard",
      "Billing Integration",
      "Customer Portal"
    ],
    projects: ["Full SaaS Application"],
    duration: "৫ সপ্তাহ",
    durationWeeks: 5,
    lessons: 30,
    available: true,
    icon: Cloud
  },
  {
    id: "uiux-mastery",
    number: 7,
    title: "মডিউল ৭: UI/UX মাস্টারি",
    shortTitle: "UI/UX মাস্টারি",
    description: "From Designer to Product Thinker",
    fullDescription: "UI/UX শুধুমাত্র সৌন্দর্য নয়, এটি একটি বিজনেস স্কিল। এই মডিউলে আপনি লেআউট সিস্টেম, টাইপোগ্রাফি, কালার সাইকোলজি, ওয়্যারফ্রেমিং এবং ইউজার জার্নি ম্যাপ তৈরি শিখবেন। Figma এবং AI টুলস ব্যবহার করে প্রফেশনাল ড্যাশবোর্ড এবং মোবাইল অ্যাপ ডিজাইন করবেন।",
    topics: [
      "UI Fundamentals (Layout, Spacing, Typography)",
      "UX Fundamentals (User Flow, Wireframing)",
      "Product Design (SaaS UI, Dashboard, Auth)",
      "Mobile-first thinking",
      "Tools: Figma & AI Design Assistants",
      "Practical: SaaS Dashboard & Mobile App"
    ],
    projects: ["SaaS Dashboard Design", "Mobile App Screens", "Portfolio-level UI"],
    duration: "৩ সপ্তাহ",
    durationWeeks: 3,
    lessons: 18,
    available: true,
    icon: Palette
  },
  {
    id: "framer-mastery",
    number: 8,
    title: "মডিউল ৮: Framer Landing Page মাস্টারি",
    shortTitle: "Framer মাস্টারি",
    description: "No-Code, Designer-Friendly Website Builder",
    fullDescription: "কোডিং ছাড়াই হাই-কনভার্শন ল্যান্ডিং পেজ তৈরি করুন। Framer ইন্টারফেস, কম্পোনেন্ট, স্ট্যাক, অটো লেআউট এবং অ্যানিমেশন শিখুন। কাস্টম ডোমেইন কানেক্ট করে নিজের পোর্টফোলিও বা ক্লায়েন্টের জন্য সাইট পাবলিশ করতে পারবেন।",
    topics: [
      "Framer vs Webflow vs WordPress",
      "Components, Stacks, Auto Layout",
      "Responsive Design & Animations",
      "CMS & SEO Settings",
      "Publishing & Custom Domain",
      "Exporting Designs"
    ],
    projects: ["SaaS Landing Page", "Course Landing Page", "Portfolio Site"],
    duration: "২ সপ্তাহ",
    durationWeeks: 2,
    lessons: 12,
    available: true,
    icon: Layout
  },
  {
    id: "career-roadmap",
    number: 9,
    title: "মডিউল ৯: ক্যারিয়ার রোডম্যাপ",
    shortTitle: "ক্যারিয়ার রোডম্যাপ",
    description: "Freelancing, Jobs, and Business",
    fullDescription: "এই মডিউলে আপনি ক্যারিয়ার বিল্ডিং শিখবেন। ফ্রিল্যান্সিং প্রোফাইল সেটআপ, ক্লায়েন্ট কমিউনিকেশন, প্রাইসিং স্ট্র্যাটেজি, এবং নিজের এজেন্সি বিল্ডিং পর্যন্ত সবকিছু শিখবেন।",
    topics: [
      "Fiverr/Upwork Profile Setup",
      "Client Communication",
      "Pricing Strategies",
      "Building Your Agency",
      "Personal Branding",
      "Long-term Growth"
    ],
    projects: ["Optimized Freelancing Profile", "Business Plan"],
    duration: "২ সপ্তাহ",
    durationWeeks: 2,
    lessons: 12,
    available: true,
    icon: Briefcase
  },
];
