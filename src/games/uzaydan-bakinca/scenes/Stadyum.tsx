/**
 * Atatürk Olimpiyat Stadyumu — stilize uydu görünümü.
 * Oval çatı, yeşil saha, pist ve çevre otopark.
 */
export function StadyumScene() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Atatürk Olimpiyat Stadyumu uydu görüntüsü">
      <rect width="400" height="300" fill="#4d7c0f" />
      <g opacity="0.3">
        <rect x="0" y="0" width="400" height="300" fill="url(#stad-grid)" />
      </g>
      <defs>
        <pattern id="stad-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0 H0 V40" fill="none" stroke="#365314" strokeWidth="1" />
        </pattern>
        <radialGradient id="cati" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
      </defs>
      <g opacity="0.85">
        <rect x="30" y="40" width="60" height="30" fill="#94a3b8" />
        <rect x="310" y="230" width="60" height="30" fill="#94a3b8" />
        <rect x="30" y="230" width="60" height="30" fill="#94a3b8" />
        <rect x="310" y="40" width="60" height="30" fill="#94a3b8" />
        <g fill="#1e293b">
          <rect x="34" y="44" width="6" height="4" />
          <rect x="44" y="44" width="6" height="4" />
          <rect x="54" y="44" width="6" height="4" />
          <rect x="64" y="44" width="6" height="4" />
          <rect x="74" y="44" width="6" height="4" />
          <rect x="84" y="44" width="6" height="4" />
          <rect x="34" y="56" width="6" height="4" />
          <rect x="44" y="56" width="6" height="4" />
          <rect x="54" y="56" width="6" height="4" />
          <rect x="64" y="56" width="6" height="4" />
          <rect x="74" y="56" width="6" height="4" />
          <rect x="84" y="56" width="6" height="4" />
        </g>
      </g>
      <ellipse cx="200" cy="150" rx="150" ry="90" fill="url(#cati)" stroke="#334155" strokeWidth="3" />
      <ellipse cx="200" cy="150" rx="128" ry="72" fill="#1e293b" />
      <ellipse cx="200" cy="150" rx="112" ry="62" fill="#f97316" opacity="0.9" />
      <ellipse cx="200" cy="150" rx="96" ry="54" fill="#15803d" />
      <g stroke="#f8fafc" strokeWidth="1.4" fill="none">
        <line x1="200" y1="96" x2="200" y2="204" />
        <circle cx="200" cy="150" r="14" />
        <rect x="104" y="128" width="20" height="44" />
        <rect x="276" y="128" width="20" height="44" />
      </g>
    </svg>
  );
}
