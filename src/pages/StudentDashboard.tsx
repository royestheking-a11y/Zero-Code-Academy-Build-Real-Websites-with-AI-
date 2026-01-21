import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle,
  Check,
  Clock,
  Trophy,
  Play,
  Lock,
  Star,
  Award,
  Calendar,
  Video,
  ArrowRight,
  MoreVertical,
  X,
  FileText,
  MessageSquare,
  ShoppingBag
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRoutine, useModules } from "@/hooks/useContent";
import { Module } from "@/data/modules";


interface Enrollment {
  id: string;
  name: string;
  email: string;
  mobile: string;
  coupon: string;
  price: number;
  discount: number;
  status: string;
  enrolledAt: string;
  accessLimit?: number; // Added
}

interface StudentData {
  name: string;
  email: string;
  enrolledAt: string;
  completedModules: string[];
  currentModule: string;
  accessLimit?: number; // Added
}

// Sub-component for Orders
import axios from 'axios';
const MyOrdersList = ({ studentEmail }: { studentEmail?: string }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentEmail) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const res = await axios.get(`${apiUrl}/orders?email=${studentEmail}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [studentEmail]);

  if (loading) return <div className="text-center py-4 text-sm text-muted-foreground">Loading orders...</div>;
  if (orders.length === 0) return <div className="text-center py-4 text-sm text-muted-foreground">No orders found.</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="p-3 rounded-l-lg">Order ID</th>
            <th className="p-3">Type</th>
            <th className="p-3">Items</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3 rounded-r-lg">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId} className="border-b last:border-0 hover:bg-muted/10">
              <td className="p-3 font-mono font-bold text-primary">{order.orderId}</td>
              <td className="p-3">{order.orderType}</td>
              <td className="p-3 max-w-[200px] truncate">
                {order.items?.map((i: any) => i.title).join(', ') || order.projectRef}
              </td>
              <td className="p-3 font-bold">৳{order.totalPrice}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs font-bold ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {order.status}
                </span>
              </td>
              <td className="p-3 text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  const { data: routines = [] } = useRoutine();
  const { data: modules = [] } = useModules();

  const roadmapRef = useRef<HTMLDivElement>(null);
  const activeModuleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to active module after a short delay to ensure render
    if (activeModuleRef.current && roadmapRef.current) {
      setTimeout(() => {
        activeModuleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  }, [studentData, modules]);

  useEffect(() => {
    // Auth Check
    const saved = localStorage.getItem("studentSession");
    if (saved) {
      setStudentData(JSON.parse(saved));
      setIsLoggedIn(true);
    } else {
      // Redirect to login page if no session
      navigate("/login");
    }

    // Listen for logout from other pages/tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "studentSession" && !e.newValue) {
        setIsLoggedIn(false);
        setStudentData(null);
        navigate("/login");
      }
    };

    // Also listen for custom storage events (same tab)
    const handleCustomStorage = () => {
      const session = localStorage.getItem("studentSession");
      if (!session) {
        setIsLoggedIn(false);
        setStudentData(null);
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("storage", handleCustomStorage);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("storage", handleCustomStorage);
    };
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const enrollments = JSON.parse(localStorage.getItem("enrollments") || "[]");
    const student = enrollments.find((e: Enrollment) => e.email === loginEmail && e.status === "confirmed");

    if (student) {
      const limit = student.accessLimit !== undefined ? student.accessLimit : 999;
      const data: StudentData = {
        name: student.name,
        email: student.email,
        enrolledAt: student.enrolledAt,
        completedModules: JSON.parse(localStorage.getItem(`progress_${student.email}`) || "[]"),
        currentModule: "module-1",
        accessLimit: limit
      };
      setStudentData(data);
      setIsLoggedIn(true);
      localStorage.setItem("studentSession", JSON.stringify(data));
      window.location.reload();
    } else {
      alert("এই ইমেইল দিয়ে কোনো কনফার্মড এনরোলমেন্ট পাওয়া যায়নি");
    }
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20 flex items-center justify-center min-h-[80vh]">
          <div className="bg-card border rounded-2xl p-8 w-full max-w-md shadow-lg animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary animate-pulse-slow">
                <BookOpen className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">স্টুডেন্ট লগইন</h1>
              <p className="text-muted-foreground">আপনার এনরোল করা ইমেইল দিয়ে লগইন করুন</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">ইমেইল এড্রেস</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  required
                />
              </div>
              <Button type="submit" variant="cta" size="lg" className="w-full text-lg">
                লগইন করুন
              </Button>
            </form>
            <p className="text-sm text-muted-foreground text-center mt-6">
              এখনও এনরোল করেননি? <Link to="/enroll" className="text-primary hover:underline font-medium">কোর্স কিনুন</Link>
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- Logic for Dates and Access ---
  const getModuleDateRange = (index: number) => {
    // Fallback to today if enrolledAt is missing, preventing "TBD"
    const enrollmentDateStr = studentData?.enrolledAt || new Date().toISOString();

    // Calculate cumulative weeks up to this module
    let weeksBefore = 0;
    for (let i = 0; i < index; i++) {
      // Use 2 weeks as default duration if missing
      weeksBefore += modules[i].durationWeeks || 2;
    }

    const startDate = new Date(enrollmentDateStr);
    // Add weeks * 7 days
    startDate.setDate(startDate.getDate() + (weeksBefore * 7));

    const endDate = new Date(startDate);
    // Add current module duration (default 2 weeks)
    endDate.setDate(endDate.getDate() + ((modules[index].durationWeeks || 2) * 7));

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };

    return {
      start: startDate.toLocaleDateString("en-US", options),
      end: endDate.toLocaleDateString("en-US", options)
    };
  };

  const availableModules = modules.filter(m => m.available);
  const completedCount = (studentData?.completedModules || []).length;
  const accessibleModulesCount = Math.min(availableModules.length, studentData?.accessLimit || 999);
  const progressPercent = (completedCount / accessibleModulesCount) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container-custom">
          {/* Welcome & Quick Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                স্বাগতম, <span className="gradient-text">{studentData?.name}</span>! 👋
              </h1>
              <p className="text-muted-foreground">আপনার লার্নিং জার্নি এবং প্রোগ্রেস</p>
            </div>
            <div className="flex gap-3">
              <Button asChild className="gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white">
                <a href="https://discord.gg/ka2EKTbR" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-4 h-4" /> Discord Support
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { label: "কোর্স অগ্রগতি", value: `${Math.round(progressPercent)}%`, sub: "চালিয়ে যান!", icon: Trophy, color: "text-accent", bg: "bg-accent/10" },
              { label: "সম্পন্ন মডিউল", value: completedCount, sub: `মোট ${availableModules.length} টি`, icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
              { label: "সার্টিফিকেট", value: "0", sub: "কোর্স শেষে পাবেন", icon: Award, color: "text-warning", bg: "bg-warning/10" },
              { label: "লার্নিং পয়েন্টস", value: "১২৫০", sub: "টপ ১০% এ আছেন", icon: Star, color: "text-primary", bg: "bg-primary/10" },
            ].map((stat, i) => (
              <div key={i} className="bg-card border rounded-2xl p-4 md:p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform`}>
                    {stat.icon === CheckCircle ? (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                      </div>
                    ) : (
                      <stat.icon className={`w-4 h-4 md:w-6 md:h-6 ${stat.color}`} />
                    )}
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.color}`}>{stat.label}</span>
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* My Orders Section */}
          <div className="mb-12">
            <div className="bg-card border rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" /> আমার অর্ডার
              </h2>
              <MyOrdersList studentEmail={studentData?.email} />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Left Column: Consolidated Roadmap (2/3 width) */}
            <div className="xl:col-span-2 space-y-10">
              <div className="bg-card border rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-primary" />
                    আপনার লার্নিং রোডম্যাপ
                  </h2>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[26px] top-4 bottom-4 w-0.5 bg-border z-0"></div>

                  <div className="space-y-8 relative z-10" ref={roadmapRef}>
                    {modules.map((module, i) => {
                      const isCompleted = (studentData?.completedModules || []).includes(module.id);
                      const isAccessLocked = i >= (studentData?.accessLimit || 999);
                      const isSystemLocked = !module.available;
                      const isLocked = isAccessLocked || isSystemLocked;

                      const isActive = !isLocked && !isCompleted && (i === 0 || (studentData?.completedModules || []).includes(modules[i - 1].id));

                      const { start, end } = getModuleDateRange(i);

                      return (
                        <div
                          key={module.id}
                          className={`flex gap-4 md:gap-6 group ${!isLocked ? "cursor-pointer" : "opacity-80"}`}
                          ref={isActive ? activeModuleRef : null}
                          onClick={() => {
                            if (!isLocked) {
                              navigate(`/module/${module.id}`);
                            } else if (isAccessLocked) {
                              alert("এই মডিউলটি আপনার বর্তমান প্যাকেজে নেই। আপগ্রেড করুন।");
                              window.open("https://wa.me/8801XXXXXXXXX?text=I%20want%20to%20upgrade%20my%20package", "_blank");
                            }
                          }}
                        >
                          {/* Timeline Dot/Icon */}
                          <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shrink-0 bg-background transition-all z-10
                                      ${isCompleted ? "border-success text-success bg-success/5" : isActive ? "border-primary text-primary bg-primary/5 shadow-md scale-110" : isLocked ? "border-muted text-muted-foreground bg-muted/10" : "border-muted text-muted-foreground"}
                                  `}>
                            {isCompleted ? (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                                <Check className="w-5 h-5 text-white stroke-[3]" />
                              </div>
                            ) :
                              isLocked ? <Lock className="w-5 h-5" /> :
                                <span className="font-bold text-lg">{i + 1}</span>}
                          </div>

                          {/* Card Content - Now acts as the main module item */}
                          <div className={`flex-1 border rounded-xl p-5 md:p-6 transition-all duration-300 relative overflow-hidden
                              ${isActive ? "border-primary/50 shadow-lg bg-card ring-1 ring-primary/20" : "bg-card hover:border-primary/30 hover:shadow-md"}
                          `}>
                            {/* Hover effect background */}
                            {!isLocked && <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>}

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3 relative z-10">
                              <div>
                                <h3 className={`text-lg md:text-xl font-bold mb-2 flex items-center gap-2 ${isActive ? "text-primary" : "text-foreground"}`}>
                                  {module.title}
                                  {isAccessLocked && <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded border border-warning/20">UPGRADE</span>}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{module.description}</p>

                                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium text-muted-foreground">
                                  <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded">
                                    <Clock className="w-3.5 h-3.5" />
                                    {start} - {end}
                                  </span>
                                  <span className="flex items-center gap-1.5 bg-secondary/50 px-2 py-1 rounded">
                                    <FileText className="w-3.5 h-3.5" />
                                    {module.lessons} Lessons
                                  </span>
                                  {!isLocked && (
                                    <span className="flex items-center gap-1.5 text-primary bg-primary/10 px-2 py-1 rounded animate-pulse-slow">
                                      <Play className="w-3 h-3 fill-current" />
                                      {isActive ? "Running Now" : isCompleted ? "Completed" : "Open"}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Action Button (Desktop mainly) */}
                              <div className="hidden md:block">
                                {!isLocked ? (
                                  <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                                  </Button>
                                ) : (
                                  <Button variant="ghost" size="icon" disabled>
                                    <Lock className="w-5 h-5 text-muted-foreground" />
                                  </Button>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Routine & Announcements (1/3 width) */}
            <div className="space-y-8">
              {/* Routine Card */}
              <div className="bg-card border rounded-2xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    লাইভ ক্লাস রুটিন
                  </h2>
                </div>

                <div className="space-y-4">
                  {routines.length > 0 ? routines.map((routine) => (
                    <div key={routine.id} className="bg-secondary/30 rounded-xl p-4 border border-border/50">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">{routine.day}</span>
                        <span className="text-xs font-medium text-muted-foreground">{routine.time}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{routine.topic}</h4>
                      <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                        <Video className="w-3 h-3" /> {routine.platform}
                      </p>
                      <Button size="sm" variant="outline" className="w-full text-xs h-8" onClick={() => window.open(routine.link, '_blank')}>
                        জয়েন করুন
                      </Button>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      কোনো ক্লাস শিডিউল নেই
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-sm font-semibold mb-3">গুরুত্বপূর্ণ লিংক</h3>
                  <div className="space-y-2">
                    <a href="https://discord.gg/ka2EKTbR" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-sm">
                      <div className="w-8 h-8 rounded-full bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2]">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium">Discord Community</p>
                        <p className="text-xs text-muted-foreground">সাপোর্ট এবং আলোচনা</p>
                      </div>
                    </a>
                  </div>
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


