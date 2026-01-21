import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Send } from 'lucide-react';
import { toast } from 'sonner';

interface CustomRequestDialogProps {
    projectTitle?: string;
}

const CustomRequestDialog = ({ projectTitle }: CustomRequestDialogProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        requirements: projectTitle ? `I am interested in customizing the "${projectTitle}" project.` : "",
        budget: '',
        deadline: '',
        type: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Generate WhatsApp Link
            const orderId = 'ZC-' + Math.floor(1000 + Math.random() * 9000); // Random ID
            const message = `Hi Zero Code, I have a custom request! 👋%0A%0A` +
                `*Order ID:* ${orderId}%0A` +
                `*Name:* ${formData.name}%0A` +
                `*Type:* ${formData.type}%0A` +
                `*Budget:* ${formData.budget}%0A` +
                `*Deadline:* ${formData.deadline}%0A` +
                `*Requirements:* ${formData.requirements}%0A%0A` +
                `Please get back to me. Thanks!`;

            const whatsappUrl = `https://api.whatsapp.com/send?phone=8801604710170&text=${message}`;

            // In a real app, save to backend here first
            await new Promise(resolve => setTimeout(resolve, 1000)); // Fake API call

            window.open(whatsappUrl, '_blank');
            setOpen(false);
            toast.success('Opening WhatsApp to send your request!');
            setFormData({ name: '', requirements: '', budget: '', deadline: '', type: '' });
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="lg" variant="secondary" className="font-bold gap-2 text-primary shadow-lg hover:shadow-xl transition-all scale-100 hover:scale-105">
                    <ShoppingBag className="w-5 h-5" /> কাস্টম অর্ডার অনুরোধ করুন
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>কাস্টম ওয়েবসাইট অনুরোধ</DialogTitle>
                    <DialogDescription>
                        আপনার প্রয়োজনের কথা বিস্তারিত জানান। আমরা আপনাকে হোয়াটসঅ্যাপে রিপ্লাই দিব।
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">আপনার নাম</Label>
                        <Input
                            id="name"
                            required
                            placeholder="Ex: Sunny"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="type">ওয়েবসাইট টাইপ</Label>
                        <Select onValueChange={(val) => setFormData({ ...formData, type: val })} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Custom Code (MERN)">Custom Code (MERN)</SelectItem>
                                <SelectItem value="WordPress">WordPress</SelectItem>
                                <SelectItem value="Framer">Framer</SelectItem>
                                <SelectItem value="University Project">University Project</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="budget">বাজেট (সম্ভাব্য)</Label>
                                <Input
                                    id="budget"
                                    placeholder="5k-10k"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deadline">সময়সীমা</Label>
                                <Input
                                    id="deadline"
                                    placeholder="7 days"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="req">বিস্তারিত (features, pages)</Label>
                        <Textarea
                            id="req"
                            required
                            placeholder="E.g. I need a portfolio with blog..."
                            value={formData.requirements}
                            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        />
                    </div>
                    <Button type="submit" className="w-full gap-2" disabled={loading}>
                        {loading ? 'Processing...' : (
                            <>Send Request via WhatsApp <Send className="w-4 h-4" /></>
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CustomRequestDialog;
