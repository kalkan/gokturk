import { motion } from "framer-motion";
import type { TerrainClass } from "@/data/types";
import { TERRAIN_META } from "./constants";
import { cn } from "@/lib/cn";

interface ClassPaletteProps {
  classes: TerrainClass[];
  selected: TerrainClass | null;
  onSelect: (cls: TerrainClass | null) => void;
  disabled: boolean;
}

/**
 * Alt kısımda "fırça paleti": bir sınıfı seçip segmentlere boyayacağız.
 * Aktif sınıf parlar; tekrar tıklayınca deseçim olur.
 */
export function ClassPalette({ classes, selected, onSelect, disabled }: ClassPaletteProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md">
      <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-400">
        Bir sınıf seç, sonra segmente tıkla
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {classes.map((cls) => {
          const meta = TERRAIN_META[cls];
          const active = selected === cls;
          return (
            <motion.button
              key={cls}
              whileTap={{ scale: 0.94 }}
              disabled={disabled}
              onClick={() => onSelect(active ? null : cls)}
              className={cn(
                "group relative flex min-w-[86px] flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all",
                "disabled:cursor-not-allowed disabled:opacity-40",
                active
                  ? "scale-105 border-signal bg-signal/15 shadow-glow"
                  : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10",
              )}
              aria-pressed={active}
            >
              <span className="text-2xl" aria-hidden>
                {meta.emoji}
              </span>
              <span className="text-xs font-semibold text-slate-100">{meta.label}</span>
              <span
                className="absolute bottom-1 h-1 w-8 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
