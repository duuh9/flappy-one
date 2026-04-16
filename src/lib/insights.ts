// Insights científicos rotativos. Selecionado por hash do dia (sempre o mesmo no dia, varia entre dias).
export type Insight = {
  title: string;
  body: string;
  source: string;
  emoji: string;
};

export const INSIGHTS: Insight[] = [
  {
    title: "Sono e fase lútea",
    body: "Na fase lútea (segunda metade do ciclo), a temperatura corporal sobe ~0.3°C, o que pode prejudicar o sono profundo. Manter o quarto entre 18-20°C ajuda.",
    source: "Baker & Driver, Sleep Medicine Reviews, 2007",
    emoji: "🌙",
  },
  {
    title: "Estrogênio e memória verbal",
    body: "Estudos mostram que a fluência verbal tende a ser maior na fase folicular, quando o estrogênio sobe. Bom dia para conversas difíceis!",
    source: "Hampson, Hormones and Behavior, 1990",
    emoji: "💬",
  },
  {
    title: "Treinos pesados na fase folicular",
    body: "A fase folicular (após menstruação) favorece ganho de força. O corpo tolera melhor cargas altas e recupera mais rápido.",
    source: "Sims & Heather, Roar, 2016",
    emoji: "💪",
  },
  {
    title: "Cólica e magnésio",
    body: "Suplementação de magnésio (300mg/dia) reduziu a intensidade da cólica menstrual em ~40% em ensaios clínicos.",
    source: "Parazzini et al., Magnesium Research, 2017",
    emoji: "🌿",
  },
  {
    title: "TPM e ômega-3",
    body: "1g de ômega-3 por dia foi associado à redução significativa de sintomas emocionais da TPM em comparação ao placebo.",
    source: "Behboudi-Gandevani, Reprod Health, 2018",
    emoji: "🐟",
  },
  {
    title: "Ovulação e libido",
    body: "Há um pico natural de desejo nos 2-3 dias antes da ovulação, ligado ao aumento de testosterona e estrogênio.",
    source: "Roney & Simmons, Hormones and Behavior, 2013",
    emoji: "💗",
  },
  {
    title: "Chocolate amargo e humor",
    body: "70% cacau contém flavonoides que aumentam serotonina. Pequenas porções na TPM podem suavizar oscilações de humor.",
    source: "Scholey & Owen, Nutrition Reviews, 2013",
    emoji: "🍫",
  },
  {
    title: "Caminhada leve reduz cólica",
    body: "30 minutos de caminhada de intensidade leve durante a menstruação reduziu dor relatada em ~25% num ensaio com 70 mulheres.",
    source: "Dehnavi et al., BMC Women's Health, 2018",
    emoji: "🚶‍♀️",
  },
  {
    title: "Hidratação e inchaço",
    body: "Beber mais água, contraintuitivamente, reduz a retenção de líquidos. O corpo retém menos quando recebe oferta constante.",
    source: "Popkin et al., Nutrition Reviews, 2010",
    emoji: "💧",
  },
  {
    title: "Empatia e fase do parceiro",
    body: "Casais que conhecem a fase do ciclo um do outro relatam ~30% mais satisfação na comunicação durante a TPM.",
    source: "Mark et al., Journal of Sex Research, 2018",
    emoji: "🤝",
  },
];

export function insightOfTheDay(date = new Date()): Insight {
  const key = date.toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return INSIGHTS[hash % INSIGHTS.length];
}
