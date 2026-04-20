import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";
import type { GameId } from "@/data/types";

const STORAGE_KEY = "uoa:progress:v1";

interface ProgressShape {
  completedScenes: Record<GameId, string[]>;
}

interface ProgressState extends ProgressShape {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  markCompleted: (gameId: GameId, sceneId: string) => void;
  isCompleted: (gameId: GameId, sceneId: string) => boolean;
}

const empty: Record<GameId, string[]> = {
  "uzaydan-bakinca": [],
  "renk-avcisi": [],
  "pixel-ninja": [],
};

async function persist(state: ProgressShape): Promise<void> {
  try {
    await idbSet(STORAGE_KEY, state);
  } catch {
    // yoksay
  }
}

/**
 * Oyunların hangi sahnelerini tamamladığını saklar.
 * İlerideki rozet/level-unlock özellikleri için temel oluşturur.
 */
export const useProgressStore = create<ProgressState>()((set, get) => ({
  completedScenes: { ...empty },
  hydrated: false,

  hydrate: async () => {
    if (get().hydrated) return;
    try {
      const saved = await idbGet<ProgressShape>(STORAGE_KEY);
      if (saved) {
        set({ ...saved, hydrated: true });
        return;
      }
    } catch {
      // yoksay
    }
    set({ hydrated: true });
  },

  markCompleted: (gameId, sceneId) => {
    const list = get().completedScenes[gameId];
    if (list.includes(sceneId)) return;
    const next: ProgressShape = {
      completedScenes: { ...get().completedScenes, [gameId]: [...list, sceneId] },
    };
    set(next);
    void persist(next);
  },

  isCompleted: (gameId, sceneId) => get().completedScenes[gameId].includes(sceneId),
}));
