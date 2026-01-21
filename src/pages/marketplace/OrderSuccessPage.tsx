import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, PartyPopper } from 'lucide-react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const OrderSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.state?.orderId || 'Unknown';

    useEffect(() => {
        // Confetti Effect
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const random = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: random(0.1, 0.3), y: random(0.1, 0.3) } });
            confetti({ ...defaults, particleCount, origin: { x: random(0.7, 0.9), y: random(0.1, 0.3) } });
        }, 250);

        const redirectTimer = setTimeout(() => {
            navigate('/student-dashboard');
        }, 12000); // 12 seconds auto redirect

        return () => {
            clearInterval(interval);
            clearTimeout(redirectTimer);
        }
    }, [navigate]);

    // Minimal delay protection if user wants to see it for X seconds before *automatic* redirect (optional)
    // But better to let user choose when to leave. 

    return (
        <div className="container-custom py-20 min-h-screen flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">অর্ডার সফল হয়েছে!</h1>
            <p className="text-muted-foreground mb-4 text-lg">
                আপনার অর্ডার আইডি: <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded">{orderId}</span>
            </p>
            <p className="max-w-lg text-muted-foreground mb-8 leading-relaxed">
                আমরা আপনার অর্ডার পেয়েছি। আমাদের টিম পেমেন্ট এবং ডেলিভারি কনফার্মেশনের জন্য শীঘ্রই আপনার সাথে হোয়াটসঅ্যাপে যোগাযোগ করবে।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link to="/student-dashboard">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">ড্যাশবোর্ডে যান</Button>
                </Link>
                <Link to="/marketplace">
                    <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">আরও কিনুন</Button>
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
