import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { INSIGHTS, insightOfTheDay } from "@/lib/insights";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "Insights — Nós Dois" }] }),
});

function InsightsPage() {
  const today = insightOfTheDay();
  const others = INSIGHTS.filter((i) => i.title !== today.title);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Baseado em ciência
        </p>
        <h1 className="mt-1 font-display text-3xl font-light">Insights</h1>
      </div>

      {/* Hoje — hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2rem] bg-gradient-warm p-7 text-primary-foreground shadow-glow"
      >
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/15 blur-3xl" />
        <div className="relative">
          <p className="text-[11px] uppercase tracking-wider opacity-80">Hoje</p>
          <div className="mt-3 flex items-start gap-4">
            <motion.span
              animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl"
            >
              {today.emoji}
            </motion.span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-light leading-tight text-balance">
                {today.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed opacity-95">{today.body}</p>
              <p className="mt-3 text-[11px] italic opacity-75">— {today.source}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Biblioteca */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 px-1 text-muted-foreground">
          <BookOpen className="h-3 w-3" />
          <p className="text-[11px] uppercase tracking-wider">Biblioteca</p>
        </div>
        {others.map((insight, idx) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            whileHover={{ y: -2 }}
            className="group cursor-default rounded-3xl border border-border/60 bg-card/80 p-5 shadow-soft transition-shadow hover:shadow-glow"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl transition-transform group-hover:scale-110">
                {insight.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-medium leading-tight">
                  {insight.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {insight.body}
                </p>
                <p className="mt-2.5 text-[11px] italic text-muted-foreground/70">
                  — {insight.source}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
