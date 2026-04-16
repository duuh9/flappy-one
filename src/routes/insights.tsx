import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Baseado em ciência</p>
        <h1 className="mt-1 font-display text-3xl font-light">Insights</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-warm p-6 text-primary-foreground shadow-glow"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
        <div className="relative">
          <p className="text-xs uppercase tracking-wider opacity-80">Hoje</p>
          <div className="mt-1 flex items-start gap-3">
            <span className="text-3xl">{today.emoji}</span>
            <div>
              <h2 className="font-display text-xl font-light">{today.title}</h2>
              <p className="mt-2 text-sm opacity-95 leading-relaxed">{today.body}</p>
              <p className="mt-3 text-[11px] italic opacity-75">— {today.source}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        <p className="px-1 text-xs uppercase tracking-wider text-muted-foreground">Biblioteca</p>
        {others.map((insight, idx) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="rounded-2xl border border-border/60 bg-card/80 p-4 shadow-soft"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{insight.emoji}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base font-medium">{insight.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{insight.body}</p>
                <p className="mt-2 text-[11px] italic text-muted-foreground/70">— {insight.source}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
