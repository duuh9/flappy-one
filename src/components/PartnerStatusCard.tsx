import { motion } from "framer-motion";
import { Moon, Sparkles } from "lucide-react";
import { getCyclePhase, PHASE_LABEL } from "@/lib/cycle";
import type { PartnerProfile, PartnerLastLog } from "@/hooks/usePartner";

const MOOD_EMOJI: Record<string, string> = {
  feliz: "😊",
  calma: "😌",
  cansada: "😴",
  irritada: "😤",
  triste: "😢",
  ansiosa: "😰",
  energizada: "⚡",
};

/**
 * Mostra o estado atual do parceiro: fase do ciclo, dia + último humor registrado.
 * Visível apenas para o parceiro (RLS garante).
 */
export function PartnerStatusCard({
  partner,
  lastLog,
}: {
  partner: PartnerProfile;
  lastLog: PartnerLastLog;
}) {
  const lastPeriod = partner.last_period_start
    ? new Date(partner.last_period_start + "T00:00:00")
    : null;
  const cycle = getCyclePhase(lastPeriod, partner.cycle_length, partner.period_length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft"
    >
      <div className="flex items-center gap-2">
        <Moon className="h-3.5 w-3.5 text-primary" />
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Como {partner.display_name ?? "ela"} está hoje
        </p>
      </div>

      {lastPeriod ? (
        <div className="mt-3 flex items-baseline gap-2">
          <p className="font-display text-2xl font-light">{PHASE_LABEL[cycle.phase]}</p>
          <p className="text-sm text-muted-foreground">· dia {cycle.dayInCycle}</p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">
          Ela ainda não configurou o ciclo.
        </p>
      )}

      {lastLog && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-secondary/60 p-3">
          {lastLog.mood && (
            <span className="flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-xs font-medium">
              <span>{MOOD_EMOJI[lastLog.mood] ?? "💭"}</span>
              <span className="capitalize">{lastLog.mood}</span>
            </span>
          )}
          {(lastLog.symptoms ?? []).slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full bg-card px-2.5 py-1 text-xs text-muted-foreground"
            >
              {s}
            </span>
          ))}
          {!lastLog.mood && (lastLog.symptoms ?? []).length === 0 && (
            <p className="text-xs text-muted-foreground">Sem registro detalhado hoje.</p>
          )}
        </div>
      )}

      {!lastLog && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-secondary/40 p-3">
          <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Ela ainda não fez check-in hoje.</p>
        </div>
      )}
    </motion.div>
  );
}
