/**
 * Uydu sahnesi — tüm oyunlarda kullanılan ortak görüntü modeli.
 * Başlangıçta SVG tabanlı mock veriyle beslenir, ileride gezgin.gov.tr
 * üzerinden gerçek Göktürk-2 görüntüleriyle değiştirilebilir.
 */
export interface SatelliteScene {
  id: string;
  name: string;
  location: string;
  source: "mock" | "gokturk2" | "gezgin";
  imageUrl?: string;
  mockComponent?: string;
  metadata: {
    acquisitionDate?: string;
    resolution?: number;
    bands?: string[];
  };
}

export type TerrainClass = "water" | "vegetation" | "urban" | "soil" | "cloud";

export interface Segment {
  id: string;
  path: string;
  centroid: [number, number];
  correctClass: TerrainClass;
  hint?: string;
}

export interface PixelNinjaScene extends SatelliteScene {
  backgroundSvg: string;
  segments: Segment[];
  difficulty: "easy" | "medium" | "hard";
  educationalNote: string;
}

export type GameId = "uzaydan-bakinca" | "renk-avcisi" | "pixel-ninja";

export interface GameDefinition {
  id: GameId;
  title: string;
  tagline: string;
  ageRange: string;
  route: string;
  accent: "violet" | "emerald" | "amber";
  icon: "satellite" | "palette" | "grid";
  shortDescription: string;
}

export interface ScoreEntry {
  gameId: GameId;
  points: number;
  playedAt: number;
}
