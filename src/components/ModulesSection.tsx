import { Link } from "react-router-dom";
import { Check, CheckCircle, Lock, Sparkles, ArrowRight, Layout, AppWindow, Database, Bot, Rocket, Cloud, Palette, Briefcase } from "lucide-react";
import { useModules } from "@/hooks/useContent";
// import { contentStore } from "@/lib/contentStore"; // Deprecated for this component (removed)
import { Module } from "@/data/modules";

const iconMap: Record<string, any> = {
  "Layout": Layout,
  "AppWindow": AppWindow,
  "Database": Database,
  "Bot": Bot,
  "Rocket": Rocket,
  "Cloud": Cloud,
  "Palette": Palette,
  "Briefcase": Briefcase
};

export const ModulesSection = () => {
  const { data: rawModules = [], isLoading } = useModules();

  // Map API data to UI format (attach Icons)
  const modules = rawModules.map((m: any) => ({
    ...m,
    icon: iconMap[m.iconName] || Layout,
    topics: m.topics || [] // Ensure topics array exists
  }));

  if (isLoading) return <div className="py-20 text-center">Loading modules...</div>;

  return (
    <section id="modules" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            কোর্স কারিকুলাম
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            মডিউল<span className="gradient-text">সমূহ</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            ধাপে ধাপে শিখুন — বিগিনার থেকে এডভান্সড পর্যন্ত
          </p>
        </div>

        {/* Modules Grid */}
        <div className="max-w-4xl mx-auto grid gap-4">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={`/module/${module.id}`}
              className="group bg-card border rounded-xl p-6 hover:shadow-lg transition-all hover:border-primary/30 block"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${module.available
                  ? "gradient-bg"
                  : "bg-muted relative overflow-hidden"
                  }`}>
                  <module.icon className={`w-6 h-6 ${module.available ? "text-primary-foreground" : "text-muted-foreground opacity-50"
                    }`} />
                  {!module.available && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {module.title}
                        {!module.available && (
                          <span className="ml-2 text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            আসছে শীঘ্রই
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {module.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.slice(0, 3).map((topic, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded"
                          >
                            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                              <Check className="w-2 h-2 text-white stroke-[3]" />
                            </div>
                            {topic}
                          </span>
                        ))}
                        {module.topics.length > 3 && (
                          <span className="text-xs text-primary">+{module.topics.length - 3} আরও</span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
