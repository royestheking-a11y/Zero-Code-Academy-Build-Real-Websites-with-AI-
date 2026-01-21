import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowRight, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const CartPage = () => {
    const { cart, removeFromCart, cartTotal, clearCart } = useCart();
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);

    const [loading, setLoading] = useState(false);

    const handleApplyCoupon = async () => {
        if (!coupon.trim()) return;
        setLoading(true);
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
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="container-custom py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <ShoppingBag className="w-20 h-20 text-muted-foreground/30 mb-6" />
                <h2 className="text-2xl font-bold mb-2">আপনার কার্ট খালি</h2>
                <p className="text-muted-foreground mb-8">মনে হচ্ছে আপনি এখনও কোনো টেমপ্লেট যোগ করেননি।</p>
                <Link to="/marketplace">
                    <Button>মার্কেটপ্লেস ব্রাউজ করুন</Button>
                </Link>
            </div>
        );
    }

    const finalTotal = cartTotal - discount;

    return (
        <div className="container-custom py-10 md:py-20 min-h-screen">
            <Link to="/marketplace">
                <Button variant="ghost" className="mb-6 pl-0 gap-2">
                    <ArrowRight className="w-4 h-4 rotate-180" /> ফিরে যান
                </Button>
            </Link>

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">শপিং কার্ট ({cart.length})</h1>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-muted-foreground hover:text-destructive gap-2"
                >
                    <Trash2 className="w-4 h-4" /> কার্ট খালি করুন
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-4 p-4 border rounded-xl bg-card hover:shadow-sm transition-all relative group"
                        >
                            <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.category}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="font-bold text-primary">৳{item.price.toLocaleString()}</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="bg-white/80 hover:bg-white text-destructive hover:text-red-700 shadow-sm opacity-0 group-hover:opacity-100 transition-all absolute top-2 right-2 rounded-full w-8 h-8"
                                onClick={() => removeFromCart(item.id)}
                                title="সরিয়ে ফেলুন"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </motion.div>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="lg:col-span-1">
                    <div className="bg-muted/30 p-6 rounded-xl border sticky top-24 space-y-6">
                        <h3 className="font-bold text-xl">অর্ডার সামারি</h3>

                        {/* Coupon Input */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="কুপন কোড"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <Button onClick={handleApplyCoupon}>Apply</Button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">সাবটোটাল</span>
                                <span>৳{cartTotal.toLocaleString()}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>ডিসকাউন্ট</span>
                                    <span>-৳{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="border-t my-2" />
                            <div className="flex justify-between font-bold text-lg">
                                <span>সর্বমোট</span>
                                <span>৳{finalTotal.toLocaleString()}</span>
                            </div>
                        </div>

                        <Link to="/marketplace/checkout">
                            <Button size="lg" className="w-full gap-2 font-bold text-md shadow-lg shadow-primary/20">
                                চেকআউট করুন <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>

                        <div className="text-xs text-center text-muted-foreground">
                            সিকিউর চেকআউট (বিকাশ/নগদ/রকেট)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
