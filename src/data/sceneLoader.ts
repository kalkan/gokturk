import { MOCK_SCENES } from "./scenes";
import { PIXEL_NINJA_SCENES } from "./segments";
import type { PixelNinjaScene, SatelliteScene } from "./types";

/**
 * Veri kaynağı soyutlaması — adapter pattern.
 *
 * Başlangıçta yalnızca mock veriyi döner. İleride gezgin.gov.tr üzerinden
 * gerçek Göktürk-2 görüntüleri geldiğinde, ilgili adapter'ı (`GezginAdapter`)
 * aynı arayüzü uygulayarak ekleyip `activeSource`'u çevirebiliriz. Oyun
 * bileşenleri hiçbir şey bilmeden yeni görüntülerle çalışmaya devam eder.
 */
export interface SceneSource {
  readonly id: string;
  listScenes(): Promise<SatelliteScene[]>;
  getScene(id: string): Promise<SatelliteScene | undefined>;
  listPixelNinjaScenes(): Promise<PixelNinjaScene[]>;
}

const mockSource: SceneSource = {
  id: "mock",
  async listScenes() {
    return MOCK_SCENES;
  },
  async getScene(id) {
    return MOCK_SCENES.find((s) => s.id === id);
  },
  async listPixelNinjaScenes() {
    return PIXEL_NINJA_SCENES;
  },
};

let active: SceneSource = mockSource;

export function getSceneSource(): SceneSource {
  return active;
}

/**
 * Test/geçiş senaryolarında aktif kaynağı değiştirmek için.
 */
export function setSceneSource(source: SceneSource): void {
  active = source;
}
