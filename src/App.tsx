import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import Enroll from "./pages/Enroll";
import FeatureDetail from "./pages/FeatureDetail";
import ModuleDetail from "./pages/ModuleDetail";
import Admin from "./pages/Admin";
import StudentDashboard from "./pages/StudentDashboard";
import NotFound from "./pages/NotFound";

import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Certificates from "./pages/Certificates";
import LiveClassRoutine from "./pages/LiveClassRoutine";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import Login from "./pages/Login";
import { AIChatbot } from "./components/AIChatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div onContextMenu={(e) => e.preventDefault()}>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
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

            {/* Legal & Auth Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/login" element={<Login />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <AIChatbot />
      </div>
    </TooltipProvider>
  </QueryClientProvider >
);

export default App;
