import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Moon, Globe } from "lucide-react";
import { useState } from "react";

export default function Settings() {
    const [notifications, setNotifications] = useState(true);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-20 container-custom">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h1 className="text-3xl font-bold">সেটিংস</h1>

                    <div className="space-y-6">
                        {/* Account Security */}
                        <div className="bg-card border rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-primary" /> পাসওয়ার্ড ও নিরাপত্তা
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium block mb-2">বর্তমান পাসওয়ার্ড</label>
                                    <Input type="password" placeholder="********" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium block mb-2">নতুন পাসওয়ার্ড</label>
                                        <Input type="password" placeholder="********" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block mb-2">কনফার্ম পাসওয়ার্ড</label>
                                        <Input type="password" placeholder="********" />
                                    </div>
                                </div>
                                <Button className="mt-2">পাসওয়ার্ড পরিবর্তন করুন</Button>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="bg-card border rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-primary" /> অ্যাপ সেটিংস
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                                            <Bell className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">নোটিফিকেশন</p>
                                            <p className="text-sm text-muted-foreground">ইমেইল এবং পুশ নোটিফিকেশন পান</p>
                                        </div>
                                    </div>
                                    <Switch checked={notifications} onCheckedChange={setNotifications} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Moon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium">ডার্ক মোড</p>
                                            <p className="text-sm text-muted-foreground">অ্যাপের থিম পরিবর্তন করুন</p>
                                        </div>
                                    </div>
                                    <Switch />
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
