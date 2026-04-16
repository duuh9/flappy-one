import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function StreakBadge({ streak, points }: { streak: number; points: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/60 px-4 py-3 backdrop-blur"
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: [0, -8, 8, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/60"
        >
          <Flame className="h-4 w-4 text-rose-deep" style={{ color: "var(--rose-deep)" }} />
        </motion.div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Streak</p>
          <p className="font-display text-lg font-medium leading-none">{streak} {streak === 1 ? "dia" : "dias"}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Pontos</p>
        <p className="font-display text-lg font-medium leading-none">{points}</p>
      </div>
    </motion.div>
  );
}
