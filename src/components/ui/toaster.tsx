import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        let Icon = Info;
        if (variant === "success") Icon = CheckCircle2;
        else if (variant === "destructive") Icon = XCircle;
        else if (variant === "warning") Icon = AlertCircle;
        else Icon = Info; // Default

        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-4">
              {/* Icon Wrapper */}
              <div className={`mt-1 shrink-0 ${variant === "success" ? "text-success" :
                  variant === "destructive" ? "text-destructive" :
                    variant === "warning" ? "text-warning" : "text-primary"
                }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
