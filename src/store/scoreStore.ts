import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";
import type { GameId, RoundResult, ScoreEntry } from "@/data/types";

const STORAGE_KEY = "uoa:scores:v2";
const LEGACY_KEY = "uoa:scores:v1";
const MAX_ROUNDS = 100;
const MAX_HISTORY = 50;

interface PersistShape {
  total: number;
  perGame: Record<GameId, number>;
  history: ScoreEntry[];
  rounds: RoundResult[];
}

interface NewRoundInput {
  playerName: string;
  gameId: GameId;
  points: number;
  correct: number;
  total: number;
}

interface ScoreState extends PersistShape {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  addPoints: (gameId: GameId, points: number) => void;
  finishRound: (input: NewRoundInput) => RoundResult;
  topRounds: (gameId: GameId, limit?: number) => RoundResult[];
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
    // yoksay
  }
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Skor store — hem toplam puanı hem round bazlı kayıtları tutar.
 *
 * `history`: her `addPoints()` için bir satır — analytics amaçlı, kısa tutulur.
 * `rounds`: bir oyun turu tamamlandığında `finishRound()` ile yazılan özet;
 *           leaderboard bu diziyi gruplayıp sıralayarak üretilir.
 */
export const useScoreStore = create<ScoreState>()((set, get) => ({
  total: 0,
  perGame: { ...emptyPerGame },
  history: [],
  rounds: [],
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;
    try {
      const saved =
        (await idbGet<PersistShape>(STORAGE_KEY)) ??
        (await idbGet<Partial<PersistShape>>(LEGACY_KEY));
      if (saved) {
        set({
          total: saved.total ?? 0,
          perGame: { ...emptyPerGame, ...(saved.perGame ?? {}) },
          history: saved.history ?? [],
          rounds: saved.rounds ?? [],
          hydrated: true,
        });
        return;
      }
    } catch {
      // yoksay
    }
    set({ hydrated: true });
  },

  addPoints: (gameId, points) => {
    if (points <= 0) return;
    const { total, perGame, history, rounds } = get();
    const next: PersistShape = {
      total: total + points,
      perGame: { ...perGame, [gameId]: (perGame[gameId] ?? 0) + points },
      history: [...history, { gameId, points, playedAt: Date.now() }].slice(-MAX_HISTORY),
      rounds,
    };
    set(next);
    void persist(next);
  },

  finishRound: ({ playerName, gameId, points, correct, total }) => {
    const entry: RoundResult = {
      id: makeId(),
      playerName,
      gameId,
      points,
      correct,
      total,
      playedAt: Date.now(),
    };
    const state = get();
    const next: PersistShape = {
      total: state.total,
      perGame: state.perGame,
      history: state.history,
      rounds: [entry, ...state.rounds].slice(0, MAX_ROUNDS),
    };
    set(next);
    void persist(next);
    return entry;
  },

  topRounds: (gameId, limit = 5) => {
    return get()
      .rounds.filter((r) => r.gameId === gameId)
      .sort((a, b) => b.points - a.points || b.playedAt - a.playedAt)
      .slice(0, limit);
  },

  reset: async () => {
    const next: PersistShape = {
      total: 0,
      perGame: { ...emptyPerGame },
      history: [],
      rounds: [],
    };
    set(next);
    await persist(next);
  },
}));
