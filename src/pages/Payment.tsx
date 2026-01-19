import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Copy,
    CheckCircle,
    Check,
    ShieldCheck,
    Lock,
    ArrowRight,
    AlertCircle,
    BadgeCheck
} from "lucide-react";

type PaymentMethodType = "bkash" | "nagad" | "rocket";

const PAYMENT_METHODS = [
    {
        id: "bkash",
        name: "bKash",
        title: "bKash Personal",
        icon: "/Bkash.jpg",
        color: "bg-[#e2136e]",
        textColor: "text-white",
        instructionNumber: "01625691878",
    },
    {
        id: "nagad",
        name: "Nagad",
        title: "Nagad Personal",
        icon: "/Nagad.jpg",
        color: "bg-[#f7941d]",
        textColor: "text-white",
        instructionNumber: "01625691878",
    },
    {
        id: "rocket",
        name: "Rocket",
        title: "Rocket Personal",
        icon: "/Rocket.png",
        color: "bg-[#8c3494]",
        textColor: "text-white",
        instructionNumber: "01625691878",
    }
] as const;

import { useAddNotification, useCreateEnrollment } from "@/hooks/useContent";

export default function Payment() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const addNotificationMutation = useAddNotification();
    const createEnrollmentMutation = useCreateEnrollment();

    const studentData = location.state?.studentData;
    const [refCode, setRefCode] = useState("");
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>("bkash");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!studentData) {
            navigate("/enroll");
            return;
        }
        // Generate a cleaner, shorter code for easier typing if needed, but random is fine.
        const code = "ZC-" + Math.floor(100000 + Math.random() * 900000);
        setRefCode(code);
    }, [studentData, navigate]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "কপি হয়েছে", description: "টেক্সট ক্লিপবোর্ডে কপি করা হয়েছে" });
    };

    const handleConfirm = async () => {
        if (!selectedMethod) return;

        setIsSubmitting(true);

        const enrollmentData = {
            name: studentData.name,
            email: studentData.email,
            mobile: studentData.mobile,
            packageName: studentData.packageName,
            packageId: studentData.packageId,
            price: studentData.price,
            originalPrice: studentData.originalPrice,
            discount: studentData.discount || 0,
            coupon: studentData.coupon,
            paymentMethod: selectedMethod,
            referenceCode: refCode,
            status: "pending" as const,
            enrolledAt: new Date().toISOString()
        };

        console.log('=== ENROLLMENT DEBUG ===');
        console.log('Enrollment Data:', enrollmentData);

        try {
            console.log('Calling createEnrollmentMutation...');
            const result = await createEnrollmentMutation.mutateAsync(enrollmentData);
            console.log('Enrollment saved successfully:', result);

            // Trigger Notification
            await addNotificationMutation.mutateAsync({
                userId: studentData.email,
                type: 'payment',
                title: 'পেমেন্ট জমা হয়েছে',
                message: `আপনার পেমেন্ট ভেরিফিকেশনের জন্য জমা হয়েছে। শীঘ্রই কনফার্মেশন পাবেন। (TrxID: ${refCode})`,
                link: '/profile',
                read: false,
                timestamp: new Date().toISOString()
            });

            toast({
                title: "পেমেন্ট সফলভাবে জমা হয়েছে!",
                description: "রেফারেন্স কোড ভেরিফাই করে আপনার কোর্স চালু করে দেওয়া হবে।",
                className: "bg-green-600 text-white border-none"
            });
            navigate("/");
        } catch (error: any) {
            console.error('Enrollment error:', error);
            console.error('Error response:', error.response?.data);
            toast({
                title: "ত্রুটি",
                description: error.response?.data?.message || "এনরোলমেন্ট সম্পন্ন করতে সমস্যা হয়েছে",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!studentData) return null;

    const activeMethod = PAYMENT_METHODS.find(m => m.id === selectedMethod);

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-background">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container-custom max-w-6xl mx-auto px-4">
                    {/* Security Badge - Top */}
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium border border-green-500/20">
                            <Lock className="w-4 h-4" />
                            Secure SSL Encrypted Connection
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* LEFT: Order Summary & Trust (4 cols) */}
                        <div className="lg:col-span-4 space-y-6">
                            {/* Order Card */}
                            <div className="bg-white dark:bg-card border rounded-2xl shadow-sm overflow-hidden">
                                <div className="bg-primary/5 p-6 border-b border-primary/10">
                                    <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                                        <BadgeCheck className="w-5 h-5 fill-primary/20" />
                                        অর্ডার সামারি
                                    </h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">প্রোডাক্ট</p>
                                        <p className="font-medium text-foreground">{studentData.packageName || "Zero Code Course"}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-t pt-4">
                                        <span className="text-muted-foreground">কোর্স রেগুলার ফি</span>
                                        <span className="line-through text-muted-foreground">৳{studentData.originalPrice || 25000}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">অফার প্রাইস</span>
                                        <span>৳{(studentData.price + (studentData.discount || 0))}</span>
                                    </div>
                                    {studentData.coupon && studentData.discount > 0 && (
                                        <div className="flex justify-between items-center text-sm text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
                                            <span className="flex items-center gap-1">
                                                <BadgeCheck className="w-4 h-4" />
                                                কুপন ({studentData.coupon})
                                            </span>
                                            <span className="font-bold">-৳{studentData.discount}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-4 border-t">
                                        <span className="font-bold text-lg">সর্বমোট</span>
                                        <span className="font-bold text-2xl text-primary">৳{studentData.price}</span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 dark:bg-secondary/20 p-4 text-center border-t">
                                    <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
                                        <ShieldCheck className="w-3 h-3 text-primary" />
                                        100% মানি ব্যাক গ্যারান্টি (৭ দিন)
                                    </p>
                                </div>
                            </div>

                            {/* Trust Signals */}
                            <div className="bg-white dark:bg-card border rounded-2xl p-6 shadow-sm hidden lg:block">
                                <h4 className="font-medium mb-4 text-sm text-muted-foreground uppercase tracking-wider text-center">Secure Payment Partners</h4>
                                <div className="flex items-center justify-center gap-6 transition-all duration-300">
                                    <img src="/Bkash.jpg" alt="bKash" className="h-8 object-contain" />
                                    <img src="/Nagad.jpg" alt="Nagad" className="h-8 object-contain" />
                                    <img src="/Rocket.png" alt="Rocket" className="h-8 object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Payment Gateway (8 cols) */}
                        <div className="lg:col-span-8">
                            <div className="bg-white dark:bg-card border rounded-2xl shadow-lg ring-1 ring-border/50">
                                {/* Header */}
                                <div className="p-6 md:p-8 border-b">
                                    <h1 className="text-2xl font-bold text-foreground mb-2">পেমেন্ট মেথড সিলেক্ট করুন</h1>
                                    <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                                        {PAYMENT_METHODS.map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setSelectedMethod(method.id as PaymentMethodType)}
                                                className={`relative flex-1 min-w-[100px] p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-2
                                                    ${selectedMethod === method.id
                                                        ? `border-${method.id === 'bkash' ? 'pink-500' : method.id === 'nagad' ? 'orange-500' : 'purple-500'} bg-gray-50 dark:bg-secondary/30 shadow-sm`
                                                        : "border-transparent hover:bg-secondary hover:border-muted-foreground/20 bg-secondary/10"
                                                    }
                                                `}
                                                style={{
                                                    borderColor: selectedMethod === method.id ?
                                                        (method.id === 'bkash' ? '#e2136e' : method.id === 'nagad' ? '#f7941d' : '#8c3494') : undefined
                                                }}
                                            >
                                                <div className={`w-3 h-3 rounded-full absolute top-3 right-3 border-2 
                                                    ${selectedMethod === method.id ? `bg-current border-current` : "border-muted-foreground"}
                                                `}
                                                    style={{ color: selectedMethod === method.id ? (method.id === 'bkash' ? '#e2136e' : method.id === 'nagad' ? '#f7941d' : '#8c3494') : undefined }}
                                                />
                                                <img src={method.icon} alt={method.name} className="h-8 w-8 object-contain rounded-full" />
                                                <span className="font-bold text-sm tracking-wide">{method.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Body */}
                                {activeMethod && (
                                    <div className="p-6 md:p-8">
                                        <div className={`rounded-xl p-6 mb-8 text-white relative overflow-hidden shadow-lg ${activeMethod.color}`}>
                                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div>
                                                    <p className="text-white/80 text-sm font-medium mb-1">{activeMethod.name} Personal Number</p>
                                                    <h2 className="text-3xl font-mono font-bold tracking-wide">{activeMethod.instructionNumber}</h2>
                                                </div>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleCopy(activeMethod.instructionNumber)}
                                                    className="bg-white text-black hover:bg-white/90 font-bold border-none"
                                                >
                                                    <Copy className="w-4 h-4 mr-2" />
                                                    কপি করুন
                                                </Button>
                                            </div>
                                            {/* decorative circle */}
                                            <div className="absolute -right-10 -bottom-20 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                                        </div>

                                        <div className="space-y-8">
                                            {/* Instructions with Reference Code Focus */}
                                            <div className="space-y-6">
                                                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                                                    <p className="text-sm font-medium text-foreground mb-1">এই রেফারেন্স কোডটি ব্যবহার করুন</p>
                                                    <p className="text-xs text-muted-foreground mb-3">টাকা পাঠানোর সময় <span className="font-bold text-primary">Reference</span> হিসেবে এই কোডটি লিখুন</p>

                                                    <div className="flex items-center justify-center gap-3 bg-white dark:bg-card border-2 border-dashed border-primary/30 p-4 rounded-lg w-fit mx-auto cursor-pointer hover:border-primary/50 transition-colors"
                                                        onClick={() => handleCopy(refCode)}>
                                                        <span className="text-3xl font-bold text-primary tracking-wider font-mono">{refCode}</span>
                                                        <Copy className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                </div>

                                                <div className="grid gap-4">
                                                    <h3 className="font-bold flex items-center gap-2 text-foreground text-lg">
                                                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">i</span>
                                                        কীভাবে পেমেন্ট করবেন?
                                                    </h3>
                                                    <div className="bg-muted/30 rounded-xl p-6 space-y-3 text-sm">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                                                                <Check className="w-3 h-3 text-white stroke-[3]" />
                                                            </div>
                                                            <span>আপনার <strong>{activeMethod.name} App</strong> ওপেন করে <strong>Send Money</strong> সিলেক্ট করুন (Cash Out নয়)</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                                                                <Check className="w-3 h-3 text-white stroke-[3]" />
                                                            </div>
                                                            <span>উপরে দেওয়া নাম্বারে <strong>৳{studentData.price}</strong> পাঠান</span>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
                                                                <Check className="w-3 h-3 text-white stroke-[3]" />
                                                            </div>
                                                            <span>Reference এর জায়গায় <strong className="font-mono text-primary bg-primary/10 px-1 rounded">{refCode}</strong> কোডটি লিখুন</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-4">
                                                    <Button
                                                        onClick={handleConfirm}
                                                        size="xl"
                                                        className="w-full text-lg gap-2 shadow-lg shadow-primary/20"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? "যাচাই করা হচ্ছে..." : "পেমেন্ট সম্পন্ন"}
                                                        <ArrowRight className="w-5 h-5" />
                                                    </Button>
                                                    <p className="text-center text-xs text-muted-foreground mt-3">
                                                        ক্লিক করার পর আপনার এনরোলমেন্ট যাচাই করা হবে। রেফারেন্স কোড যাচাই সম্পন্ন হলে সাধারণত 10 মিনিটের মধ্যেই অ্যাকাউন্ট অ্যাপ্রুভ করা হবে।
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Help Box */}
                                            <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900 rounded-xl p-4 flex items-start gap-3">
                                                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" />
                                                <div className="text-sm">
                                                    <p className="font-bold text-orange-800 dark:text-orange-400">সাহায্য প্রয়োজন?</p>
                                                    <p className="text-orange-700 dark:text-orange-500/80 mt-1">
                                                        পেমেন্ট নিয়ে কোনো সমস্যা হলে আমাদের হেল্পলাইনে যোগাযোগ করুন অথবা WhatsApp-এ মেসেজ দিন।
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
