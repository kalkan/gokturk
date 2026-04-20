# Pixel Ninja

**Yaş:** 10-14 · **Accent:** amber

Segment bazlı arazi örtüsü sınıflandırma oyunu — gerçek uzaktan algılamadaki
**Object-Based Image Analysis (OBIA)** mantığını takip eder.

## Mekanik

- Sahne yüklenir: uydu görüntüsü + 8-15 SVG polygon segment.
- Oyuncu segment seçer → sınıf (Su/Bitki/Şehir/Toprak/Bulut) atar.
- Undo ile son atama geri alınabilir.
- Tüm segmentler sınıflandırılınca "Gönder" aktifleşir.

## Puanlama

- Doğru atama: +10 puan/segment, yanlış: 0 (ceza yok).
- Sonuç ekranında doğruluk (%), yanlışlar kırmızı kontur + doğru sınıflar.
- Bonus: confusion matrix.

## Seviyeler

| Seviye | Segment | Sınıf | Tipik sahne |
| --- | --- | --- | --- |
| Kolay | 8 | 3 (su/bitki/toprak) | Kıyı manzarası |
| Orta | 12 | 4 (+şehir) | Ankara çevresi |
| Zor | 15 | 5 (+bulut) | Kış manzarası |

## Sahne ekleme

`src/data/segments.ts` dosyasına `PixelNinjaScene` ekle. Arka plan için
`backgroundSvg` (viewBox 400x300) ve `segments` dizisi (SVG path + centroid +
correctClass) ver.
