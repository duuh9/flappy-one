/**
 * Biblioteca de quizzes educativos. Cada quiz tem 4-6 perguntas
 * com explicação científica após cada resposta.
 */
export type QuizCategory = "ciclo" | "sintomas" | "casal" | "geral";

export type QuizQuestion = {
  q: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Quiz = {
  id: string;
  category: QuizCategory;
  emoji: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export const CATEGORY_LABEL: Record<QuizCategory, string> = {
  ciclo: "Fases do ciclo",
  sintomas: "Sintomas & bem-estar",
  casal: "Para o casal",
  geral: "Conhecimento geral",
};

export const QUIZZES: Quiz[] = [
  {
    id: "fases-basico",
    category: "ciclo",
    emoji: "🌸",
    title: "As 4 fases do ciclo",
    description: "Entenda o que acontece em cada fase do ciclo menstrual.",
    questions: [
      {
        q: "Qual fase do ciclo costuma trazer mais energia e clareza mental?",
        options: ["Menstrual", "Folicular", "Ovulação", "Lútea"],
        correctIndex: 1,
        explanation:
          "A fase folicular tem aumento gradual do estrogênio, melhorando humor, memória verbal e disposição física.",
      },
      {
        q: "O pico de fertilidade acontece em qual fase?",
        options: ["Menstrual", "Folicular", "Ovulação", "Lútea"],
        correctIndex: 2,
        explanation:
          "A ovulação libera o óvulo e dura cerca de 12-24h, mas a janela fértil é maior pela sobrevida dos espermatozoides.",
      },
      {
        q: "Por que a temperatura corporal sobe na fase lútea?",
        options: [
          "Por causa do estrogênio",
          "Pela progesterona produzida pelo corpo lúteo",
          "Pelo cortisol",
          "Pela testosterona",
        ],
        correctIndex: 1,
        explanation:
          "A progesterona, produzida após a ovulação, aumenta a temperatura basal em ~0.3°C — por isso o sono pode ficar mais leve.",
      },
      {
        q: "Quanto dura, em média, um ciclo menstrual?",
        options: ["14 dias", "21 dias", "28 dias", "40 dias"],
        correctIndex: 2,
        explanation:
          "A média é 28 dias, mas variações entre 21 e 35 dias também são totalmente normais.",
      },
      {
        q: "O que é o endométrio?",
        options: [
          "Camada muscular do útero",
          "Camada interna do útero que descama na menstruação",
          "Órgão que produz hormônios",
          "Outro nome para a trompa",
        ],
        correctIndex: 1,
        explanation:
          "O endométrio é a camada interna do útero. Ele se constrói a cada ciclo e descama se não houver gravidez.",
      },
    ],
  },
  {
    id: "sintomas-tpm",
    category: "sintomas",
    emoji: "🌿",
    title: "TPM e sintomas",
    description: "O que é normal, o que ajuda e o que evitar.",
    questions: [
      {
        q: "Qual suplemento mostrou redução de até 40% na cólica menstrual?",
        options: ["Vitamina C", "Magnésio", "Ferro", "Zinco"],
        correctIndex: 1,
        explanation:
          "Estudos mostram que 300mg/dia de magnésio reduzem significativamente a intensidade da cólica.",
      },
      {
        q: "Caminhada leve durante a menstruação...",
        options: [
          "Aumenta a cólica",
          "Não tem efeito",
          "Reduz a dor em ~25%",
          "Deve ser evitada",
        ],
        correctIndex: 2,
        explanation:
          "30 minutos de caminhada leve durante a menstruação reduz a dor relatada em cerca de 25% (BMC Women's Health, 2018).",
      },
      {
        q: "A vontade de doce na fase lútea é causada principalmente por:",
        options: [
          "Falta de força de vontade",
          "Queda de serotonina e busca por carboidratos",
          "Excesso de água",
          "Falta de proteína",
        ],
        correctIndex: 1,
        explanation:
          "A queda de estrogênio reduz serotonina, e o cérebro busca carboidratos rápidos para compensar. É bioquímica, não fraqueza.",
      },
      {
        q: "Qual hábito ajuda mais a reduzir o inchaço?",
        options: [
          "Beber menos água",
          "Beber mais água regularmente",
          "Comer mais sal",
          "Tomar diurético sempre",
        ],
        correctIndex: 1,
        explanation:
          "Beber mais água reduz a retenção: o corpo só retém quando recebe pouco. Hidratação constante é a chave.",
      },
    ],
  },
  {
    id: "casal-comunicacao",
    category: "casal",
    emoji: "💞",
    title: "Comunicação em casal",
    description: "Como o ciclo influencia a relação a dois.",
    questions: [
      {
        q: "Qual fase tende a ser melhor para conversas difíceis?",
        options: ["Menstrual", "Folicular", "Lútea final (TPM)", "Tanto faz"],
        correctIndex: 1,
        explanation:
          "Na folicular, estrogênio em alta favorece fluência verbal e humor estável — ótimo para conversas que exigem clareza.",
      },
      {
        q: "Casais que conhecem a fase do ciclo um do outro relatam:",
        options: [
          "Mais brigas",
          "Nenhuma diferença",
          "~30% mais satisfação na comunicação durante a TPM",
          "Menos intimidade",
        ],
        correctIndex: 2,
        explanation:
          "Estudo de Mark et al. (2018): conhecer a fase aumenta empatia e reduz mal-entendidos durante a TPM.",
      },
      {
        q: "O pico natural de libido feminina costuma ocorrer:",
        options: [
          "Na menstruação",
          "2-3 dias antes da ovulação",
          "Apenas na fase lútea",
          "É sempre constante",
        ],
        correctIndex: 1,
        explanation:
          "Aumento de estrogênio e testosterona logo antes da ovulação eleva o desejo (Hormones and Behavior, 2013).",
      },
      {
        q: "Na fase menstrual, o que costuma ser mais bem-vindo?",
        options: [
          "Programas agitados",
          "Pressão para sair",
          "Acolhimento, calor e tempo de qualidade calmo",
          "Crítica construtiva",
        ],
        correctIndex: 2,
        explanation:
          "Energia mais baixa pede recolhimento. Bolsa quente, filme juntos e silêncio amoroso fazem milagre.",
      },
    ],
  },
  {
    id: "geral-mitos",
    category: "geral",
    emoji: "🧠",
    title: "Mitos & verdades",
    description: "Desfaça mitos comuns sobre menstruação.",
    questions: [
      {
        q: "É possível engravidar durante a menstruação?",
        options: [
          "Nunca",
          "Sim, em ciclos curtos, há possibilidade",
          "Apenas no último dia",
          "Só com tratamento",
        ],
        correctIndex: 1,
        explanation:
          "Em ciclos curtos (<24 dias), a ovulação pode acontecer logo após o fim da menstruação, e espermatozoides sobrevivem até 5 dias.",
      },
      {
        q: "Atividade física durante a menstruação:",
        options: [
          "Faz mal",
          "Deve ser evitada totalmente",
          "É segura e pode reduzir cólica",
          "Só pode caminhar",
        ],
        correctIndex: 2,
        explanation:
          "Exercício é seguro e libera endorfinas, ajudando a reduzir dor e melhorar humor. Escute seu corpo para ajustar a intensidade.",
      },
      {
        q: "Sangue menstrual é 'sangue sujo'?",
        options: [
          "Sim, por isso o corpo descarta",
          "Não — é endométrio + sangue, totalmente normal",
          "Só quando tem coágulos",
          "Depende do mês",
        ],
        correctIndex: 1,
        explanation:
          "É a descamação do endométrio com sangue. Não há nada de 'sujo' — é parte natural do ciclo de renovação do útero.",
      },
      {
        q: "Anticoncepcional 'guarda óvulos para depois'?",
        options: [
          "Sim",
          "Não — ele apenas suprime a ovulação enquanto é usado",
          "Apenas o injetável",
          "Só o de progesterona",
        ],
        correctIndex: 1,
        explanation:
          "A reserva ovariana diminui naturalmente com a idade. Pílula só impede a ovulação enquanto é tomada — não preserva óvulos.",
      },
    ],
  },
  {
    id: "geral-hormonios",
    category: "geral",
    emoji: "🌙",
    title: "Hormônios em ação",
    description: "Quem faz o quê no seu ciclo.",
    questions: [
      {
        q: "Qual hormônio é dominante na primeira metade do ciclo?",
        options: ["Progesterona", "Estrogênio", "Testosterona", "Cortisol"],
        correctIndex: 1,
        explanation:
          "O estrogênio sobe gradualmente da fase folicular até o pico antes da ovulação.",
      },
      {
        q: "Qual hormônio aumenta na segunda metade (fase lútea)?",
        options: ["Estrogênio", "Progesterona", "Insulina", "Adrenalina"],
        correctIndex: 1,
        explanation:
          "O corpo lúteo produz progesterona, que prepara o útero para uma possível gravidez.",
      },
      {
        q: "O que provoca o pico do hormônio LH?",
        options: [
          "A menstruação",
          "Disparar a ovulação",
          "Iniciar a TPM",
          "Reduzir a cólica",
        ],
        correctIndex: 1,
        explanation:
          "O pico de LH (luteinizante) acontece ~24-36h antes da ovulação e é o gatilho para liberar o óvulo.",
      },
      {
        q: "Por que a TPM piora nos últimos dias da fase lútea?",
        options: [
          "Pelo aumento de estrogênio",
          "Pela queda rápida de estrogênio e progesterona",
          "Por excesso de sono",
          "Por falta de exercício",
        ],
        correctIndex: 1,
        explanation:
          "Nos 5-7 dias finais, ambos os hormônios caem rápido — afeta serotonina, sono e humor. É química, não 'frescura'.",
      },
    ],
  },
];

/**
 * Quiz em destaque do dia (rotativo, igual em qualquer dispositivo no mesmo dia).
 */
export function quizOfTheDay(date = new Date()): Quiz {
  const key = date.toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return QUIZZES[hash % QUIZZES.length];
}

export function getQuiz(id: string): Quiz | undefined {
  return QUIZZES.find((q) => q.id === id);
}
