import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Save, Calendar, Clock, Video, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRoutine, useCreateRoutine, useUpdateRoutine, useDeleteRoutine, useModules } from "@/hooks/useContent";
import { RoutineItem } from "@/types/content";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog";


export const RoutineManager = () => {
    const { data: routines = [] } = useRoutine();
    const { data: modules = [] } = useModules();
    const createRoutineMutation = useCreateRoutine();
    const updateRoutineMutation = useUpdateRoutine();
    const deleteRoutineMutation = useDeleteRoutine();


    // Derived state for editing if needed, but for this component, 
    // it likely edits inline or adds new. 
    // The previous code used local state `routines` initiated from store.
    // Now `routines` comes from React Query. 
    // To support the existing "Save" button flow (batch save), we might need to change UX to instant save (individual update) 
    // OR keep local state and batch update on save.
    // The previous code: `contentStore.saveRoutine(routines)` suggests batch replace.
    // My API is individual CRUD. 
    // I should refactor to individual actions (Add/Update/Delete).
    // The UI has "Add Routine" adding to local list, and "Update Routine" updating local list.
    // Then "Save" button commits all?
    // Let's change it to:
    // "Add Routine" -> Opens Dialog or instantly creates new one?
    // The previous UX: Add -> Adds to list -> Edit fields inline -> Click Save.
    // I can make "Add" create a placeholder on server? Or keep local array?
    // If I keep local array, I need a bulk update endpoint or loop requests.
    // Better: change UX to "instant save" on field blur or "Save" button per row?
    // Or just use the "Save" button to loop through and update/create.

    // Let's stick to the current UI: List of inputs.
    // I will use local state `localRoutines` initialized from `routines` data.
    // When "Save" is clicked, I will sync changes to server.
    // Since API is item-based, I might need to Promise.all updates?
    // Or, I can change the UX to have a "Save" icon per row?
    // The current UI has a global "Save" button. 

    // Let's try to adapt:
    // Initialize local state from data.
    const [localRoutines, setLocalRoutines] = useState<any[]>([]);

    useEffect(() => {
        if (routines.length) setLocalRoutines(routines);
    }, [routines]);

    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);

    // Delete state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [routineToDelete, setRoutineToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSave = async () => {
        // This is complex with individual APIs. 
        // Strategy: For each item in localRoutines, if it has ID (existing), Update. If it's new (temp ID?), Create.
        // If item removed? I need to track deletions.
        // Simpler approach:
        // Just implement "Add" -> Creates on server immediately.
        // "Delete" -> Deletes on server immediately.
        // "Edit" -> Update on blur or "Save" button? 
        // The UI has "Save" button at top.

        // Let's iterate and save all.
        try {
            const promises = localRoutines.map(r => {
                if (r.id.toString().startsWith('temp-')) {
                    // specific logic for new items if we marked them
                    const { id, ...data } = r;
                    return createRoutineMutation.mutateAsync(data);
                } else {
                    return updateRoutineMutation.mutateAsync(r);
                }
            });
            // What about deletions? The `removeRoutine` function filtered local state.
            // If I remove locally, I won't send it in update, but server still has it.
            // I must handle deletion explicitly in `removeRoutine`.

            await Promise.all(promises);
            toast({ title: "সফল!", description: "রুটিন আপডেট করা হয়েছে" });
            setIsEditing(false);
        } catch (e) {
            toast({ title: "Error", description: "Failed to save" });
        }
    };

    const addRoutine = async () => {
        const newItem = {
            // id: Date.now().toString(), // Server usually assigns ID or we use this
            date: "",
            day: "Sunday",
            time: "9:00 PM",
            topic: "New Topic",
            platform: "Zoom",
            link: ""
        };
        // Ideally create on server immediately to get ID
        try {
            await createRoutineMutation.mutateAsync(newItem);
            toast({ title: "Created", description: "New routine added" });
        } catch (e) {
            toast({ title: "Error", description: "Failed to create" });
        }
    };

    const removeRoutine = (id: string) => {
        setRoutineToDelete(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (!routineToDelete) return;
        setIsDeleting(true);
        try {
            await deleteRoutineMutation.mutateAsync(routineToDelete);
            toast({ title: "মুছে ফেলা হয়েছে", description: "রুটিন ডিলিট করা হয়েছে" });
        } catch (error) {
            toast({ title: "ত্রুটি", description: "মুছে ফেলতে সমস্যা হয়েছে", variant: "destructive" });
        } finally {
            setIsDeleting(false);
            setDeleteDialogOpen(false);
            setRoutineToDelete(null);
        }
    };

    const updateRoutine = (id: string, field: keyof RoutineItem, value: string) => {
        // This updates local state for inputs. 
        // But since we switched to instant CRUD for add/delete, 
        // maybe we should support instant update on blur?
        // Or keep local state and valid "Save" only for updates.
        setLocalRoutines(localRoutines.map(r => r.id === id ? { ...r, [field]: value } : r));
        setIsEditing(true);
    };

    // To make this work with the existing "Save" button for updates:
    // `handleSave` will be "Update All" (or just modified ones).
    // `addRoutine` will be "Create Immediately".
    // `removeRoutine` will be "Delete Immediately".

    // Overriding handleSave above.

    // Wait, if I use `localRoutines`, I need to sync it with `routines` from API.
    // The `useEffect` does that. 

    // Let's rewrite the logic blocks.

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">ক্লাস রুটিন ম্যানেজমেন্ট</h2>
                    <p className="text-muted-foreground">লাইভ ক্লাসের রুটিন সেট করুন</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={addRoutine}>
                        <Plus className="w-4 h-4 mr-2" />
                        নতুন ক্লাস
                    </Button>
                    <Button onClick={handleSave} disabled={!isEditing} variant="cta">
                        <Save className="w-4 h-4 mr-2" />
                        সেভ করুন
                    </Button>
                </div>
            </div>

            <div className="grid gap-4">
                {routines.map((routine) => (
                    <div key={routine.id} className="bg-card border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> তারিখ ও বার
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="date"
                                        value={routine.date}
                                        onChange={(e) => updateRoutine(routine.id, "date", e.target.value)}
                                        className="text-sm"
                                    />
                                    <Input
                                        placeholder="Day (e.g. Monday)"
                                        value={routine.day}
                                        onChange={(e) => updateRoutine(routine.id, "day", e.target.value)}
                                        className="text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> সময় ও বিষয়
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={routine.time}
                                        onChange={(e) => updateRoutine(routine.id, "time", e.target.value)}
                                        placeholder="9:00 PM"
                                        className="w-24 text-sm"
                                    />
                                    <Input
                                        value={routine.topic}
                                        onChange={(e) => updateRoutine(routine.id, "topic", e.target.value)}
                                        placeholder="Topic Name"
                                        className="flex-1 text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Video className="w-3 h-3" /> প্ল্যাটফর্ম ও লিংক
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        value={routine.platform}
                                        onChange={(e) => updateRoutine(routine.id, "platform", e.target.value)}
                                        placeholder="Zoom/Meet"
                                        className="w-24 text-sm"
                                    />
                                    <Input
                                        value={routine.link}
                                        onChange={(e) => updateRoutine(routine.id, "link", e.target.value)}
                                        placeholder="Meeting Link"
                                        className="flex-1 text-sm text-blue-500 underline"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2 lg:col-span-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-1">
                                    <BookOpen className="w-3 h-3" /> মডিউল লিংক (অপশনাল)
                                </Label>
                                <select
                                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    value={routine.moduleId || ""}
                                    onChange={(e) => updateRoutine(routine.id, "moduleId", e.target.value)}
                                >
                                    <option value="">কোনো মডিউল নয়</option>
                                    {modules.map(m => (
                                        <option key={m.id} value={m.id}>{m.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeRoutine(routine.id)}
                            className="shrink-0 mt-4 md:mt-0"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}

                {routines.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-xl">
                        কোনো রুটিন সেট করা হয়নি
                    </div>
                )}
            </div>


            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={confirmDelete}
                title="রুটিন ডিলিট করতে চান?"
                isLoading={isDeleting}
            />
        </div >
    );
};
