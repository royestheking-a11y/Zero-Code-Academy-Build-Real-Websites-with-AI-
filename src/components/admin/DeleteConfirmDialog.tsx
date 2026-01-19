import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isLoading?: boolean;
}

export function DeleteConfirmDialog({
    open,
    onOpenChange,
    onConfirm,
    title = "আপনি কি নিশ্চিত?",
    description = "এই অ্যাকশন পূর্বাবস্থায় ফেরানো যাবে না। এটি স্থায়ীভাবে ডেটা মুছে ফেলবে।",
    isLoading = false
}: DeleteConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                            <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
                            <AlertDialogDescription className="mt-1">
                                {description}
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4 gap-2 sm:gap-0">
                    <AlertDialogCancel disabled={isLoading} className="mt-0">
                        বাতিল করুন
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
                    >
                        {isLoading ? (
                            <>মুছে ফেলা হচ্ছে...</>
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" />
                                মুছে ফেলুন
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
