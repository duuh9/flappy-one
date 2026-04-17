import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { phaseForDate, PHASE_COLOR, type CyclePhase } from "@/lib/cycle";
import { cn } from "@/lib/utils";

type Props = {
  lastPeriodStart: Date | null;
  cycleLength?: number;
  periodLength?: number;
  loggedDates?: Set<string>;
};

/**
 * Resumo da semana atual — 7 dias com fase + bolinha de log.
 * Usado na Home, acima do calendário compacto.
 */
export function WeekStrip({
  lastPeriodStart,
  cycleLength = 28,
  periodLength = 5,
  loggedDates = new Set(),
}: Props) {
  const today = new Date();
  const start = startOfWeek(today, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="rounded-3xl border border-border/60 bg-card/70 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Esta semana</p>
        <p className="text-[11px] capitalize text-muted-foreground/80">
          {format(today, "MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          const isToday = isSameDay(d, today);
          const phase: CyclePhase = phaseForDate(d, lastPeriodStart, cycleLength, periodLength);
          const logged = loggedDates.has(format(d, "yyyy-MM-dd"));
          return (
            <motion.div
              key={d.toISOString()}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-[10px] uppercase text-muted-foreground/70">
                {format(d, "EEEEE", { locale: ptBR })}
              </span>
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-medium",
                  isToday
                    ? "bg-gradient-warm text-primary-foreground shadow-soft"
                    : "text-foreground",
                )}
              >
                {!isToday && lastPeriodStart && (
                  <span
                    className="absolute inset-1 rounded-xl opacity-40"
                    style={{ backgroundColor: PHASE_COLOR[phase] }}
                  />
                )}
                <span className="relative z-10">{format(d, "d")}</span>
              </div>
              <span
                className={cn(
                  "h-1 w-1 rounded-full transition-colors",
                  logged ? "bg-primary" : "bg-transparent",
                )}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
