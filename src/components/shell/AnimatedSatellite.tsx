import { motion } from "framer-motion";

/**
 * Dünyanın etrafında yörüngede dönen bir uydu illüstrasyonu.
 * Ana menüde hero görseli olarak kullanılır. Tamamen SVG, DPI-bağımsız.
 */
export function AnimatedSatellite() {
  return (
    <div className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-72 sm:w-72">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-space-500/30 via-transparent to-transparent blur-2xl" />

      <motion.div
        className="absolute inset-0 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-4 rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      />

      <div className="relative h-28 w-28 sm:h-36 sm:w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full drop-shadow-[0_10px_30px_rgba(91,118,247,0.4)]">
          <defs>
            <radialGradient id="earth" cx="35%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#5b76f7" />
              <stop offset="60%" stopColor="#1e2a78" />
              <stop offset="100%" stopColor="#05081d" />
            </radialGradient>
            <linearGradient id="continent" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="48" fill="url(#earth)" />
          <path
            d="M30 55c8-6 16-4 22 2s16 4 20-4-2-18 8-20 14 8 18 14"
            stroke="url(#continent)"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />
          <circle cx="42" cy="72" r="5" fill="#84cc16" opacity="0.7" />
          <circle cx="78" cy="48" r="3" fill="#84cc16" opacity="0.6" />
        </svg>
      </div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-0 w-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-[110px] sm:-translate-y-[140px]">
          <svg viewBox="0 0 60 40" className="h-9 w-14 drop-shadow-[0_0_14px_rgba(251,191,36,0.55)]">
            <rect x="24" y="14" width="14" height="12" rx="2" fill="#fbbf24" />
            <rect x="6" y="10" width="16" height="20" rx="1.5" fill="#5b76f7" stroke="#1e2a78" strokeWidth="1" />
            <rect x="40" y="10" width="16" height="20" rx="1.5" fill="#5b76f7" stroke="#1e2a78" strokeWidth="1" />
            <circle cx="31" cy="28" r="2" fill="#0a1033" />
            <line x1="31" y1="30" x2="31" y2="36" stroke="#fbbf24" strokeWidth="1" />
            <line x1="28" y1="36" x2="34" y2="36" stroke="#fbbf24" strokeWidth="1" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 h-0 w-0"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-[86px] sm:-translate-y-[108px]">
          <div className="h-2 w-2 rounded-full bg-signal shadow-glow" />
        </div>
      </motion.div>
    </div>
  );
}
