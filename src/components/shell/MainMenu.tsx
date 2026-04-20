import { motion } from "framer-motion";
import { AnimatedSatellite } from "./AnimatedSatellite";
import { GameCard } from "./GameCard";
import { MiniLeaderboard } from "./MiniLeaderboard";
import { GAMES } from "@/data/games";
import { useProfileStore } from "@/store/profileStore";
import { useScoreStore } from "@/store/scoreStore";

/**
 * Ana menü: uydu illüstrasyonu, selamlama, 3 oyun kartı ve en üst puan tablosu.
 * İsmi olan oyuncuyu adıyla karşılar; kayıtlı round varsa her oyun için mini
 * skorboard gösterir.
 */
export function MainMenu() {
  const playerName = useProfileStore((s) => s.playerName);
  const rounds = useScoreStore((s) => s.rounds);
  const hasAnyRound = rounds.length > 0;

  return (
    <div className="mx-auto max-w-5xl">
      <section className="flex flex-col items-center text-center">
        <AnimatedSatellite />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="heading mt-4 text-3xl font-bold leading-tight sm:text-5xl"
        >
          {playerName ? (
            <>
              Hoş geldin, <span className="text-gradient-signal">{playerName}</span>!
            </>
          ) : (
            <>
              Dünyaya <span className="text-gradient-signal">uzaydan</span> bakalım
            </>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-3 max-w-xl text-base text-slate-300 sm:text-lg"
        >
          Göktürk-2 uydusunun gözünden dünyayı keşfet. Hangi oyunla başlıyorsun?
        </motion.p>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game, i) => (
          <GameCard key={game.id} game={game} index={i} />
        ))}
      </section>

      {hasAnyRound && (
        <section className="mt-12">
          <h2 className="heading mb-4 text-center text-lg font-semibold uppercase tracking-wider text-slate-300">
            En yüksek skorlar
          </h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {GAMES.map((game) => (
              <div key={game.id}>
                <p className="mb-2 px-1 text-sm font-semibold text-slate-200">{game.title}</p>
                <MiniLeaderboard gameId={game.id} title="Top 5" limit={5} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
