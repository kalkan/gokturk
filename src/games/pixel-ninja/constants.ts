import type { TerrainClass } from "@/data/types";

/**
 * Pixel Ninja palette'inde görünen arazi sınıflarının meta bilgisi.
 * `cloud` sadece zor seviyede gösterilir (useClasses fonksiyonu filtreler).
 */
export const TERRAIN_META: Record<
  TerrainClass,
  { label: string; emoji: string; color: string }
> = {
  water: { label: "Su", emoji: "💧", color: "#0ea5e9" },
  vegetation: { label: "Bitki", emoji: "🌿", color: "#65a30d" },
  soil: { label: "Toprak", emoji: "🟤", color: "#c2410c" },
  urban: { label: "Şehir", emoji: "🏙️", color: "#94a3b8" },
  cloud: { label: "Bulut", emoji: "☁️", color: "#f1f5f9" },
};

export const POINTS_PER_CORRECT_SEGMENT = 10;

export function classesForDifficulty(
  difficulty: "easy" | "medium" | "hard",
): TerrainClass[] {
  const base: TerrainClass[] = ["water", "vegetation", "soil", "urban"];
  return difficulty === "hard" ? [...base, "cloud"] : base;
}
