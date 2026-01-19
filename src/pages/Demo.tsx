import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Play, CheckCircle, ArrowRight, X, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useDemoVideos } from "@/hooks/useContent";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Demo() {
  const { data: demoVideos = [] } = useDemoVideos();
  const [playingVideo, setPlayingVideo] = useState<any | null>(null);

  // useEffect removed as query handles data fetching

  // Helper to extract ID
  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Course Demo"
        description="Watch demo videos of Zero Code Academy. See how you can build apps with AI."
        keywords={["Demo video", "Course preview", "Zero Code demo"]}
      />
      <Header />

      <main className="pt-28 pb-20">
        <div className="container-custom">
          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              ডেমো ভিডিও
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              দেখুন কিভাবে <span className="gradient-text">Zero Code</span> কাজ করে
            </h1>
            <p className="text-lg text-muted-foreground">
              AI টুলস ব্যবহার করে কিভাবে প্রফেশনাল অ্যাপ তৈরি করা যায় — সরাসরি দেখুন
            </p>
          </div>

          {/* Main Demo Video (Featured - using the first one or hardcoded featured) */}
          <div className="max-w-4xl mx-auto mb-16">
            <div
              className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border-2 border-primary/20 flex items-center justify-center relative overflow-hidden group cursor-pointer"
              onClick={() => setPlayingVideo(demoVideos[0] || null)}
            >
              <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors" />
              {demoVideos.length > 0 && demoVideos[0].youtubeUrl ? (
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeID(demoVideos[0].youtubeUrl)}/maxresdefault.jpg`}
                  alt="Main Demo"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity"
                />
              ) : null}

              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform z-10">
                <Play className="w-10 h-10 text-primary-foreground ml-1" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <p className="text-lg font-bold text-foreground mb-1">
                  {demoVideos.length > 0 ? demoVideos[0].title : "Zero Code সম্পূর্ণ পরিচিতি"}
                </p>
                <p className="text-muted-foreground text-sm">
                  {demoVideos.length > 0 ? "ক্লিক করে ভিডিওটি দেখুন" : "২৫ মিনিটের সম্পূর্ণ ওভারভিউ"}
                </p>
              </div>
            </div>
          </div>

          {/* Demo Videos Grid */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">প্রজেক্ট ডেমো</h2>
            {demoVideos.length === 0 ? (
              <div className="text-center py-12 bg-card border rounded-xl">
                <p className="text-muted-foreground">কোনো ভিডিও পাওয়া যায়নি।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                    onClick={() => setPlayingVideo(video)}
                  >
                    <div className="aspect-video bg-muted relative flex items-center justify-center overflow-hidden">
                      {video.youtubeUrl ? (
                        <img
                          src={`https://img.youtube.com/vi/${getYouTubeID(video.youtubeUrl)}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=No+Thumbnail")}
                        />
                      ) : (
                        <span className="text-4xl">{video.thumbnail}</span>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                      </div>
                      {video.duration && (
                        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded">
                          {video.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-bold text-foreground mb-2 line-clamp-2 leading-tight">{video.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{video.description}</p>
                      <Button variant="outline" size="sm" className="w-full gap-2 mt-auto group-hover:bg-primary group-hover:text-primary-foreground border-primary/20">
                        <Play className="w-3 h-3" /> ভিডিও দেখুন
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* What You'll Learn */}
          <div className="bg-secondary/30 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">কোর্সে যা শিখবেন</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "AI টুলস দিয়ে কোডিং",
                "রিয়েল প্রজেক্ট তৈরি",
                "ডাটাবেস ইন্টিগ্রেশন",
                "ইউজার অথেন্টিকেশন",
                "পেমেন্ট গেটওয়ে",
                "হোস্টিং ও ডিপ্লয়মেন্ট",
                "ফ্রিল্যান্সিং গাইড",
                "ক্লায়েন্ট ম্যানেজমেন্ট",
                "SaaS ডেভেলপমেন্ট"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 bg-card p-4 rounded-lg border">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-500/20">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              প্রস্তুত? এখনই শুরু করুন!
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              মাত্র ৯৯৯৳ দিয়ে লাইফটাইম অ্যাক্সেস পান। ৪৫০০+ শিক্ষার্থী ইতিমধ্যে জয়েন করেছেন।
            </p>
            <Link to="/enroll">
              <Button variant="cta" size="xl" className="group">
                এখনই এনরোল করুন
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      {/* Video Player Modal */}
      <Dialog open={!!playingVideo} onOpenChange={(open) => !open && setPlayingVideo(null)}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none">
          <DialogTitle className="sr-only">{playingVideo?.title || "Video Player"}</DialogTitle>
          <DialogDescription className="sr-only">{playingVideo?.description || "Demo video playback"}</DialogDescription>
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            {playingVideo && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${getYouTubeID(playingVideo.youtubeUrl)}?autoplay=1&rel=0`}
                title={playingVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            <button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors z-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {playingVideo && (
            <div className="p-4 bg-card">
              <h3 className="font-bold text-lg mb-1">{playingVideo.title}</h3>
              <p className="text-sm text-muted-foreground">{playingVideo.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
