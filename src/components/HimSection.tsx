import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles, Heart, Send, BookHeart, Bell, Check, X } from "lucide-react";
import type { CyclePhase } from "@/lib/cycle";
import { PHASE_LABEL } from "@/lib/cycle";
import { PARTNER_TIPS, SWEET_NOTES, NUDGE_EMOJIS } from "@/lib/partner-tips";
import { Button } from "@/components/ui/button";
import { useSharedDiary } from "@/hooks/useSharedDiary";
import { usePartnerGuess } from "@/hooks/usePartnerGuess";
import { usePartnerMessages } from "@/hooks/usePartnerMessages";
import { usePartnerNudges } from "@/hooks/usePartnerNudges";
import { toast } from "sonner";
import { format, isToday, isYesterday } from "date-fns";
import { ptBR } from "date-fns/locale";

const MOOD_OPTIONS = [
  { key: "feliz", label: "Feliz", emoji: "😊" },
  { key: "calma", label: "Calma", emoji: "😌" },
  { key: "cansada", label: "Cansada", emoji: "😴" },
  { key: "sensivel", label: "Sensível", emoji: "🥺" },
  { key: "irritada", label: "Irritada", emoji: "😤" },
  { key: "triste", label: "Triste", emoji: "🥲" },
] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (isToday(d)) return "hoje";
  if (isYesterday(d)) return "ontem";
  return format(d, "d MMM", { locale: ptBR });
}

export function HimSection({ phase, partnerId }: { phase: CyclePhase; partnerId: string }) {
  // Diário do par (lendo)
  const { entries: partnerEntries } = useSharedDiary(partnerId);
  // Palpite dele
  const { todayGuess, submit: submitGuess } = usePartnerGuess(partnerId);
  // Recadinhos
  const { send: sendMessage } = usePartnerMessages(partnerId);
  // Nudges
  const { send: sendNudge } = usePartnerNudges(partnerId);

  const [seed, setSeed] = useState(0);
  const tips = useMemo(() => shuffle(PARTNER_TIPS[phase]).slice(0, 3), [phase, seed]);

  const partnerToday = partnerEntries.find(
    (e) => e.entry_date === format(new Date(), "yyyy-MM-dd"),
  );

  // Acerto: comparar palpite com o mood do diário dela hoje
  const matchToday =
    todayGuess && partnerToday?.mood
      ? todayGuess.mood === partnerToday.mood
      : null;

  const sendSurprise = async () => {
    const note = SWEET_NOTES[Math.floor(Math.random() * SWEET_NOTES.length)];
    const r = await sendMessage(note);
    if (r.ok) toast.success("Recadinho enviado 💗");
    else toast.error("Não foi possível enviar.");
  };

  const sendNudgeNow = async (emoji: string) => {
    const r = await sendNudge(emoji);
    if (r.ok) toast.success(`${emoji} Lembrei de você — enviado!`);
    else toast.error("Não foi possível enviar.");
  };

  const onGuess = async (mood: string) => {
    const r = await submitGuess(mood);
    if (r.ok) toast.success("Palpite registrado.");
  };

  return (
    <div className="space-y-5">
      {/* Quiz: como você acha que ela está? */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-gradient-soft p-5 shadow-soft"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🎯</span>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Como você acha que ela está hoje?
          </p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Toque na opção que melhor representa.
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {MOOD_OPTIONS.map((m) => {
            const active = todayGuess?.mood === m.key;
            return (
              <button
                key={m.key}
                onClick={() => onGuess(m.key)}
                className={`flex flex-col items-center gap-1 rounded-2xl border px-2 py-3 text-[11px] transition-all ${
                  active
                    ? "border-primary bg-primary/10 text-foreground shadow-soft"
                    : "border-border/60 bg-background/60 text-muted-foreground hover:border-border"
                }`}
              >
                <span className="text-xl">{m.emoji}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Resultado */}
        {todayGuess && (
          <AnimatePresence>
            <motion.div
              key={matchToday + ""}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl bg-background/70 p-3 text-xs"
            >
              {matchToday === null ? (
                <p className="text-muted-foreground">
                  Você palpitou{" "}
                  <span className="font-medium text-foreground">
                    {MOOD_OPTIONS.find((o) => o.key === todayGuess.mood)?.label}
                  </span>
                  . Quando ela registrar o diário, você vê se acertou.
                </p>
              ) : matchToday ? (
                <p className="flex items-center gap-1.5 font-medium text-primary">
                  <Check className="h-3.5 w-3.5" /> Acertou em cheio. Você tá ligado nela.
                </p>
              ) : (
                <p className="flex items-center gap-1.5 text-foreground">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                  Hoje ela está{" "}
                  <span className="font-medium">
                    {MOOD_OPTIONS.find((o) => o.key === partnerToday?.mood)?.label}
                  </span>
                  . Próxima!
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </motion.section>

      {/* Como ela escreveu hoje */}
      {partnerToday && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft"
        >
          <div className="flex items-center gap-2">
            <BookHeart className="h-3.5 w-3.5 text-primary" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Diário dela · hoje
            </p>
          </div>
          {partnerToday.mood && (
            <p className="mt-2 text-xs text-muted-foreground">
              Humor:{" "}
              <span className="font-medium text-foreground">
                {MOOD_OPTIONS.find((o) => o.key === partnerToday.mood)?.label ?? partnerToday.mood}
              </span>
            </p>
          )}
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
            {partnerToday.body}
          </p>
        </motion.section>
      )}

      {/* Sugestões práticas pra ele */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              O que fazer hoje · {PHASE_LABEL[phase].toLowerCase()}
            </p>
          </div>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="flex items-center gap-1 rounded-full px-2 py-1 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            <RefreshCw className="h-3 w-3" />
            Outras
          </button>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={seed}
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
                  <Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" fill="currentColor" />
                  <p className="text-sm leading-relaxed">{tip}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Ações rápidas */}
      <section className="grid grid-cols-2 gap-2">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={sendSurprise}
          className="flex flex-col items-center gap-1.5 rounded-3xl bg-gradient-warm p-4 text-primary-foreground shadow-soft"
        >
          <Send className="h-4 w-4" />
          <span className="text-xs font-medium">Recado surpresa</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => sendNudgeNow(NUDGE_EMOJIS[Math.floor(Math.random() * NUDGE_EMOJIS.length)])}
          className="flex flex-col items-center gap-1.5 rounded-3xl border border-border/60 bg-card/80 p-4 shadow-soft"
        >
          <Bell className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium">Lembrei de você</span>
        </motion.button>
      </section>

      {/* Emojis específicos pro nudge */}
      <section className="rounded-3xl border border-border/60 bg-card/60 p-4 shadow-soft">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Mande um carinho rápido
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {NUDGE_EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => sendNudgeNow(e)}
              className="h-10 w-10 rounded-full bg-secondary/60 text-xl transition-transform hover:scale-110 hover:bg-secondary"
            >
              {e}
            </button>
          ))}
        </div>
      </section>

      {/* Histórico curto do diário dela */}
      {partnerEntries.length > 1 && (
        <section className="space-y-2">
          <p className="px-1 text-[11px] uppercase tracking-wider text-muted-foreground">
            Últimos dias dela
          </p>
          <div className="space-y-2">
            {partnerEntries.slice(0, 5).map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-border/60 bg-card/60 p-3 text-xs"
              >
                <div className="mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>{fmtDate(e.entry_date)}</span>
                  {e.mood && (
                    <span>
                      · {MOOD_OPTIONS.find((o) => o.key === e.mood)?.emoji ?? ""}{" "}
                      {MOOD_OPTIONS.find((o) => o.key === e.mood)?.label ?? e.mood}
                    </span>
                  )}
                </div>
                <p className="line-clamp-2 leading-relaxed text-foreground/80">{e.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
