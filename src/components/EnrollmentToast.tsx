import { useEffect, useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

const fakeNames = [
  "রাহুল আহমেদ", "তানিয়া ইসলাম", "সাকিব হোসেন", "নুসরাত জাহান", "ফারহান করিম",
  "মেহজাবিন চৌধুরী", "আরিফ রহমান", "সাবরিনা আক্তার", "তুষার মাহমুদ", "লামিয়া সুলতানা",
  "জাহিদ হাসান", "রিমা আক্তার", "শাহরিয়ার কবির", "ফাতেমা বেগম", "নাজমুল ইসলাম",
  // New Male Names
  "রিফাত হাসান", "তানভীর আহমেদ", "সাকিব মাহমুদ", "মাহফুজ রহমান", "নাফিস আলম",
  "হাসান মাহমুদ", "রাশেদ করিম", "ইমরান হোসেন", "ফাহিম খান", "শাওন সরকার",
  "মেহেদী হাসান", "সাইফুল ইসলাম", "কামরুল আহমেদ", "জুবায়ের রহমান", "আরমান কবির",
  "শিহাব উদ্দিন", "সুমন মিয়া", "নাঈম হোসেন", "তৌহিদ মাহমুদ",
  // New Female Names
  "তাসনিম আক্তার", "নুসরাত জাহান", "ফারিহা ইসলাম", "জান্নাত আরা", "সাদিয়া রহমান",
  "মেহজাবিন খান", "রাবেয়া সুলতানা", "সামিহা ইসলাম", "তানজিলা আক্তার", "নীলা রহমান",
  "তানিয়া হোসেন", "মিম আক্তার", "আনিকা ইসলাম", "ফারজানা ইয়াসমিন", "লাবণ্য চৌধুরী",
  "ইশরাত জাহান", "সাবরিনা ইসলাম", "রুমানা আক্তার", "রিয়া সুলতানা", "আরশি রহমান"
];

const locations = [
  "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "সিলেট", "বরিশাল",
  "ময়মনসিংহ", "কুমিল্লা", "গাজীপুর", "নারায়ণগঞ্জ",
  // New Locations
  "রংপুর", "নোয়াখালী", "ফেনী", "কক্সবাজার", "বান্দরবান", "রাঙ্গামাটি", "খাগড়াছড়ি",
  "বগুড়া", "পাবনা", "সিরাজগঞ্জ", "নাটোর", "নওগাঁ", "টাঙ্গাইল", "নরসিংদী", "কিশোরগঞ্জ",
  "মানিকগঞ্জ", "মুন্সীগঞ্জ", "ফরিদপুর", "মাদারীপুর", "শরীয়তপুর", "বরগুনা", "পটুয়াখালী",
  "ঝালকাঠি", "পিরোজপুর", "দিনাজপুর", "ঠাকুরগাঁও", "লালমনিরহাট", "কুড়িগ্রাম", "ঝিনাইদহ", "যশোর"
];

export const EnrollmentToast = () => {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Show toast after initial page load
    const initialTimer = setTimeout(() => {
      showEnrollmentToast();
    }, 15000); // First toast after 15 seconds

    // Then show every 45-90 seconds
    const interval = setInterval(() => {
      showEnrollmentToast();
    }, 45000 + Math.random() * 45000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const isWithinTimeRange = () => {
    // Get current time in Bangladesh (GMT+6)
    const bdTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const bdDate = new Date(bdTime);
    const hour = bdDate.getHours();

    // Show between 8 AM (8) and 2 AM (2)
    // Means: Hour >= 8 OR Hour < 2
    return hour >= 8 || hour < 2;
  };

  const showEnrollmentToast = () => {
    if (!isWithinTimeRange()) return;

    const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const minutesAgo = Math.floor(Math.random() * 10) + 1;

    let toastId: string | number;

    toastId = toast.success(
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
          {randomName.charAt(0)}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{randomName}</p>
          <p className="text-sm text-muted-foreground">
            {randomLocation} থেকে {minutesAgo} মিনিট আগে এনরোল করেছেন
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(toastId)}
          className="p-1 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground -mr-2"
        >
          <X className="w-3 h-3" />
        </button>
      </div>,
      {
        duration: 5000,
        position: "bottom-left",
        // Increase width or adjust style if needed, but default is usually fine
        style: { minWidth: '300px' }
      }
    );
  };

  return null;
};
