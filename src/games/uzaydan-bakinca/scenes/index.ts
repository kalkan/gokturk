import { type ComponentType } from "react";
import { AtaturkBarajiScene } from "./AtaturkBaraji";
import { IstanbulHavalimaniScene } from "./IstanbulHavalimani";
import { KapadokyaScene } from "./Kapadokya";
import { StadyumScene } from "./Stadyum";

/**
 * `SatelliteScene.mockComponent` alanındaki string → React bileşeni eşlemesi.
 * Yeni mock sahne eklendiğinde hem scenes.ts kaydı hem de bu map güncellenir.
 */
export const SCENE_COMPONENTS: Record<string, ComponentType> = {
  AtaturkBarajiScene,
  IstanbulHavalimaniScene,
  KapadokyaScene,
  StadyumScene,
};
