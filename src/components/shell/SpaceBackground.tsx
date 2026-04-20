import { useMemo } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  delay: number;
}

function seedRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Sabit-seed ile üretilmiş yıldızlar ve grid dokusu.
 * Re-render'larda yıldızlar "zıplamaz", görsel süreklilik korunur.
 */
export function SpaceBackground() {
  const stars = useMemo<Star[]>(() => {
    const rand = seedRandom(42);
    return Array.from({ length: 80 }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      r: rand() * 1.4 + 0.3,
      delay: rand() * 3,
    }));
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-aurora" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r / 10}
            fill="white"
            className="animate-twinkle"
            style={{ animationDelay: `${s.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
