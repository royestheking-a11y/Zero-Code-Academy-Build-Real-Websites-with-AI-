import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X, ShoppingBag, BookOpen } from "lucide-react";

// Mock Data for Social Proof
const fakeNames = [
  "রাহুল আহমেদ", "তানিয়া ইসলাম", "সাকিব হোসেন", "নুসরাত জাহান", "ফারহান করিম",
  "মেহজাবিন চৌধুরী", "আরিফ রহমান", "সাবরিনা আক্তার", "তুষার মাহমুদ", "লামিয়া সুলতানা",
  "জাহিদ হাসান", "রিমা আক্তার", "শাহরিয়ার কবির", "ফাতেমা বেগম", "নাজমুল ইসলাম",
  "রিফাত হাসান", "তানভীর আহমেদ", "সাকিব মাহমুদ", "মাহফুজ রহমান", "নাফিস আলম",
  "হাসান মাহমুদ", "রাশেদ করিম", "ইমরান হোসেন", "ফাহিম খান", "শাওন সরকার",
  "মেহেদী হাসান", "সাইফুল ইসলাম", "কামরুল আহমেদ", "জুবায়ের রহমান", "আরমান কবির",
  "শিহাব উদ্দিন", "সুমন মিয়া", "নাঈম হোসেন", "তৌহিদ মাহমুদ",
  "তাসনিম আক্তার", "ফারিহা ইসলাম", "জান্নাত আরা", "সাদিয়া রহমান",
  "মেহজাবিন খান", "রাবেয়া সুলতানা", "সামিহা ইসলাম", "তানজিলা আক্তার", "নীলা রহমান",
  "তানিয়া হোসেন", "মিম আক্তার", "আনিকা ইসলাম", "ফারজানা ইয়াসমিন", "লাবণ্য চৌধুরী",
  "ইশরাত জাহান", "সাবরিনা ইসলাম", "রুমানা আক্তার", "রিয়া সুলতানা", "আরশি রহমান"
];

const locations = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "সিলেট", "বরিশাল",
  "ময়মনসিংহ", "কুমিল্লা", "গাজীপুর", "নারায়ণগঞ্জ",
  "রংপুর", "নোয়াখালী", "ফেনী", "কক্সবাজার", "বান্দরবান", "রাঙ্গামাটি", "খাগড়াছড়ি",
  "বগুড়া", "পাবনা", "সিরাজগঞ্জ", "নাটোর", "নওগাঁ", "টাঙ্গাইল", "নরসিংদী", "কিশোরগঞ্জ",
  "মানিকগঞ্জ", "মুন্সীগঞ্জ", "ফরিদপুর", "মাদারীপুর", "শরীয়তপুর", "বরগুনা", "পটুয়াখালী",
  "ঝালকাঠি", "পিরোজপুর", "দিনাজপুর", "ঠাকুরগাঁও", "লালমনিরহাট", "কুড়িগ্রাম", "ঝিনাইদহ", "যশোর"
];

// New Marketplace Projects
const fakeProjects = [
  "E-Commerce Starter Kit", "Portfolio Template", "Agency Website", "LMS Platform",
  "Blog & Magazine Theme", "Real Estate Website", "SaaS Landing Page", "Restaurant App UI",
  "Doctor Appointment System", "Inventory Management Dashboard"
];

export const EnrollmentToast = () => {
  useEffect(() => {
    // Initial delay 10s
    const initialTimer = setTimeout(() => {
      triggerRandomToast();
    }, 10000);

    // Random interval between 30s and 60s
    const interval = setInterval(() => {
      triggerRandomToast();
    }, 30000 + Math.random() * 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const isWithinTimeRange = () => {
    // Show between 8 AM and 2 AM BD time
    const bdTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const bdDate = new Date(bdTime);
    const hour = bdDate.getHours();
    return hour >= 8 || hour < 2;
  };

  const triggerRandomToast = () => {
    if (!isWithinTimeRange()) return;

    // Randomly decide: 60% Course Enrollment, 40% Project Order
    const isOrder = Math.random() > 0.6;

    if (isOrder) {
      showOrderToast();
    } else {
      showEnrollmentToast();
    }
  };

  const showEnrollmentToast = () => {
    const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const minutesAgo = Math.floor(Math.random() * 15) + 1;

    let toastId: string | number;

    toastId = toast.custom((t) => (
      <div className="relative flex items-center gap-4 p-4 pr-10 w-full max-w-sm rounded-xl border border-primary/20 bg-background/80 backdrop-blur-md shadow-lg shadow-primary/5 animate-in slide-in-from-bottom-5">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-md ring-2 ring-background">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-foreground truncate">
            {randomName} <span className="font-normal text-muted-foreground">from</span> {randomLocation}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            এইমাত্র <span className="font-semibold text-primary">Full Stack Course</span> এ এনরোল করেছেন!
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-1">{minutesAgo} মিনিট আগে</p>
        </div>

        <button
          onClick={() => toast.dismiss(toastId)}
          className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    ), { duration: 5000, position: "bottom-left" });
  };

  const showOrderToast = () => {
    const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const randomProject = fakeProjects[Math.floor(Math.random() * fakeProjects.length)];
    const minutesAgo = Math.floor(Math.random() * 20) + 1;

    let toastId: string | number;

    toastId = toast.custom((t) => (
      <div className="relative flex items-center gap-4 p-4 pr-10 w-full max-w-sm rounded-xl border border-purple-500/20 bg-background/80 backdrop-blur-md shadow-lg shadow-purple-500/5 animate-in slide-in-from-bottom-5">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shrink-0 shadow-md ring-2 ring-background">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 border-2 border-white"></span>
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-foreground truncate">
            {randomName}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            <span className="font-semibold text-purple-600">{randomProject}</span> টি অর্ডার করেছেন!
          </p>
          <p className="text-[10px] text-muted-foreground/70 mt-1">{minutesAgo} মিনিট আগে</p>
        </div>

        <button
          onClick={() => toast.dismiss(toastId)}
          className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground/50 hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    ), { duration: 5000, position: "bottom-left" });
  };

  return null;
};

