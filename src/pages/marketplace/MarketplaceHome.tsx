import { motion } from 'framer-motion';
import { ShoppingBag, Code, Layout, Layers, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CustomRequestDialog from '@/components/marketplace/CustomRequestDialog';

const categories = [
    {
        id: 'custom-code',
        title: 'কাস্টম কোড ওয়েবসাইট',
        description: 'React, Next.js, Node.js দিয়ে তৈরি সম্পূর্ণ কাস্টম ওয়েবসাইট।',
        icon: <Code className="w-8 h-8 text-blue-500" />,
        color: 'bg-blue-500/10 border-blue-500/20',
        link: '/marketplace/category/custom-code',
        badge: 'Professional'
    },
    {
        id: 'wordpress',
        title: 'ওয়ার্ডপ্রেস ওয়েবসাইট',
        description: 'এলিমেন্টর এবং কাস্টম থিম দিয়ে তৈরি সহজ ম্যানেজেবল সাইট।',
        icon: <Layout className="w-8 h-8 text-green-500" />,
        color: 'bg-green-500/10 border-green-500/20',
        link: '/marketplace/category/wordpress',
        badge: 'Business'
    },
    {
        id: 'framer',
        title: 'ফ্রেমার ওয়েবসাইট',
        description: 'হাই-কোয়ালিটি অ্যানিমেশন এবং মডার্ন ডিজাইনের পোর্টফোলিও।',
        icon: <Layers className="w-8 h-8 text-purple-500" />,
        color: 'bg-purple-500/10 border-purple-500/20',
        link: '/marketplace/category/framer',
        badge: 'Creative'
    }
];

const MarketplaceHome = () => {
    return (
        <div className="container-custom py-10 md:py-20 min-h-screen">
            <Link to="/">
                <Button variant="ghost" className="mb-6 pl-0 gap-2">
                    <ArrowLeft className="w-4 h-4" /> ফিরে যান ( হোম )
                </Button>
            </Link>

            {/* Hero Section */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                >
                    জিরো কোড মার্কেটপ্লেস
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
                >
                    আপনার জন্য প্রস্তুত ওয়েবসাইট কিনুন
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-muted-foreground"
                >
                    ফ্রেশার, স্টুডেন্ট, বিজনেস — সবাই নিজের প্রয়োজন অনুযায়ী কাস্টমাইজ করে নিতে পারবেন। আজই পছন্দ করুন এবং অর্ডার করুন!
                </motion.p>
            </div>

            {/* Filter / Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className={`p-8 rounded-2xl border ${cat.color} hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden`}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-500">
                            {cat.icon}
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="w-14 h-14 rounded-xl bg-background flex items-center justify-center shadow-sm">
                                {cat.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{cat.title}</h3>
                                <p className="text-sm text-muted-foreground mt-2">{cat.description}</p>
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                                <span className="text-xs font-semibold px-2 py-1 bg-background/50 rounded-md border">{cat.badge}</span>
                                <Link to={cat.link}>
                                    <Button size="sm" className="gap-2 group-hover:translate-x-1 transition-transform">
                                        ব্রাউজ করুন <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Call to Action - Custom Request */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-gradient-to-br from-primary/90 to-blue-600 p-8 md:p-12 text-center text-primary-foreground shadow-xl overflow-hidden relative"
            >
                <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl md:text-4xl font-bold">খুঁজে পাচ্ছেন না আপনার পছন্দের ডিজাইন?</h2>
                    <p className="text-primary-foreground/80 text-lg">
                        আমাদের জানান আপনার কি প্রয়োজন। আমরা আপনার বাজেটের মধ্যে কাস্টম ওয়েবসাইট তৈরি করে দিব।
                    </p>
                    <CustomRequestDialog />
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </motion.div>
        </div>
    );
};

export default MarketplaceHome;
