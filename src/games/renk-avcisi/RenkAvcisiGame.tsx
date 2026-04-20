import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, MapPin, RotateCcw, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MiniLeaderboard } from "@/components/shell/MiniLeaderboard";
import { useScoreStore } from "@/store/scoreStore";
import { useProgressStore } from "@/store/progressStore";
import { useProfileStore } from "@/store/profileStore";
import { PixelGrid } from "./PixelGrid";
import { TaskPanel } from "./TaskPanel";
import { SceneCompleteModal } from "./SceneCompleteModal";
import { parseGrid, RENK_AVCISI_SCENES, type HuntableClass } from "./data";

type Phase = "playing" | "feedback" | "sceneDone" | "done";

const POINTS_PER_CORRECT = 15;
const FEEDBACK_MS = 900;

/**
 * Renk Avcısı MVP: 2 sahne, her sahnede 3 görev.
 *
 * Oyuncu doğru sınıftaki bir pikseli seçerse +15 puan, sonraki görev.
 * Yanlış seçerse: o piksel kırmızı flash, grid'deki doğru pikseller kısa süre
 * parlar, görev "kayıp" sayılır ve bir sonraki göreve geçilir.
 * Sahne sonunda eğitsel pop-up açılır.
 */
export function RenkAvcisiGame() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [taskIndex, setTaskIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");
  const [pickedCell, setPickedCell] = useState<{
    row: number;
    col: number;
    correct: boolean;
  } | null>(null);
  const [highlightClass, setHighlightClass] = useState<HuntableClass | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [sceneCorrect, setSceneCorrect] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [lastRoundId, setLastRoundId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
  const roundRecordedRef = useRef(false);

  const addPoints = useScoreStore((s) => s.addPoints);
  const finishRound = useScoreStore((s) => s.finishRound);
  const markCompleted = useProgressStore((s) => s.markCompleted);
  const playerName = useProfileStore((s) => s.playerName);

  const scene = RENK_AVCISI_SCENES[sceneIndex];
  const task = scene?.tasks[taskIndex];
  const grid = useMemo(() => (scene ? parseGrid(scene.gridMap) : []), [scene]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const advance = useCallback(() => {
    if (!scene) return;
    setPickedCell(null);
    setHighlightClass(null);

    const isLastTaskInScene = taskIndex + 1 >= scene.tasks.length;
    if (isLastTaskInScene) {
      markCompleted("renk-avcisi", scene.id);
      setPhase("sceneDone");
    } else {
      setTaskIndex((i) => i + 1);
      setPhase("playing");
    }
  }, [scene, taskIndex, markCompleted]);

  const handlePick = useCallback(
    (row: number, col: number, cls: HuntableClass) => {
      if (!task || phase !== "playing") return;
      const correct = cls === task.target;
      setPickedCell({ row, col, correct });
      setPhase("feedback");
      if (correct) {
        addPoints("renk-avcisi", POINTS_PER_CORRECT);
        setSessionScore((s) => s + POINTS_PER_CORRECT);
        setSceneCorrect((c) => c + 1);
        setTotalCorrect((c) => c + 1);
      } else {
        setHighlightClass(task.target);
      }
      timerRef.current = window.setTimeout(advance, FEEDBACK_MS);
    },
    [task, phase, addPoints, advance],
  );

  const goNextScene = useCallback(() => {
    if (sceneIndex + 1 >= RENK_AVCISI_SCENES.length) {
      setPhase("done");
    } else {
      setSceneIndex((i) => i + 1);
      setTaskIndex(0);
      setSceneCorrect(0);
      setPhase("playing");
    }
  }, [sceneIndex]);

  const restart = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSceneIndex(0);
    setTaskIndex(0);
    setPhase("playing");
    setPickedCell(null);
    setHighlightClass(null);
    setSessionScore(0);
    setSceneCorrect(0);
    setTotalCorrect(0);
    setLastRoundId(null);
    roundRecordedRef.current = false;
  }, []);

  const totalTasksAll = RENK_AVCISI_SCENES.reduce((n, s) => n + s.tasks.length, 0);

  useEffect(() => {
    if (phase !== "done" || roundRecordedRef.current || !playerName) return;
    const entry = finishRound({
      playerName,
      gameId: "renk-avcisi",
      points: sessionScore,
      correct: totalCorrect,
      total: totalTasksAll,
    });
    setLastRoundId(entry.id);
    roundRecordedRef.current = true;
  }, [phase, playerName, sessionScore, totalCorrect, totalTasksAll, finishRound]);

  if (!scene || !task) return null;

  if (phase === "done") {
    const accuracy = Math.round((totalCorrect / totalTasksAll) * 100);
    return (
      <div className="mx-auto max-w-3xl">
        <Header title={scene.name} location={scene.location} hideMeta />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="heading mt-4 text-3xl font-bold">Renk avı tamamlandı!</h2>
            <p className="mt-2 text-slate-300">
              {totalCorrect} / {totalTasksAll} doğru · %{accuracy} doğruluk
            </p>
            <p className="mt-1 text-lg text-signal">+{sessionScore} puan kazandın</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button onClick={restart} variant="primary">
                <RotateCcw className="h-4 w-4" />
                Tekrar oyna
              </Button>
              <Link to="/" className="btn btn-ghost">
                <Home className="h-4 w-4" />
                Ana menü
              </Link>
            </div>
          </Card>
        </motion.div>

        <div className="mt-6">
          <MiniLeaderboard gameId="renk-avcisi" highlightId={lastRoundId} />
        </div>
      </div>
    );
  }

  const sceneAccuracy = Math.round((sceneCorrect / scene.tasks.length) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <Header
        title={scene.name}
        location={scene.location}
        scenePosition={`${sceneIndex + 1}/${RENK_AVCISI_SCENES.length}`}
      />

      <div className="mt-5">
        <TaskPanel task={task} taskIndex={taskIndex} totalTasks={scene.tasks.length} />
      </div>

      <div className="mt-5">
        <PixelGrid
          grid={grid}
          locked={phase !== "playing"}
          highlightClass={highlightClass}
          pickedCell={pickedCell}
          onPick={handlePick}
        />
      </div>

      <AnimatePresence>
        {phase === "feedback" && pickedCell && (
          <motion.p
            key="feedback"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-4 text-center font-semibold ${
              pickedCell.correct ? "text-emerald-300" : "text-rose-300"
            }`}
          >
            {pickedCell.correct
              ? `Harika! +${POINTS_PER_CORRECT} puan`
              : "Yaklaşsaydın buydu — doğru pikseller parlıyor"}
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "sceneDone" && (
          <SceneCompleteModal
            sceneName={scene.name}
            note={scene.educationalNote}
            earned={sceneCorrect * POINTS_PER_CORRECT}
            accuracy={sceneAccuracy}
            hasNext={sceneIndex + 1 < RENK_AVCISI_SCENES.length}
            onNext={goNextScene}
            onFinish={goNextScene}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Header({
  title,
  location,
  scenePosition,
  hideMeta,
}: {
  title: string;
  location: string;
  scenePosition?: string;
  hideMeta?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h1 className="heading text-2xl font-bold sm:text-3xl">Renk Avcısı</h1>
        {!hideMeta && (
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-400">
            <MapPin className="h-3.5 w-3.5" />
            {title} · {location}
          </p>
        )}
      </div>
      {scenePosition && (
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
          Sahne <span className="font-mono tabular-nums">{scenePosition}</span>
        </span>
      )}
    </div>
  );
}
