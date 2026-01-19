import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, Lock, Download, Share2 } from "lucide-react";

export default function Certificates() {
    const certificates = [
        {
            id: 1,
            title: "Zero Code Foundation",
            description: "Completed Modules 1-4",
            date: "N/A",
            status: "locked", // locked, unlocked
        },
        {
            id: 2,
            title: "Full Stack Zero Code Developer",
            description: "Completed All Modules",
            date: "N/A",
            status: "locked",
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-28 pb-20 container-custom">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold mb-4">আপনার সার্টিফিকেটসমূহ 🎓</h1>
                        <p className="text-muted-foreground">কোর্স সম্পন্ন করে অফিশিয়াল ভেরিফাইড সার্টিফিকেট অর্জন করুন</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {certificates.map((cert) => (
                            <div key={cert.id} className={`border rounded-2xl p-8 relative overflow-hidden ${cert.status === 'locked' ? 'bg-muted/30 border-dashed' : 'bg-card border-solid shadow-md'}`}>
                                {cert.status === 'locked' && (
                                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center z-10">
                                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                                            <Lock className="w-8 h-8" />
                                        </div>
                                        <p className="font-semibold text-muted-foreground">এখনও আনলক হয়নি</p>
                                        <p className="text-sm text-muted-foreground mt-1 text-center max-w-xs">{cert.description} শেষ করুন</p>
                                    </div>
                                )}

                                <div className="flex flex-col items-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-warning/10 rounded-full flex items-center justify-center text-warning mb-2">
                                        <Award className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-xl font-bold">{cert.title}</h3>
                                    <p className="text-sm text-muted-foreground">Zero Code Bangla Hub Official Certification</p>

                                    <div className="w-full h-px bg-border my-4" />

                                    <div className="flex gap-3 w-full">
                                        <Button className="flex-1" variant="outline" disabled={cert.status === 'locked'}>
                                            <Download className="w-4 h-4 mr-2" /> PDF ডাউনলোড
                                        </Button>
                                        <Button className="flex-1" variant="outline" disabled={cert.status === 'locked'}>
                                            <Share2 className="w-4 h-4 mr-2" /> শেয়ার
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
