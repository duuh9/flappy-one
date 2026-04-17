import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus, LogOut, Settings, Sparkles, ChevronRight } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useDailyLogs } from "@/hooks/useDailyLogs";
import { useAuth } from "@/contexts/AuthContext";
import { useBadges } from "@/hooks/useBadges";
import { useInsightReward } from "@/hooks/useInsightReward";
import { useQuizzes } from "@/hooks/useQuizzes";
import { getCyclePhase, PHASE_LABEL } from "@/lib/cycle";
import { insightOfTheDay } from "@/lib/insights";
import { quizOfTheDay } from "@/lib/quizzes";
import { StreakBadge } from "@/components/StreakBadge";
import { WeekStrip } from "@/components/WeekStrip";
import { QuickLogDrawer } from "@/components/QuickLogDrawer";
import { Mascot, type MascotMood } from "@/components/Mascot";
import { BadgesModal } from "@/components/BadgesModal";
import { QuizModal } from "@/components/QuizModal";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { profile, update } = useProfile();
  const { logs } = useDailyLogs();
  const { signOut } = useAuth();
  const { isUnlocked, badges, justUnlocked, clearJustUnlocked } = useBadges();
  const { claim: claimInsight } = useInsightReward();
  const { isDone: isQuizDone } = useQuizzes();

  const [openLog, setOpenLog] = useState(false);
  const [openSetup, setOpenSetup] = useState(false);
  const [openBadges, setOpenBadges] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [periodDate, setPeriodDate] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const insight = insightOfTheDay();
  const dailyQuiz = quizOfTheDay();
  const lastPeriod = profile?.last_period_start
    ? new Date(profile.last_period_start + "T00:00:00")
    : null;
  const cycle = getCyclePhase(
    lastPeriod,
    profile?.cycle_length ?? 28,
    profile?.period_length ?? 5,
  );
  const loggedDates = new Set(logs.map((l) => l.log_date));
  const today = format(new Date(), "yyyy-MM-dd");
  const loggedToday = loggedDates.has(today);
  const quizDoneToday = isQuizDone(dailyQuiz.id);
  const unlockedCount = badges.filter((b) => isUnlocked(b.id)).length;

  // Humor do mascote varia conforme contexto
  const mascotMood: MascotMood = useMemo(() => {
    if (justUnlocked.length > 0) return "celebrate";
    if (loggedToday && (profile?.streak ?? 0) >= 3) return "celebrate";
    if (loggedToday) return "happy";
    if ((profile?.streak ?? 0) === 0) return "sleepy";
    return "idle";
  }, [justUnlocked.length, loggedToday, profile?.streak]);

  // Mostra confete e toast quando uma badge é desbloqueada
  useEffect(() => {
    if (justUnlocked.length === 0) return;
    setShowConfetti(true);
    justUnlocked.forEach((b) => {
      toast.success(`Conquista desbloqueada: ${b.title}`, { icon: b.emoji });
    });
    const t = setTimeout(() => clearJustUnlocked(), 2200);
    return () => clearTimeout(t);
  }, [justUnlocked, clearJustUnlocked]);

  // Concede ponto pela leitura do insight (1x ao dia)
  useEffect(() => {
    if (!profile) return;
    if (profile.last_insight_read_date === today) return;
    const t = setTimeout(() => {
      claimInsight();
    }, 2500);
    return () => clearTimeout(t);
  }, [profile, today, claimInsight]);

  return (
    <div className="space-y-6 pb-8">
      <ConfettiBurst show={showConfetti} onDone={() => setShowConfetti(false)} />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {format(new Date(), "EEEE, d 'de' MMMM", { locale: ptBR })}
          </p>
          <h1 className="mt-1 font-display text-3xl font-light text-balance">
            Olá, <span className="text-primary">{profile?.display_name || "amor"}</span>
          </h1>
        </div>
        <div className="flex gap-1">
          <Dialog open={openSetup} onOpenChange={setOpenSetup}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Settings className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle className="font-display font-light">
                  Configurar ciclo
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="period">Início da última menstruação</Label>
                  <Input
                    id="period"
                    type="date"
                    value={periodDate || profile?.last_period_start || ""}
                    onChange={(e) => setPeriodDate(e.target.value)}
                  />
                </div>
                <Button
                  onClick={async () => {
                    if (!periodDate) return;
                    await update({ last_period_start: periodDate });
                    setOpenSetup(false);
                  }}
                  className="w-full rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft hover:opacity-90"
                >
                  Salvar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Mascote + saudação leve */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 rounded-3xl border border-border/60 bg-gradient-sand p-4 shadow-soft"
      >
        <Mascot mood={mascotMood} size="md" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-wider text-primary">Mia diz</p>
          <p className="mt-0.5 text-sm leading-snug text-foreground/85">
            {mascotMood === "celebrate"
              ? `Você está arrasando! ${profile?.streak ?? 0} dias seguidos 💗`
              : mascotMood === "happy"
                ? "Obrigada por se cuidar hoje. Tô orgulhosa de você ✨"
                : mascotMood === "sleepy"
                  ? "Que tal começar um streak hoje? Toque em registrar 🌸"
                  : "Que bom te ver de novo. Como você tá hoje?"}
          </p>
        </div>
      </motion.div>

      <StreakBadge
        streak={profile?.streak ?? 0}
        points={profile?.points ?? 0}
        badgeCount={unlockedCount}
        onOpenBadges={() => setOpenBadges(true)}
      />

      {/* Card de fase */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-warm p-7 text-primary-foreground shadow-glow"
      >
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
        <div className="relative">
          {lastPeriod ? (
            <>
              <p className="text-[11px] uppercase tracking-wider opacity-80">Fase atual</p>
              <h2 className="mt-1 font-display text-3xl font-light">
                {PHASE_LABEL[cycle.phase]}
              </h2>
              <p className="mt-2 text-sm opacity-90">
                Dia {cycle.dayInCycle} do ciclo
                {cycle.daysUntilNext != null && (
                  <> · {cycle.daysUntilNext}d até a próxima menstruação</>
                )}
              </p>
            </>
          ) : (
            <>
              <p className="text-[11px] uppercase tracking-wider opacity-80">Bem-vinda</p>
              <h2 className="mt-1 font-display text-2xl font-light">
                Configure seu ciclo
              </h2>
              <p className="mt-2 text-sm opacity-90">
                Toque na engrenagem acima para começar.
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* Insight do dia */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-sand p-6 shadow-soft"
      >
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/50 blur-3xl" />
        <div className="relative">
          <div className="mb-3 flex items-center gap-2">
            <p className="text-[11px] font-medium uppercase tracking-wider text-primary">
              Insight do dia
            </p>
          </div>
          <div className="flex items-start gap-4">
            <motion.span
              animate={{ rotate: [0, -6, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-4xl"
            >
              {insight.emoji}
            </motion.span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-xl font-light leading-tight text-balance">
                {insight.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {insight.body}
              </p>
              <p className="mt-3 text-[11px] italic text-muted-foreground/80">
                — {insight.source}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quiz do dia (chamada compacta) */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -2 }}
        onClick={() => setOpenQuiz(true)}
        className="group flex w-full items-center gap-3 rounded-3xl border border-border/60 bg-card/80 p-4 text-left shadow-soft transition-shadow hover:shadow-glow"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-2xl">
          {dailyQuiz.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-primary" />
            <p className="text-[10px] font-medium uppercase tracking-wider text-primary">
              Quiz do dia
            </p>
            {quizDoneToday && (
              <span className="rounded-full bg-secondary px-1.5 py-0.5 text-[9px] uppercase text-muted-foreground">
                concluído
              </span>
            )}
          </div>
          <p className="mt-0.5 truncate font-display text-base font-medium">
            {dailyQuiz.title}
          </p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {dailyQuiz.questions.length} perguntas · ganhe até{" "}
            {dailyQuiz.questions.length * 5} pts
          </p>
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </motion.button>

      {/* Semana resumida */}
      <WeekStrip
        lastPeriodStart={lastPeriod}
        cycleLength={profile?.cycle_length ?? 28}
        periodLength={profile?.period_length ?? 5}
        loggedDates={loggedDates}
      />

      {/* FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
        whileTap={{ scale: 0.94 }}
        whileHover={{ y: -2 }}
        onClick={() => setOpenLog(true)}
        className="fixed bottom-24 right-5 z-30 flex h-14 items-center gap-2 rounded-full bg-gradient-warm px-5 text-sm font-medium text-primary-foreground shadow-glow md:bottom-8 md:right-8"
      >
        <Plus className="h-5 w-5" />
        Registrar hoje
      </motion.button>

      <QuickLogDrawer open={openLog} onOpenChange={setOpenLog} />
      <BadgesModal open={openBadges} onClose={() => setOpenBadges(false)} />
      <QuizModal quiz={openQuiz ? dailyQuiz : null} onClose={() => setOpenQuiz(false)} />
    </div>
  );
}
