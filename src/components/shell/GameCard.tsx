import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Grid3x3, Palette, Satellite, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import type { GameDefinition } from "@/data/types";

interface GameCardProps {
  game: GameDefinition;
  index: number;
}

const accentStyles: Record<
  GameDefinition["accent"],
  { gradient: string; ring: string; icon: string; tag: string }
> = {
  violet: {
    gradient: "from-violet-500/30 via-fuchsia-500/10 to-transparent",
    ring: "ring-violet-400/40 hover:ring-violet-300/70",
    icon: "bg-violet-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.6)]",
    tag: "bg-violet-500/20 text-violet-200",
  },
  emerald: {
    gradient: "from-emerald-500/30 via-teal-500/10 to-transparent",
    ring: "ring-emerald-400/40 hover:ring-emerald-300/70",
    icon: "bg-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.6)]",
    tag: "bg-emerald-500/20 text-emerald-200",
  },
  amber: {
    gradient: "from-amber-500/30 via-orange-500/10 to-transparent",
    ring: "ring-amber-400/40 hover:ring-amber-300/70",
    icon: "bg-amber-500 text-space-950 shadow-[0_0_30px_rgba(251,191,36,0.6)]",
    tag: "bg-amber-500/20 text-amber-200",
  },
};

const iconMap = {
  satellite: Satellite,
  palette: Palette,
  grid: Grid3x3,
} as const;

/**
 * Ana menüdeki üç oyun kartından biri.
 * Her oyun kendi accent rengine sahiptir; 9 yaş çocuk ilk bakışta seçebilmeli,
 * 13 yaş çocuk "çocukça" bulmamalı — kontrast & modern gradient dengesi.
 */
export function GameCard({ game, index }: GameCardProps) {
  const style = accentStyles[game.accent];
  const Icon = iconMap[game.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
    >
      <Link
        to={game.route}
        className={cn(
          "group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md",
          "ring-1 transition-all duration-200 hover:-translate-y-1 focus-visible:-translate-y-1",
          style.ring,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80 transition-opacity group-hover:opacity-100",
            style.gradient,
          )}
        />
        <div className="relative flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl",
                style.icon,
              )}
            >
              <Icon className="h-7 w-7" />
            </div>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider",
                style.tag,
              )}
            >
              {game.ageRange}
            </span>
          </div>

          <div>
            <h3 className="heading text-2xl font-bold text-slate-50">{game.title}</h3>
            <p className="mt-1 text-sm text-slate-300/80">{game.tagline}</p>
          </div>

          <p className="text-sm leading-relaxed text-slate-200/80">{game.shortDescription}</p>

          <div className="mt-2 flex items-center justify-end gap-1 text-sm font-semibold text-slate-100/90 transition-transform group-hover:translate-x-1">
            Oyna
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
