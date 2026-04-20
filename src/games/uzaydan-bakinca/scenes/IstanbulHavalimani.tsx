/**
 * İstanbul Havalimanı — stilize uydu görünümü.
 * Çapraz pistler, taxiway'ler, terminal çatısı ve park alanı.
 */
export function IstanbulHavalimaniScene() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="İstanbul Havalimanı uydu görüntüsü">
      <defs>
        <linearGradient id="hav-arazi" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4d7c0f" />
          <stop offset="100%" stopColor="#365314" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#hav-arazi)" />
      <g opacity="0.35">
        <circle cx="70" cy="60" r="22" fill="#84cc16" />
        <circle cx="330" cy="240" r="28" fill="#84cc16" />
        <circle cx="60" cy="260" r="18" fill="#84cc16" />
      </g>
      <g transform="rotate(-12 200 150)">
        <rect x="30" y="120" width="340" height="24" fill="#1e293b" />
        <rect x="30" y="120" width="340" height="24" fill="none" stroke="#475569" strokeWidth="1" />
        <g fill="#f8fafc">
          <rect x="50" y="131" width="14" height="3" />
          <rect x="80" y="131" width="14" height="3" />
          <rect x="110" y="131" width="14" height="3" />
          <rect x="140" y="131" width="14" height="3" />
          <rect x="170" y="131" width="14" height="3" />
          <rect x="200" y="131" width="14" height="3" />
          <rect x="230" y="131" width="14" height="3" />
          <rect x="260" y="131" width="14" height="3" />
          <rect x="290" y="131" width="14" height="3" />
          <rect x="320" y="131" width="14" height="3" />
        </g>
      </g>
      <g transform="rotate(35 200 150)">
        <rect x="60" y="140" width="280" height="20" fill="#1e293b" />
        <g fill="#f8fafc">
          <rect x="80" y="149" width="12" height="2.5" />
          <rect x="110" y="149" width="12" height="2.5" />
          <rect x="140" y="149" width="12" height="2.5" />
          <rect x="170" y="149" width="12" height="2.5" />
          <rect x="200" y="149" width="12" height="2.5" />
          <rect x="230" y="149" width="12" height="2.5" />
          <rect x="260" y="149" width="12" height="2.5" />
          <rect x="290" y="149" width="12" height="2.5" />
          <rect x="320" y="149" width="12" height="2.5" />
        </g>
      </g>
      <g>
        <rect x="150" y="200" width="100" height="40" fill="#cbd5e1" stroke="#475569" strokeWidth="1" />
        <rect x="150" y="200" width="100" height="10" fill="#94a3b8" />
        <g fill="#f8fafc">
          <rect x="156" y="215" width="6" height="6" />
          <rect x="168" y="215" width="6" height="6" />
          <rect x="180" y="215" width="6" height="6" />
          <rect x="192" y="215" width="6" height="6" />
          <rect x="204" y="215" width="6" height="6" />
          <rect x="216" y="215" width="6" height="6" />
          <rect x="228" y="215" width="6" height="6" />
          <rect x="240" y="215" width="6" height="6" />
        </g>
      </g>
      <g fill="#e2e8f0">
        <path d="M110 60 l8 3 l-1 -8 l6 8 l-2 -12 l5 11 l1 -6 z" transform="rotate(-35 115 60)" />
        <path d="M310 80 l8 3 l-1 -8 l6 8 l-2 -12 l5 11 l1 -6 z" transform="rotate(20 315 80)" />
      </g>
    </svg>
  );
}
