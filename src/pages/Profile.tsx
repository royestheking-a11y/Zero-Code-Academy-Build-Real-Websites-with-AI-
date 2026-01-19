import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, Mail, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const session = localStorage.getItem("studentSession");
        if (!session) {
            navigate("/login");
            return;
        }
        const userData = JSON.parse(session);
        setUser(userData);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("studentSession");
        window.dispatchEvent(new Event("storage"));
        toast({ title: "লগআউট সফল", description: "আপনাকে লগআউট করা হয়েছে।" });
        navigate("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-20">
                <div className="container-custom max-w-4xl mx-auto px-4 space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
                        <Button variant="outline" className="text-destructive" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" /> লগআউট
                        </Button>
                    </div>

                    <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 h-32"></div>
                        <div className="px-8 pb-8 -mt-16">
                            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                                {/* Auto-Generated Avatar */}
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-2xl border-4 border-background bg-muted shadow-xl overflow-hidden">
                                        {user.photo ? (
                                            <img
                                                src={user.photo}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-purple-500/20">
                                                <User className="w-16 h-16 text-primary" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6 w-full">
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">পুরো নাম</label>
                                        <div className="text-2xl font-bold mt-1">{user.name}</div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <Mail className="w-4 h-4" /> ইমেইল
                                            </label>
                                            <div className="text-lg mt-1">{user.email}</div>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-muted-foreground">রোল</label>
                                            <div className="text-lg mt-1 capitalize">{user.role || "Student"}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                        <h3 className="font-semibold mb-2">স্টুডেন্ট আইডি</h3>
                        <p className="font-mono bg-background px-3 py-1 rounded inline-block border">
                            STU-{user.id?.slice(-4) || Math.floor(Math.random() * 10000)}
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
