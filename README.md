# Uydu Oyun Akademisi

> Göktürk-2 uydu görüntüleriyle çocuklar ve gençler için eğitici oyun platformu.
> [English below](#english)

**TÜBİTAK Uzay · Uzaktan Algılama Grubu** için geliştirilen açık kaynak PWA.
Tek uygulamada üç oyun, ortak skor sistemi ve ortak görüntü havuzu.

## Oyunlar

| Oyun | Yaş | Konu |
| --- | --- | --- |
| **Uzaydan Bakınca Ne?** | 6-9 | Uydu görüntüsü ↔ yer fotoğrafı eşleştirme |
| **Renk Avcısı** | 6-9 | Spektral imza sezgisi (renk bulma) |
| **Pixel Ninja** | 10-14 | Segment bazlı arazi örtüsü sınıflandırma (OBIA) |

## Teknik Yığın

- **React 18 + Vite + TypeScript**
- **Tailwind CSS** (özel tasarım tokenları)
- **Zustand** + **idb-keyval** (IndexedDB kalıcı skor)
- **Framer Motion** (animasyonlar)
- **React Router** (ana menü ↔ oyunlar)
- **vite-plugin-pwa** (offline, install edilebilir)
- **Canvas + SVG** (segment çizimi)

## Kurulum

```bash
npm install
npm run dev       # http://localhost:5173
```

## Komutlar

```bash
npm run dev       # dev server (HMR)
npm run build     # production build (tsc + vite build)
npm run preview   # üretim build'ini yerelde sunar
npm run lint      # ESLint
npm run format    # Prettier
```

## Dosya Yapısı

```
src/
├── components/
│   ├── shell/        # AppShell, MainMenu, Scoreboard, AnimatedSatellite, GameCard
│   ├── shared/       # Tüm oyunlarda paylaşılan bileşenler (ileride)
│   └── ui/           # Button, Card, Toast
├── games/
│   ├── ComingSoon.tsx         # Geçici ekran (her oyun yerine)
│   ├── uzaydan-bakinca/       # Oyun 1
│   ├── renk-avcisi/           # Oyun 2
│   └── pixel-ninja/           # Oyun 3 (segment bazlı)
├── data/
│   ├── types.ts               # SatelliteScene, Segment, GameDefinition, ScoreEntry
│   ├── games.ts               # Oyun kataloğu
│   ├── scenes.ts              # Mock uydu sahneleri
│   ├── segments.ts            # Pixel Ninja sahneleri (SVG + segment path)
│   └── sceneLoader.ts         # Adapter: mock → gezgin.gov.tr geçişi
├── store/
│   ├── scoreStore.ts          # Zustand skor (IndexedDB kalıcı)
│   └── progressStore.ts       # Tamamlanan sahneler
├── lib/
│   ├── cn.ts                  # className yardımcı
│   └── pwa.ts                 # Service worker kaydı
├── App.tsx
└── main.tsx
```

## Veri Katmanı — Göktürk-2 Entegrasyonu

`src/data/sceneLoader.ts` bir **adapter pattern** uygular. Başlangıçta yalnızca
mock veriyi döner; gerçek Göktürk-2 görüntüleri eklendiğinde yeni bir
`SceneSource` adapter'ı (`GezginAdapter`) aynı arayüzü uygulayacak ve
`setSceneSource()` ile aktif edilecektir. Oyun bileşenlerinde tek bir satır bile
değişmez.

## Tasarım Dili

- **Tema:** koyu uzay (slate-950/space-950) + sarı-amber aksan (uydu sinyali)
- **Tipografi:** başlıklar **Space Grotesk**, gövde **Manrope**
- **İkonlar:** `lucide-react`
- **Animasyon:** `framer-motion` + Tailwind keyframe (twinkle, orbit, float)
- **Mobil öncelikli** — tablet + telefon test hedefi

## İlk Sprint Durumu

- [x] Proje kurulumu (Vite + React + TS + Tailwind + PWA)
- [x] Tasarım sistemi (renk tokenları, UI primitives)
- [x] Ana kabuk (animasyonlu uydu, üç oyun kartı, skor göstergesi)
- [x] Veri katmanı (types, mock sahneler, adapter, Pixel Ninja segment sahnesi)
- [x] Zustand skor + IndexedDB kalıcılık
- [x] PWA manifest + service worker
- [x] Oyun 1: Uzaydan Bakınca Ne? — MVP (4 sahne)
- [x] Oyun 2: Renk Avcısı — MVP (2 sahne × 3 görev)
- [x] Oyun 3: Pixel Ninja — MVP (1 kolay sahne, 8 segment, OBIA)
- [x] GitHub Actions ile GitHub Pages deploy
- [ ] Gerçek Göktürk-2 görüntü entegrasyonu (gezgin.gov.tr adapter)
- [ ] i18n (TR birincil, EN ikincil)
- [ ] Ek sahneler (orta / zor seviyeler, GEO Dedektif, NDVI Master)

## GitHub Pages

Her `main` veya `claude/satellite-game-platform-PGFhI` push'unda otomatik
build/deploy tetiklenir. İlk deploy için **Settings → Pages → Source**
seçeneği **GitHub Actions** olmalı. Yayın URL'si:

`https://<kullanıcı>.github.io/gokturk/`

---

<a id="english"></a>

## English

**Satellite Game Academy** — an educational PWA built around Türkiye's
**Göktürk-2** satellite imagery. Three mini-games in one shell, aimed at kids
(ages 6-9) and teens (10-14).

- **What Does It Look Like From Space?** — match satellite views with ground
  photos.
- **Color Hunter** — intuition for spectral signatures via color matching.
- **Pixel Ninja** — segment-based land cover classification that mirrors real
  Object-Based Image Analysis (OBIA).

See above for setup and commands. PRs welcome.
