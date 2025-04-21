import { toast } from "react-hot-toast";

export const showSuccessToast = (message: string, icon: string) => {
  toast.success(message, { icon });
};

export const showErrorToast = (message: string, error: unknown, icon: string = "❌") => {
  const err = error as { message?: string };
  toast.error(`${message}: ${err.message ?? "Error desconocido"}`, { icon });
};
