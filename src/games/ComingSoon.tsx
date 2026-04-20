import { motion } from "framer-motion";
import { Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import type { GameDefinition } from "@/data/types";

interface ComingSoonProps {
  title: string;
  accent: GameDefinition["accent"];
}

const accentBadge: Record<GameDefinition["accent"], string> = {
  violet: "bg-violet-500/20 text-violet-200 border-violet-400/30",
  emerald: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  amber: "bg-amber-500/20 text-amber-200 border-amber-400/30",
};

/**
 * Oyun henüz implemente edilmeden önce gösterilen geçici ekran.
 * Sprint ilerledikçe ilgili oyun bileşeniyle değiştirilecek.
 */
export function ComingSoon({ title, accent }: ComingSoonProps) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-signal/15 text-signal animate-float">
            <Sparkles className="h-8 w-8" />
          </div>
          <h2 className="heading mt-5 text-3xl font-bold">{title}</h2>
          <span
            className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${accentBadge[accent]}`}
          >
            Yakında
          </span>
          <p className="mt-5 text-slate-300">
            Bu oyun şu anda hazırlanıyor. Sahneler, animasyonlar ve skor sistemi
            yapım aşamasında. Kısa süre içinde burada olacak!
          </p>
          <Link
            to="/"
            className="btn-ghost mt-6 inline-flex"
            aria-label="Ana menüye dön"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana menüye dön
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}
