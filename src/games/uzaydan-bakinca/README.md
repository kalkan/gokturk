# Uzaydan Bakınca Ne?

**Yaş:** 6-9 · **Accent:** violet

Uydu görüntüsü ile yer fotoğrafını/tarifini eşleştirme oyunu.

## Mekanik

1. Sahne (uydu görüntüsü) 1.5 sn sonra 3 seçenekli panele döner.
2. Doğru seçim: +10 puan, yeşil animasyon, confetti.
3. Yanlış seçim: kırmızı shake, doğru cevap vurgulanır.
4. 2 sn sonra sonraki sahneye geçilir.

## Sahne ekleme

1. `src/data/scenes.ts` dosyasına yeni `SatelliteScene` kaydı ekle.
2. Mock görsel için bu klasör altında `<MockComponent>.tsx` oluştur.
3. Sahne `mockComponent` alanı bu bileşenin adını göstermeli.
