import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { HUNTABLE_CLASSES, type HuntableClass } from "./data";

interface PixelGridProps {
  grid: HuntableClass[][];
  /** Hover/tıklama kilidi — feedback evresinde true */
  locked: boolean;
  /** Feedback evresinde doğru hücreleri parlatmak için */
  highlightClass?: HuntableClass | null;
  /** Oyuncunun tıkladığı hücrenin koordinatı — kırmızı/yeşil flash için */
  pickedCell?: { row: number; col: number; correct: boolean } | null;
  onPick: (row: number, col: number, cls: HuntableClass) => void;
}

/**
 * 8x8 piksel ızgarası — tap-friendly büyük hücreler, seçim flash'ları.
 * Hücre rengi sınıfa bağlı; aynı sınıf içinde hafif ton varyasyonu ekleyerek
 * "gerçek görüntü" hissini kuvvetlendirir.
 */
export function PixelGrid({ grid, locked, highlightClass, pickedCell, onPick }: PixelGridProps) {
  return (
    <div
      className="mx-auto grid aspect-square w-full max-w-md gap-[3px] rounded-2xl border border-white/10 bg-white/5 p-2 shadow-glow-lg"
      style={{ gridTemplateColumns: "repeat(8, minmax(0, 1fr))" }}
      role="grid"
      aria-label="8 x 8 piksel ızgarası"
    >
      {grid.flatMap((row, r) =>
        row.map((cls, c) => {
          const base = HUNTABLE_CLASSES[cls].color;
          const picked = pickedCell?.row === r && pickedCell.col === c;
          const highlighted = highlightClass && highlightClass === cls;
          return (
            <motion.button
              key={`${r}-${c}`}
              role="gridcell"
              aria-label={`Satır ${r + 1}, sütun ${c + 1}: ${HUNTABLE_CLASSES[cls].label}`}
              disabled={locked}
              onClick={() => onPick(r, c, cls)}
              whileTap={{ scale: locked ? 1 : 0.85 }}
              className={cn(
                "relative rounded-sm transition-all duration-150",
                !locked && "hover:scale-110 hover:z-10 hover:ring-2 hover:ring-white/60",
                picked && pickedCell?.correct && "ring-4 ring-emerald-300 z-20",
                picked && !pickedCell?.correct && "ring-4 ring-rose-400 z-20",
                highlighted && !picked && "animate-pulse ring-2 ring-white/80 z-10",
              )}
              style={{
                backgroundColor: base,
                // Farklı komşular için minimal ton varyasyonu
                filter: `brightness(${0.85 + ((r * 7 + c * 3) % 5) * 0.06})`,
              }}
            />
          );
        }),
      )}
    </div>
  );
}
