import { useMemo, useState } from "react";
import { addDays, addMonths, endOfMonth, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { phaseForDate, PHASE_COLOR, type CyclePhase } from "@/lib/cycle";
import { motion } from "framer-motion";

type Props = {
  lastPeriodStart: Date | null;
  cycleLength?: number;
  periodLength?: number;
  loggedDates?: Set<string>;
  compact?: boolean;
  onSelectDate?: (d: Date) => void;
};

const WEEKDAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export function CycleCalendar({
  lastPeriodStart,
  cycleLength = 28,
  periodLength = 5,
  loggedDates = new Set(),
  compact = false,
  onSelectDate,
}: Props) {
  const [cursor, setCursor] = useState(new Date());
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
    <div className={cn("rounded-3xl border border-border/60 bg-card/60 backdrop-blur", compact ? "p-4" : "p-5")}>
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setCursor(subMonths(cursor, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Mês anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="font-display text-sm font-medium capitalize">
          {format(cursor, "MMMM yyyy", { locale: ptBR })}
        </p>
        <button
          onClick={() => setCursor(addMonths(cursor, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Próximo mês"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-muted-foreground">
        {WEEKDAYS.map((w, i) => <div key={i}>{w}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const inMonth = isSameMonth(d, cursor);
          const isToday = isSameDay(d, today);
          const phase: CyclePhase = phaseForDate(d, lastPeriodStart, cycleLength, periodLength);
          const logged = loggedDates.has(format(d, "yyyy-MM-dd"));
          const showPhase = inMonth && lastPeriodStart;

          return (
            <motion.button
              key={d.toISOString()}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelectDate?.(d)}
              className={cn(
                "relative flex aspect-square items-center justify-center rounded-xl text-xs transition-colors",
                inMonth ? "text-foreground" : "text-muted-foreground/40",
                isToday && "ring-2 ring-primary ring-offset-1 ring-offset-card",
              )}
            >
              {showPhase && (
                <span
                  className="absolute inset-1 rounded-lg opacity-30"
                  style={{ backgroundColor: PHASE_COLOR[phase] }}
                />
              )}
              <span className="relative z-10 font-medium">{format(d, "d")}</span>
              {logged && (
                <span className="absolute bottom-1 right-1 z-10 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </motion.button>
          );
        })}
      </div>

      {!compact && lastPeriodStart && (
        <div className="mt-4 flex flex-wrap gap-3 border-t border-border/60 pt-3 text-[11px] text-muted-foreground">
          {(["menstrual", "folicular", "ovulacao", "lutea"] as CyclePhase[]).map((p) => (
            <div key={p} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full opacity-60" style={{ backgroundColor: PHASE_COLOR[p] }} />
              <span className="capitalize">{p === "ovulacao" ? "Ovulação" : p === "lutea" ? "Lútea" : p}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
