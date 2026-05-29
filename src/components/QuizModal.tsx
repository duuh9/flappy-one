import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";
import { useQuizzes } from "@/hooks/useQuizzes";
import type { Quiz } from "@/lib/quizzes";
import { cn } from "@/lib/utils";

interface QuizModalProps {
  quiz: Quiz | null;
  onClose: () => void;
}

export function QuizModal({ quiz, onClose }: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submit } = useQuizzes();

  // Reset when quiz changes
  useEffect(() => {
    if (quiz) {
      setCurrentQuestion(0);
      setSelectedAnswers({});
      setShowExplanation(false);
    }
  }, [quiz]);

  if (!quiz) return null;

  const question = quiz.questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];
  const isAnswered = selectedAnswer !== undefined;
  const isCorrect = isAnswered && selectedAnswer === question.correctIndex;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = ((answeredCount + (showExplanation ? 1 : 0)) / quiz.questions.length) * 100;

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionIndex });
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const correctCount = Object.entries(selectedAnswers).filter(
        ([qIdx, answer]) => answer === quiz.questions[Number(qIdx)].correctIndex,
      ).length;

      const result = await submit(quiz.id, quiz.questions.length, correctCount);
      if (result.alreadyDone) {
        toast.info("Você já completou este quiz!");
      } else {
        toast.success(
          `Quiz completo! ${correctCount}/${quiz.questions.length} acertos (${result.pointsAwarded} pts)`,
        );
      }
      onClose();
    } catch (error) {
      toast.error("Erro ao salvar resultado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={!!quiz} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{quiz.emoji}</span>
              <div>
                <h2 className="font-display text-xl font-medium">{quiz.title}</h2>
                <p className="text-sm text-muted-foreground">{quiz.description}</p>
              </div>
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              {currentQuestion + 1}/{quiz.questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-lg font-medium leading-relaxed">{question.q}</h3>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {question.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  disabled={showExplanation}
                  whileHover={{ scale: showExplanation ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative w-full rounded-2xl border-2 p-4 text-left transition-all",
                    selectedAnswer === idx
                      ? isCorrect
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-red-500 bg-red-500/10"
                      : showExplanation && idx === question.correctIndex
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-border/40 bg-card/50 hover:bg-card/80",
                    showExplanation && "cursor-default",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                        selectedAnswer === idx
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-red-500 bg-red-500"
                          : showExplanation && idx === question.correctIndex
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-border/60",
                      )}
                    >
                      {(selectedAnswer === idx ||
                        (showExplanation && idx === question.correctIndex)) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className={cn(
                      "border-l-4 p-4",
                      isCorrect
                        ? "border-l-emerald-500 bg-emerald-500/5"
                        : "border-l-sky-500 bg-sky-500/5",
                    )}
                  >
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {question.explanation}
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="flex gap-3">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Fechar
          </Button>
          <Button onClick={handleNext} disabled={!isAnswered || isSubmitting} className="flex-1">
            {isSubmitting ? (
              "Salvando..."
            ) : currentQuestion === quiz.questions.length - 1 ? (
              <>
                Finalizar <Check className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                Próxima <ChevronRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
