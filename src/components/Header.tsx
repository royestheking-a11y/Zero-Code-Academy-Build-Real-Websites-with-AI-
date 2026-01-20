import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Settings, LogOut, LayoutDashboard, Award, Bell, CheckCircle, Calendar, AlertCircle, BookOpen, Check } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications, useAddNotification, useMarkRead } from "@/hooks/useContent";

const navItems = [
  { label: "হোম", href: "/" },
  { label: "ফিচারসমূহ", href: "/#features" },
  { label: "কারিকুলাম", href: "/#modules" },
  { label: "প্রাইসিং", href: "/#pricing" },
  { label: "ডেমো", href: "/demo" },
  { label: "জিজ্ঞাসিত প্রশ্ন", href: "/#faq" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentPhoto, setStudentPhoto] = useState("");
  const [studentEmail, setStudentEmail] = useState("");

  // Hooks
  const { data: notifications = [] } = useNotifications(studentEmail);
  const addNotificationMutation = useAddNotification();
  const markReadMutation = useMarkRead();

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Check login status
    const checkLogin = () => {
      const session = localStorage.getItem("studentSession");
      if (session) {
        const data = JSON.parse(session);
        setIsLoggedIn(true);
        setStudentName(data.name || "Student");
        setStudentPhoto(data.photo || "");
        setStudentEmail(data.email || "");

        // Removed manual getNotifications call, handled by hook
      } else {
        setIsLoggedIn(false);
        setStudentEmail("");
      }
    };
    checkLogin();

    // Listen for storage events (login/logout)
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentSession");
    setIsLoggedIn(false);
    setStudentEmail("");
    window.location.reload();
  };

  const markRead = () => {
    if (studentEmail) {
      markReadMutation.mutate(studentEmail);
    }
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#") && location.pathname === "/") {
      const id = href.replace("/#", "");
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment': return (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
          <Check className="w-3 h-3 text-white stroke-[3]" />
        </div>
      );
      case 'routine': return <Calendar className="w-4 h-4 text-blue-500" />;
      case 'enrollment': return <BookOpen className="w-4 h-4 text-purple-500" />;
      default: return <AlertCircle className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-md shadow-md py-3"
        : "bg-background/80 backdrop-blur-sm py-4"
        }`}
    >
      <div className="container-custom px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/navbar logo.svg"
            alt="Zero Code"
            className="h-10 w-auto object-contain"
            width="150"
            height="40"
            // @ts-ignore
            fetchpriority="high"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-foreground/80 hover:text-primary transition-colors font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User Profile or CTA */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {isLoggedIn ? (
            <>
              {/* Notifications Dropdown */}
              <DropdownMenu onOpenChange={(open) => !open && markRead()}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted">
                    <Bell className="w-5 h-5 text-muted-foreground" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background animate-pulse"></span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-0" align="end">
                  <div className="p-4 border-b flex justify-between items-center bg-muted/20">
                    <h4 className="font-semibold text-sm">Notifications</h4>
                    {unreadCount > 0 && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{unreadCount} New</span>}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.length > 0 ? notifications.map((note, index) => (
                      <Link key={note.id || note._id || index} to={note.link || "#"} className={`flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b last:border-0 ${!note.read ? "bg-primary/5" : ""}`}>
                        <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!note.read ? "bg-background shadow-sm" : "bg-muted"}`}>
                          {getIcon(note.type)}
                        </div>
                        <div>
                          <h5 className={`text-sm ${!note.read ? "font-bold text-foreground" : "font-medium text-muted-foreground"}`}>{note.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.message}</p>
                          <span className="text-[10px] text-muted-foreground/70 mt-2 block">{new Date(note.timestamp).toLocaleDateString()}</span>
                        </div>
                      </Link>
                    )) : (
                      <div className="p-8 text-center text-muted-foreground text-sm">
                        No notifications yet.
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t text-center">
                    <Button variant="ghost" size="sm" className="text-xs w-full h-auto py-1" onClick={markRead}>Mark all as read</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors">
                    {studentPhoto ? (
                      <img src={studentPhoto} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{studentName}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Student Account
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to="/student-dashboard">
                      <DropdownMenuItem>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>ড্যাশবোর্ড</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/profile">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>প্রোফাইল</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/settings">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>সেটিংস</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/certificates">
                      <DropdownMenuItem>
                        <Award className="mr-2 h-4 w-4" />
                        <span>সার্টিফিকেট</span>
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>লগআউট</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/student-dashboard">
                <Button variant="ghost" size="default">
                  লগইন
                </Button>
              </Link>
              <Link to="/enroll">
                <Button variant="cta" size="default">
                  এনরোল করুন
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          {/* Mobile Bell (Only if Logged In) */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative p-1 hover:bg-transparent">
                  <Bell className="w-6 h-6 text-foreground" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background animate-pulse"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px] md:w-80 p-0 mr-4" align="end">
                <div className="p-4 border-b flex justify-between items-center bg-muted/20">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  {unreadCount > 0 && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">{unreadCount} New</span>}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? notifications.map((note, index) => (
                    <Link key={note.id || note._id || index} to={note.link || "#"} className={`flex gap-3 p-4 hover:bg-muted/50 transition-colors border-b last:border-0 ${!note.read ? "bg-primary/5" : ""}`}>
                      <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!note.read ? "bg-background shadow-sm" : "bg-muted"}`}>
                        {getIcon(note.type)}
                      </div>
                      <div>
                        <h5 className={`text-sm ${!note.read ? "font-bold text-foreground" : "font-medium text-muted-foreground"}`}>{note.title}</h5>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{note.message}</p>
                        <span className="text-[10px] text-muted-foreground/70 mt-2 block">{new Date(note.timestamp).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  )) : (
                    <div className="p-8 text-center text-muted-foreground text-sm">
                      No notifications yet.
                    </div>
                  )}
                </div>
                <div className="p-2 border-t text-center">
                  <Button variant="ghost" size="sm" className="text-xs w-full h-auto py-1" onClick={markRead}>Mark all as read</Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-lg border-t h-screen">
          <nav className="container-custom px-4 py-6 flex flex-col gap-4">
            {/* Mobile User Profile Section (Top) */}
            {isLoggedIn ? (
              <div className="bg-primary/5 rounded-xl p-4 mb-2 border border-primary/10">
                <div className="flex items-center gap-3 mb-4">
                  {studentPhoto ? (
                    <img src={studentPhoto} alt="Profile" className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-sm" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border-2 border-background shadow-sm">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="font-bold text-lg">{studentName}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Student</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link to="/student-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full justify-start gap-2 h-auto py-2 text-sm">
                      <LayoutDashboard className="w-4 h-4" /> ড্যাশবোর্ড
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full justify-start gap-2 h-auto py-2 text-sm">
                      <User className="w-4 h-4" /> প্রোফাইল
                    </Button>
                  </Link>
                  <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2 text-sm">
                      <Settings className="w-4 h-4" /> সেটিংস
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2 text-sm text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" /> লগআউট
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-card/50 rounded-xl p-5 mb-4 border border-border shadow-sm text-center space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground">যাত্রা শুরু করুন</h4>
                  <p className="text-xs text-muted-foreground">লগইন করুন অথবা নতুন করে শেখা শুরু করুন</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link to="/student-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      <User className="w-4 h-4" /> লগইন
                    </Button>
                  </Link>
                  <Link to="/enroll" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="cta" size="lg" className="w-full gap-2 shadow-lg shadow-primary/20">
                      <Award className="w-4 h-4" /> এনরোল করুন
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {!isLoggedIn && (
              <>
                <div className="h-px bg-border my-1" />

                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="text-foreground/80 hover:text-primary transition-colors font-medium py-3 text-lg border-b border-border/50 last:border-0 text-center"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
