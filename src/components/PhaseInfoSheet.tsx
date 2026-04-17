import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PHASE_INFO } from "@/lib/cycle-info";
import { PHASE_COLOR, type CyclePhase } from "@/lib/cycle";
import { Sparkles, Heart, Moon, Activity } from "lucide-react";

type Props = {
  phase: CyclePhase | null;
  onClose: () => void;
};

/**
 * Bottom sheet educativo, leve e empático sobre a fase escolhida.
 * Aberto ao tocar na legenda do calendário.
 */
export function PhaseInfoSheet({ phase, onClose }: Props) {
  const info = phase ? PHASE_INFO[phase] : null;

  return (
    <Sheet open={!!phase} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] overflow-y-auto rounded-t-3xl border-t-0 bg-card p-0"
      >
        {info && phase && (
          <>
            {/* Header com gradiente da fase */}
            <div
              className="relative overflow-hidden px-6 pb-6 pt-8"
              style={{
                background: `linear-gradient(160deg, ${getPhaseGradient(phase)})`,
              }}
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/40 blur-3xl" />
              <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
              <div className="relative">
                <span className="text-5xl">{info.emoji}</span>
                <SheetHeader className="mt-3">
                  <SheetTitle className="text-left font-display text-2xl font-light">
                    {info.title}
                  </SheetTitle>
                </SheetHeader>
                <p className="mt-1 text-sm text-foreground/70">{info.rangeLabel}</p>
              </div>
            </div>

            <div className="space-y-5 px-6 pb-10 pt-6">
              <Section icon={<Sparkles className="h-3.5 w-3.5" />} label="O que acontece">
                <p className="text-sm leading-relaxed text-foreground/80">{info.whatHappens}</p>
              </Section>

              <Section icon={<Activity className="h-3.5 w-3.5" />} label="Hormônios">
                <p className="text-sm leading-relaxed text-foreground/80">{info.hormones}</p>
              </Section>

              <Section icon={<Moon className="h-3.5 w-3.5" />} label="Corpo & emoções">
                <ul className="space-y-2">
                  {info.bodyAndMood.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex gap-2 text-sm leading-relaxed text-foreground/80"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: PHASE_COLOR[phase] }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </Section>

              <Section icon={<Heart className="h-3.5 w-3.5" />} label="Dicas carinhosas">
                <div className="space-y-2">
                  {info.tips.map((tip, i) => (
                    <motion.div
                      key={tip}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.04 }}
                      className="rounded-2xl bg-secondary/60 px-3.5 py-2.5 text-sm leading-relaxed"
                    >
                      {tip}
                    </motion.div>
                  ))}
                </div>
              </Section>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Section({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-primary">
        {icon}
        <p className="text-[11px] font-medium uppercase tracking-wider">{label}</p>
      </div>
      {children}
    </div>
  );
}

function getPhaseGradient(phase: CyclePhase): string {
  switch (phase) {
    case "menstrual":
      return "oklch(0.92 0.06 10) 0%, oklch(0.96 0.03 30) 100%";
    case "folicular":
      return "oklch(0.94 0.05 320) 0%, oklch(0.97 0.025 60) 100%";
    case "ovulacao":
      return "oklch(0.90 0.08 320) 0%, oklch(0.94 0.05 0) 100%";
    case "lutea":
      return "oklch(0.93 0.05 0) 0%, oklch(0.96 0.03 75) 100%";
  }
}
