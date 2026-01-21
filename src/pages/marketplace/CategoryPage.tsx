import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Code, Layout, Layers } from 'lucide-react';

// Mock Data (Replace with API call later)
const MOCK_PROJECTS = [
    {
        id: '1',
        slug: 'modern-saas-landing',
        title: 'Modern SaaS Landing Page',
        category: 'custom-code',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        tech: ['React', 'Tailwind', 'Framer Motion']
    },
    {
        id: '2',
        slug: 'university-portal',
        title: 'University Management Portal',
        category: 'university-projects',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
        tech: ['MERN Stack', 'Redux']
    },
    {
        id: '3',
        slug: 'creative-portfolio',
        title: 'Creative Agency Portfolio',
        category: 'framer',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
        tech: ['Framer', 'No-Code']
    },
    {
        id: '4',
        slug: 'ecommerce-store',
        title: 'Fashion E-commerce Store',
        category: 'wordpress',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1472851294608-415105022054?auto=format&fit=crop&q=80&w=800',
        tech: ['WordPress', 'WooCommerce']
    },
    {
        id: '5',
        slug: 'tech-blog-pro',
        title: 'Tech Blog Pro',
        category: 'custom-code',
        price: 4000,
        image: 'https://images.unsplash.com/photo-1499750310159-525446b08ef5?auto=format&fit=crop&q=80&w=800',
        tech: ['Next.js', 'MDX']
    }
];

const CategoryPage = () => {
    const { categoryId } = useParams();
    const categoryName = categoryId?.replace(/-/g, ' ');

    // Filter projects (loose matching for mock)
    const projects = MOCK_PROJECTS.filter(p =>
        categoryId === 'all' ||
        p.category === categoryId ||
        (categoryId === 'custom-code' && p.category === 'custom-code') || // Strict-ish
        true // JUST SHOW ALL FOR DEMO if filter empty
    ).filter(p => categoryId === 'all' ? true : p.category.includes(categoryId || ''));

    // If "custom-code" selected, show only custom code. For demo, showing mix if only few.
    // Let's refine mock logic:
    const filteredProjects = MOCK_PROJECTS.filter(p => !categoryId || categoryId === 'all' || p.category === categoryId);
    // Fallback to showing all if none match just so the page isn't empty during dev
    const displayProjects = filteredProjects.length > 0 ? filteredProjects : MOCK_PROJECTS;


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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProjects.map((project, idx) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-card rounded-2xl overflow-hidden border hover:shadow-xl transition-all duration-300 flex flex-col"
                    >
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden bg-muted">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-3 right-3 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold border">
                                {project.category.replace('-', ' ')}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map(t => (
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

            {filteredProjects.length === 0 && (
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
