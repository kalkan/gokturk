import { Routes, Route, Navigate } from "react-router-dom";
import { MainMenu } from "./components/shell/MainMenu";
import { AppShell } from "./components/shell/AppShell";
import { ComingSoon } from "./games/ComingSoon";
import { UzaydanBakincaGame } from "./games/uzaydan-bakinca/UzaydanBakincaGame";
import { RenkAvcisiGame } from "./games/renk-avcisi/RenkAvcisiGame";
import { GAMES } from "./data/games";

const IMPLEMENTED: ReadonlySet<string> = new Set(["uzaydan-bakinca", "renk-avcisi"]);

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<MainMenu />} />

        <Route path="/oyun/uzaydan-bakinca" element={<UzaydanBakincaGame />} />
        <Route path="/oyun/renk-avcisi" element={<RenkAvcisiGame />} />

        {GAMES.filter((g) => !IMPLEMENTED.has(g.id)).map((game) => (
          <Route
            key={game.id}
            path={game.route}
            element={<ComingSoon title={game.title} accent={game.accent} />}
          />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  );
}
