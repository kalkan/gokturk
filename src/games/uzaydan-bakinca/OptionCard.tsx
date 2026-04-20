import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import type { SceneOption } from "./data";

interface OptionCardProps {
  option: SceneOption;
  index: number;
  disabled: boolean;
  state: "idle" | "correct" | "wrong" | "muted";
  onPick: (option: SceneOption) => void;
}

/**
 * Üç cevaptan biri. `state` prop'u cevap verildikten sonra sahne durumuna
 * göre yeşil (doğru) / kırmızı (yanlış seçilen) / soluk (diğerleri) olur.
 */
export function OptionCard({ option, index, disabled, state, onPick }: OptionCardProps) {
  const tone = {
    idle: "bg-white/5 hover:bg-white/10 border-white/10",
    correct: "bg-emerald-500/25 border-emerald-400 text-emerald-50",
    wrong: "bg-rose-500/25 border-rose-400 text-rose-50 animate-[shake_0.4s_ease-in-out]",
    muted: "bg-white/3 border-white/5 opacity-50",
  }[state];

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      disabled={disabled}
      onClick={() => onPick(option)}
      className={cn(
        "relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200",
        "disabled:cursor-not-allowed",
        tone,
      )}
    >
      <span className="text-4xl" aria-hidden>
        {option.emoji}
      </span>
      <div className="flex flex-col">
        <span className="heading text-lg font-semibold text-slate-50">{option.label}</span>
        <span className="text-xs text-slate-300/80">{option.location}</span>
      </div>
      {state === "correct" && (
        <CheckCircle2 className="ml-auto h-6 w-6 text-emerald-300" aria-hidden />
      )}
      {state === "wrong" && <XCircle className="ml-auto h-6 w-6 text-rose-300" aria-hidden />}
    </motion.button>
  );
}
