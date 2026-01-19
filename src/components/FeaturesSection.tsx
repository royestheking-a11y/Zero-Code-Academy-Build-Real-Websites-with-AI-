import { Link } from "react-router-dom";
import { Sparkles, FolderKanban, Briefcase, Server, Users, ShoppingCart, Zap, Globe } from "lucide-react";
import { useFeatures } from "@/hooks/useContent";

const iconMap: Record<string, any> = {
  "Sparkles": Sparkles,
  "FolderKanban": FolderKanban,
  "Briefcase": Briefcase,
  "Server": Server,
  "Users": Users,
  "ShoppingCart": ShoppingCart,
  "Zap": Zap,
  "Globe": Globe
};

export const FeaturesSection = () => {
  const { data: rawFeatures = [] } = useFeatures();

  // Map API data to UI format
  const features = rawFeatures.map((f: any) => ({
    ...f,
    icon: iconMap[f.iconName] || Sparkles
  }));

  return (
    <section id="features" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            আমাদের ফিচার্স
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            আমরা কী <span className="gradient-text">দিচ্ছি</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            সম্পূর্ণ কোর্সে আপনি যা যা পাবেন
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link
              key={feature.id}
              to={`/feature/${feature.id}`}
              className="group bg-card p-6 rounded-2xl border shadow-sm card-hover block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
