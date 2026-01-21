import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, ShoppingCart, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CustomRequestDialog from '@/components/marketplace/CustomRequestDialog';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

// Fallback Mock Data
const MOCK_PROJECTS = [
    {
        id: 'modern-saas-landing',
        title: 'Modern SaaS Landing Page',
        category: 'Custom Code',
        price: 5000,
        description: 'A high-converting, dark-mode SaaS landing page built with React and Tailwind CSS.',
        features: ['Responsive Design', 'Dark Mode', 'Framer Motion Animations', 'SEO Optimized'],
        deliveryTime: '3-5 Days',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200'
    }
    // Add more if needed
];

interface Project {
    _id: string;
    id: string; // for compatibility
    title: string;
    slug: string;
    category: string;
    price: number;
    originalPrice?: number;
    description: string;
    thumbnail: string;
    image?: string; // compatibility
    features?: string[];
    deliveryTime?: string;
}

const ProjectDetails = () => {
    const { projectSlug } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                // Try fetching from API first
                const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
                const res = await axios.get(`${apiUrl}/marketplace/${projectSlug}`);
                setProject(res.data);
            } catch (err) {
                // Fallback to mock if API fails or not found (for demo)
                const mock = MOCK_PROJECTS.find(p => p.id === projectSlug);
                if (mock) {
                    setProject({
                        ...mock,
                        _id: mock.id,
                        slug: mock.id,
                        image: mock.thumbnail,
                        price: mock.price,
                        originalPrice: 0,
                        description: mock.description
                    } as Project);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectSlug]);

    if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>;

    if (!project) {
        return (
            <div className="container-custom py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">প্রজেক্টটি পাওয়া যায়নি!</h1>
                <Link to="/marketplace"><Button variant="link">মার্কেটপ্লেসে ফিরে যান</Button></Link>
            </div>
        );
    }

    const handleBuyNow = () => {
        addToCart({
            id: project.slug || project.id || project._id,
            title: project.title,
            price: project.price,
            category: project.category,
            description: project.description,
            image: project.thumbnail || project.image || "",
            quantity: 1
        });
        navigate('/marketplace/checkout');
    };

    return (
        <div className="container-custom py-10 md:py-20 min-h-screen">
            <Link to="/marketplace">
                <Button variant="ghost" className="mb-6 pl-0 gap-2 hover:bg-transparent hover:text-primary">
                    <ArrowLeft className="w-4 h-4" /> ফিরে যান
                </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Images */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl overflow-hidden border bg-muted"
                    >
                        <img src={project.thumbnail || project.image} alt={project.title} className="w-full object-cover" />
                    </motion.div>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                        <p className="text-lg text-muted-foreground">{project.description}</p>
                    </div>

                    <div className="flex items-end gap-4">
                        <div className="text-4xl font-bold text-primary">৳{project.price.toLocaleString()}</div>
                        {project.originalPrice && (
                            <div className="text-xl text-muted-foreground line-through mb-1">৳{project.originalPrice.toLocaleString()}</div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <Button size="lg" className="flex-1 gap-2 text-lg font-bold shadow-lg shadow-primary/20" onClick={handleBuyNow}>
                            <ShoppingBag className="w-5 h-5" /> এখনই কিনুন
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 gap-2 text-lg"
                            onClick={() => {
                                addToCart({
                                    id: project.slug || project.id || project._id,
                                    title: project.title,
                                    price: project.price,
                                    category: project.category,
                                    description: project.description,
                                    image: project.thumbnail || project.image || "",
                                    quantity: 1
                                });
                                toast.success("কার্টে যোগ করা হয়েছে!");
                            }}
                        >
                            <ShoppingCart className="w-5 h-5" /> কার্টে যোগ
                        </Button>
                    </div>

                    {/* Custom Request info */}
                    <div className="bg-secondary/20 p-6 rounded-xl border space-y-4">
                        <h3 className="font-semibold text-lg">কাস্টম অর্ডার বা প্রশ্ন আছে?</h3>
                        <p className="text-sm text-muted-foreground">
                            আপনি যদি এই টেমপ্লেটটিতে কোনো পরিবর্তন চান বা কাস্টম রিকুয়্যারমেন্ট থাকে, তবে আমাদের সাথে সরাসরি কথা বলুন।
                        </p>
                        <CustomRequestDialog projectTitle={project.title} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="text-sm font-medium">ডেলিভারি টাইম</div>
                                <div className="text-sm text-muted-foreground">{project.deliveryTime || "3-5 দিন"}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <div className="text-sm font-medium">সাপোর্ট</div>
                                <div className="text-sm text-muted-foreground">লাইফটাইম সাপোর্ট</div>
                            </div>
                        </div>
                    </div>

                    {project.features && project.features.length > 0 && (
                        <div className="pt-4 border-t">
                            <h4 className="font-semibold text-sm mb-4">ফিচারসমূহ:</h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {project.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-sm">
                                            <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
