import { useMemo } from "react";
import type { Segment, TerrainClass } from "@/data/types";
import { TERRAIN_META } from "./constants";
import { cn } from "@/lib/cn";

interface SegmentCanvasProps {
  backgroundSvg: string;
  segments: Segment[];
  assignments: Record<string, TerrainClass | undefined>;
  /** Inceleme evresinde segment → doğru/yanlış durumu */
  reviewResults?: Record<string, boolean> | null;
  /** Tıklamaya kilitli mi (inceleme evresinde true) */
  locked: boolean;
  onSegmentClick: (segmentId: string) => void;
  onSegmentHover?: (segmentId: string | null) => void;
}

/**
 * Pixel Ninja'nın interaktif uydu görüntüsü tuvali.
 * Arka plan SVG'si `dangerouslySetInnerHTML` ile basılır (sahne tanımlı,
 * kullanıcı girişi değil). Üzerine SVG polygon segmentleri çizilir; tıklama
 * kabul eden hücreler.
 */
export function SegmentCanvas({
  backgroundSvg,
  segments,
  assignments,
  reviewResults,
  locked,
  onSegmentClick,
  onSegmentHover,
}: SegmentCanvasProps) {
  // Arka plan <g> içerdiği için sanitize gerekmez; sahne verisi statik.
  const bgHtml = useMemo(() => ({ __html: backgroundSvg }), [backgroundSvg]);

  return (
    <div className="relative overflow-hidden rounded-3xl border-2 border-white/10 shadow-glow-lg">
      <svg
        viewBox="0 0 400 300"
        className="block h-auto w-full bg-space-900"
        role="img"
        aria-label="Uydu görüntüsü ve segmentler"
      >
        <g dangerouslySetInnerHTML={bgHtml} />

        {segments.map((seg) => {
          const assigned = assignments[seg.id];
          const result = reviewResults?.[seg.id];
          const meta = assigned ? TERRAIN_META[assigned] : undefined;

          let fill = "rgba(255,255,255,0.04)";
          let stroke = "rgba(255,255,255,0.55)";
          let strokeWidth = 1.5;

          if (assigned && meta) {
            fill = `${meta.color}88`;
            stroke = meta.color;
            strokeWidth = 2;
          }

          if (reviewResults) {
            if (result === false) {
              stroke = "#f43f5e";
              strokeWidth = 3;
            } else if (result === true) {
              stroke = "#10b981";
              strokeWidth = 2.5;
            }
          }

          return (
            <path
              key={seg.id}
              d={seg.path}
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeWidth}
              strokeLinejoin="round"
              className={cn(
                "transition-all duration-150",
                !locked && "cursor-pointer hover:brightness-125",
              )}
              style={{ pointerEvents: locked ? "none" : "all" }}
              onClick={() => !locked && onSegmentClick(seg.id)}
              onMouseEnter={() => onSegmentHover?.(seg.id)}
              onMouseLeave={() => onSegmentHover?.(null)}
              aria-label={`Segment ${seg.id}${assigned ? `, atanan: ${meta!.label}` : ", atanmadı"}`}
            />
          );
        })}

        {segments.map((seg) => {
          const assigned = assignments[seg.id];
          const correctMeta = reviewResults && !reviewResults[seg.id]
            ? TERRAIN_META[seg.correctClass]
            : undefined;
          return (
            <g key={`label-${seg.id}`} pointerEvents="none">
              {assigned && (
                <text
                  x={seg.centroid[0]}
                  y={seg.centroid[1] + 4}
                  textAnchor="middle"
                  fontSize="14"
                  className="select-none"
                >
                  {TERRAIN_META[assigned].emoji}
                </text>
              )}
              {correctMeta && (
                <text
                  x={seg.centroid[0]}
                  y={seg.centroid[1] + 18}
                  textAnchor="middle"
                  fontSize="9"
                  fill="#fff"
                  stroke="#000"
                  strokeWidth="0.4"
                  className="select-none font-semibold"
                >
                  → {correctMeta.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
