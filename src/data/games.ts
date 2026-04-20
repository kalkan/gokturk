import type { GameDefinition } from "./types";

/**
 * Platformdaki oyunların katalog tanımı.
 * Ana menü kartları ve rotalar buradan türetilir.
 */
export const GAMES: GameDefinition[] = [
  {
    id: "uzaydan-bakinca",
    title: "Uzaydan Bakınca Ne?",
    tagline: "Uydu gözüyle tahmin et",
    ageRange: "6-9 yaş",
    route: "/oyun/uzaydan-bakinca",
    accent: "violet",
    icon: "satellite",
    shortDescription:
      "Yukarıdan gördüğün görüntü hangi yere ait? Baraj mı, havalimanı mı, stadyum mu?",
  },
  {
    id: "renk-avcisi",
    title: "Renk Avcısı",
    tagline: "Spektral imzanın peşine düş",
    ageRange: "6-9 yaş",
    route: "/oyun/renk-avcisi",
    accent: "emerald",
    icon: "palette",
    shortDescription: "Sağlıklı bitki, derin su, kuru toprak — doğru rengi bulmak sende!",
  },
  {
    id: "pixel-ninja",
    title: "Pixel Ninja",
    tagline: "Segment segment sınıflandır",
    ageRange: "10-14 yaş",
    route: "/oyun/pixel-ninja",
    accent: "amber",
    icon: "grid",
    shortDescription:
      "Uydu görüntüsünü parçalara ayırdık. Her parçanın ne olduğunu sen etiketle.",
  },
];

export function findGame(id: string): GameDefinition | undefined {
  return GAMES.find((g) => g.id === id);
}
