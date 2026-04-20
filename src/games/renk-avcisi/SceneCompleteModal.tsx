import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  sceneName: string;
  note: string;
  earned: number;
  accuracy: number;
  hasNext: boolean;
  onNext: () => void;
  onFinish: () => void;
}

/**
 * Her sahne sonunda açılan eğitsel pop-up.
 * Oyuncuyu puanlarla teşvik ederken spektral imza mantığını sezdirir.
 */
export function SceneCompleteModal({
  sceneName,
  note,
  earned,
  accuracy,
  hasNext,
  onNext,
  onFinish,
}: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-space-950/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-400/30 bg-gradient-to-br from-emerald-900/80 to-space-950 p-6 shadow-[0_0_60px_-10px_rgba(16,185,129,0.5)]"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200">
            <GraduationCap className="h-6 w-6" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
              Bunu öğrendin!
            </p>
            <h3 className="heading text-xl font-bold text-slate-50">{sceneName}</h3>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-slate-200">{note}</p>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-white/5 p-3">
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-slate-400">Kazandın</p>
            <p className="heading text-2xl font-bold text-signal">+{earned} puan</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-slate-400">Doğruluk</p>
            <p className="heading text-2xl font-bold text-emerald-300">%{accuracy}</p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          {hasNext ? (
            <Button onClick={onNext} variant="primary" className="flex-1">
              Sonraki sahne
            </Button>
          ) : (
            <Button onClick={onFinish} variant="primary" className="flex-1">
              Özete git
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
