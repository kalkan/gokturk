import { registerSW } from "virtual:pwa-register";

/**
 * Service worker'ı kaydeder ve güncelleme olduğunda sessizce yeniler.
 * Dev modunda no-op davranır; vite-plugin-pwa bu modu otomatik yönetir.
 */
export function registerPWA(): void {
  if (typeof window === "undefined") return;
  registerSW({ immediate: true });
}
