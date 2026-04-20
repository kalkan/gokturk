import { motion } from "framer-motion";
import { AnimatedSatellite } from "./AnimatedSatellite";
import { GameCard } from "./GameCard";
import { GAMES } from "@/data/games";

/**
 * Ana menü ekranı: uydu illüstrasyonu, başlık ve üç oyun kartı.
 * Gamze testi (9 yaş) ve yeğen testi (13 yaş) göz önünde tutularak tasarlandı:
 * net büyük ikonlar, kısa başlıklar; arka plan atmosferik ama cluttered değil.
 */
export function MainMenu() {
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
          Dünyaya <span className="text-gradient-signal">uzaydan</span> bakalım
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
    </div>
  );
}
