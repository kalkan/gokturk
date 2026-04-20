import type { SatelliteScene } from "./types";

/**
 * Mock uydu sahne kataloğu.
 * `source: "mock"` olanlar SVG placeholder'larla gösterilir.
 * Gerçek Göktürk-2 görüntüleri eklendiğinde `source`, `imageUrl` ve
 * `metadata` alanları doldurulur; sceneLoader bu ayrımı otomatik yönetir.
 */
export const MOCK_SCENES: SatelliteScene[] = [
  {
    id: "ataturk-baraji",
    name: "Atatürk Barajı",
    location: "Şanlıurfa, Türkiye",
    source: "mock",
    mockComponent: "AtaturkBarajiScene",
    metadata: {
      resolution: 2.5,
      bands: ["R", "G", "B", "NIR"],
    },
  },
  {
    id: "istanbul-havalimani",
    name: "İstanbul Havalimanı",
    location: "İstanbul, Türkiye",
    source: "mock",
    mockComponent: "IstanbulHavalimaniScene",
    metadata: { resolution: 2.5 },
  },
  {
    id: "kapadokya",
    name: "Kapadokya Peribacaları",
    location: "Nevşehir, Türkiye",
    source: "mock",
    mockComponent: "KapadokyaScene",
    metadata: { resolution: 2.5 },
  },
  {
    id: "ataturk-olimpiyat-stadyumu",
    name: "Atatürk Olimpiyat Stadyumu",
    location: "İstanbul, Türkiye",
    source: "mock",
    mockComponent: "StadyumScene",
    metadata: { resolution: 2.5 },
  },
];
