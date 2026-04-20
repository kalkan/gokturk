import type { TerrainClass } from "@/data/types";

/**
 * Renk Avcısı için 4 temel arazi sınıfı.
 * Her sınıfın insan tarafı adı, emojisi, hex rengi ve spektral açıklama metni var.
 */
export const HUNTABLE_CLASSES = {
  vegetation: {
    label: "Sağlıklı Bitki",
    emoji: "🌿",
    color: "#65a30d",
    hint: "Yeşil tonları bitki örtüsünü gösterir — sağlıklı yapraklar kızılötesi ışığı çok yansıtır.",
  },
  water: {
    label: "Derin Su",
    emoji: "💧",
    color: "#0e7490",
    hint: "Derin su kızılötesi ışığı emer, uydudan çok koyu mavi/siyah görünür.",
  },
  soil: {
    label: "Kuru Toprak",
    emoji: "🟤",
    color: "#c2410c",
    hint: "Çıplak toprak çoğu dalga boyunu az yansıtır; kahverengi/turuncu ton tipiktir.",
  },
  urban: {
    label: "Şehir / Yerleşim",
    emoji: "🏙️",
    color: "#94a3b8",
    hint: "Beton ve çatı düzenli, açık gri tonlar oluşturur; spektral imza 'karmaşık'tır.",
  },
} as const satisfies Record<
  Exclude<TerrainClass, "cloud">,
  { label: string; emoji: string; color: string; hint: string }
>;

export type HuntableClass = keyof typeof HUNTABLE_CLASSES;

export interface PixelTask {
  target: HuntableClass;
  prompt: string;
}

export interface RenkAvcisiScene {
  id: string;
  name: string;
  location: string;
  /** 8 satır × 8 karakter; 'v' vegetation, 'w' water, 's' soil, 'u' urban */
  gridMap: string[];
  tasks: PixelTask[];
  educationalNote: string;
}

/**
 * 'v' | 'w' | 's' | 'u' karakterinden sınıfa çeviri.
 */
export function charToClass(c: string): HuntableClass {
  switch (c) {
    case "v":
      return "vegetation";
    case "w":
      return "water";
    case "s":
      return "soil";
    case "u":
      return "urban";
    default:
      throw new Error(`Bilinmeyen grid karakteri: ${c}`);
  }
}

export function parseGrid(map: string[]): HuntableClass[][] {
  return map.map((row) => Array.from(row, charToClass));
}

export const RENK_AVCISI_SCENES: RenkAvcisiScene[] = [
  {
    id: "harran-ovasi",
    name: "Harran Ovası",
    location: "Şanlıurfa · GAP sulama alanı",
    gridMap: [
      "vvvvvvvv",
      "vvvvsvvs",
      "vvvvsvvs",
      "vvvvvvvs",
      "svvvvvvs",
      "ssvvvvvs",
      "ssvvuuvv",
      "ssvvuuvv",
    ],
    tasks: [
      { target: "vegetation", prompt: "Sağlıklı bitki bul!" },
      { target: "soil", prompt: "Kuru toprak parseli bul!" },
      { target: "urban", prompt: "Yerleşim alanı bul!" },
    ],
    educationalNote:
      "Harran Ovası, Güneydoğu Anadolu Projesi (GAP) ile sulandığından yılın büyük bölümü yemyeşildir. Uydu görüntüsünde yeşil alanlar bitki örtüsünü, kahverengi bölgeler kuru toprağı gösterir.",
  },
  {
    id: "van-golu",
    name: "Van Gölü",
    location: "Van · Türkiye'nin en büyük gölü",
    gridMap: [
      "sssvvvvs",
      "ssvvvvws",
      "svwwwwws",
      "vwwwwwww",
      "wwwwwwww",
      "wwwwwwws",
      "swwwwwwv",
      "ssvvvvvv",
    ],
    tasks: [
      { target: "water", prompt: "Derin su bul!" },
      { target: "soil", prompt: "Kıyı toprağı bul!" },
      { target: "vegetation", prompt: "Göl kenarı bitki örtüsünü bul!" },
    ],
    educationalNote:
      "Su kızılötesi ışığı emer — bu yüzden göller uzaydan koyu görünür. Kıyıda toprak kahverengi, bitki örtüsü yeşil bantlar oluşturur.",
  },
];
