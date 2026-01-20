import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Command, Ghost } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="container relative z-10 px-4 text-center">
        <div className="inline-block p-4 mb-4 rounded-full bg-secondary/30 backdrop-blur-md border border-white/5 shadow-2xl animate-float">
          <Ghost className="w-16 h-16 text-muted-foreground/50 mx-auto" strokeWidth={1.5} />
        </div>

        <h1 className="text-8xl md:text-9xl font-black mb-2 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 select-none">
          404
        </h1>

        <div className="space-y-2 mb-8 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Link to="/">
            <Button size="lg" className="group gap-2 min-w-[160px]">
              <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Return Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="group gap-2 min-w-[160px]">
              <Command className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              Report Issue
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-xs text-muted-foreground/40 font-mono">
          E: {location.pathname}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
