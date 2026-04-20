import { type ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Radar } from "lucide-react";
import { Scoreboard } from "./Scoreboard";
import { SpaceBackground } from "./SpaceBackground";
import { NamePrompt } from "./NamePrompt";
import { useScoreStore } from "@/store/scoreStore";
import { useProfileStore } from "@/store/profileStore";

interface AppShellProps {
  children: ReactNode;
}

/**
 * Tüm sayfaları saran kabuk. Hydrasyon sonrası:
 * - Oyun rotalarında ve profil adı yoksa otomatik NamePrompt açılır.
 * - Ana menüden veya header'dan adın değiştirilmesi mümkündür.
 */
export function AppShell({ children }: AppShellProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const hydrateScore = useScoreStore((s) => s.hydrate);
  const hydrateProfile = useProfileStore((s) => s.hydrate);
  const profileHydrated = useProfileStore((s) => s.hydrated);
  const playerName = useProfileStore((s) => s.playerName);

  const [editing, setEditing] = useState(false);

  const isHome = location.pathname === "/";
  const isOnGame = location.pathname.startsWith("/oyun/");
  const needsName = profileHydrated && !playerName && isOnGame;

  useEffect(() => {
    void hydrateScore();
    void hydrateProfile();
  }, [hydrateScore, hydrateProfile]);

  return (
    <div className="relative min-h-screen">
      <SpaceBackground />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="flex items-center justify-between gap-2 px-4 pt-4 sm:px-6 sm:pt-6">
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

          <div className="flex items-center gap-2">
            {playerName && (
              <button
                onClick={() => setEditing(true)}
                className="group hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10 sm:inline-flex"
                aria-label={`Oyuncu: ${playerName} — adı değiştir`}
              >
                <span className="max-w-[10ch] truncate font-semibold">{playerName}</span>
                <Pencil className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-200" />
              </button>
            )}
            <Scoreboard />
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>

        <footer className="px-4 pb-6 text-center text-xs text-slate-400/70 sm:px-6">
          <p>
            Göktürk-2 verileriyle — TÜBİTAK Uzay · Çocuklar ve gençler için eğitici oyun platformu
          </p>
        </footer>
      </div>

      <NamePrompt
        open={needsName || editing}
        dismissible={!!playerName}
        onClose={() => setEditing(false)}
      />
    </div>
  );
}
