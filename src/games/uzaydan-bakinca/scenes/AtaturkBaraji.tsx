/**
 * Atatürk Barajı — stilize uydu görünümü.
 * Dallı göl gövdesi + baraj seddesi + tarım parselleri.
 */
export function AtaturkBarajiScene() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Atatürk Barajı uydu görüntüsü">
      <defs>
        <linearGradient id="baraj-su" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="baraj-arazi" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a16207" />
          <stop offset="100%" stopColor="#57340a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#baraj-arazi)" />
      <g opacity="0.7">
        <rect x="20" y="30" width="60" height="40" fill="#65a30d" />
        <rect x="90" y="25" width="45" height="35" fill="#84cc16" />
        <rect x="310" y="40" width="70" height="50" fill="#4d7c0f" />
        <rect x="300" y="210" width="80" height="60" fill="#65a30d" />
        <rect x="20" y="230" width="90" height="50" fill="#84cc16" />
      </g>
      <path
        d="M60,150
           C 100,110 150,120 180,140
           C 210,160 220,200 260,200
           C 300,200 330,170 360,180
           L 360,210
           C 330,210 300,230 260,230
           C 220,230 200,190 170,170
           C 140,150 100,150 60,180 Z"
        fill="url(#baraj-su)"
      />
      <path
        d="M200,120 C 215,125 225,140 240,135 C 255,130 265,118 280,125"
        fill="none"
        stroke="#0c4a6e"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.7"
      />
      <rect x="355" y="175" width="16" height="40" fill="#e5e7eb" stroke="#475569" strokeWidth="1.5" />
      <rect x="352" y="170" width="22" height="6" fill="#475569" />
    </svg>
  );
}
