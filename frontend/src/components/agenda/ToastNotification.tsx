import { Toaster, toast } from "sonner";

export function ToastNotification() {
  return <Toaster position="top-right" richColors closeButton />;
}

export const notify = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
};
