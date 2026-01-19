import { useEffect, useState } from "react";

const tools = [
  { name: "Cursor", logo: "https://www.cursor.com/brand/icon.svg" },
  { name: "Lovable", logo: "https://lovable.dev/favicon.ico" },
  { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { name: "Claude", logo: "https://upload.wikimedia.org/wikipedia/commons/7/77/Anthropic_logo.svg" },
  { name: "Gemini", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" },
  { name: "Bolt", logo: "https://bolt.new/favicon.ico" },
  { name: "v0", logo: "https://v0.dev/favicon.ico" },
  { name: "Replit", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Replit_logo.png" },
  { name: "GitHub Copilot", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/GitHub_Copilot_logo.svg" },
  { name: "n8n", logo: "https://avatars.githubusercontent.com/u/45166094?s=200&v=4" },
  { name: "Make", logo: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_269e38819580175d71c1bd56d11f77d3/make.png" },
  { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Framer", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Framer_logo.svg/1200px-Framer_logo.svg.png" },
  { name: "VS Code", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" },
  { name: "Antigravity", logo: "https://cdn-icons-png.flaticon.com/512/3212/3212567.png" },
  { name: "Supabase", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Supabase_Logo.svg" },
  { name: "MongoDB", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
];

export const ToolsCarousel = () => {
  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container-custom mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            আমাদের টুলস
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            যে <span className="gradient-text">AI টুলস</span> শেখানো হয়
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ইন্ডাস্ট্রি স্ট্যান্ডার্ড AI এবং অটোমেশন টুলস দিয়ে আপনাকে তৈরি করা হবে
          </p>
        </div>
      </div>

      {/* Infinite Scroll Animation */}
      <div className="relative">
        <div className="flex animate-scroll hover:pause-animation">
          {[...tools, ...tools, ...tools, ...tools].map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex-shrink-0 mx-6 group"
            >
              <div className="bg-card border rounded-2xl p-6 w-40 h-40 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1">
                <div className="w-16 h-16 bg-background rounded-xl flex items-center justify-center p-2">
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${tool.name}&background=1D4ED8&color=fff`;
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground text-center">
                  {tool.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
