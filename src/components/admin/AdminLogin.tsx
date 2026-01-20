import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
    onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock auth
        if (email === "admin@zerocode.com" && password === "zerocode889") {
            onLogin();
            toast({ title: "সফল!", description: "অ্যাডমিন প্যানেলে স্বাগতম" });
        } else {
            toast({
                title: "ত্রুটি",
                description: "ভুল ইমেইল বা পাসওয়ার্ড",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="bg-card border rounded-2xl shadow-xl p-8 w-full max-w-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />

                <div className="text-center mb-8">
                    <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground">অ্যাডমিন লগইন</h1>
                    <p className="text-muted-foreground mt-2">অ্যাডমিন প্যানেল এক্সেস করতে লগইন করুন</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="email"
                                placeholder="ইমেইল"
                                className="pl-10 h-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                type="password"
                                placeholder="পাসওয়ার্ড"
                                className="pl-10 h-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="cta" size="lg" className="w-full mt-6">
                        লগইন করুন
                    </Button>
                </form>


            </div>
        </div>
    );
};
