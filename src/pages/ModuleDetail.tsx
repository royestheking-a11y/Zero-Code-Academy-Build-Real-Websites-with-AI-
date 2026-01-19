import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { modules, Module } from "@/data/modules";
import { useModules } from "@/hooks/useContent";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  FileText,
  Video,
  Download,
  PlayCircle,
  Eye,
  CheckCircle,
  Check,
  AlertCircle,
  ChevronRight,
  Lock
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function ModuleDetail() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [module, setModule] = useState<Module | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "resources">("overview");
  const [viewCount, setViewCount] = useState(0);

  // Check for User Session & Enrollment
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const session = localStorage.getItem("studentSession");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  // Load Module Data & Increment View Count
  const { data: allModules = [] } = useModules();

  useEffect(() => {
    if (allModules.length > 0) {
      const foundModule = allModules.find((m: any) => m.id === moduleId);
      if (foundModule) {
        setModule(foundModule);
        // View count logic temporarily removed or moved to backend
        setViewCount(foundModule.views || 0);
      }
    }
  }, [moduleId, allModules]);


  if (!module) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">মডিউল পাওয়া যায়নি</h1>
            <Link to="/">
              <Button>হোমে ফিরে যান</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }



  const isModuleEnrolled = user && (user.enrolledModules?.includes(module?.id) || true); // Assuming all students have access for now, or match ID
  // Strictly lock content if user is NOT logged in
  const canAccess = !!user;
  const isLocked = !canAccess;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <SEO
        title={module?.title || "Module Detail"}
        description={module?.description || "Access course module details and resources."}
      />
      <Header />

      <main className="pt-24 pb-20">
        <div className="container-custom max-w-7xl mx-auto px-4">

          {/* Top Navigation Bar */}
          <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/student-dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium truncate">{module.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* LEFT: Main Content (Video & Details) */}
            <div className="lg:col-span-2 space-y-8">

              <div className={`bg-black rounded-2xl overflow-hidden shadow-2xl relative group ${isLocked ? "aspect-auto min-h-[450px] md:aspect-video md:min-h-0" : "aspect-video"}`}>
                {isLocked ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/95 text-white p-6 text-center z-20 backdrop-blur-sm">
                    {/* Premium Lock Icon */}
                    <div className="w-16 h-16 md:w-24 md:h-24 mb-4 md:mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center relative shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 animate-ping opacity-50"></div>
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 ring-4 ring-black/50">
                        <Lock className="w-6 h-6 md:w-8 md:h-8 text-white stroke-[3]" />
                      </div>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      কন্টেন্ট লক করা আছে
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto mb-6 md:mb-8 leading-relaxed">
                      এই প্রিমিয়াম কন্টেন্ট এবং রিসোর্সগুলো শুধুমাত্র এনরোল করা স্টুডেন্টদের জন্য। সম্পূর্ণ এক্সেস পেতে অনুগ্রহ করে লগইন বা এনরোল করুন।
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                      <Button onClick={() => navigate("/login")} className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 shadow-lg shadow-purple-500/25">
                        লগইন করুন
                      </Button>
                      <Button variant="outline" onClick={() => navigate("/enroll")} className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                        এনরোল করুন
                      </Button>
                    </div>
                  </div>
                ) : module.videoUrl ? (
                  <iframe
                    src={module.videoUrl}
                    title={module.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white">
                    <PlayCircle className="w-20 h-20 text-gray-700 mb-4" />
                    <p className="text-gray-500 font-medium">ভিডিও শীঘ্রই আসছে</p>
                  </div>
                )}
              </div>

              {/* Title & Stats */}
              <div className="bg-white dark:bg-card border rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
                      {module.title}
                    </h1>
                    <p className="text-muted-foreground">{module.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 bg-secondary/50 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {viewCount.toLocaleString()} views
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-8 pt-4 border-t mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{module.lessons} Lessons</span>
                  </div>
                  {module.available && (
                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                      </div>
                      <span>Available</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "overview" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("resources")}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "resources" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  Resources / Notes
                </button>
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === "overview" && (
                  <div className="space-y-8 animate-fade-in">
                    <div>
                      <h3 className="font-bold text-lg mb-4">Description</h3>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {module.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg mb-4">What you will learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(module.topics || []).map((topic, i) => (
                          <div key={i} className="flex items-start gap-3 bg-secondary/20 p-3 rounded-lg">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                              <Check className="w-3 h-3 text-white stroke-[3]" />
                            </div>
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div className="space-y-4 animate-fade-in">
                    {isLocked ? (
                      <div className="text-center py-16 bg-muted/20 rounded-2xl border border-dashed border-muted-foreground/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-inner">
                            <Lock className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <h4 className="font-bold text-lg mb-2">রিসোর্স লক করা আছে</h4>
                          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                            লেকচার নোট এবং অ্যাসেট ডাউনলোড করতে অনুগ্রহ করে লগইন করুন।
                          </p>
                          <Button onClick={() => navigate("/login")} variant="outline" className="border-primary/50 text-primary hover:bg-primary/5">
                            লগইন করুন
                          </Button>
                        </div>
                      </div>
                    ) : module.resourceLink ? (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                            <Download className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">Lecture Notes & Assets</h4>
                            <p className="text-sm text-muted-foreground">Download all source codes and slides for this module.</p>
                          </div>
                        </div>
                        <Button onClick={() => window.open(module.resourceLink, "_blank")} variant="outline" className="border-primary/30 hover:bg-primary/5">
                          Download Now
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                        <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                        <p className="text-muted-foreground">No resources attached to this module yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* RIGHT: Sidebar (Actions & Playlist) */}
            <div className="lg:col-span-1 space-y-6">

              {/* Primary Actions Card */}
              <div className="bg-white dark:bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-6">Class Actions</h3>

                <div className="space-y-3">
                  {isLocked ? (
                    <Button disabled className="w-full gap-2 opacity-70">
                      <Lock className="w-4 h-4" />
                      Live Class Locked
                    </Button>
                  ) : module.liveClassLink ? (
                    <Button
                      className="w-full gap-2 relative overflow-hidden group"
                      size="lg"
                      onClick={() => window.open(module.liveClassLink, "_blank")}
                    >
                      <div className="absolute inset-0 bg-red-600 animate-pulse opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <Video className="w-4 h-4 relative z-10" />
                      <span className="relative z-10">Join Live Class</span>
                    </Button>
                  ) : (
                    <Button disabled variant="outline" className="w-full gap-2 opacity-70">
                      <Video className="w-4 h-4" />
                      Live Class Not Scheduled
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() => setActiveTab("resources")}
                    disabled={isLocked}
                  >
                    <FileText className="w-4 h-4" />
                    {isLocked ? "Notes Locked" : "View Notes"}
                  </Button>
                </div>

                {/* Help Box */}
                <div className="mt-8 bg-secondary/30 rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    Need Help?
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    If you're stuck on this module, ask in our Discord community.
                  </p>
                  <Button asChild variant="link" className="h-auto p-0 text-primary text-xs">
                    <a href="https://discord.gg/ka2EKTbR" target="_blank" rel="noopener noreferrer">
                      Join Discord Support &rarr;
                    </a>
                  </Button>
                </div>
              </div>

              {/* Module Playlist / Other Modules Link */}
              <div className="bg-card border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm uppercase tracking-wide text-muted-foreground">Next Modules</h3>
                </div>
                <div className="space-y-4">
                  {modules.slice(0, 3).map((m, idx) => (
                    <Link
                      key={m.id}
                      to={`/module/${m.id}`}
                      className={`flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors ${m.id === module.id ? "bg-primary/5 border border-primary/20 pointer-events-none" : ""}`}
                    >
                      <div className="text-xs font-bold text-muted-foreground mt-1 w-5">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </div>
                      <div>
                        <h4 className={`text-sm font-medium line-clamp-1 ${m.id === module.id ? "text-primary" : "text-foreground"}`}>
                          {m.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">{m.duration}</p>
                      </div>
                      {m.id === module.id && <PlayCircle className="w-4 h-4 text-primary ml-auto mt-1" />}
                    </Link>
                  ))}
                  <Link to="/student-dashboard" className="block text-center pt-2">
                    <Button variant="link" size="sm" className="text-muted-foreground">View All Modules</Button>
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
