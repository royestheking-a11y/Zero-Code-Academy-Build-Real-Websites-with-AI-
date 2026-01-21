import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import {
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  MoreHorizontal
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

// Admin Components
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ModulesManager } from "@/components/admin/content/ModulesManager";
import { FeaturesManager } from "@/components/admin/content/FeaturesManager";
import { PricingManager } from "@/components/admin/content/PricingManager";
import { RoutineManager } from "@/components/admin/content/RoutineManager";
import DemoManager from "@/components/admin/content/DemoManager";
import { CouponManager } from "@/components/admin/content/CouponManager";
import { MarketplaceManager } from "@/components/admin/content/MarketplaceManager";
import AdminOrders from "@/components/admin/content/AdminOrders";

// Hooks
import { useEnrollments, useUpdateEnrollment, useDeleteEnrollment, Enrollment, useOrders, useMarketplaceProjects } from "@/hooks/useContent";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

export default function Admin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { section } = useParams();

  // Use React Query hooks for enrollments
  const { data: enrollments = [], refetch: refetchEnrollments } = useEnrollments();
  const { data: orders = [] } = useOrders();
  const { data: projects = [] } = useMarketplaceProjects();

  const updateEnrollmentMutation = useUpdateEnrollment();
  const deleteEnrollmentMutation = useDeleteEnrollment();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");

  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Sync activeView with URL param
    if (section) {
      setActiveView(section);
    } else {
      setActiveView("dashboard");
    }

    // Check local storage for auth
    const storedAuth = localStorage.getItem("admin_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, [section]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("admin_auth", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
    toast({ title: "লগআউট", description: "সফলভাবে লগআউট করা হয়েছে" });
    navigate("/");
  };

  const handleNavigate = (view: string) => {
    navigate(`/admin/${view}`);
  };

  const updateStatus = async (id: string, status: Enrollment["status"]) => {
    try {
      await updateEnrollmentMutation.mutateAsync({ id, status });
      toast({ title: "সফল!", description: "স্ট্যাটাস আপডেট হয়েছে" });
    } catch (error) {
      toast({ title: "ত্রুটি", description: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে", variant: "destructive" });
    }
  };

  const deleteEnrollment = async (id: string) => {
    setEnrollmentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!enrollmentToDelete) return;
    setIsDeleting(true);
    try {
      await deleteEnrollmentMutation.mutateAsync(enrollmentToDelete);
      toast({
        title: "সফলভাবে মুছে ফেলা হয়েছে!",
        description: "এনরোলমেন্ট ডাটাবেস থেকে মুছে ফেলা হয়েছে।",
        className: "bg-green-600 text-white border-none"
      });
    } catch (error) {
      toast({ title: "ত্রুটি", description: "এনরোলমেন্ট মুছতে সমস্যা হয়েছে", variant: "destructive" });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setEnrollmentToDelete(null);
    }
  };

  const exportData = () => {
    const csv = [
      ["Name", "Email", "Mobile", "Coupon", "Price", "Status", "Date"].join(","),
      ...enrollments.map(e => [
        e.name,
        e.email,
        e.mobile,
        e.coupon || "N/A",
        e.price,
        e.status,
        new Date(e.enrolledAt).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enrollments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredEnrollments = enrollments.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.mobile.includes(searchTerm)
  );

  // Authentication Check
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Enrollment View Component
  const EnrollmentView = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">এনরোলমেন্ট তালিকা</h2>
          <p className="text-muted-foreground">মোট {enrollments.length} জন শিক্ষার্থী</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => refetchEnrollments()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            রিফ্রেশ
          </Button>
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            এক্সপোর্ট
          </Button>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="নাম, ইমেইল বা মোবাইল দিয়ে খুঁজুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>নাম</TableHead>
              <TableHead>যোগাযোগ</TableHead>
              <TableHead>পেমেন্ট ইনফো</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead>তারিখ</TableHead>
              <TableHead className="text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  কোনো তথ্য পাওয়া যায়নি
                </TableCell>
              </TableRow>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment._id || enrollment.id}>
                  <TableCell className="font-medium">
                    {enrollment.name}
                    {enrollment.coupon && (
                      <span className="block text-xs text-muted-foreground">Code: {enrollment.coupon}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{enrollment.email}</div>
                    <div className="text-xs text-muted-foreground">{enrollment.mobile}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">৳{enrollment.price}</div>
                    {enrollment.paymentMethod && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <span className="capitalize">{enrollment.paymentMethod}</span>
                        {enrollment.trxId && (
                          <span className="bg-secondary px-1 rounded font-mono select-all" title="TrxID">
                            {enrollment.trxId}
                          </span>
                        )}
                      </div>
                    )}
                    {enrollment.referenceCode && (
                      <div className="text-xs text-primary font-mono mt-0.5">Ref: {enrollment.referenceCode}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${enrollment.status === "confirmed"
                      ? "bg-success/10 text-success border border-success/20"
                      : enrollment.status === "pending"
                        ? "bg-warning/10 text-warning border border-warning/20"
                        : "bg-destructive/10 text-destructive border border-destructive/20"
                      }`}>
                      {enrollment.status === "confirmed" ? <CheckCircle className="w-3 h-3" /> :
                        enrollment.status === "pending" ? <RefreshCw className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {enrollment.status === "confirmed" ? "কনফার্মড" :
                        enrollment.status === "pending" ? "পেন্ডিং" : "বাতিল"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(enrollment.enrolledAt).toLocaleDateString("bn-BD")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>অ্যাকশন</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => updateStatus(enrollment._id!, "confirmed")}>
                          <CheckCircle className="w-4 h-4 mr-2 text-success" />
                          কনফার্ম করুন
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(enrollment._id!, "pending")}>
                          <RefreshCw className="w-4 h-4 mr-2 text-warning" />
                          পেন্ডিং মার্ক করুন
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(enrollment._id!, "cancelled")}>
                          <XCircle className="w-4 h-4 mr-2 text-destructive" />
                          বাতিল করুন
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteEnrollment(enrollment._id!)} className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          মুছে ফেলুন
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar activeView={activeView} onNavigate={handleNavigate} onLogout={handleLogout} />

      <main className="lg:pl-64 pt-16 lg:pt-8 transition-all duration-300">
        <div className="container-custom py-8 px-4 md:px-8">
          {activeView === "dashboard" && <DashboardStats enrollments={enrollments} orders={orders} projects={projects} />}
          {activeView === "enrollments" && <EnrollmentView />}
          {activeView === "modules" && <ModulesManager />}
          {activeView === "features" && <FeaturesManager />}
          {activeView === "pricing" && <PricingManager />}
          {activeView === "routine" && <RoutineManager />}
          {activeView === "demo-videos" && <DemoManager />}
          {activeView === "coupons" && <CouponManager />}
          {activeView === "marketplace" && <MarketplaceManager />}
          {activeView === "orders" && <AdminOrders />}
          {(activeView !== "dashboard" && activeView !== "enrollments" && activeView !== "modules" && activeView !== "features" && activeView !== "pricing" && activeView !== "routine" && activeView !== "demo-videos" && activeView !== "coupons" && activeView !== "orders" && activeView !== "marketplace") && (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-muted-foreground animate-fade-in">
              <div className="bg-card border rounded-2xl p-8 text-center max-w-md">
                <h3 className="text-xl font-bold text-foreground mb-2">শীঘ্রই আসছে</h3>
                <p>এই ফিচারটি ডেভেলপমেন্টের কাজ চলছে...</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Premium Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="এনরোলমেন্ট মুছে ফেলতে চান?"
        description="এই অ্যাকশন পূর্বাবস্থায় ফেরানো যাবে না। এটি স্থায়ীভাবে ডাটাবেস থেকে এনরোলমেন্ট মুছে ফেলবে।"
        isLoading={isDeleting}
      />
    </div>
  );
}
