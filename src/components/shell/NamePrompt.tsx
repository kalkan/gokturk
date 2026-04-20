import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, ArrowRight, User } from "lucide-react";
import { MAX_NAME_LENGTH, normalizeName, useProfileStore } from "@/store/profileStore";

interface NamePromptProps {
  open: boolean;
  /** Üstten kapatılabilir mi — ilk girişte false, isim düzenlerken true */
  dismissible?: boolean;
  onClose?: () => void;
}

/**
 * İsim girişi modalı — oyun girişinde ilk kez açılır ve IDB'ye kalıcı yazılır.
 * İkinci açılışta (düzenleme) mevcut isim otomatik doldurulur.
 */
export function NamePrompt({ open, dismissible = false, onClose }: NamePromptProps) {
  const playerName = useProfileStore((s) => s.playerName);
  const setName = useProfileStore((s) => s.setName);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setDraft(playerName ?? "");
      const t = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [open, playerName]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeName(draft);
    if (!clean) return;
    setName(clean);
    onClose?.();
  };

  const onBackdrop = () => {
    if (dismissible) onClose?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-space-950/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="name-prompt-title"
        >
          <motion.form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-signal/30 bg-gradient-to-br from-space-800/90 to-space-950 p-6 shadow-glow-lg"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-signal/15 text-signal">
                <Radar className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-signal/80">
                  Uydudan selam!
                </p>
                <h2 id="name-prompt-title" className="heading text-xl font-bold">
                  {playerName ? "Adını değiştir" : "Seni nasıl tanıyalım?"}
                </h2>
              </div>
            </div>

            <label htmlFor="player-name" className="mt-5 block text-sm text-slate-300">
              Adın
            </label>
            <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 focus-within:border-signal/60">
              <User className="h-4 w-4 text-slate-400" />
              <input
                ref={inputRef}
                id="player-name"
                name="player-name"
                type="text"
                autoComplete="off"
                inputMode="text"
                maxLength={MAX_NAME_LENGTH}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Örn: Gamze"
                className="w-full bg-transparent py-3 text-lg text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Skorların bu cihazda saklanır · istediğin zaman değiştirebilirsin
            </p>

            <div className="mt-5 flex gap-3">
              {dismissible && (
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-ghost flex-1"
                >
                  Vazgeç
                </button>
              )}
              <button
                type="submit"
                disabled={!normalizeName(draft)}
                className="btn btn-primary flex-1"
              >
                Devam
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
