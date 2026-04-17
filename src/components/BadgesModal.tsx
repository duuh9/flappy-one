import { motion } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useBadges } from "@/hooks/useBadges";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = { open: boolean; onClose: () => void };

export function BadgesModal({ open, onClose }: Props) {
  const { badges, unlockedRows, isUnlocked } = useBadges();
  const unlockedMap = new Map(unlockedRows.map((r) => [r.badge_id, r.unlocked_at]));
  const total = badges.length;
  const unlockedCount = badges.filter((b) => isUnlocked(b.id)).length;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-3xl p-0">
        <DialogHeader className="bg-gradient-warm px-6 pb-5 pt-6 text-primary-foreground">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <DialogTitle className="text-left font-display text-base font-medium">
              Suas conquistas
            </DialogTitle>
          </div>
          <p className="mt-2 font-display text-3xl font-light">
            {unlockedCount}{" "}
            <span className="text-base opacity-80">de {total} desbloqueadas</span>
          </p>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto px-5 py-5">
          <div className="grid grid-cols-2 gap-3">
            {badges.map((b, i) => {
              const unlocked = isUnlocked(b.id);
              const date = unlockedMap.get(b.id);
              return (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border p-3.5 text-center transition-colors",
                    unlocked
                      ? "border-primary/30 bg-gradient-soft"
                      : "border-border/60 bg-secondary/40",
                  )}
                >
                  <div
                    className={cn(
                      "text-3xl transition-all",
                      !unlocked && "grayscale opacity-40",
                    )}
                  >
                    {b.emoji}
                  </div>
                  <p
                    className={cn(
                      "mt-2 font-display text-sm font-medium leading-tight",
                      !unlocked && "text-muted-foreground",
                    )}
                  >
                    {b.title}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-[11px] leading-snug",
                      unlocked ? "text-foreground/70" : "text-muted-foreground/70",
                    )}
                  >
                    {b.description}
                  </p>
                  {unlocked && date && (
                    <p className="mt-2 inline-flex items-center gap-1 text-[10px] text-primary">
                      <Sparkles className="h-2.5 w-2.5" />
                      {format(new Date(date), "d MMM", { locale: ptBR })}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
