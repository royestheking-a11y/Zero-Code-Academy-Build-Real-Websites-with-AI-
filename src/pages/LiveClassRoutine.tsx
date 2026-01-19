import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, BookOpen, ExternalLink, AlertCircle } from "lucide-react";
import { useRoutine } from "@/hooks/useContent";
import { Link } from "react-router-dom";

export default function LiveClassRoutine() {
    const { data: routines = [] } = useRoutine();


    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-20 container-custom">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                <Video className="w-8 h-8 text-primary" /> লাইভ ক্লাস রুটিন
                            </h1>
                            <p className="text-muted-foreground">আপনার সব লাইভ ক্লাসের সময়সূচী এবং জয়েনিং লিংক</p>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Calendar className="w-4 h-4" /> Google Calendar এ যোগ করুন
                        </Button>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10 flex gap-4 items-start">
                        <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                        <div>
                            <h4 className="font-semibold text-primary mb-1">গুরুত্বপূর্ণ নোট</h4>
                            <p className="text-sm text-muted-foreground">ক্লাস শুরু হওয়ার ১০ মিনিট আগে জয়েন লিংক অ্যাক্টিভ হবে। কোনো কারণে ক্লাস মিস করলে রেকর্ডিং মডিউল সেকশনে পাবেন।</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {routines.length > 0 ? routines.map((routine) => (
                            <div key={routine.id} className="bg-card border rounded-xl p-6 hover:shadow-md transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-start gap-6">
                                        <div className="flex flex-col items-center justify-center p-4 bg-secondary/50 rounded-xl min-w-[100px] text-center">
                                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{new Date(routine.date || new Date()).toLocaleString('default', { month: 'short' })}</span>
                                            <span className="text-3xl font-bold text-foreground my-1">{new Date(routine.date || new Date()).getDate()}</span>
                                            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{routine.day}</span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <span className="flex items-center gap-1.5 text-sm font-medium bg-accent/10 text-accent px-3 py-1 rounded-full border border-accent/20">
                                                    <Clock className="w-3.5 h-3.5" /> {routine.time}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold">{routine.topic}</h3>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-2">
                                                    <Video className="w-4 h-4" /> {routine.platform}
                                                </span>
                                                {routine.link && (
                                                    <a href={routine.link} target="_blank" className="flex items-center gap-1 hover:text-primary hover:underline">
                                                        <ExternalLink className="w-3 h-3" /> Meeting Link
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 min-w-[140px]">
                                        <Button variant="cta" onClick={() => window.open(routine.link, '_blank')}>
                                            ক্লাসে জয়েন করুন
                                        </Button>
                                        {/* Future: Add View Module Link if mapped */}
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link to="/student-dashboard">ড্যাশবোর্ডে ফিরে যান</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
                                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <h3 className="text-xl font-medium text-muted-foreground">বর্তমানে কোনো ক্লাস শিডিউল নেই</h3>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
