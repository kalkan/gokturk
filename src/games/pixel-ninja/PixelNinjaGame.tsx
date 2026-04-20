import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, Home, RotateCcw, Send, Undo2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MiniLeaderboard } from "@/components/shell/MiniLeaderboard";
import { useScoreStore } from "@/store/scoreStore";
import { useProgressStore } from "@/store/progressStore";
import { useProfileStore } from "@/store/profileStore";
import { getSceneSource } from "@/data/sceneLoader";
import type { PixelNinjaScene, TerrainClass } from "@/data/types";
import { SegmentCanvas } from "./SegmentCanvas";
import { ClassPalette } from "./ClassPalette";
import { POINTS_PER_CORRECT_SEGMENT, classesForDifficulty } from "./constants";

type Phase = "playing" | "reviewing";
type Assignments = Record<string, TerrainClass | undefined>;
type History = Array<{ segmentId: string; prev: TerrainClass | undefined }>;

/**
 * Pixel Ninja MVP — Object-Based Image Analysis (OBIA) mantığıyla.
 * Oyuncu paletten bir sınıf seçer ve segmentlere "boyar"; Undo ile son atama
 * geri alınabilir. Tüm segmentler atandıktan sonra Gönder ile sonuç ekranı açılır.
 */
export function PixelNinjaGame() {
  const [scenes, setScenes] = useState<PixelNinjaScene[] | null>(null);
  // MVP'de tek sahne var; ikinci/üçüncü sahne eklendiğinde state'e dönecek.
  const sceneIndex = 0;
  const [selected, setSelected] = useState<TerrainClass | null>(null);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [history, setHistory] = useState<History>([]);
  const [phase, setPhase] = useState<Phase>("playing");
  const [hovered, setHovered] = useState<string | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [lastRoundId, setLastRoundId] = useState<string | null>(null);
  const scoredRef = useRef(false);

  const addPoints = useScoreStore((s) => s.addPoints);
  const finishRound = useScoreStore((s) => s.finishRound);
  const markCompleted = useProgressStore((s) => s.markCompleted);
  const playerName = useProfileStore((s) => s.playerName);

  useEffect(() => {
    let cancelled = false;
    void getSceneSource()
      .listPixelNinjaScenes()
      .then((s) => {
        if (!cancelled) setScenes(s);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const scene = scenes?.[sceneIndex];

  const availableClasses = useMemo(
    () => (scene ? classesForDifficulty(scene.difficulty) : []),
    [scene],
  );

  const assignedCount = useMemo(
    () => Object.values(assignments).filter(Boolean).length,
    [assignments],
  );

  const allAssigned = scene ? assignedCount === scene.segments.length : false;

  const handleSegmentClick = useCallback(
    (segmentId: string) => {
      if (!selected) return;
      setHistory((h) => [...h, { segmentId, prev: assignments[segmentId] }]);
      setAssignments((a) => ({ ...a, [segmentId]: selected }));
    },
    [selected, assignments],
  );

  const handleUndo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setAssignments((a) => {
      const next = { ...a };
      if (last.prev === undefined) {
        delete next[last.segmentId];
      } else {
        next[last.segmentId] = last.prev;
      }
      return next;
    });
    setHistory((h) => h.slice(0, -1));
  }, [history]);

  const submit = useCallback(() => {
    if (!scene || !allAssigned || phase === "reviewing") return;
    let correct = 0;
    for (const seg of scene.segments) {
      if (assignments[seg.id] === seg.correctClass) correct++;
    }
    const earned = correct * POINTS_PER_CORRECT_SEGMENT;
    if (!scoredRef.current) {
      addPoints("pixel-ninja", earned);
      setSessionScore((s) => s + earned);
      markCompleted("pixel-ninja", scene.id);
      if (playerName) {
        const entry = finishRound({
          playerName,
          gameId: "pixel-ninja",
          points: earned,
          correct,
          total: scene.segments.length,
        });
        setLastRoundId(entry.id);
      }
      scoredRef.current = true;
    }
    setPhase("reviewing");
  }, [scene, allAssigned, phase, assignments, addPoints, markCompleted, finishRound, playerName]);

  const reviewResults = useMemo(() => {
    if (!scene || phase !== "reviewing") return null;
    const map: Record<string, boolean> = {};
    for (const seg of scene.segments) {
      map[seg.id] = assignments[seg.id] === seg.correctClass;
    }
    return map;
  }, [scene, phase, assignments]);

  const restart = useCallback(() => {
    setAssignments({});
    setHistory([]);
    setSelected(null);
    setPhase("playing");
    setLastRoundId(null);
    scoredRef.current = false;
  }, []);

  if (!scene) {
    return (
      <div className="mx-auto max-w-3xl">
        <Card className="p-10 text-center text-slate-300">Sahneler yükleniyor…</Card>
      </div>
    );
  }

  if (phase === "reviewing" && reviewResults) {
    const correct = Object.values(reviewResults).filter(Boolean).length;
    const total = scene.segments.length;
    const accuracy = Math.round((correct / total) * 100);
    const earned = correct * POINTS_PER_CORRECT_SEGMENT;
    return (
      <div className="mx-auto max-w-3xl">
        <Header sceneName={scene.name} difficulty={scene.difficulty} />

        <div className="mt-5">
          <SegmentCanvas
            backgroundSvg={scene.backgroundSvg}
            segments={scene.segments}
            assignments={assignments}
            reviewResults={reviewResults}
            locked
            onSegmentClick={() => undefined}
          />
        </div>

        <Card className="mt-5 p-5">
          <div className="flex flex-wrap items-center justify-around gap-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Doğru</p>
              <p className="heading text-2xl font-bold text-emerald-300">
                {correct}/{total}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Doğruluk</p>
              <p className="heading text-2xl font-bold text-signal">%{accuracy}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Kazandın</p>
              <p className="heading text-2xl font-bold text-slate-100">+{earned}</p>
            </div>
          </div>
        </Card>

        <Card className="mt-4 border-emerald-400/20 bg-emerald-500/5 p-5">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300/80">
                Bunu öğrendin
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-200">{scene.educationalNote}</p>
            </div>
          </div>
        </Card>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button onClick={restart} variant="primary">
            <RotateCcw className="h-4 w-4" />
            Aynı sahneyi tekrar dene
          </Button>
          <Link to="/" className="btn btn-ghost">
            <Home className="h-4 w-4" />
            Ana menü
          </Link>
        </div>

        {sessionScore !== earned && (
          <p className="mt-3 text-center text-sm text-slate-400">
            Bu oturumda toplam +{sessionScore} puan
          </p>
        )}

        <div className="mt-6">
          <MiniLeaderboard gameId="pixel-ninja" highlightId={lastRoundId} />
        </div>
      </div>
    );
  }

  const hoveredSegment = hovered ? scene.segments.find((s) => s.id === hovered) : undefined;

  return (
    <div className="mx-auto max-w-3xl">
      <Header sceneName={scene.name} difficulty={scene.difficulty} />

      <Card className="mt-4 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-300">
            <span className="font-semibold text-slate-100 tabular-nums">
              {assignedCount}/{scene.segments.length}
            </span>{" "}
            segment atandı
          </span>
          <AnimatePresence mode="wait">
            {hoveredSegment?.hint && (
              <motion.span
                key={hoveredSegment.id}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="hidden text-xs text-amber-200 sm:block"
              >
                💡 {hoveredSegment.hint}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-signal"
            animate={{ width: `${(assignedCount / scene.segments.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          />
        </div>
      </Card>

      <div className="mt-4">
        <SegmentCanvas
          backgroundSvg={scene.backgroundSvg}
          segments={scene.segments}
          assignments={assignments}
          locked={false}
          onSegmentClick={handleSegmentClick}
          onSegmentHover={setHovered}
        />
      </div>

      <div className="mt-4">
        <ClassPalette
          classes={availableClasses}
          selected={selected}
          onSelect={setSelected}
          disabled={false}
        />
      </div>

      {!selected && (
        <p className="mt-2 text-center text-xs text-slate-400">
          Önce aşağıdan bir sınıf seç — sonra uygun segmentlere dokun
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="ghost"
          onClick={handleUndo}
          disabled={history.length === 0}
          aria-label="Son atamayı geri al"
        >
          <Undo2 className="h-4 w-4" />
          Geri al
        </Button>
        <Button variant="primary" onClick={submit} disabled={!allAssigned}>
          <Send className="h-4 w-4" />
          Gönder
        </Button>
      </div>

      {!allAssigned && (
        <p className="mt-2 text-center text-xs text-slate-500">
          Gönder aktif olması için tüm segmentleri sınıflandır
        </p>
      )}
    </div>
  );
}

function Header({
  sceneName,
  difficulty,
}: {
  sceneName: string;
  difficulty: "easy" | "medium" | "hard";
}) {
  const label = { easy: "Kolay", medium: "Orta", hard: "Zor" }[difficulty];
  const tone = {
    easy: "bg-emerald-500/20 text-emerald-200",
    medium: "bg-amber-500/20 text-amber-200",
    hard: "bg-rose-500/20 text-rose-200",
  }[difficulty];

  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h1 className="heading text-2xl font-bold sm:text-3xl">Pixel Ninja</h1>
        <p className="mt-1 text-sm text-slate-400">
          {sceneName} · Segment bazlı sınıflandırma
        </p>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${tone}`}
      >
        {label}
      </span>
    </div>
  );
}

