import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, UserCircle2, MessageCircleHeart, Bell } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { usePartner } from "@/hooks/usePartner";
import { usePartnerNudges } from "@/hooks/usePartnerNudges";
import { getCyclePhase, PHASE_LABEL } from "@/lib/cycle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PairCard } from "@/components/PairCard";
import { PartnerStatusCard } from "@/components/PartnerStatusCard";
import { MessagesPanel } from "@/components/MessagesPanel";
import { HerSection } from "@/components/HerSection";
import { HimSection } from "@/components/HimSection";

export const Route = createFileRoute("/nos-dois")({
  component: TogetherPage,
  head: () => ({ meta: [{ title: "Nós Dois — Para o casal" }] }),
});

function TogetherPage() {
  const { profile } = useProfile();
  const { partnerId, partner, partnerLastLog } = usePartner();
  const { latestReceived, unseenCount, markAllSeen } = usePartnerNudges(partnerId);
  const [tab, setTab] = useState<"ela" | "ele">("ela");
  const [showNudge, setShowNudge] = useState<string | null>(null);

  // Fase de referência: a do par se houver, senão a própria
  const referenceProfile = partner ?? profile;
  const lastPeriod = referenceProfile?.last_period_start
    ? new Date(referenceProfile.last_period_start + "T00:00:00")
    : null;
  const cycle = getCyclePhase(
    lastPeriod,
    referenceProfile?.cycle_length ?? 28,
    referenceProfile?.period_length ?? 5,
  );

  // Mostra nudge novo recebido como overlay flutuante
  useEffect(() => {
    if (latestReceived && !latestReceived.seen_at) {
      setShowNudge(latestReceived.emoji);
      markAllSeen();
      const t = setTimeout(() => setShowNudge(null), 2400);
      return () => clearTimeout(t);
    }
  }, [latestReceived, markAllSeen]);

  return (
    <div className="space-y-6 pb-8">
      <header>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">A dois</p>
        <h1 className="mt-1 font-display text-3xl font-light">Nós Dois</h1>
        {lastPeriod && (
          <p className="mt-1 text-sm text-muted-foreground">
            Fase atual:{" "}
            <span className="font-medium text-foreground">{PHASE_LABEL[cycle.phase]}</span> · dia{" "}
            {cycle.dayInCycle}
          </p>
        )}
      </header>

      {/* Pareamento */}
      <PairCard />

      {/* Status + nudges recebidos */}
      {partner && (
        <>
          <PartnerStatusCard partner={partner} lastLog={partnerLastLog} />
          {unseenCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-xs text-primary"
            >
              <Bell className="h-3.5 w-3.5" />
              <span>
                {partner.display_name ?? "Seu par"} lembrou de você{" "}
                {unseenCount > 1 ? `${unseenCount}x` : ""} 💗
              </span>
            </motion.div>
          )}
        </>
      )}

      {/* Tabs Ela / Ele — só fazem sentido com algum perfil de ciclo definido */}
      {referenceProfile && (
        <Tabs value={tab} onValueChange={(v) => setTab(v as "ela" | "ele")} className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 rounded-3xl border border-border/60 bg-card/60 p-1.5 backdrop-blur">
            <TabsTrigger
              value="ela"
              className="relative gap-1.5 rounded-2xl py-2.5 text-sm font-medium data-[state=active]:bg-gradient-warm data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft"
            >
              <UserCircle2 className="h-3.5 w-3.5" />
              Para a Namorada
            </TabsTrigger>
            <TabsTrigger
              value="ele"
              className="relative gap-1.5 rounded-2xl py-2.5 text-sm font-medium data-[state=active]:bg-gradient-warm data-[state=active]:text-primary-foreground data-[state=active]:shadow-soft"
            >
              <User className="h-3.5 w-3.5" />
              Para o Namorado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ela" className="mt-5 focus-visible:outline-none">
            <HerSection phase={cycle.phase} />
          </TabsContent>
          <TabsContent value="ele" className="mt-5 focus-visible:outline-none">
            {partnerId ? (
              <HimSection phase={cycle.phase} partnerId={partnerId} />
            ) : (
              <div className="rounded-3xl border border-dashed border-border/60 bg-card/40 p-6 text-center text-sm text-muted-foreground">
                Conecte-se com seu par acima para liberar palpites, recadinhos e o "Lembrei de você".
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Recadinhos / chat (apenas pareado) */}
      {partnerId && (
        <section className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <MessageCircleHeart className="h-3.5 w-3.5 text-primary" />
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Recadinhos</p>
          </div>
          <MessagesPanel partnerId={partnerId} />
        </section>
      )}

      {/* Overlay flutuante quando recebe um nudge */}
      <AnimatePresence>
        {showNudge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="pointer-events-none fixed inset-x-0 top-1/3 z-50 flex justify-center"
          >
            <div className="flex flex-col items-center gap-2 rounded-3xl bg-card/95 px-6 py-5 shadow-glow backdrop-blur">
              <span className="text-5xl">{showNudge}</span>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {partner?.display_name ?? "Seu par"} lembrou de você
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
