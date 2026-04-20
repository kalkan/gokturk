import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Hafif, bağımlılıksız konfeti efekti — doğru cevap sonrası ekranda 1.5 sn
 * görünür. Her parça rastgele açı, renk ve düşme süresiyle animate olur.
 */
export function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        duration: 1.1 + Math.random() * 0.7,
        rotate: Math.random() * 360,
        color: ["#fbbf24", "#84cc16", "#60a5fa", "#f472b6", "#ffffff"][i % 5],
        size: 6 + Math.random() * 6,
      })),
    [],
  );

  if (!active) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{ y: "110%", rotate: p.rotate, opacity: 0 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          className="absolute top-0 block rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
          }}
        />
      ))}
    </div>
  );
}
