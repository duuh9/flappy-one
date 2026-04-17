import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles, BookHeart, Pencil, Check } from "lucide-react";
import type { CyclePhase } from "@/lib/cycle";
import { PHASE_LABEL } from "@/lib/cycle";
import { HER_TIPS } from "@/lib/partner-tips";
import { PHASE_INFO } from "@/lib/cycle-info";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSharedDiary } from "@/hooks/useSharedDiary";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const MOOD_OPTIONS = [
  { key: "feliz", label: "Feliz", emoji: "😊" },
  { key: "calma", label: "Calma", emoji: "😌" },
  { key: "cansada", label: "Cansada", emoji: "😴" },
  { key: "sensivel", label: "Sensível", emoji: "🥺" },
  { key: "irritada", label: "Irritada", emoji: "😤" },
  { key: "triste", label: "Triste", emoji: "🥲" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function HerSection({ phase }: { phase: CyclePhase }) {
  const { user } = useAuth();
  const { todayEntry, upsertToday } = useSharedDiary(user?.id ?? null);
  const info = PHASE_INFO[phase];

  // Pool embaralhado de dicas — refresh re-embaralha
  const [tipsSeed, setTipsSeed] = useState(0);
  const tips = useMemo(() => shuffle(HER_TIPS[phase]).slice(0, 3), [phase, tipsSeed]);

  const [body, setBody] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Carrega entrada de hoje quando muda
  useEffect(() => {
    if (todayEntry) {
      setBody(todayEntry.body);
      setMood(todayEntry.mood);
    }
  }, [todayEntry]);

  const save = async () => {
    if (!body.trim()) return;
    setSaving(true);
    const r = await upsertToday(body, mood ?? undefined);
    setSaving(false);
    if (r.ok) {
      setJustSaved(true);
      toast.success("Diário salvo. Seu par pode ler. 💗");
      setTimeout(() => setJustSaved(false), 1800);
    } else {
      toast.error("Não consegui salvar agora.");
    }
  };

  return (
    <div className="space-y-5">
      {/* O que está acontecendo no corpo */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{info.emoji}</span>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Seu corpo agora · {PHASE_LABEL[phase].toLowerCase()}
          </p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">{info.whatHappens}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{info.hormones}</p>
      </motion.section>

      {/* Diário compartilhado */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-3xl bg-gradient-soft p-5 shadow-soft"
      >
        <div className="flex items-center gap-2">
          <BookHeart className="h-3.5 w-3.5 text-primary" />
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Como estou hoje
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {MOOD_OPTIONS.map((m) => {
            const active = mood === m.key;
            return (
              <button
                key={m.key}
                onClick={() => setMood(active ? null : m.key)}
                className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-all ${
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:border-border"
                }`}
              >
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, 1000))}
          placeholder="Escreva aqui como você está se sentindo. Seu par pode ler."
          className="mt-3 min-h-[110px] resize-none rounded-2xl border-border/60 bg-background/80 text-sm leading-relaxed"
          maxLength={1000}
        />

        <div className="mt-3 flex items-center justify-between">
          <p className="text-[10px] text-muted-foreground">
            {body.length}/1000
            {todayEntry && (
              <span className="ml-2">
                · atualizado {format(new Date(todayEntry.updated_at), "HH:mm", { locale: ptBR })}
              </span>
            )}
          </p>
          <Button
            onClick={save}
            disabled={!body.trim() || saving}
            size="sm"
            className="h-9 rounded-full px-4"
          >
            <AnimatePresence mode="wait">
              {justSaved ? (
                <motion.span
                  key="saved"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Check className="mr-1.5 h-3.5 w-3.5" /> Salvo
                </motion.span>
              ) : (
                <motion.span
                  key="save"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  {todayEntry ? "Atualizar" : "Salvar"}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.section>

      {/* Dicas científicas com refresh */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Dicas científicas pra hoje
            </p>
          </div>
          <button
            onClick={() => setTipsSeed((s) => s + 1)}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw className="h-3 w-3" />
            Atualizar
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tipsSeed}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-2"
          >
            {tips.map((tip, i) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-soft"
              >
                <div className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-relaxed">{tip}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
