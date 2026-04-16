import type { CyclePhase } from "./cycle";

export const PARTNER_TIPS: Record<CyclePhase, string[]> = {
  menstrual: [
    "Ofereça uma bolsa de água quente sem ela pedir.",
    "Prepare um chá de camomila ou gengibre.",
    "Evite cobrar produtividade — energia está mais baixa.",
    "Um filme conhecido + cobertor + colo = perfeito.",
  ],
  folicular: [
    "Ela está com mais energia! Proponha algo novo: trilha, restaurante diferente.",
    "Ótima fase para conversas profundas e planos a dois.",
    "Demonstre admiração pelas conquistas dela essa semana.",
  ],
  ovulacao: [
    "Libido em alta — invista em conexão física e elogios.",
    "Capriche no jantar, acenda uma vela.",
    "Mande uma mensagem inesperada no meio do dia.",
  ],
  lutea: [
    "Sensibilidade aumentada. Escute mais, opine menos.",
    "Antecipe tarefas da casa para reduzir o estresse dela.",
    "Chocolate amargo + abraço longo fazem milagre.",
    "Evite críticas, mesmo que construtivas, hoje.",
  ],
};

export const HER_TIPS: Record<CyclePhase, string[]> = {
  menstrual: [
    "Permita-se descansar. É fase de recolhimento.",
    "Ferro + vitamina C ajudam a repor energia.",
    "Caminhada leve reduz cólica em ~25%.",
  ],
  folicular: [
    "Energia em alta — bom momento para treinos intensos.",
    "Foco e criatividade no pico. Aproveite para projetos.",
    "Comunicação verbal favorecida pelo estrogênio.",
  ],
  ovulacao: [
    "Pele e cabelo no auge — é só biologia.",
    "Confiança aumentada: bom dia para apresentações.",
    "Hidrate-se mais que o normal hoje.",
  ],
  lutea: [
    "Pode rolar inchaço e oscilação de humor — é hormonal, não você.",
    "Reduza cafeína e açúcar refinado.",
    "Magnésio (300mg) ajuda a prevenir cólica do mês seguinte.",
  ],
};

export const SWEET_NOTES = [
  "Você é meu lugar favorito do mundo. 💗",
  "Mesmo nos dias difíceis, escolho você de novo.",
  "Obrigado por existir do meu lado.",
  "Sua risada é o som da minha casa.",
  "Te amo no folicular, te amo na TPM, te amo sempre.",
  "Você não precisa estar bem o tempo todo. Eu fico.",
  "Pequeno lembrete: você é incrível.",
];
