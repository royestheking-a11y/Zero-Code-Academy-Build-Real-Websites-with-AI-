import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { CheckCircle, CreditCard, Banknote, Rocket, Upload, FileText, Copy } from 'lucide-react';

const CheckoutPage = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [attachment, setAttachment] = useState<string | null>(null);
    // Generate unique reference code
    const [paymentRef] = useState(`REF-${Math.floor(1000 + Math.random() * 9000)}`);

    // Coupon State
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponLoading, setCouponLoading] = useState(false);

    const handleApplyCoupon = async () => {
        if (!coupon.trim()) return;
        setCouponLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const res = await axios.get(`${apiUrl}/coupons`);
            const coupons = res.data;

            const matchedCoupon = coupons.find((c: any) =>
                c.code === coupon.trim().toUpperCase() &&
                c.isActive &&
                (c.scope === 'marketplace' || c.scope === 'global')
            );

            if (matchedCoupon) {
                setDiscount(matchedCoupon.discountAmount);
                toast.success(`কুপন কোড অ্যাপ্লাই করা হয়েছে! (৳${matchedCoupon.discountAmount} ছাড়)`);
            } else {
                setDiscount(0);
                toast.error("ভুল কুপন কোড বা এই সার্ভিসের জন্য প্রযোজ্য নয়!");
            }
        } catch (error) {
            console.error(error);
            toast.error("কুপন যাচাই করা সম্ভব হয়নি।");
        } finally {
            setCouponLoading(false);
        }
    };

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        paymentMethod: 'bkash'
    });

    useEffect(() => {
        const session = localStorage.getItem("studentSession");
        if (session) {
            try {
                const data = JSON.parse(session);
                setFormData(prev => ({
                    ...prev,
                    name: data.name || '',
                    email: data.email || ''
                }));
            } catch (e) {
                console.error("Failed to parse session", e);
            }
        }
    }, []);

    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        if (!orderPlaced && cart.length === 0) {
            navigate('/marketplace', { replace: true });
        }
    }, [cart, navigate, orderPlaced]);

    if (cart.length === 0 && !orderPlaced) {
        return null;
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Basic validation
        if (file.size > 20 * 1024 * 1024) {
            toast.error("ফাইলের সাইজ ২০MB এর নিচে হতে হবে।");
            return;
        }

        setUploading(true);
        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            // Use the generic upload endpoint
            const res = await axios.post(`${apiUrl}/upload`, uploadData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setAttachment(res.data.fileUrl);
            toast.success("ফাইল আপলোড হয়েছে!");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("ফাইল আপলোড ব্যর্থ হয়েছে।");
        } finally {
            setUploading(false);
        }
    };

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                customerName: formData.name,
                whatsapp: formData.whatsapp,
                email: formData.email,
                address: "Digital Delivery",
                orderType: 'Template',
                items: cart.map(i => ({ projectId: i.id, title: i.title, price: i.price })),
                totalPrice: cartTotal - discount,
                paymentMethod: formData.paymentMethod,
                paymentStatus: 'Pending',
                status: 'Processing',
                paymentReference: paymentRef,
                // Map attachment to the files structure in schema or a custom field
                // Since schema has 'files', we use that
                files: attachment ? [{ name: 'Custom Requirement', url: attachment }] : []
            };

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            await axios.post(`${apiUrl}/orders`, orderData);

            setOrderPlaced(true); // Prevent redirect loop
            clearCart();
            // Invalidate notifications to show the new order alert immediately
            queryClient.invalidateQueries({ queryKey: ['notifications'] });

            toast.success('অর্ডার সফল হয়েছে!');

            navigate('/marketplace/order-success', { state: { orderId: 'ZC-' + Date.now().toString().slice(-6) } });

        } catch (error) {
            console.error('Order failed:', error);
            toast.error('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-custom py-10 md:py-20 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <Link to="/marketplace/cart">
                    <Button variant="ghost" className="mb-4 pl-0">
                        ← কার্টে ফিরে যান
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold mb-8 text-center">চেকআউট</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form */}
                    <div className="space-y-6">
                        <div className="bg-card p-6 rounded-xl border">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">১</span>
                                আপনার তথ্য
                            </h3>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">পুরো নাম</Label>
                                    <Input
                                        id="name"
                                        required
                                        placeholder="আপনার নাম লিখুন"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="whatsapp">হোয়াটসঅ্যাপ নম্বর</Label>
                                    <Input
                                        id="whatsapp"
                                        required
                                        placeholder="01XXXXXXXXX"
                                        value={formData.whatsapp}
                                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">ইমেইল</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder="example@gmail.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div className="bg-card p-6 rounded-xl border">
                            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-primary" />
                                কাস্টম রিকুয়্যারমেন্ট (যদি থাকে)
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4">
                                আপনি যদি কোনো পরিবর্তন চান, তবে PDF বা Text ফাইল আপলোড করুন। অ্যাডমিন এটি রিসিভ করবে।
                            </p>

                            <div className="grid gap-2">
                                <div className="relative border-2 border-dashed rounded-lg p-6 hover:bg-muted/50 transition-colors text-center cursor-pointer">
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept=".pdf,.txt,.doc,.docx,.png,.jpg"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        {uploading ? (
                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                                        ) : attachment ? (
                                            <>
                                                <FileText className="w-8 h-8 text-green-500" />
                                                <span className="text-sm font-medium text-green-700">ফাইল আপলোড হয়েছে!</span>
                                                <span className="text-xs text-muted-foreground break-all">{attachment.split('/').pop()}</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-muted-foreground" />
                                                <span className="text-sm text-muted-foreground">ফাইল সিলেক্ট করুন (PDF/Text)</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-blue-800">
                            <strong>নোট:</strong> এটি একটি ডিজিটাল প্রোডাক্ট। ক্রয়ের পর হোয়াটসঅ্যাপে বা মেইলে ডেলিভারি পাবেন।
                        </div>
                    </div>

                    {/* Payment & Summary */}
                    <div className="space-y-6">
                        <div className="bg-card p-6 rounded-xl border">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">২</span>
                                পেমেন্ট মেথড
                            </h3>
                            <RadioGroup defaultValue="bkash" onValueChange={v => setFormData({ ...formData, paymentMethod: v })}>
                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                                    <RadioGroupItem value="bkash" id="bkash" />
                                    <Label htmlFor="bkash" className="flex-1 cursor-pointer font-medium">বিকাশ (Personal)</Label>
                                    <img src="/Bkash.jpg" alt="bKash" className="h-8 w-auto object-contain" />
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                                    <RadioGroupItem value="nagad" id="nagad" />
                                    <Label htmlFor="nagad" className="flex-1 cursor-pointer font-medium">নগদ (Personal)</Label>
                                    <img src="/Nagad.jpg" alt="Nagad" className="h-8 w-auto object-contain" />
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/50 cursor-pointer">
                                    <RadioGroupItem value="rocket" id="rocket" />
                                    <Label htmlFor="rocket" className="flex-1 cursor-pointer font-medium">রকেট (Personal)</Label>
                                    <img src="/Rocket.png" alt="Rocket" className="h-8 w-auto object-contain" />
                                </div>
                            </RadioGroup>

                            <div className="mt-6 p-4 bg-yellow-50/80 border border-yellow-200 rounded-lg space-y-4">
                                <h4 className="font-semibold text-sm text-yellow-800 flex items-center gap-2">
                                    <Banknote className="w-4 h-4" /> পেমেন্ট ইন্সট্রাকশন
                                </h4>

                                <div className="space-y-3">
                                    <div className="flex flex-col gap-1 bg-white p-3 rounded border border-yellow-100">
                                        <span className="text-xs text-muted-foreground">এই নাম্বারে Send Money করুন:</span>
                                        <div className="flex items-center justify-between">
                                            <code className="text-lg font-bold text-red-600">01625691878</code>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 px-2 text-xs gap-1 hover:text-primary"
                                                onClick={() => {
                                                    navigator.clipboard.writeText("01625691878");
                                                    toast.success("নাম্বার কপি হয়েছে!");
                                                }}
                                            >
                                                <Copy className="w-3 h-3" /> কপি
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 bg-white p-3 rounded border border-yellow-100">
                                        <span className="text-xs text-muted-foreground">রেফারেন্স কোড (Reference):</span>
                                        <div className="flex items-center justify-between">
                                            <code className="text-lg font-bold text-primary">{paymentRef}</code>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-6 px-2 text-xs gap-1 hover:text-primary"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(paymentRef);
                                                    toast.success("রেফারেন্স কোড কপি হয়েছে!");
                                                }}
                                            >
                                                <Copy className="w-3 h-3" /> কপি
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-red-600 font-medium text-center bg-red-50 p-2 rounded">
                                    পেমেন্ট করার সময় অবশ্যই এই রেফারেন্স কোডটি ব্যবহার করুন এবং পেমেন্ট শেষে অর্ডার কনফার্ম করুন।
                                </p>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-6 rounded-xl border">
                            <h3 className="font-semibold mb-4">অর্ডার সামারি</h3>
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between text-sm mb-2">
                                    <span className="truncate max-w-[200px]">{item.title}</span>
                                    <span>৳{item.price.toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="border-t my-2 pt-2 flex justify-between font-bold text-lg">
                                <span>সর্বমোট</span>
                                <span className="text-primary">৳{(cartTotal - discount).toLocaleString()}</span>
                            </div>

                            {/* Coupon Section */}
                            <div className="mt-4 pt-4 border-t space-y-3">
                                <Label>কুপন কোড</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter Code"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                        disabled={discount > 0}
                                    />
                                    <Button onClick={handleApplyCoupon} disabled={couponLoading || !coupon || discount > 0} variant="outline">
                                        {couponLoading ? "Checking..." : discount > 0 ? "Applied" : "Apply"}
                                    </Button>
                                </div>
                                {discount > 0 && (
                                    <div className="text-green-600 text-sm font-medium flex justify-between">
                                        <span>ডিসকাউন্ট অ্যাপ্লাইড!</span>
                                        <span>-৳{discount}</span>
                                    </div>
                                )}
                            </div>

                            <Button
                                className="w-full mt-6"
                                size="lg"
                                onClick={handleOrder}
                                disabled={loading || !formData.name || !formData.whatsapp || uploading}
                            >
                                {loading ? 'প্রসেসিং...' : 'অর্ডার কনফার্ম করুন'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
