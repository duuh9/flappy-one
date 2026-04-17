import { motion } from "framer-motion";
import { Flame, Sparkles, Trophy } from "lucide-react";

type Props = {
  streak: number;
  points: number;
  badgeCount: number;
  onOpenBadges: () => void;
};

export function StreakBadge({ streak, points, badgeCount, onOpenBadges }: Props) {
  const sleepy = streak === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-3 gap-2"
    >
      {/* Streak */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-3.5 shadow-soft backdrop-blur">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent/20 blur-2xl" />
        <div className="relative flex items-center gap-2.5">
          <motion.div
            animate={
              sleepy
                ? { rotate: 0 }
                : { rotate: [0, -8, 8, -4, 0], scale: [1, 1.05, 1.05, 1, 1] }
            }
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: "easeInOut",
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/40 to-accent/10"
          >
            <Flame
              className="h-4 w-4"
              style={{ color: sleepy ? "var(--muted-foreground)" : "var(--rose-deep)" }}
              fill={sleepy ? "none" : "currentColor"}
              fillOpacity={sleepy ? 1 : 0.25}
            />
          </motion.div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Streak
            </p>
            <p className="font-display text-lg font-medium leading-tight">
              {streak}
              <span className="ml-0.5 text-[11px] font-normal text-muted-foreground">
                d
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Pontos */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-3.5 shadow-soft backdrop-blur">
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-primary/15 blur-2xl" />
        <div className="relative flex items-center gap-2.5">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10"
          >
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Pontos
            </p>
            <p className="font-display text-lg font-medium leading-tight">{points}</p>
          </div>
        </div>
      </div>

      {/* Badges (clicável) */}
      <motion.button
        onClick={onOpenBadges}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-3.5 text-left shadow-soft backdrop-blur transition-colors hover:bg-card"
      >
        <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-accent/15 blur-2xl" />
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent/5">
            <Trophy className="h-4 w-4 text-accent-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Conquistas
            </p>
            <p className="font-display text-lg font-medium leading-tight">{badgeCount}</p>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
