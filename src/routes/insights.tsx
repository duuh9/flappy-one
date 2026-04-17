import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, CheckCircle2 } from "lucide-react";
import { INSIGHTS, insightOfTheDay } from "@/lib/insights";
import {
  QUIZZES,
  CATEGORY_LABEL,
  quizOfTheDay,
  type Quiz,
  type QuizCategory,
} from "@/lib/quizzes";
import { useQuizzes } from "@/hooks/useQuizzes";
import { QuizModal } from "@/components/QuizModal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "Insights — Nós Dois" }] }),
});

const CATEGORIES: (QuizCategory | "all")[] = ["all", "ciclo", "sintomas", "casal", "geral"];

function InsightsPage() {
  const today = insightOfTheDay();
  const dailyQuiz = quizOfTheDay();
  const others = INSIGHTS.filter((i) => i.title !== today.title);
  const { isDone, getAttempt } = useQuizzes();

  const [filter, setFilter] = useState<QuizCategory | "all">("all");
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  const filteredQuizzes =
    filter === "all" ? QUIZZES : QUIZZES.filter((q) => q.category === filter);

  return (
    <div className="space-y-6 pb-8">
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Aprenda + Ganhe pontos
        </p>
        <h1 className="mt-1 font-display text-3xl font-light">Insights</h1>
      </div>

      {/* Hero — insight do dia */}
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

      {/* Quizzes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Brain className="h-3 w-3" />
            <p className="text-[11px] uppercase tracking-wider">Quizzes</p>
          </div>
          <p className="text-[10px] text-muted-foreground/70">
            +5 pts por acerto
          </p>
        </div>

        {/* Filtros de categoria */}
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 bg-card/60 text-muted-foreground hover:bg-secondary/60",
              )}
            >
              {c === "all" ? "Todos" : CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        {/* Lista de quizzes */}
        <div className="space-y-2">
          {filteredQuizzes.map((q, idx) => {
            const done = isDone(q.id);
            const attempt = getAttempt(q.id);
            const isDaily = q.id === dailyQuiz.id;
            return (
              <motion.button
                key={q.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveQuiz(q)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-3xl border p-4 text-left shadow-soft transition-shadow hover:shadow-glow",
                  isDaily
                    ? "border-primary/30 bg-gradient-soft"
                    : "border-border/60 bg-card/80",
                )}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-card text-2xl">
                  {q.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    {isDaily && (
                      <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-primary">
                        Hoje
                      </span>
                    )}
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {CATEGORY_LABEL[q.category]}
                    </p>
                  </div>
                  <p className="mt-0.5 truncate font-display text-base font-medium">
                    {q.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {q.description}
                  </p>
                </div>
                {done && attempt ? (
                  <div className="flex shrink-0 flex-col items-end gap-0.5 text-right">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <p className="text-[10px] font-medium text-muted-foreground">
                      {attempt.correct_count}/{attempt.question_count}
                    </p>
                  </div>
                ) : (
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    {q.questions.length} q
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Biblioteca de insights */}
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

      <QuizModal quiz={activeQuiz} onClose={() => setActiveQuiz(null)} />
    </div>
  );
}
