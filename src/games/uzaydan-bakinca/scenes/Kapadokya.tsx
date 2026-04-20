/**
 * Kapadokya — stilize uydu görünümü.
 * Vadiler, peribacası gölgeleri ve açık renk volkanik tüf doku.
 */
export function KapadokyaScene() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Kapadokya uydu görüntüsü">
      <defs>
        <linearGradient id="kap-toprak" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <radialGradient id="peri-golge" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#292524" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#292524" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#kap-toprak)" />
      <g stroke="#7c2d12" strokeWidth="3" fill="none" opacity="0.7">
        <path d="M0,80 C 60,70 120,110 200,90 C 280,70 340,110 400,100" />
        <path d="M0,170 C 60,160 130,200 210,180 C 290,160 340,200 400,190" />
        <path d="M0,250 C 80,240 160,270 240,250 C 320,230 360,260 400,250" />
      </g>
      <g fill="#78350f" opacity="0.35">
        <path d="M30,60 C 60,50 90,90 120,70 C 150,50 180,80 210,60 L 210,90 C 180,105 150,80 120,100 C 90,120 60,85 30,95 Z" />
        <path d="M240,150 C 280,140 310,180 360,160 L 360,190 C 310,205 280,170 240,185 Z" />
      </g>
      <g>
        {[
          [70, 140],
          [105, 125],
          [135, 155],
          [90, 165],
          [155, 138],
          [220, 110],
          [255, 130],
          [290, 115],
          [325, 145],
          [275, 155],
          [180, 230],
          [215, 240],
          [250, 225],
          [300, 245],
          [130, 225],
          [90, 240],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <ellipse cx={cx + 2} cy={cy + 4} rx="7" ry="4" fill="url(#peri-golge)" />
            <circle cx={cx} cy={cy} r="3.5" fill="#f5f5f4" stroke="#78350f" strokeWidth="0.7" />
          </g>
        ))}
      </g>
    </svg>
  );
}
