import {
    LayoutDashboard,
    Users,
    BookOpen,
    Settings,
    LogOut,
    FileText,
    Calendar,
    Menu,
    Video,
    Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AdminSidebarProps {
    activeView: string;
    onNavigate: (view: string) => void;
    onLogout: () => void;
}

const SidebarContent = ({ activeView, onNavigate, onLogout }: AdminSidebarProps) => {
    const menuItems = [
        { id: "dashboard", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
        { id: "enrollments", label: "এনরোলমেন্টস", icon: Users },
        { id: "modules", label: "কোর্স মডিউল", icon: BookOpen },
        { id: "features", label: "ফিচার্স", icon: FileText },
        { id: "pricing", label: "প্রাইসিং", icon: Settings },
        { id: "routine", label: "রুটিন", icon: Calendar },
        { id: "demo-videos", label: "ডেমো ভিডিও", icon: Video },
        { id: "coupons", label: "কুপন", icon: Tag },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 px-4 space-y-2 py-4">
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        variant={activeView === item.id ? "secondary" : "ghost"}
                        className={`w-full justify-start gap-4 text-base ${activeView === item.id ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
                            }`}
                        onClick={() => onNavigate(item.id)}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Button>
                ))}
            </div>

            <div className="px-4 mt-auto py-4">
                <div className="bg-muted/50 rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium">অ্যাডমিন</p>
                    <p className="text-xs text-muted-foreground">admin@zerocode.com</p>
                </div>
                <Button
                    variant="outline"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={onLogout}
                >
                    <LogOut className="w-4 h-4" />
                    লগআউট
                </Button>
            </div>
        </div>
    );
};

export const AdminSidebar = ({ activeView, onNavigate, onLogout }: AdminSidebarProps) => {
    const [open, setOpen] = useState(false);

    const handleMobileNavigate = (view: string) => {
        onNavigate(view);
        setOpen(false);
    };

    const handleMobileLogout = () => {
        onLogout();
        setOpen(false);
    }

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="w-64 bg-card border-r h-screen fixed left-0 top-0 flex flex-col pt-6 pb-6 z-40 hidden lg:flex">
                <SidebarContent activeView={activeView} onNavigate={onNavigate} onLogout={onLogout} />
            </div>

            {/* Mobile Sidebar Trigger */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="bg-background">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 pt-10 w-72">
                        <SidebarContent activeView={activeView} onNavigate={handleMobileNavigate} onLogout={handleMobileLogout} />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
};
