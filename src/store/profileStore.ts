import { create } from "zustand";
import { get as idbGet, set as idbSet } from "idb-keyval";

const STORAGE_KEY = "uoa:profile:v1";
export const MAX_NAME_LENGTH = 20;

interface PersistShape {
  playerName: string | null;
}

interface ProfileState extends PersistShape {
  hydrated: boolean;
  hydrate: () => Promise<void>;
  setName: (name: string) => void;
  clear: () => Promise<void>;
}

async function persist(state: PersistShape): Promise<void> {
  try {
    await idbSet(STORAGE_KEY, state);
  } catch {
    // IDB erişilemezse sessiz geç
  }
}

export function normalizeName(raw: string): string {
  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_NAME_LENGTH);
}

/**
 * Oyuncu profili — şimdilik sadece görünen ad.
 * Avatar / emoji / tema gibi alanlar ileride buraya eklenebilir.
 */
export const useProfileStore = create<ProfileState>()((set, get) => ({
  playerName: null,
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

  setName: (name) => {
    const clean = normalizeName(name);
    if (!clean) return;
    set({ playerName: clean });
    void persist({ playerName: clean });
  },

  clear: async () => {
    set({ playerName: null });
    await persist({ playerName: null });
  },
}));
