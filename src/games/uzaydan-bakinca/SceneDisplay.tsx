import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import type { SatelliteScene } from "@/data/types";
import { SCENE_COMPONENTS } from "./scenes";

interface SceneDisplayProps {
  scene: SatelliteScene;
  status: "showing" | "choosing" | "correct" | "incorrect";
}

const statusBorder: Record<SceneDisplayProps["status"], string> = {
  showing: "border-white/10",
  choosing: "border-white/10",
  correct: "border-emerald-400",
  incorrect: "border-rose-400",
};

/**
 * Uydu görüntüsünü orantılı 4:3 çerçevede gösterir.
 * Sol üstte "CANLI" rozeti ve sağ altta sahne meta bilgisi vardır.
 */
export function SceneDisplay({ scene, status }: SceneDisplayProps) {
  const Scene = scene.mockComponent ? SCENE_COMPONENTS[scene.mockComponent] : undefined;

  return (
    <motion.div
      layout
      className={`relative overflow-hidden rounded-3xl border-2 shadow-glow-lg transition-colors duration-200 ${statusBorder[status]}`}
    >
      <div className="relative aspect-[4/3] w-full bg-space-900">
        {Scene ? (
          <Scene />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            Görüntü yüklenemedi
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-space-950/70 via-transparent to-space-950/20" />
      </div>

      <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-200 backdrop-blur-sm">
        <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" />
        CANLI UYDU
      </div>
      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur-sm">
        <Radar className="h-3 w-3" />
        GÖKTÜRK-2
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
        <div className="rounded-xl bg-black/40 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-sm">
          <span className="font-mono tabular-nums">37.48°N · 38.92°E</span>
        </div>
        {scene.metadata.resolution && (
          <div className="rounded-xl bg-black/40 px-3 py-1.5 text-xs text-slate-200 backdrop-blur-sm">
            {scene.metadata.resolution} m çözünürlük
          </div>
        )}
      </div>
    </motion.div>
  );
}
