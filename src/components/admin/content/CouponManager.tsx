import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { useCoupons, useAddCoupon, useDeleteCoupon } from "@/hooks/useContent";
import { Coupon } from "@/types/content";
import { Plus, Trash2, Tag } from "lucide-react";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";

export function CouponManager() {
    const { data: coupons = [] } = useCoupons();
    const addCouponMutation = useAddCoupon();
    const deleteCouponMutation = useDeleteCoupon();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        discountAmount: "",
        scope: "global"
    });

    // Delete state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAdd = async () => {
        if (!newCoupon.code || !newCoupon.discountAmount) return;

        try {
            await addCouponMutation.mutateAsync({
                code: newCoupon.code.toUpperCase(),
                discountAmount: parseInt(newCoupon.discountAmount),
                scope: newCoupon.scope as 'global' | 'course' | 'marketplace',
                isActive: true
            });
            setIsAddOpen(false);
            setNewCoupon({ code: "", discountAmount: "", scope: "global" });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (id: string) => {
        setCouponToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!couponToDelete) return;
        setIsDeleting(true);
        try {
            await deleteCouponMutation.mutateAsync(couponToDelete);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setCouponToDelete(null);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Tag className="w-6 h-6 text-primary" />
                        কুপন ম্যানেজার
                    </h2>
                    <p className="text-muted-foreground">ডিসকাউন্ট কুপন তৈরি এবং ম্যানেজ করুন</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" /> কুপন যুক্ত করুন
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>নতুন কুপন যোগ করুন</DialogTitle>
                            <DialogDescription className="sr-only">Create a new discount coupon.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label>কুপন কোড</Label>
                                <Input
                                    placeholder="e.g. SUMMER50"
                                    value={newCoupon.code}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>ডিসকাউন্ট পরিমাণ (৳)</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 500"
                                    value={newCoupon.discountAmount}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, discountAmount: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>প্রযোজ্য ক্ষেত্র (Approves To)</Label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={newCoupon.scope}
                                    onChange={(e) => setNewCoupon({ ...newCoupon, scope: e.target.value })}
                                >
                                    <option value="global">Global (সবখানে)</option>
                                    <option value="course">Course Only (শুধুমাত্র কোর্স)</option>
                                    <option value="marketplace">Marketplace Only (শুধু মার্কেটপ্লেস)</option>
                                </select>
                            </div>
                            <Button className="w-full" onClick={handleAdd}>কুপন তৈরি করুন</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>কোড</TableHead>
                            <TableHead>ডিসকাউন্ট</TableHead>
                            <TableHead>স্কোপ</TableHead>
                            <TableHead>স্ট্যাটাস</TableHead>
                            <TableHead className="text-right">অ্যাকশন</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {coupons.map((coupon) => (
                            <TableRow key={coupon.id}>
                                <TableCell className="font-mono font-bold text-primary">{coupon.code}</TableCell>
                                <TableCell>৳{coupon.discountAmount}</TableCell>
                                <TableCell className="capitalize">{(coupon as any).scope || 'global'}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${coupon.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {coupon.isActive ? "Active" : "Inactive"}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(coupon.id || (coupon as any)._id)} className="text-destructive hover:bg-destructive/10">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {coupons.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                    কোন কুপন পাওয়া যায়নি। নতুন কুপন তৈরি করুন।
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>


            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                title="আপনি কি নিশ্চিত?"
                description="এই অ্যাকশনটি ফিরিয়ে আনা যাবে না। এটি কুপনটি স্থায়ীভাবে মুছে ফেলবে।"
                isLoading={isDeleting}
            />
        </div >
    );
}
