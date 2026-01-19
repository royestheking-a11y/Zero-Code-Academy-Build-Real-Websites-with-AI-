import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";
import { useLogin } from "@/hooks/useContent";

const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();

    useEffect(() => {
        // Check if already logged in
        const session = localStorage.getItem("studentSession");
        if (session) {
            navigate("/student-dashboard");
        }
    }, [navigate]);

    const { mutate: login, isPending } = useLogin();

    const getDeviceId = () => {
        let deviceId = localStorage.getItem("device_id");
        if (!deviceId) {
            deviceId = typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `device-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            localStorage.setItem("device_id", deviceId);
        }
        return deviceId;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const deviceId = getDeviceId();

        login({ email, deviceId }, {
            onSuccess: (data) => {
                // Save session to localStorage for persistence
                const sessionData = {
                    name: data.user.name,
                    email: data.user.email,
                    id: data.user.id,
                    photo: data.user.photo || "",
                    role: data.user.role
                };
                localStorage.setItem("studentSession", JSON.stringify(sessionData));

                // Dispatch storage event to update Header immediately
                window.dispatchEvent(new Event("storage"));

                toast({
                    title: "স্বাগতম!",
                    description: "সফলভাবে লগইন করা হয়েছে",
                });

                navigate("/student-dashboard");
            },
            onError: (error: any) => {
                toast({
                    variant: "destructive",
                    title: "ত্রুটি",
                    description: error.response?.data?.message || "লগইন করতে সমস্যা হচ্ছে",
                });
            }
        });
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <SEO
                title="Student Login"
                description="Login to your Zero Code Academy student account to access course modules and resources."
            />
            <Header />
            <main className="flex-1 flex items-center justify-center py-24 px-4">
                <div className="w-full max-w-md bg-card border rounded-2xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LogIn className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold">স্টুডেন্ট লগইন</h1>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">ইমেইল</label>
                            <Input
                                type="email"
                                placeholder="আপনার ইমেইল দিন"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                            লগইন করুন
                        </Button>

                        <div className="text-center text-sm text-muted-foreground mt-4">
                            <p>অ্যাকাউন্ট নেই? <a href="/enroll" className="text-primary hover:underline font-medium">এনরোল করুন</a></p>
                            <p className="text-xs mt-2 opacity-70">এনরোল করার পর আপনার অ্যাকাউন্ট অ্যাপ্রুভ হলে লগইন করতে পারবেন।</p>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Login;
