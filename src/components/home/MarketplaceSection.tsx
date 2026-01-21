import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface Project {
    _id: string;
    title: string;
    slug: string;
    category: string;
    price: number;
    description: string;
    thumbnail: string;
}

const MarketplaceSection = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                const res = await axios.get(`${apiUrl}/marketplace?featured=true`);
                setFeaturedProjects(res.data.slice(0, 3)); // Show top 3
            } catch (err) {
                console.error("Failed to fetch featured projects");
            }
        };
        fetchFeatured();
    }, []);

    const handleBuyNow = (project: Project) => {
        addToCart({
            id: project.slug,
            title: project.title,
            price: project.price,
            category: project.category,
            description: project.description,
            image: project.thumbnail,
            quantity: 1
        });
        navigate('/marketplace/checkout');
    };

    return (
        <section className="py-20 bg-secondary/30 relative overflow-hidden" id="marketplace-preview">
            <div className="container-custom relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                        মার্কেটপ্লেস
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        প্রিমিয়াম <span className="gradient-text">ওয়েবসাইট মার্কেটপ্লেস</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        সময় বাঁচাতে চান? এক্সপার্টদের তৈরি করা রেডিমেড হাই-কোয়ালিটি ওয়েবসাইট কিনুন।
                    </p>
                </div>

                <div className="flex justify-end mb-8">
                    <Link to="/marketplace">
                        <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 font-bold">
                            স্টোর ভিজিট করুন <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {featuredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredProjects.map((project, idx) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-background rounded-xl overflow-hidden border hover:border-primary/50 transition-all shadow-sm hover:shadow-lg group flex flex-col"
                            >
                                <div className="aspect-video bg-muted relative overflow-hidden">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-background/90 backdrop-blur text-foreground text-xs font-bold px-2 py-1 rounded-md border shadow-sm">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 line-clamp-1">{project.title}</h3>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{project.description}</p>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-bold text-primary">৳{project.price.toLocaleString()}</span>
                                        <Link to={`/marketplace/project/${project.slug}`}>
                                            <Button variant="link" className="h-auto p-0 text-xs">বিস্তারিত দেখুন</Button>
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            onClick={() => {
                                                addToCart({
                                                    id: project.slug,
                                                    title: project.title,
                                                    price: project.price,
                                                    category: project.category,
                                                    description: project.description,
                                                    image: project.thumbnail,
                                                    quantity: 1
                                                });
                                                toast.success("কার্টে যোগ করা হয়েছে!");
                                            }}
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-1" /> কার্টে যোগ
                                        </Button>
                                        <Button size="sm" className="w-full" onClick={() => handleBuyNow(project)}>
                                            <ShoppingBag className="w-4 h-4 mr-1" /> কিনুন
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 border border-dashed rounded-xl">
                        <p className="text-muted-foreground">এখনও কোনো ফিচারড প্রজেক্ট নেই। মার্কেটপ্লেসে দেখুন।</p>
                        <Link to="/marketplace" className="mt-4 inline-block">
                            <Button variant="outline">সব প্রজেক্ট দেখুন</Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MarketplaceSection;
