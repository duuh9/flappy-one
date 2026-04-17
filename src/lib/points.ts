/**
 * Tabela central de pontos por ação. Mantém valores consistentes.
 */
export const POINTS = {
  DAILY_LOG: 10,
  QUIZ_PER_CORRECT: 5,
  INSIGHT_READ: 1,
  MESSAGE_SENT: 2,
  PAIR_PARTNER: 20,
  STREAK_BONUS: 5, // bônus a cada 7 dias de streak
} as const;
