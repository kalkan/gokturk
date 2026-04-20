import { Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useScoreStore } from "@/store/scoreStore";
import { useProfileStore } from "@/store/profileStore";
import type { GameId, RoundResult } from "@/data/types";

interface MiniLeaderboardProps {
  gameId: GameId;
  /** Vurgulanacak kayıt (ör. bu turda az önce yazılan) */
  highlightId?: string | null;
  title?: string;
  limit?: number;
}

function medal(rank: number): string {
  if (rank === 0) return "🥇";
  if (rank === 1) return "🥈";
  if (rank === 2) return "🥉";
  return `${rank + 1}.`;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  return d.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

/**
 * Oyun sonunda o oyuna ait en yüksek skorları listeler.
 * Şu anki oyuncunun son turu `highlightId` ile parlatılır.
 */
export function MiniLeaderboard({
  gameId,
  highlightId,
  title = "Skorboard",
  limit = 5,
}: MiniLeaderboardProps) {
  const topRounds = useScoreStore((s) => s.topRounds);
  const currentName = useProfileStore((s) => s.playerName);
  const rows = topRounds(gameId, limit);

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-slate-300">
        <Trophy className="mx-auto mb-2 h-5 w-5 text-signal" />
        <p className="font-semibold text-slate-100">İlk sıra seni bekliyor!</p>
        <p className="mt-1 text-xs text-slate-400">
          Bu oyunda henüz kayıtlı skor yok — ilk turu sen oynadın.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Trophy className="h-4 w-4 text-signal" />
        <h3 className="heading text-sm font-semibold uppercase tracking-wider text-slate-200">
          {title}
        </h3>
      </div>
      <ol className="space-y-1.5">
        {rows.map((row, i) => (
          <LeaderboardRow
            key={row.id}
            row={row}
            rank={i}
            isHighlighted={highlightId === row.id}
            isSelf={row.playerName === currentName}
          />
        ))}
      </ol>
    </div>
  );
}

function LeaderboardRow({
  row,
  rank,
  isHighlighted,
  isSelf,
}: {
  row: RoundResult;
  rank: number;
  isHighlighted: boolean;
  isSelf: boolean;
}) {
  return (
    <motion.li
      initial={isHighlighted ? { backgroundColor: "rgba(251,191,36,0.25)" } : false}
      animate={{ backgroundColor: "rgba(255,255,255,0.04)" }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className={cn(
        "flex items-center gap-3 rounded-lg border border-white/5 px-3 py-2 text-sm",
        isHighlighted && "ring-2 ring-signal/60",
      )}
    >
      <span className="w-7 text-center font-display text-base" aria-label={`Sıra ${rank + 1}`}>
        {medal(rank)}
      </span>
      <span
        className={cn(
          "flex-1 truncate font-semibold",
          isSelf ? "text-signal" : "text-slate-100",
        )}
      >
        {row.playerName}
        {isSelf && <span className="ml-1.5 text-xs font-normal text-signal/70">(sen)</span>}
      </span>
      <span className="text-xs text-slate-400 tabular-nums">
        {row.correct}/{row.total}
      </span>
      <span className="heading text-base font-bold tabular-nums text-signal">
        {row.points}
      </span>
      <span className="hidden w-12 text-right text-[10px] text-slate-500 tabular-nums sm:inline">
        {formatDate(row.playedAt)}
      </span>
    </motion.li>
  );
}
