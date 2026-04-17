import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

export function StreakBadge({ streak, points }: { streak: number; points: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 gap-2"
    >
      {/* Streak */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-4 shadow-soft backdrop-blur">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent/20 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <motion.div
            animate={{
              rotate: [0, -8, 8, -4, 0],
              scale: [1, 1.05, 1.05, 1, 1],
            }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/40 to-accent/10"
          >
            <Flame
              className="h-5 w-5"
              style={{ color: "var(--rose-deep)" }}
              fill="currentColor"
              fillOpacity={0.25}
            />
          </motion.div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Streak</p>
            <p className="font-display text-xl font-medium leading-tight">
              {streak}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                {streak === 1 ? "dia" : "dias"}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Pontos */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-4 shadow-soft backdrop-blur">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10"
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pontos</p>
            <p className="font-display text-xl font-medium leading-tight">{points}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
