import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Edit2, Trash2, Plus, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useModules, useCreateModule, useUpdateModule, useDeleteModule } from "@/hooks/useContent";
import { Module } from "@/data/modules";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";

export const ModulesManager = () => {
    const { data: modules = [] } = useModules();
    const createModuleMutation = useCreateModule();
    const updateModuleMutation = useUpdateModule();
    const deleteModuleMutation = useDeleteModule();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingModule, setEditingModule] = useState<Module | null>(null);
    const { toast } = useToast();

    // Delete state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Removed manual loadModules useEffect

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingModule) return;

        try {
            if (modules.find((m: any) => m.id === editingModule.id)) {
                // Update existing
                await updateModuleMutation.mutateAsync(editingModule);
                toast({ title: "আপডেট হয়েছে", description: "মডিউল সফলভাবে আপডেট করা হয়েছে" });
            } else {
                // Add new
                await createModuleMutation.mutateAsync(editingModule);
                toast({ title: "তৈরি হয়েছে", description: "নতুন মডিউল যোগ করা হয়েছে" });
            }
            setIsDialogOpen(false);
            setEditingModule(null);
        } catch (error) {
            toast({ title: "ত্রুটি", description: "সংরক্ষণ করতে ব্যর্থ হয়েছে", variant: "destructive" });
        }
    };

    const handleDelete = (id: string) => {
        setModuleToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!moduleToDelete) return;
        setIsDeleting(true);
        try {
            await deleteModuleMutation.mutateAsync(moduleToDelete);
            toast({ title: "মুছে ফেলা হয়েছে", description: "মডিউলটি ডিলিট করা হয়েছে" });
        } catch (error) {
            toast({ title: "ত্রুটি", description: "মুছে ফেলতে ব্যর্থ হয়েছে", variant: "destructive" });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setModuleToDelete(null);
        }
    };

    const openNew = () => {
        setEditingModule({
            id: `new-${Date.now()}`,
            number: modules.length + 1,
            title: "",
            shortTitle: "",
            description: "",
            fullDescription: "",
            topics: [],
            projects: [],
            duration: "",
            durationWeeks: 0,
            lessons: 0,
            available: true,
            // @ts-ignore - icon placeholder
            icon: null
        });
        setIsDialogOpen(true);
    };

    const openEdit = (module: Module) => {
        setEditingModule({ ...module });
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">কোর্স মডিউল ম্যানেজমেন্ট</h2>
                    <p className="text-muted-foreground">কোর্স মডিউলগুলো এডিট বা নতুন যোগ করুন</p>
                </div>
                <Button onClick={openNew} variant="cta">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন মডিউল
                </Button>
            </div>

            <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>নং</TableHead>
                            <TableHead>টাইটেল</TableHead>
                            <TableHead>ডুউরেশন</TableHead>
                            <TableHead>স্ট্যাটাস</TableHead>
                            <TableHead className="text-right">অ্যাকশন</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {modules.map((module) => (
                            <TableRow key={module.id}>
                                <TableCell>{module.number}</TableCell>
                                <TableCell className="font-medium">{module.title}</TableCell>
                                <TableCell>{module.duration} ({module.lessons} lessons)</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded text-xs ${module.available ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                                        {module.available ? 'Available' : 'Coming Soon'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => openEdit(module)}>
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(module.id)}>
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
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Mডিউল এডিট/তৈরি</DialogTitle>
                    </DialogHeader>

                    {editingModule && (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">মডিউল নম্বর</label>
                                    <Input
                                        type="number"
                                        value={editingModule.number}
                                        onChange={e => setEditingModule({ ...editingModule, number: parseInt(e.target.value) })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">টাইটেল</label>
                                    <Input
                                        value={editingModule.title}
                                        onChange={e => setEditingModule({ ...editingModule, title: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">শর্ট টাইটেল</label>
                                <Input
                                    value={editingModule.shortTitle}
                                    onChange={e => setEditingModule({ ...editingModule, shortTitle: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">ডেসক্রিপশন</label>
                                <Input
                                    value={editingModule.description}
                                    onChange={e => setEditingModule({ ...editingModule, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-1 block">ফুল ডেসক্রিপশন</label>
                                <Textarea
                                    value={editingModule.fullDescription}
                                    onChange={e => setEditingModule({ ...editingModule, fullDescription: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">সময়কাল</label>
                                    <Input
                                        value={editingModule.duration}
                                        onChange={e => setEditingModule({ ...editingModule, duration: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">লেসন সংখ্যা</label>
                                    <Input
                                        type="number"
                                        value={editingModule.lessons}
                                        onChange={e => setEditingModule({ ...editingModule, lessons: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">শুরুর তারিখ</label>
                                    <Input
                                        type="date"
                                        value={editingModule.startDate || ""}
                                        onChange={e => setEditingModule({ ...editingModule, startDate: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">শেষের তারিখ</label>
                                    <Input
                                        type="date"
                                        value={editingModule.endDate || ""}
                                        onChange={e => setEditingModule({ ...editingModule, endDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* New Fields Section */}
                            <div className="space-y-4 border-t pt-4">
                                <h4 className="font-semibold text-sm">কনটেন্ট ও রিসোর্স</h4>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Video URL (YouTube Embed/Link)</label>
                                    <Input
                                        placeholder="https://www.youtube.com/embed/..."
                                        value={editingModule.videoUrl || ""}
                                        onChange={e => setEditingModule({ ...editingModule, videoUrl: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Live Class Link (Zoom/Meet)</label>
                                    <Input
                                        placeholder="https://meet.google.com/..."
                                        value={editingModule.liveClassLink || ""}
                                        onChange={e => setEditingModule({ ...editingModule, liveClassLink: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Resource Link (Drive/Docs)</label>
                                    <Input
                                        placeholder="https://drive.google.com/..."
                                        value={editingModule.resourceLink || ""}
                                        onChange={e => setEditingModule({ ...editingModule, resourceLink: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h4 className="font-medium">Availability</h4>
                                    <p className="text-sm text-muted-foreground">এই মডিউলটি কি ব্যবহারকারীরা দেখতে পাবে?</p>
                                </div>
                                <Switch
                                    checked={editingModule.available}
                                    onCheckedChange={checked => setEditingModule({ ...editingModule, available: checked })}
                                />
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
                title="মডিউল ডিলিট করতে চান?"
                description="আপনি কি নিশ্চিত এই মডিউলটি ডিলিট করতে চান? এই অ্যাকশনটি ফিরিয়ে আনা যাবে না।"
                isLoading={isDeleting}
            />
        </div >
    );
};
