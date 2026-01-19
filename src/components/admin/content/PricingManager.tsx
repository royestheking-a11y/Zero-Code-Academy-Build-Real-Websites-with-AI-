import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Edit2, Trash2, Plus, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePricing, useCreatePricing, useUpdatePricing, useDeletePricing, useOffer, useUpdateOffer } from "@/hooks/useContent";
import { PricingPackage } from "@/types/content";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";

export const PricingManager = () => {
    const { data: packages = [] } = usePricing();
    const createPricingMutation = useCreatePricing();
    const updatePricingMutation = useUpdatePricing();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPkg, setEditingPkg] = useState<PricingPackage | null>(null);
    const { toast } = useToast();
    const deletePricingMutation = useDeletePricing();

    // Delete state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [pkgToDelete, setPkgToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    // const deletePricingMutation = useDeletePricing(); // Pricing delete not implemented in hooks yet, usually just update array in contentStore. 
    // Wait, contentStore.savePricing(updated) replaces the whole array.
    // My API has individual CRUD. To delete, I need delete endpoint.
    // I added useDeletePricing? No. I should add it or use update to remove? 
    // Real API delete is better. 
    // Let's assume I will add useDeletePricing or have it.
    // Actually in step 2430 I added useCreatePricing and useUpdatePricing.
    // I need useDeletePricing. I will add it to useContent.ts in next step if missing, 
    // but for now I will assume it exists or comment it out and fix next.
    // Actually, I'll check usages.
    // For now I'll implement handleSave using mutations.

    // Check useOffer
    const { data: offerData } = useOffer();
    const updateOfferMutation = useUpdateOffer();

    // Local state for offer form (derived from offerData)
    const [offer, setOffer] = useState<any>(null);

    useEffect(() => {
        if (offerData) {
            setOffer(offerData);
        }
    }, [offerData]);

    const saveOffer = async () => {
        if (!offer) return;
        try {
            await updateOfferMutation.mutateAsync(offer);
            toast({ title: "অফার আপডেট হয়েছে", description: "নতুন অফার টাইমার সেট করা হয়েছে" });
        } catch (error) {
            toast({ title: "ত্রুটি", description: "আপডেট করতে ব্যর্থ হয়েছে", variant: "destructive" });
        }
    };

    // Removed manual loadPackages

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPkg) return;

        try {
            if (packages.find((p: any) => p.id === editingPkg.id)) {
                await updatePricingMutation.mutateAsync(editingPkg);
                toast({ title: "আপডেট হয়েছে", description: "প্যাকেজ আপডেট হয়েছে" });
            } else {
                await createPricingMutation.mutateAsync(editingPkg);
                toast({ title: "তৈরি হয়েছে", description: "নতুন প্যাকেজ যোগ করা হয়েছে" });
            }
            setIsDialogOpen(false);
            setEditingPkg(null);
        } catch (error) {
            toast({ title: "ত্রুটি", description: "সংরক্ষণ করতে ব্যর্থ হয়েছে", variant: "destructive" });
        }
    };

    const handleDelete = (id: string) => {
        setPkgToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!pkgToDelete) return;
        setIsDeleting(true);
        try {
            await deletePricingMutation.mutateAsync(pkgToDelete);
            toast({ title: "মুছে ফেলা হয়েছে", description: "প্যাকেজ ডিলিট করা হয়েছে" });
        } catch (error) {
            toast({ title: "ত্রুটি", description: "মুছে ফেলতে সমস্যা হয়েছে", variant: "destructive" });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setPkgToDelete(null);
        }
    };

    const openNew = () => {
        setEditingPkg({
            id: `pkg-${Date.now()}`,
            name: "",
            originalPrice: 0,
            price: 0,
            popular: false,
            benefits: [""],
            accessLimit: 999
        });
        setIsDialogOpen(true);
    };

    const handleBenefitChange = (index: number, val: string) => {
        if (!editingPkg) return;
        const newBenefits = [...editingPkg.benefits];
        newBenefits[index] = val;
        setEditingPkg({ ...editingPkg, benefits: newBenefits });
    };

    const addBenefit = () => {
        if (!editingPkg) return;
        setEditingPkg({ ...editingPkg, benefits: [...editingPkg.benefits, ""] });
    };

    const removeBenefit = (index: number) => {
        if (!editingPkg) return;
        const newBenefits = editingPkg.benefits.filter((_, i) => i !== index);
        setEditingPkg({ ...editingPkg, benefits: newBenefits });
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Global Offer Setting */}
            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-destructive" />
                        স্পেশাল অফার টাইমার
                    </h2>
                    <Button onClick={saveOffer} size="sm">সেভ করুন</Button>
                </div>
                {offer && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg bg-secondary/20">
                            <div>
                                <h3 className="font-medium">অফার স্ট্যাটাস</h3>
                                <p className="text-sm text-muted-foreground">অফার একটিভ থাকলে টাইমার দেখাবে</p>
                            </div>
                            <Switch checked={offer.isActive} onCheckedChange={c => setOffer({ ...offer, isActive: c })} />
                        </div>
                        <div>
                            <label className="text-sm font-medium mb-1.5 block">অফার শেষ হওয়ার সময়</label>
                            <Input
                                type="datetime-local"
                                value={offer.endTime ? new Date(offer.endTime).toISOString().slice(0, 16) : ""}
                                onChange={e => setOffer({ ...offer, endTime: new Date(e.target.value).toISOString() })}
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">প্রাইসিং প্যাকেজ ম্যানেজমেন্ট</h2>
                    <p className="text-muted-foreground">প্যাকেজগুলোর দাম এবং ফিচার আপডেট করুন</p>
                </div>
                <Button onClick={openNew} variant="cta">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন প্যাকেজ
                </Button>
            </div>

            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>নাম</TableHead>
                            <TableHead>আসল দাম</TableHead>
                            <TableHead>অফার দাম</TableHead>
                            <TableHead>Access Limit</TableHead>
                            <TableHead>পপুলার</TableHead>
                            <TableHead className="text-right">অ্যাকশন</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {packages.map((pkg) => (
                            <TableRow key={pkg.id}>
                                <TableCell className="font-medium">{pkg.name}</TableCell>
                                <TableCell>৳{pkg.originalPrice}</TableCell>
                                <TableCell>৳{pkg.price}</TableCell>
                                <TableCell>
                                    {pkg.accessLimit >= 999 ? "All" : pkg.accessLimit}
                                </TableCell>
                                <TableCell>
                                    {pkg.popular && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Popular</span>}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => { setEditingPkg({ ...pkg }); setIsDialogOpen(true); }}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(pkg.id)}>
                                            <Trash2 className="w-4 h-4 text-destructive" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>প্যাকেজ এডিট/তৈরি</DialogTitle>
                    </DialogHeader>

                    {editingPkg && (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">প্যাকেজের নাম</label>
                                <Input value={editingPkg.name} onChange={e => setEditingPkg({ ...editingPkg, name: e.target.value })} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">আসল দাম</label>
                                    <Input type="number" value={editingPkg.originalPrice} onChange={e => setEditingPkg({ ...editingPkg, originalPrice: parseInt(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">বর্তমান দাম</label>
                                    <Input type="number" value={editingPkg.price} onChange={e => setEditingPkg({ ...editingPkg, price: parseInt(e.target.value) })} />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">মডিউল অ্যাক্সেস লিমিট (সংখ্যা)</label>
                                <Input
                                    type="number"
                                    placeholder="Ex: 5 (Use 999 for All)"
                                    value={editingPkg.accessLimit || ""}
                                    onChange={e => setEditingPkg({ ...editingPkg, accessLimit: parseInt(e.target.value) })}
                                />
                                <p className="text-xs text-muted-foreground mt-1">কটি মডিউল ইউজার দেখতে পাবে? সব মডিউল এর জন্য 999 দিন।</p>
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded">
                                <span className="text-sm font-medium">এটি কি পপুলার প্যাকেজ?</span>
                                <Switch checked={editingPkg.popular} onCheckedChange={c => setEditingPkg({ ...editingPkg, popular: c })} />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">বেনেফিটসমূহ</label>
                                <div className="space-y-2">
                                    {editingPkg.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex gap-2">
                                            <Input value={benefit} onChange={e => handleBenefitChange(idx, e.target.value)} />
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeBenefit(idx)}>
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" size="sm" onClick={addBenefit} className="mt-2">
                                        <Plus className="w-3 h-3 mr-2" /> বেনিফিট যোগ করুন
                                    </Button>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>বাতিল</Button>
                                <Button type="submit">সেভ করুন</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>


            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                title="প্যাকেজ ডিলিট করতে চান?"
                isLoading={isDeleting}
            />
        </div >
    );
};
