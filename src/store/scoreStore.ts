import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";
import type { GameId, ScoreEntry } from "@/data/types";

const STORAGE_KEY = "uoa:scores:v1";

interface PersistShape {
  total: number;
  perGame: Record<GameId, number>;
  history: ScoreEntry[];
}

interface ScoreState extends PersistShape {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addPoints: (gameId: GameId, points: number) => void;
  reset: () => Promise<void>;
}

const emptyPerGame: Record<GameId, number> = {
  "uzaydan-bakinca": 0,
  "renk-avcisi": 0,
  "pixel-ninja": 0,
};

async function persist(state: PersistShape): Promise<void> {
  try {
    await idbSet(STORAGE_KEY, state);
  } catch {
    // IndexedDB erişilemezse sessizce yut — skor oturum içi yaşar.
  }
}

/**
 * Zustand tabanlı skor store. IndexedDB üzerinden kalıcıdır.
 * İlk kullanımda `hydrate()` ile önceki skorları geri yükler.
 */
export const useScoreStore = create<ScoreState>()((set, get) => ({
  total: 0,
  perGame: { ...emptyPerGame },
  history: [],
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;
    try {
      const saved = await idbGet<PersistShape>(STORAGE_KEY);
      if (saved) {
        set({ ...saved, hydrated: true });
        return;
      }
    } catch {
      // yoksay
    }
    set({ hydrated: true });
  },

  addPoints: (gameId, points) => {
    if (points <= 0) return;
    const { total, perGame, history } = get();
    const next: PersistShape = {
      total: total + points,
      perGame: { ...perGame, [gameId]: (perGame[gameId] ?? 0) + points },
      history: [...history, { gameId, points, playedAt: Date.now() }].slice(-50),
    };
    set(next);
    void persist(next);
  },

  reset: async () => {
    const next: PersistShape = { total: 0, perGame: { ...emptyPerGame }, history: [] };
    set(next);
    await persist(next);
  },
}));
