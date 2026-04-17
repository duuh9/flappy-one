import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { POINTS } from "@/lib/points";

export type QuizAttempt = {
  id: string;
  quiz_id: string;
  question_count: number;
  correct_count: number;
  points_awarded: number;
  created_at: string;
};

/**
 * Gerencia tentativas de quiz e concessão de pontos.
 * Cada quiz só pontua uma vez (UNIQUE em (user_id, quiz_id)).
 */
export function useQuizzes() {
  const { user } = useAuth();
  const { profile, update } = useProfile();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) {
      setAttempts([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("quiz_attempts")
      .select("*")
      .order("created_at", { ascending: false });
    setAttempts((data as QuizAttempt[]) ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  /**
   * Salva tentativa e concede pontos. Se o quiz já foi feito antes,
   * apenas retorna o resultado original (não pontua de novo).
   */
  const submit = async (
    quizId: string,
    questionCount: number,
    correctCount: number,
  ): Promise<{ alreadyDone: boolean; pointsAwarded: number }> => {
    if (!user) return { alreadyDone: false, pointsAwarded: 0 };
    const existing = attempts.find((a) => a.quiz_id === quizId);
    if (existing) {
      return { alreadyDone: true, pointsAwarded: 0 };
    }
    const points = correctCount * POINTS.QUIZ_PER_CORRECT;
    const { data, error } = await supabase
      .from("quiz_attempts")
      .insert({
        user_id: user.id,
        quiz_id: quizId,
        question_count: questionCount,
        correct_count: correctCount,
        points_awarded: points,
      })
      .select("*")
      .single();
    if (!error && data) {
      setAttempts((prev) => [data as QuizAttempt, ...prev]);
      await update({ points: (profile?.points ?? 0) + points });
    }
    return { alreadyDone: false, pointsAwarded: points };
  };

  const isDone = (quizId: string) => attempts.some((a) => a.quiz_id === quizId);
  const getAttempt = (quizId: string) => attempts.find((a) => a.quiz_id === quizId);

  return { attempts, loading, submit, isDone, getAttempt };
}
