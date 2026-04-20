import { Routes, Route, Navigate } from "react-router-dom";
import { MainMenu } from "./components/shell/MainMenu";
import { AppShell } from "./components/shell/AppShell";
import { ComingSoon } from "./games/ComingSoon";
import { GAMES } from "./data/games";

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        {GAMES.map((game) => (
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
