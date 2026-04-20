import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useState } from "react";
import { HUNTABLE_CLASSES, type PixelTask } from "./data";

interface TaskPanelProps {
  task: PixelTask;
  taskIndex: number;
  totalTasks: number;
}

/**
 * Üstteki görev kartı: hedef emoji, komut cümlesi, ipucu açma-kapama.
 * Görev değiştikçe emoji ve metin animasyonla geçiş yapar.
 */
export function TaskPanel({ task, taskIndex, totalTasks }: TaskPanelProps) {
  const [showHint, setShowHint] = useState(false);
  const meta = HUNTABLE_CLASSES[task.target];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Görev {taskIndex + 1} / {totalTasks}
        </span>
        <button
          onClick={() => setShowHint((h) => !h)}
          className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-200 hover:bg-amber-400/20"
          aria-pressed={showHint}
        >
          <Lightbulb className="h-3.5 w-3.5" />
          İpucu
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={taskIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-3 flex items-center gap-4"
        >
          <span className="text-5xl" aria-hidden>
            {meta.emoji}
          </span>
          <div>
            <p className="heading text-xl font-bold text-slate-50 sm:text-2xl">{task.prompt}</p>
            <p className="text-sm text-slate-300">
              Hedef: <span className="font-semibold text-slate-100">{meta.label}</span>
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showHint && (
          <motion.p
            key="hint"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-xl bg-amber-400/10 p-3 text-sm text-amber-100"
          >
            {meta.hint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
