import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Code, Layout, Layers } from 'lucide-react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface Project {
    _id: string;
    slug: string;
    title: string;
    category: string;
    price: number;
    thumbnail: string;
    techStack: string[];
}

const CategoryPage = () => {
    const { categoryId } = useParams();
    const categoryName = categoryId?.replace(/-/g, ' ');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                const res = await axios.get(`${apiUrl}/marketplace`);

                // Filter client side for now (or backend support ?category=x)
                // Mapping URL id (e.g. 'custom-code') to DB Category (e.g. 'Custom Code')
                const allProjects = res.data;
                const filtered = allProjects.filter((p: any) => {
                    if (!categoryId || categoryId === 'all') return true;
                    // Loose match: 'Custom Code' -> 'custom-code'
                    const dbCat = p.category.toLowerCase().replace(/ /g, '-');
                    return dbCat.includes(categoryId.toLowerCase());
                });

                setProjects(filtered);
            } catch (error) {
                console.error("Failed to load projects", error);
                toast.error("প্রজেক্ট লোড করতে সমস্যা হয়েছে");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, [categoryId]);

    const displayProjects = projects;


    return (
        <div className="container-custom py-10 md:py-20 min-h-screen">
            <Link to="/marketplace">
                <Button variant="ghost" className="mb-8 gap-2 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back to Marketplace
                </Button>
            </Link>

            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 capitalize">{categoryName} Websites</h1>
                <p className="text-muted-foreground text-lg">Browse our premium collection of {categoryName} templates.</p>
            </div>

            {loading ? (
                <div className="text-center py-20">লোড হচ্ছে...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayProjects.map((project, idx) => (
                        <motion.div
                            key={project._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-card rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                            {/* Thumbnail */}
                            <div className="relative aspect-video overflow-hidden bg-muted">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border">
                                    {project.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack?.map(t => (
                                        <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-secondary rounded-sm font-medium text-secondary-foreground">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 flex items-center justify-between border-t">
                                    <div>
                                        <p className="text-xs text-muted-foreground">Starting from</p>
                                        <p className="text-xl font-bold text-primary">৳{project.price.toLocaleString()}</p>
                                    </div>
                                    <Link to={`/marketplace/project/${project.slug}`}>
                                        <Button size="sm" className="gap-2">
                                            View Details <ExternalLink className="w-3 h-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && displayProjects.length === 0 && (
                <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed">
                    <p className="text-muted-foreground">No specific templates found for this category yet.</p>
                    <Link to="/marketplace">
                        <Button variant="link">Browse all templates</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
