import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { AIChatbot } from "./components/AIChatbot";
import { Loader2 } from "lucide-react";
import { usePushSubscription } from "./hooks/usePushSubscription";

// Critical Pages (Static Import for faster LCP)
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Lazy Loaded Pages (Code Splitting)
const Demo = lazy(() => import("./pages/Demo"));
const Enroll = lazy(() => import("./pages/Enroll"));
const FeatureDetail = lazy(() => import("./pages/FeatureDetail"));
const ModuleDetail = lazy(() => import("./pages/ModuleDetail"));
const Admin = lazy(() => import("./pages/Admin"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const Payment = lazy(() => import("./pages/Payment"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));
const Certificates = lazy(() => import("./pages/Certificates"));
const LiveClassRoutine = lazy(() => import("./pages/LiveClassRoutine"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));

// Marketplace
const MarketplaceLayout = lazy(() => import("./pages/marketplace/MarketplaceLayout"));
const MarketplaceHome = lazy(() => import("./pages/marketplace/MarketplaceHome"));
const CategoryPage = lazy(() => import("./pages/marketplace/CategoryPage"));
const ProjectDetails = lazy(() => import("./pages/marketplace/ProjectDetails"));
const CartPage = lazy(() => import("./pages/marketplace/CartPage"));
const CheckoutPage = lazy(() => import("./pages/marketplace/CheckoutPage"));
const OrderSuccessPage = lazy(() => import("./pages/marketplace/OrderSuccessPage"));

const queryClient = new QueryClient();

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      <p className="text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

const PushSubscriptionWrapper = () => {
  const { isSubscribed, subscribeToPush } = usePushSubscription();

  useEffect(() => {
    // Auto-prompt after 5 seconds if not subscribed
    if (!isSubscribed) {
      const timer = setTimeout(() => {
        // You can make this conditional or a manual button in settings
        // For now, we'll try to subscribe automatically (browser will handle permission prompt)
        subscribeToPush();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubscribed]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div onContextMenu={(e) => e.preventDefault()}>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <PushSubscriptionWrapper />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/feature/:featureId" element={<FeatureDetail />} />
            <Route path="/module/:moduleId" element={<ModuleDetail />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/:section" element={<Admin />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/payment" element={<Payment />} />

            {/* Dashboard Pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/live-routine" element={<LiveClassRoutine />} />

            {/* Marketplace Routes */}
            <Route path="/marketplace" element={<MarketplaceLayout />}>
              <Route index element={<MarketplaceHome />} />
              <Route path="category/:categoryId" element={<CategoryPage />} />
              <Route path="project/:projectSlug" element={<ProjectDetails />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-success" element={<OrderSuccessPage />} />
            </Route>

            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <AIChatbot />
      </div>
    </TooltipProvider>
  </QueryClientProvider >
);

export default App;
