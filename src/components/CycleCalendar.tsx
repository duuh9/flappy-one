import { useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { phaseForDate, PHASE_COLOR, PHASE_LABEL, type CyclePhase } from "@/lib/cycle";
import { motion } from "framer-motion";
import { PhaseInfoSheet } from "@/components/PhaseInfoSheet";

type Props = {
  lastPeriodStart: Date | null;
  cycleLength?: number;
  periodLength?: number;
  loggedDates?: Set<string>;
  compact?: boolean;
  onSelectDate?: (d: Date) => void;
};

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];
const PHASES: CyclePhase[] = ["menstrual", "folicular", "ovulacao", "lutea"];

export function CycleCalendar({
  lastPeriodStart,
  cycleLength = 28,
  periodLength = 5,
  loggedDates = new Set(),
  compact = false,
  onSelectDate,
}: Props) {
  const [cursor, setCursor] = useState(new Date());
  const [activePhase, setActivePhase] = useState<CyclePhase | null>(null);
  const today = new Date();

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 });
    const end = endOfMonth(cursor);
    const arr: Date[] = [];
    let d = start;
    while (d <= end || arr.length % 7 !== 0) {
      arr.push(d);
      d = addDays(d, 1);
    }
    return arr;
  }, [cursor]);

  return (
    <>
      <div
        className={cn(
          "rounded-3xl border border-border/60 bg-card/70 backdrop-blur",
          compact ? "p-4" : "p-5",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={() => setCursor(subMonths(cursor, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <p className="font-display text-base font-medium capitalize">
            {format(cursor, "MMMM yyyy", { locale: ptBR })}
          </p>
          <button
            onClick={() => setCursor(addMonths(cursor, 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Próximo mês"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          {WEEKDAYS.map((w, i) => (
            <div key={i}>{w}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((d) => {
            const inMonth = isSameMonth(d, cursor);
            const isToday = isSameDay(d, today);
            const phase: CyclePhase = phaseForDate(
              d,
              lastPeriodStart,
              cycleLength,
              periodLength,
            );
            const logged = loggedDates.has(format(d, "yyyy-MM-dd"));
            const showPhase = inMonth && lastPeriodStart;

            return (
              <motion.button
                key={d.toISOString()}
                whileTap={{ scale: 0.9 }}
                onClick={() => onSelectDate?.(d)}
                className={cn(
                  "relative flex aspect-square items-center justify-center rounded-2xl text-sm transition-colors",
                  inMonth ? "text-foreground" : "text-muted-foreground/30",
                  isToday && "ring-2 ring-primary ring-offset-2 ring-offset-card",
                )}
              >
                {showPhase && (
                  <span
                    className="absolute inset-1 rounded-xl opacity-35"
                    style={{ backgroundColor: PHASE_COLOR[phase] }}
                  />
                )}
                <span className="relative z-10 font-medium">{format(d, "d")}</span>
                {logged && (
                  <span className="absolute bottom-1.5 right-1.5 z-10 h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </motion.button>
            );
          })}
        </div>

        {!compact && lastPeriodStart && (
          <div className="mt-5 border-t border-border/60 pt-4">
            <div className="mb-3 flex items-center gap-1.5 text-muted-foreground">
              <Info className="h-3 w-3" />
              <p className="text-[10px] uppercase tracking-wider">
                Toque numa fase para saber mais
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {PHASES.map((p) => (
                <motion.button
                  key={p}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActivePhase(p)}
                  className="group flex items-center gap-2 rounded-2xl border border-border/60 bg-background/40 px-3 py-2.5 text-left transition-colors hover:bg-secondary/60"
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: PHASE_COLOR[p] }}
                  />
                  <span className="text-xs font-medium">{PHASE_LABEL[p]}</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      <PhaseInfoSheet phase={activePhase} onClose={() => setActivePhase(null)} />
    </>
  );
}
