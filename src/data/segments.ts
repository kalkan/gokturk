import type { PixelNinjaScene } from "./types";

/**
 * Pixel Ninja için segment bazlı sahneler.
 * İlk MVP sahnesi: 8 segmentli bir kıyı manzarası (kolay seviye).
 * SVG viewBox 400x300 — arka plan ve segmentler aynı koordinat uzayını paylaşır.
 */
export const PIXEL_NINJA_SCENES: PixelNinjaScene[] = [
  {
    id: "kiyi-manzarasi",
    name: "Kıyı Manzarası",
    location: "Ege kıyıları (mock)",
    source: "mock",
    difficulty: "easy",
    educationalNote:
      "Uzaktan algılamada benzer pikselleri gruplayıp tek seferde sınıflandırırız. Buna segmentasyon denir. Senin yaptığın iş gerçek analistlerin yaptığıyla aynı!",
    metadata: { resolution: 2.5, bands: ["R", "G", "B"] },
    backgroundSvg: `
      <defs>
        <linearGradient id="sea" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0369a1"/>
          <stop offset="100%" stop-color="#0c4a6e"/>
        </linearGradient>
        <linearGradient id="land" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#a3a3a3"/>
          <stop offset="100%" stop-color="#525252"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sea)"/>
      <path d="M0,130 C80,100 160,170 240,140 C320,110 360,150 400,130 L400,300 L0,300 Z" fill="url(#land)"/>
      <path d="M40,180 C90,170 140,200 190,190 C240,180 280,210 340,200" stroke="#84cc16" stroke-width="22" fill="none" opacity="0.7"/>
      <circle cx="95" cy="220" r="14" fill="#c2410c" opacity="0.7"/>
      <rect x="260" y="210" width="40" height="28" fill="#94a3b8" opacity="0.8"/>
    `,
    segments: [
      {
        id: "s1",
        path: "M0,0 L400,0 L400,110 L0,130 Z",
        centroid: [200, 60],
        correctClass: "water",
        hint: "Mavi tonlar genellikle suyu gösterir.",
      },
      {
        id: "s2",
        path: "M0,130 C80,100 160,170 240,140 C320,110 360,150 400,130 L400,155 C320,135 240,165 160,155 C80,145 40,160 0,155 Z",
        centroid: [200, 135],
        correctClass: "soil",
        hint: "Kıyı şeridi kumlu/toprak bir bant oluşturur.",
      },
      {
        id: "s3",
        path: "M20,170 C70,160 120,190 170,180 C220,170 260,200 310,195 L310,215 C260,220 220,190 170,200 C120,210 70,180 20,190 Z",
        centroid: [170, 185],
        correctClass: "vegetation",
        hint: "Yeşil tonlar bitki örtüsünün işaretidir.",
      },
      {
        id: "s4",
        path: "M78,212 a16,14 0 1,0 32,0 a16,14 0 1,0 -32,0",
        centroid: [95, 220],
        correctClass: "soil",
      },
      {
        id: "s5",
        path: "M255,205 L305,205 L305,240 L255,240 Z",
        centroid: [280, 222],
        correctClass: "urban",
        hint: "Düzgün geometrik şekiller insan yapımı olabilir.",
      },
      {
        id: "s6",
        path: "M0,240 L150,240 L150,300 L0,300 Z",
        centroid: [75, 270],
        correctClass: "soil",
      },
      {
        id: "s7",
        path: "M150,240 L260,240 L260,300 L150,300 Z",
        centroid: [205, 270],
        correctClass: "vegetation",
      },
      {
        id: "s8",
        path: "M260,240 L400,240 L400,300 L260,300 Z",
        centroid: [330, 270],
        correctClass: "soil",
      },
    ],
  },
];
