import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, MessageCircleHeart, User, UserCircle2 } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { usePartner } from "@/hooks/usePartner";
import { getCyclePhase, PHASE_LABEL } from "@/lib/cycle";
import { PARTNER_TIPS, HER_TIPS, SWEET_NOTES } from "@/lib/partner-tips";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PairCard } from "@/components/PairCard";
import { PartnerStatusCard } from "@/components/PartnerStatusCard";
import { MessagesPanel } from "@/components/MessagesPanel";

export const Route = createFileRoute("/nos-dois")({
  component: TogetherPage,
  head: () => ({ meta: [{ title: "Nós Dois — Para o casal" }] }),
});

type Side = "ela" | "ele";

function TogetherPage() {
  const { profile } = useProfile();
  const { partnerId, partner, partnerLastLog } = usePartner();
  const [side, setSide] = useState<Side>("ela");
  const [noteIdx, setNoteIdx] = useState(() => Math.floor(Math.random() * SWEET_NOTES.length));

  // Quando pareado, a fase exibida é a do parceiro (se existir), senão a própria.
  const referenceProfile = partner ?? profile;
  const lastPeriod = referenceProfile?.last_period_start
    ? new Date(referenceProfile.last_period_start + "T00:00:00")
    : null;
  const cycle = getCyclePhase(
    lastPeriod,
    referenceProfile?.cycle_length ?? 28,
    referenceProfile?.period_length ?? 5,
  );

  const tips = useMemo(
    () => (side === "ela" ? HER_TIPS[cycle.phase] : PARTNER_TIPS[cycle.phase]),
    [side, cycle.phase],
  );

  return (
    <div className="space-y-6 pb-8">
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">A dois</p>
        <h1 className="mt-1 font-display text-3xl font-light">Nós Dois</h1>
        {lastPeriod && (
          <p className="mt-1 text-sm text-muted-foreground">
            Fase atual:{" "}
            <span className="font-medium text-foreground">{PHASE_LABEL[cycle.phase]}</span> · dia{" "}
            {cycle.dayInCycle}
          </p>
        )}
      </div>

      {/* Pareamento */}
      <PairCard />

      {/* Status do parceiro (se houver) */}
      {partner && <PartnerStatusCard partner={partner} lastLog={partnerLastLog} />}

      {/* Recadinhos (apenas quando pareado) */}
      {partnerId && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <MessageCircleHeart className="h-3.5 w-3.5 text-primary" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Recadinhos
            </p>
          </div>
          <MessagesPanel partnerId={partnerId} />
        </div>
      )}

      {/* Toggle Ela / Ele — segmentado e visualmente distinto */}
      <div className="grid grid-cols-2 gap-2 rounded-3xl border border-border/60 bg-card/60 p-1.5 backdrop-blur">
        {(["ela", "ele"] as Side[]).map((s) => {
          const Icon = s === "ela" ? UserCircle2 : User;
          const active = side === s;
          return (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={cn(
                "relative flex items-center justify-center gap-1.5 rounded-2xl px-3 py-3 text-sm font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="side-pill"
                  className="absolute inset-0 rounded-2xl bg-gradient-warm shadow-soft"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon
                className={cn(
                  "relative h-3.5 w-3.5",
                  active && "text-primary-foreground",
                )}
              />
              <span className={cn("relative", active && "text-primary-foreground")}>
                {s === "ela" ? "Para a Namorada" : "Para o Namorado"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sugestões da fase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={side + cycle.phase}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {side === "ela" ? "Para você" : "Para ele"} · fase{" "}
              {PHASE_LABEL[cycle.phase].toLowerCase()}
            </p>
          </div>
          {tips.map((tip, i) => (
            <motion.div
              key={tip}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl border border-border/60 bg-card/80 p-4 shadow-soft"
            >
              <div className="flex gap-3">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />
                <p className="text-sm leading-relaxed">{tip}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Recadinho surpresa (biblioteca local) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-soft p-6 shadow-soft"
      >
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
        <div className="relative">
          <div className="mb-2 flex items-center gap-2">
            <MessageCircleHeart className="h-4 w-4 text-primary" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Inspiração
            </p>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={noteIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-display text-xl font-light leading-snug text-balance"
            >
              {SWEET_NOTES[noteIdx]}
            </motion.p>
          </AnimatePresence>
          <Button
            variant="ghost"
            onClick={() => setNoteIdx((i) => (i + 1) % SWEET_NOTES.length)}
            className="mt-3 h-8 rounded-full px-3 text-xs"
          >
            <Heart className="mr-1.5 h-3 w-3" fill="currentColor" />
            Outra ideia
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
