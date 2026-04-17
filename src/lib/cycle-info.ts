import type { CyclePhase } from "./cycle";

/**
 * Conteúdo educativo, leve e empático sobre cada fase do ciclo.
 * Usado no bottom sheet do Calendário ao tocar na legenda.
 */
export type PhaseInfo = {
  emoji: string;
  title: string;
  rangeLabel: string;
  whatHappens: string;
  hormones: string;
  bodyAndMood: string[];
  tips: string[];
};

export const PHASE_INFO: Record<CyclePhase, PhaseInfo> = {
  menstrual: {
    emoji: "🌹",
    title: "Fase Menstrual",
    rangeLabel: "Geralmente dias 1 a 5",
    whatHappens:
      "É o início do ciclo. O endométrio (camada interna do útero) descama e sai como o sangue menstrual. O corpo está se renovando.",
    hormones:
      "Estrogênio e progesterona estão nos níveis mais baixos do ciclo. Por isso, a energia também tende a estar mais baixa.",
    bodyAndMood: [
      "Cólica leve a moderada nos primeiros dias",
      "Mais cansaço e necessidade de descanso",
      "Humor introspectivo, vontade de recolhimento",
      "Sensibilidade emocional aumentada",
    ],
    tips: [
      "Bolsa quente na barriga ajuda demais com a cólica",
      "Caminhada leve pode reduzir a dor em até 25%",
      "Magnésio (300mg/dia) e ômega-3 ajudam com sintomas",
      "Permita-se descansar sem culpa — o corpo está trabalhando",
    ],
  },
  folicular: {
    emoji: "🌱",
    title: "Fase Folicular",
    rangeLabel: "Geralmente dias 6 a 13",
    whatHappens:
      "Os folículos do ovário começam a amadurecer, preparando um óvulo para a ovulação. O endométrio se reconstrói.",
    hormones:
      "O estrogênio sobe gradualmente. Isso traz energia, clareza mental e melhor humor.",
    bodyAndMood: [
      "Energia em alta — ótimo para treinos pesados",
      "Pele mais bonita e cabelo mais brilhante",
      "Memória verbal e foco no pico",
      "Humor estável, sociabilidade aumentada",
    ],
    tips: [
      "Aproveite para conversas difíceis, decisões e projetos novos",
      "É a melhor fase para ganho de força no treino",
      "Boa hora para socializar e marcar compromissos",
      "Aprenda algo novo — o cérebro está receptivo",
    ],
  },
  ovulacao: {
    emoji: "✨",
    title: "Fase de Ovulação",
    rangeLabel: "Geralmente dias 14 a 16",
    whatHappens:
      "O óvulo é liberado pelo ovário e segue pela trompa. É o pico de fertilidade do ciclo.",
    hormones:
      "Pico de estrogênio e LH (hormônio luteinizante). A testosterona também sobe um pouco.",
    bodyAndMood: [
      "Pico de energia e disposição",
      "Aumento natural da libido (2-3 dias antes)",
      "Maior carisma e confiança social",
      "Possível leve dor pélvica de um lado (mittelschmerz)",
    ],
    tips: [
      "Momento ideal para conexão com o parceiro",
      "Ótimo para apresentações, entrevistas, eventos",
      "Hidrate bem — o corpo trabalha mais",
      "Se evita gravidez, atenção redobrada à proteção",
    ],
  },
  lutea: {
    emoji: "🌙",
    title: "Fase Lútea",
    rangeLabel: "Geralmente dias 17 a 28",
    whatHappens:
      "O corpo lúteo produz progesterona para preparar o útero para uma possível gravidez. Se não houver, ele se desfaz e o ciclo recomeça.",
    hormones:
      "Progesterona em alta na primeira metade. Nos últimos dias (TPM), tanto estrogênio quanto progesterona caem rapidamente.",
    bodyAndMood: [
      "Temperatura corporal sobe ~0.3°C — pode atrapalhar o sono",
      "Mais fome, especialmente por carboidratos e doces",
      "Sensibilidade emocional, choro fácil nos últimos dias",
      "Possível inchaço, sensibilidade nos seios e acne",
    ],
    tips: [
      "Quarto entre 18-20°C melhora muito o sono",
      "Chocolate amargo 70% (porção pequena) suaviza o humor",
      "Reduza cafeína e álcool nos últimos 5 dias",
      "Treinos mais leves e ioga ajudam mais que HIIT agora",
    ],
  },
};
