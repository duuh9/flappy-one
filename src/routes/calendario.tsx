import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { useProfile } from "@/hooks/useProfile";
import { useDailyLogs } from "@/hooks/useDailyLogs";
import { CycleCalendar } from "@/components/CycleCalendar";
import { getCyclePhase, PHASE_LABEL } from "@/lib/cycle";

export const Route = createFileRoute("/calendario")({
  component: CalendarPage,
  head: () => ({ meta: [{ title: "Calendário — Nós Dois" }] }),
});

function CalendarPage() {
  const { profile } = useProfile();
  const { logs } = useDailyLogs();
  const [selected, setSelected] = useState<Date | null>(null);

  const lastPeriod = profile?.last_period_start ? new Date(profile.last_period_start + "T00:00:00") : null;
  const loggedDates = new Set(logs.map((l) => l.log_date));
  const selectedLog = selected ? logs.find((l) => l.log_date === format(selected, "yyyy-MM-dd")) : null;
  const selectedPhase = selected ? getCyclePhase(lastPeriod, profile?.cycle_length ?? 28, profile?.period_length ?? 5, selected) : null;

  return (
    <div className="space-y-6 pb-8">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Seu ciclo</p>
        <h1 className="mt-1 font-display text-3xl font-light">Calendário</h1>
      </div>

      <CycleCalendar
        lastPeriodStart={lastPeriod}
        cycleLength={profile?.cycle_length ?? 28}
        periodLength={profile?.period_length ?? 5}
        loggedDates={loggedDates}
        onSelectDate={setSelected}
      />

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft"
        >
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {format(selected, "EEEE, d 'de' MMMM", { locale: ptBR })}
          </p>
          {selectedPhase && lastPeriod && (
            <p className="mt-1 font-display text-lg font-light">
              Fase {PHASE_LABEL[selectedPhase.phase]}
            </p>
          )}
          {selectedLog ? (
            <div className="mt-3 space-y-2 text-sm">
              {selectedLog.mood && <p>Humor: <span className="font-medium">{selectedLog.mood}</span> ({selectedLog.mood_intensity}/5)</p>}
              {selectedLog.symptoms.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selectedLog.symptoms.map((s) => (
                    <span key={s} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] text-secondary-foreground">{s}</span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">Sem registro neste dia.</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
