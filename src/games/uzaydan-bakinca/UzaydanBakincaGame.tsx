import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Home, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useScoreStore } from "@/store/scoreStore";
import { useProgressStore } from "@/store/progressStore";
import { getSceneSource } from "@/data/sceneLoader";
import type { SatelliteScene } from "@/data/types";
import { SceneDisplay } from "./SceneDisplay";
import { OptionCard } from "./OptionCard";
import { Confetti } from "./Confetti";
import { buildChoices, shuffle, type SceneOption } from "./data";

type Phase = "showing" | "choosing" | "correct" | "incorrect" | "done";

const SHOW_MS = 1500;
const FEEDBACK_MS = 1900;
const POINTS_PER_CORRECT = 10;

/**
 * "Uzaydan Bakınca Ne?" MVP — 4 sahneli bir tur.
 *
 * Akış: her sahne için önce 1.5 sn sadece uydu görüntüsü gösterilir, sonra
 * 3 seçenek açılır. Seçim sonrası animasyonlu geri bildirim, 1.9 sn sonra
 * sonraki sahne. Tüm sahneler bitince özet ekranı.
 */
export function UzaydanBakincaGame() {
  const [queue, setQueue] = useState<SatelliteScene[] | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("showing");
  const [choices, setChoices] = useState<SceneOption[]>([]);
  const [picked, setPicked] = useState<SceneOption | null>(null);
  const [sessionScore, setSessionScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  const addPoints = useScoreStore((s) => s.addPoints);
  const markCompleted = useProgressStore((s) => s.markCompleted);

  useEffect(() => {
    let cancelled = false;
    void getSceneSource()
      .listScenes()
      .then((all) => {
        if (cancelled) return;
        setQueue(shuffle(all));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const current = queue?.[index];

  useEffect(() => {
    if (!current) return;
    setChoices(buildChoices(current));
    setPicked(null);
    setPhase("showing");
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setPhase("choosing"), SHOW_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [current]);

  const handlePick = useCallback(
    (opt: SceneOption) => {
      if (!current || phase !== "choosing") return;
      setPicked(opt);
      const correct = opt.sceneId === current.id;
      if (correct) {
        addPoints("uzaydan-bakinca", POINTS_PER_CORRECT);
        setSessionScore((s) => s + POINTS_PER_CORRECT);
        setCorrectCount((c) => c + 1);
        markCompleted("uzaydan-bakinca", current.id);
        setPhase("correct");
      } else {
        setPhase("incorrect");
      }
      timerRef.current = window.setTimeout(() => {
        if (!queue) return;
        if (index + 1 >= queue.length) {
          setPhase("done");
        } else {
          setIndex((i) => i + 1);
        }
      }, FEEDBACK_MS);
    },
    [current, phase, queue, index, addPoints, markCompleted],
  );

  const restart = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setSessionScore(0);
    setCorrectCount(0);
    setIndex(0);
    void getSceneSource()
      .listScenes()
      .then((all) => setQueue(shuffle(all)));
  }, []);

  const total = queue?.length ?? 0;

  const optionState = useCallback(
    (opt: SceneOption): "idle" | "correct" | "wrong" | "muted" => {
      if (!current || !picked) return "idle";
      if (opt.sceneId === current.id) return "correct";
      if (opt.sceneId === picked.sceneId) return "wrong";
      return "muted";
    },
    [current, picked],
  );

  const header = useMemo(
    () => (
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading text-2xl font-bold sm:text-3xl">Uzaydan Bakınca Ne?</h1>
          <p className="text-sm text-slate-400">Göktürk-2'den bakıp tahmin et</p>
        </div>
        {queue && phase !== "done" && (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200">
            <span className="font-mono tabular-nums">
              {index + 1}/{total}
            </span>
          </span>
        )}
      </div>
    ),
    [queue, phase, index, total],
  );

  if (!queue || !current) {
    return (
      <div className="mx-auto max-w-3xl">
        {header}
        <Card className="mt-6 p-10 text-center text-slate-300">Sahneler yükleniyor…</Card>
      </div>
    );
  }

  if (phase === "done") {
    const accuracy = Math.round((correctCount / total) * 100);
    return (
      <div className="mx-auto max-w-3xl">
        {header}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="relative overflow-hidden p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-signal/20 text-signal">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="heading mt-4 text-3xl font-bold">Harika iş!</h2>
            <p className="mt-2 text-slate-300">
              <span className="font-semibold text-slate-100">{correctCount}</span> / {total} doğru ·
              <span className="ml-1 font-semibold text-signal">%{accuracy}</span> doğruluk
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
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {header}

      <div className="relative mt-6">
        <SceneDisplay scene={current} status={phase} />
        <Confetti active={phase === "correct"} />
      </div>

      <AnimatePresence mode="wait">
        {phase === "showing" ? (
          <motion.p
            key="watching"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 text-center text-slate-300"
          >
            Uydu görüntüsüne dikkatle bak…
          </motion.p>
        ) : (
          <motion.div
            key="choosing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <p className="mb-3 text-center text-lg font-semibold text-slate-200">
              Bu yer neresi?
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {choices.map((opt, i) => (
                <OptionCard
                  key={opt.sceneId}
                  option={opt}
                  index={i}
                  disabled={phase !== "choosing"}
                  state={optionState(opt)}
                  onPick={handlePick}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
