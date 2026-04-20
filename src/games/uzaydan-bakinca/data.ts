import type { SatelliteScene } from "@/data/types";

/**
 * Bir sahneye eşlik eden "insan tarafı" tanım — oyuncunun göreceği seçenek
 * bilgisi. Emoji + yerel isim + kısa konum bilgisi.
 */
export interface SceneOption {
  sceneId: string;
  emoji: string;
  label: string;
  location: string;
}

export const OPTIONS: SceneOption[] = [
  {
    sceneId: "ataturk-baraji",
    emoji: "🌊",
    label: "Baraj",
    location: "Atatürk Barajı · Şanlıurfa",
  },
  {
    sceneId: "istanbul-havalimani",
    emoji: "✈️",
    label: "Havalimanı",
    location: "İstanbul Havalimanı",
  },
  {
    sceneId: "kapadokya",
    emoji: "🎈",
    label: "Peribacaları",
    location: "Kapadokya · Nevşehir",
  },
  {
    sceneId: "ataturk-olimpiyat-stadyumu",
    emoji: "🏟️",
    label: "Stadyum",
    location: "Atatürk Olimpiyat Stadyumu",
  },
];

export function findOption(sceneId: string): SceneOption {
  const opt = OPTIONS.find((o) => o.sceneId === sceneId);
  if (!opt) throw new Error(`Option not found for scene: ${sceneId}`);
  return opt;
}

/**
 * Fisher-Yates karıştırma. Seed gerekmez — her round rastgele.
 */
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Bir sahne için doğru cevap + 2 distractor.
 */
export function buildChoices(correctScene: SatelliteScene): SceneOption[] {
  const correct = findOption(correctScene.id);
  const distractors = shuffle(OPTIONS.filter((o) => o.sceneId !== correctScene.id)).slice(0, 2);
  return shuffle([correct, ...distractors]);
}
