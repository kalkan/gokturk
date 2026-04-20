import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useScoreStore } from "@/store/scoreStore";

/**
 * Üst çubukta toplam skoru gösteren rozet.
 * Skor değiştiğinde animasyonlu "pop" yapar.
 */
export function Scoreboard() {
  const total = useScoreStore((s) => s.total);
  return (
    <motion.div
      key={total}
      initial={{ scale: 0.9, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 text-signal shadow-glow"
      aria-label={`Toplam puan: ${total}`}
    >
      <Trophy className="h-4 w-4" />
      <span className="font-display font-semibold tabular-nums">{total}</span>
      <span className="text-xs font-medium uppercase tracking-wider text-signal/70">puan</span>
    </motion.div>
  );
}
