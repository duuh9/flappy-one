import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus, LogOut, Settings } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useDailyLogs } from "@/hooks/useDailyLogs";
import { useAuth } from "@/contexts/AuthContext";
import { getCyclePhase, PHASE_LABEL } from "@/lib/cycle";
import { insightOfTheDay } from "@/lib/insights";
import { StreakBadge } from "@/components/StreakBadge";
import { WeekStrip } from "@/components/WeekStrip";
import { QuickLogDrawer } from "@/components/QuickLogDrawer";
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

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { profile, update } = useProfile();
  const { logs } = useDailyLogs();
  const { signOut } = useAuth();
  const [openLog, setOpenLog] = useState(false);
  const [openSetup, setOpenSetup] = useState(false);
  const [periodDate, setPeriodDate] = useState("");

  const insight = insightOfTheDay();
  const lastPeriod = profile?.last_period_start
    ? new Date(profile.last_period_start + "T00:00:00")
    : null;
  const cycle = getCyclePhase(
    lastPeriod,
    profile?.cycle_length ?? 28,
    profile?.period_length ?? 5,
  );
  const loggedDates = new Set(logs.map((l) => l.log_date));

  return (
    <div className="space-y-6 pb-8">
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
                <DialogTitle className="font-display font-light">Configurar ciclo</DialogTitle>
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

      <StreakBadge streak={profile?.streak ?? 0} points={profile?.points ?? 0} />

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
              <h2 className="mt-1 font-display text-2xl font-light">Configure seu ciclo</h2>
              <p className="mt-2 text-sm opacity-90">
                Toque na engrenagem acima para começar.
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* Insight do dia — destaque */}
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
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">{insight.body}</p>
              <p className="mt-3 text-[11px] italic text-muted-foreground/80">
                — {insight.source}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

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
    </div>
  );
}
