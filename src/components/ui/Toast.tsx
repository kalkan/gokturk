import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/cn";

export type ToastTone = "success" | "error" | "info";

interface ToastProps {
  open: boolean;
  tone?: ToastTone;
  title: string;
  description?: string;
}

const tones: Record<ToastTone, { bg: string; icon: typeof CheckCircle2 }> = {
  success: { bg: "bg-emerald-500/90 text-emerald-950", icon: CheckCircle2 },
  error: { bg: "bg-rose-500/90 text-rose-950", icon: XCircle },
  info: { bg: "bg-sky-500/90 text-sky-950", icon: Info },
};

/**
 * Oyun içi kısa geri bildirim balonu (doğru/yanlış/ipucu).
 */
export function Toast({ open, tone = "info", title, description }: ToastProps) {
  const { bg, icon: Icon } = tones[tone];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          role="status"
          aria-live="polite"
          className={cn(
            "fixed left-1/2 bottom-6 z-50 -translate-x-1/2 rounded-2xl px-5 py-3 shadow-glow-lg",
            "flex items-center gap-3 font-semibold",
            bg,
          )}
        >
          <Icon className="h-6 w-6 shrink-0" />
          <div className="flex flex-col">
            <span>{title}</span>
            {description && <span className="text-sm font-normal opacity-80">{description}</span>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
