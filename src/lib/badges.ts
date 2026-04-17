/**
 * Catálogo de conquistas (badges).
 * O `check` recebe stats do usuário e retorna true se já desbloqueou.
 */
export type BadgeStats = {
  streak: number;
  points: number;
  totalLogs: number;
  totalQuizzes: number;
  hasPartner: boolean;
  hasMessages: boolean;
};

export type Badge = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  check: (s: BadgeStats) => boolean;
};

export const BADGES: Badge[] = [
  {
    id: "first-step",
    emoji: "🌱",
    title: "Primeiro passo",
    description: "Registre seu primeiro dia.",
    check: (s) => s.totalLogs >= 1,
  },
  {
    id: "streak-3",
    emoji: "🔥",
    title: "Três dias seguidos",
    description: "Mantenha um streak de 3 dias.",
    check: (s) => s.streak >= 3,
  },
  {
    id: "streak-7",
    emoji: "✨",
    title: "Uma semana de ouro",
    description: "Mantenha um streak de 7 dias.",
    check: (s) => s.streak >= 7,
  },
  {
    id: "streak-30",
    emoji: "👑",
    title: "Um mês inteiro",
    description: "30 dias seguidos de cuidado.",
    check: (s) => s.streak >= 30,
  },
  {
    id: "curious-mind",
    emoji: "🧠",
    title: "Mente curiosa",
    description: "Complete seu primeiro quiz.",
    check: (s) => s.totalQuizzes >= 1,
  },
  {
    id: "scholar",
    emoji: "📚",
    title: "Estudiosa",
    description: "Complete 5 quizzes diferentes.",
    check: (s) => s.totalQuizzes >= 5,
  },
  {
    id: "duo",
    emoji: "💞",
    title: "Conectados",
    description: "Pareie com seu par.",
    check: (s) => s.hasPartner,
  },
  {
    id: "sweet-words",
    emoji: "💌",
    title: "Recadinho enviado",
    description: "Mande seu primeiro recadinho.",
    check: (s) => s.hasMessages,
  },
  {
    id: "century",
    emoji: "🌟",
    title: "Cem pontinhos",
    description: "Acumule 100 pontos.",
    check: (s) => s.points >= 100,
  },
];

export function unlockedBadges(stats: BadgeStats): Badge[] {
  return BADGES.filter((b) => b.check(stats));
}
