import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    DialogDescription,
} from "@/components/ui/dialog";
import { Edit2, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFeatures, useCreateFeature, useUpdateFeature, useDeleteFeature } from "@/hooks/useContent";
import { Feature } from "@/data/features";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";

export const FeaturesManager = () => {
    const { data: features = [] } = useFeatures();
    const createFeatureMutation = useCreateFeature();
    const updateFeatureMutation = useUpdateFeature();
    const deleteFeatureMutation = useDeleteFeature();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
    const { toast } = useToast();

    // Delete state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [featureToDelete, setFeatureToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Removed manual loadFeatures

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingFeature) return;

        try {
            if (features.find((f: any) => f.id === editingFeature.id)) {
                await updateFeatureMutation.mutateAsync(editingFeature);
                toast({ title: "আপডেট হয়েছে", description: "ফিচার আপডেট হয়েছে" });
            } else {
                await createFeatureMutation.mutateAsync(editingFeature);
                toast({ title: "তৈরি হয়েছে", description: "নতুন ফিচার যোগ করা হয়েছে" });
            }
            setIsDialogOpen(false);
            setEditingFeature(null);
        } catch (error) {
            toast({ title: "ত্রুটি", description: "সংরক্ষণ করতে ব্যর্থ হয়েছে", variant: "destructive" });
        }
    };

    const handleDelete = (id: string) => {
        setFeatureToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!featureToDelete) return;
        setIsDeleting(true);
        try {
            await deleteFeatureMutation.mutateAsync(featureToDelete);
            toast({ title: "মুছে ফেলা হয়েছে" });
        } catch (error) {
            toast({ title: "ত্রুটি", description: "মুছে ফেলতে ব্যর্থ হয়েছে", variant: "destructive" });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setFeatureToDelete(null);
        }
    };

    const openNew = () => {
        setEditingFeature({
            id: `feat-${Date.now()}`,
            title: "",
            description: "",
            fullDescription: "",
            benefits: [],
            tools: [],
            // @ts-ignore
            icon: null
        });
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">ফিচার্স ম্যানেজমেন্ট</h2>
                    <p className="text-muted-foreground">ওয়েবসাইটের ফিচার সেকশন এডিট করুন</p>
                </div>
                <Button onClick={openNew} variant="cta">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন ফিচার
                </Button>
            </div>

            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>টাইটেল</TableHead>
                            <TableHead>ছোট ডেসক্রিপশন</TableHead>
                            <TableHead className="text-right">অ্যাকশন</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {features.map((feature) => (
                            <TableRow key={feature.id}>
                                <TableCell className="font-medium">{feature.title}</TableCell>
                                <TableCell className="truncate max-w-md">{feature.description}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => { setEditingFeature({ ...feature }); setIsDialogOpen(true); }}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(feature.id)}>
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
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>ফিচার এডিট/তৈরি</DialogTitle>
                        <DialogDescription className="sr-only">Add or edit feature details.</DialogDescription>
                    </DialogHeader>

                    {editingFeature && (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium mb-1 block">টাইটেল</label>
                                <Input value={editingFeature.title} onChange={e => setEditingFeature({ ...editingFeature, title: e.target.value })} required />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">ছোট ডেসক্রিপশন</label>
                                <Input value={editingFeature.description} onChange={e => setEditingFeature({ ...editingFeature, description: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium mb-1 block">বিস্তারিত ডেসক্রিপশন</label>
                                <Textarea value={editingFeature.fullDescription} onChange={e => setEditingFeature({ ...editingFeature, fullDescription: e.target.value })} />
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
                title="ফিচার ডিলিট করতে চান?"
                isLoading={isDeleting}
            />
        </div >
    );
};
