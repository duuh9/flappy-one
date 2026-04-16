import { differenceInDays, addDays, startOfDay } from "date-fns";

export type CyclePhase = "menstrual" | "folicular" | "ovulacao" | "lutea";

export type CycleInfo = {
  phase: CyclePhase;
  dayInCycle: number;
  cycleLength: number;
  nextPeriod: Date | null;
  daysUntilNext: number | null;
};

export const PHASE_LABEL: Record<CyclePhase, string> = {
  menstrual: "Menstruação",
  folicular: "Folicular",
  ovulacao: "Ovulação",
  lutea: "Lútea",
};

export const PHASE_COLOR: Record<CyclePhase, string> = {
  menstrual: "var(--rose-deep)",
  folicular: "var(--lavender)",
  ovulacao: "var(--primary)",
  lutea: "var(--blush)",
};

export function getCyclePhase(
  lastPeriodStart: Date | null,
  cycleLength = 28,
  periodLength = 5,
  today: Date = new Date(),
): CycleInfo {
  if (!lastPeriodStart) {
    return { phase: "folicular", dayInCycle: 1, cycleLength, nextPeriod: null, daysUntilNext: null };
  }
  const diff = differenceInDays(startOfDay(today), startOfDay(lastPeriodStart));
  const day = ((diff % cycleLength) + cycleLength) % cycleLength + 1;
  let phase: CyclePhase;
  if (day <= periodLength) phase = "menstrual";
  else if (day <= 13) phase = "folicular";
  else if (day <= 16) phase = "ovulacao";
  else phase = "lutea";

  const cyclesElapsed = Math.floor(diff / cycleLength) + 1;
  const nextPeriod = addDays(lastPeriodStart, cyclesElapsed * cycleLength);
  return {
    phase,
    dayInCycle: day,
    cycleLength,
    nextPeriod,
    daysUntilNext: differenceInDays(nextPeriod, startOfDay(today)),
  };
}

export function phaseForDate(
  date: Date,
  lastPeriodStart: Date | null,
  cycleLength = 28,
  periodLength = 5,
): CyclePhase {
  return getCyclePhase(lastPeriodStart, cycleLength, periodLength, date).phase;
}
