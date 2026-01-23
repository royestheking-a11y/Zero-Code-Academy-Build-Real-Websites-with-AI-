import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit, Trash2, Search, ExternalLink, RefreshCw, ShoppingCart, Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

// Project Interface
interface Project {
    _id?: string;
    title: string;
    slug: string;
    category: string;
    price: number;
    originalPrice?: number;
    description: string;
    thumbnail: string;
    demoUrl?: string;
    isFeatured: boolean;
    features?: string[];
    techStack?: string[];
}

export function MarketplaceManager() {
    const { toast } = useToast();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Form State
    const [formData, setFormData] = useState<Project>({
        title: "",
        slug: "",
        category: "Custom Code",
        price: 0,
        description: "",
        thumbnail: "",
        isFeatured: false,
        demoUrl: "",
        originalPrice: 0
    });
    const [uploading, setUploading] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${apiUrl}/marketplace`);
            setProjects(res.data);
        } catch (error) {
            toast({ title: "Error", description: "Falied to load projects", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            category: "Custom Code",
            price: 0,
            description: "",
            thumbnail: "",
            isFeatured: false,
            demoUrl: "",
            originalPrice: 0
        });
        setEditingProject(null);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) resetForm();
        setDialogOpen(open);
    };

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setFormData({ ...project });
        setDialogOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("আপনি কি নিশ্চিত যে এই প্রজেক্টটি ডিলিট করতে চান?")) return;
        try {
            await axios.delete(`${apiUrl}/marketplace/${id}`);
            toast({ title: "সফল", description: "প্রজেক্ট ডিলিট করা হয়েছে" });
            fetchProjects();
        } catch (error) {
            toast({ title: "ত্রুটি", description: "প্রজেক্ট ডিলিট করতে সমস্যা হয়েছে", variant: "destructive" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProject) {
                await axios.put(`${apiUrl}/marketplace/${editingProject._id}`, formData);
                toast({ title: "আপডেট", description: "প্রজেক্ট সফলভাবে আপডেট হয়েছে" });
            } else {
                // Auto-generate slug if dry
                if (!formData.slug) {
                    formData.slug = formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                }
                await axios.post(`${apiUrl}/marketplace`, formData);
                toast({ title: "তৈরি", description: "প্রজেক্ট সফলভাবে তৈরি হয়েছে" });
            }
            setDialogOpen(false);
            fetchProjects();
        } catch (error: any) {
            toast({ title: "ত্রুটি", description: error.response?.data?.message || "অপারেশন ব্যর্থ হয়েছে", variant: "destructive" });
        }
    };

    const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const res = await axios.post(`${apiUrl}/upload-image`, uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log("Upload response:", res.data);
            setFormData(prev => ({ ...prev, thumbnail: res.data.fileUrl }));
            toast({ title: "সফল", description: "থাম্বনেইল আপলোড হয়েছে!" });
        } catch (error) {
            console.error("Upload error:", error);
            toast({ title: "ত্রুটি", description: "আপলোড ব্যর্থ হয়েছে", variant: "destructive" });
        } finally {
            setUploading(false);
        }
    };

    const filteredProjects = projects.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">মার্কেটপ্লেস ম্যানেজার</h2>
                    <p className="text-muted-foreground">আপনার পণ্য এবং টেমপ্লেট ম্যানেজ করুন</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchProjects}><RefreshCw className="w-4 h-4" /></Button>
                    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
                        <DialogTrigger asChild>
                            <Button><Plus className="w-4 h-4 mr-2" /> প্রজেক্ট যুক্ত করুন</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{editingProject ? "প্রজেক্ট এডিট করুন" : "নতুন প্রজেক্ট যুক্ত করুন"}</DialogTitle>
                                <DialogDescription>মার্কেটপ্লেস আইটেমের বিস্তারিত তথ্য পূরণ করুন।</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>শিরোনাম (Title)</Label>
                                        <Input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>স্লাগ (Url ID)</Label>
                                        <Input placeholder="auto-generated-if-empty" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>ক্যাটাগরি</Label>
                                        <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Custom Code">Custom Code</SelectItem>
                                                <SelectItem value="WordPress">WordPress</SelectItem>
                                                <SelectItem value="Framer">Framer</SelectItem>
                                                <SelectItem value="University Project">University Project</SelectItem>
                                                <SelectItem value="Portfolio">Portfolio</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-3">
                                        <Label>প্রজেক্ট থাম্বনেইল</Label>

                                        {formData.thumbnail ? (
                                            <div className="relative rounded-xl overflow-hidden border-2 border-primary/20 aspect-video group shadow-sm hover:shadow-md transition-all">
                                                <img
                                                    src={formData.thumbnail}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="sm"
                                                        onClick={() => setFormData({ ...formData, thumbnail: '' })}
                                                        className="gap-2"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> রিমুভ করুন
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative border-2 border-dashed rounded-xl p-8 hover:bg-muted/50 transition-colors text-center cursor-pointer group border-muted-foreground/25 hover:border-primary/50">
                                                <input
                                                    type="file"
                                                    onChange={handleThumbnailUpload}
                                                    accept="image/*"
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    disabled={uploading}
                                                />
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        {uploading ? (
                                                            <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                                                        ) : (
                                                            <ImageIcon className="w-6 h-6 text-primary" />
                                                        )}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {uploading ? "আপলোড হচ্ছে..." : "ছবি আপলোড করতে ক্লিক করুন"}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            SVG, PNG, JPG or GIF (max. 20MB)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>মূল্য (৳)</Label>
                                        <Input type="number" required value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>আসল মূল্য (অপশনাল)</Label>
                                        <Input type="number" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: Number(e.target.value) })} />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>বিবরণ (Description)</Label>
                                    <Textarea required className="min-h-[100px]" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </div>

                                <div className="space-y-2">
                                    <Label>ডেমো URL</Label>
                                    <Input placeholder="https://..." value={formData.demoUrl} onChange={e => setFormData({ ...formData, demoUrl: e.target.value })} />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch checked={formData.isFeatured} onCheckedChange={c => setFormData({ ...formData, isFeatured: c })} id="featured" />
                                    <Label htmlFor="featured">হোমপেজে ফিচার করুন</Label>
                                </div>

                                <DialogFooter>
                                    <Button type="submit">{editingProject ? "আপডেট করুন" : "তৈরি করুন"}</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Search */}
            <div className="bg-card border rounded-xl p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="প্রজেক্ট খুঁজুন..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-20">লোড হচ্ছে...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                        <Card key={project._id} className="overflow-hidden">
                            <div className="aspect-video bg-muted relative">
                                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 flex gap-1">
                                    {project.isFeatured && (
                                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>
                                    )}
                                    <span className="bg-background/80 backdrop-blur text-xs px-2 py-1 rounded-full border">{project.category}</span>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="line-clamp-1 text-lg">{project.title}</CardTitle>
                                </div>
                                <div className="text-lg font-bold text-primary">
                                    ৳{project.price}
                                    {project.originalPrice && <span className="text-sm text-muted-foreground line-through ml-2">৳{project.originalPrice}</span>}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t pt-4">
                                <Button variant="ghost" size="sm" onClick={() => window.open(`/marketplace/project/${project.slug}`, '_blank')}>
                                    <ExternalLink className="w-4 h-4 mr-1" /> দেখুন
                                </Button>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(project._id!)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
