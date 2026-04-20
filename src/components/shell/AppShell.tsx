import { type ReactNode, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Radar } from "lucide-react";
import { Scoreboard } from "./Scoreboard";
import { SpaceBackground } from "./SpaceBackground";
import { useScoreStore } from "@/store/scoreStore";

interface AppShellProps {
  children: ReactNode;
}

/**
 * Tüm sayfaları saran kabuk: uzay arka planı, üst çubuk (logo + skor),
 * oyun sayfalarında geri butonu.
 */
export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const hydrate = useScoreStore((s) => s.hydrate);
  const isHome = location.pathname === "/";

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
          <div className="flex items-center gap-3">
            {!isHome && (
              <button
                onClick={() => navigate(-1)}
                aria-label="Geri dön"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-space-400 to-signal text-space-950 shadow-glow">
                <Radar className="h-4 w-4" />
              </span>
              <span className="heading text-lg font-semibold text-slate-100 sm:text-xl">
                Uydu Oyun <span className="text-gradient-signal">Akademisi</span>
              </span>
            </Link>
          </div>
          <Scoreboard />
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>

        <footer className="px-4 pb-6 text-center text-xs text-slate-400/70 sm:px-6">
          <p>
            Göktürk-2 verileriyle — TÜBİTAK Uzay · Çocuklar ve gençler için eğitici oyun platformu
          </p>
        </footer>
      </div>
    </div>
  );
}
