import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, RotateCcw } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Quiz } from "@/lib/quizzes";
import { useQuizzes } from "@/hooks/useQuizzes";
import { Mascot } from "@/components/Mascot";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { POINTS } from "@/lib/points";
import { toast } from "sonner";

type Props = {
  quiz: Quiz | null;
  onClose: () => void;
};

/**
 * Modal de quiz: mostra perguntas uma a uma, com explicação científica
 * após cada resposta. No final, registra no banco e concede pontos.
 */
export function QuizModal({ quiz, onClose }: Props) {
  const { submit, isDone } = useQuizzes();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState(0);
  const [alreadyDone, setAlreadyDone] = useState(false);

  // Reset ao abrir um quiz novo
  useEffect(() => {
    if (quiz) {
      setStep(0);
      setPicked(null);
      setCorrectCount(0);
      setDone(false);
      setConfetti(false);
      setPointsAwarded(0);
      setAlreadyDone(quiz ? isDone(quiz.id) : false);
    }
  }, [quiz, isDone]);

  if (!quiz) return null;
  const total = quiz.questions.length;
  const current = quiz.questions[step];
  const isCorrect = picked !== null && picked === current.correctIndex;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === current.correctIndex) {
      setCorrectCount((c) => c + 1);
      if (!alreadyDone) setConfetti(true);
    }
  };

  const next = async () => {
    if (step + 1 < total) {
      setStep(step + 1);
      setPicked(null);
      setConfetti(false);
      return;
    }
    // Fim
    const result = await submit(quiz.id, total, correctCount + (isCorrect && picked === current.correctIndex ? 0 : 0));
    setPointsAwarded(result.pointsAwarded);
    if (!result.alreadyDone && result.pointsAwarded > 0) {
      toast.success(`+${result.pointsAwarded} pontos!`, { icon: "✨" });
    }
    setDone(true);
    setConfetti(true);
  };

  const score = correctCount;
  const perfect = score === total;

  return (
    <Dialog open={!!quiz} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md gap-0 overflow-hidden rounded-3xl p-0">
        <ConfettiBurst show={confetti} onDone={() => setConfetti(false)} />

        {!done ? (
          <>
            <DialogHeader className="border-b border-border/60 bg-gradient-sand px-6 pb-4 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{quiz.emoji}</span>
                  <DialogTitle className="text-left font-display text-base font-medium">
                    {quiz.title}
                  </DialogTitle>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {step + 1} / {total}
                </span>
              </div>
              {/* Barra de progresso */}
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-card/60">
                <motion.div
                  className="h-full rounded-full bg-gradient-warm"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + (picked !== null ? 1 : 0)) / total) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </DialogHeader>

            <div className="px-6 py-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-display text-lg font-light leading-snug text-balance">
                    {current.q}
                  </p>

                  <div className="mt-4 space-y-2">
                    {current.options.map((opt, i) => {
                      const isPicked = picked === i;
                      const isRight = i === current.correctIndex;
                      const showState = picked !== null;
                      return (
                        <motion.button
                          key={i}
                          whileTap={{ scale: 0.98 }}
                          disabled={picked !== null}
                          onClick={() => choose(i)}
                          className={cn(
                            "relative flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
                            !showState && "border-border/60 bg-card hover:bg-secondary/60",
                            showState && isRight && "border-primary/50 bg-primary/10",
                            showState &&
                              isPicked &&
                              !isRight &&
                              "border-destructive/40 bg-destructive/10",
                            showState && !isPicked && !isRight && "opacity-50",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-medium",
                              !showState && "border-border/60 text-muted-foreground",
                              showState && isRight && "border-primary bg-primary text-primary-foreground",
                              showState &&
                                isPicked &&
                                !isRight &&
                                "border-destructive bg-destructive text-destructive-foreground",
                              showState && !isPicked && !isRight && "border-border/60 text-muted-foreground",
                            )}
                          >
                            {showState && isRight ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : showState && isPicked && !isRight ? (
                              <X className="h-3.5 w-3.5" />
                            ) : (
                              String.fromCharCode(65 + i)
                            )}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explicação */}
                  <AnimatePresence>
                    {picked !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 overflow-hidden"
                      >
                        <div
                          className={cn(
                            "rounded-2xl border p-3.5 text-sm leading-relaxed",
                            isCorrect
                              ? "border-primary/20 bg-primary/5"
                              : "border-border/60 bg-secondary/40",
                          )}
                        >
                          <p
                            className={cn(
                              "mb-1 text-[11px] font-medium uppercase tracking-wider",
                              isCorrect ? "text-primary" : "text-muted-foreground",
                            )}
                          >
                            {isCorrect ? "Boa! 💗" : "Quase lá"}
                          </p>
                          <p className="text-foreground/80">{current.explanation}</p>
                        </div>
                        <Button
                          onClick={next}
                          className="mt-3 w-full rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft hover:opacity-90"
                        >
                          {step + 1 < total ? "Próxima" : "Ver resultado"}
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          // Tela final
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-6 pb-6 pt-7 text-center"
          >
            <div className="flex justify-center">
              <Mascot mood={perfect ? "celebrate" : "happy"} size="lg" />
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-wider text-muted-foreground">
              {perfect ? "Mandou bem!" : "Boa tentativa"}
            </p>
            <h3 className="mt-1 font-display text-2xl font-light">
              {score} de {total} corretas
            </h3>
            {pointsAwarded > 0 ? (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                <Sparkles className="h-3.5 w-3.5" />+{pointsAwarded} pontos
              </div>
            ) : alreadyDone ? (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <RotateCcw className="h-3 w-3" />
                Você já tinha feito esse — sem pontos extras
              </div>
            ) : null}
            <Button
              onClick={onClose}
              className="mt-5 w-full rounded-2xl bg-gradient-warm text-primary-foreground shadow-soft hover:opacity-90"
            >
              Fechar
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
