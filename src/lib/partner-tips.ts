import type { CyclePhase } from "./cycle";

/**
 * Dicas práticas para o parceiro, agrupadas por fase do ciclo dela.
 * Bibliotecas grandes para alimentar o botão "Atualizar dicas" (refresh).
 */
export const PARTNER_TIPS: Record<CyclePhase, string[]> = {
  menstrual: [
    "Ofereça uma bolsa de água quente sem ela pedir.",
    "Prepare um chá de camomila ou gengibre.",
    "Evite cobrar produtividade — energia está mais baixa.",
    "Um filme conhecido + cobertor + colo = perfeito.",
    "Massagem leve nas costas ajuda mais que conselho.",
    "Pergunte: 'Quer falar ou só ficar junto?'",
    "Antecipe a louça e o lixo sem comentar.",
    "Peça a comida favorita dela hoje.",
    "Evite frases como 'mas você sempre…' nesse período.",
    "Dê um abraço longo, sem agenda.",
    "Diminua a luz da casa à noite — ajuda no sono.",
  ],
  folicular: [
    "Ela está com mais energia! Proponha algo novo: trilha, restaurante diferente.",
    "Ótima fase para conversas profundas e planos a dois.",
    "Demonstre admiração pelas conquistas dela essa semana.",
    "Bom momento para resolver assuntos importantes — ela está mais clara.",
    "Convide para um treino juntos.",
    "Mande uma playlist nova que lembra ela.",
    "Aproveite para marcar aquele rolê que vocês adiaram.",
    "Pergunte sobre os sonhos profissionais dela — ela vai falar com brilho.",
    "Fase ideal para flertar de novo — sem pressa, com humor.",
  ],
  ovulacao: [
    "Libido em alta — invista em conexão física e elogios.",
    "Capriche no jantar, acenda uma vela.",
    "Mande uma mensagem inesperada no meio do dia.",
    "Elogie algo específico (não genérico): a risada, o cheiro, o jeito de explicar algo.",
    "Beije a testa antes de sair de casa.",
    "Tire uma foto dela — ela está radiante e merece registrar.",
    "Proponha uma noite a sós sem celular.",
    "Dance abraçado na cozinha por 30 segundos.",
  ],
  lutea: [
    "Sensibilidade aumentada. Escute mais, opine menos.",
    "Antecipe tarefas da casa para reduzir o estresse dela.",
    "Chocolate amargo + abraço longo fazem milagre.",
    "Evite críticas, mesmo que construtivas, hoje.",
    "Se ela chorar do nada, não tente resolver — só fique perto.",
    "Diga em voz alta: 'Tá tudo bem você não tá bem.'",
    "Mantenha o quarto fresco — ela dorme melhor (~18-20°C).",
    "Reduza convites sociais nessa semana se ela quiser ficar em casa.",
    "Um banho quente preparado por você vale mais que flores.",
    "Lembre que TPM não é frescura — é química real.",
  ],
};

/**
 * Conteúdo educativo e científico para a namorada, por fase.
 * Bibliotecas grandes para o botão "Atualizar dicas".
 */
export const HER_TIPS: Record<CyclePhase, string[]> = {
  menstrual: [
    "Permita-se descansar. É fase de recolhimento — não é preguiça.",
    "Ferro + vitamina C ajudam a repor energia perdida no fluxo.",
    "Caminhada leve reduz cólica em ~25% (estudo NIH 2018).",
    "Magnésio (300mg) à noite reduz cólica e melhora o sono.",
    "Calor local na barriga é tão eficaz quanto ibuprofeno em dores leves.",
    "Evite jejuns intermitentes longos nessa fase — o corpo precisa de glicose.",
    "Cólicas fortes que te impedem de levantar não são normais — vale investigar.",
    "Ômega-3 reduz inflamação e ajuda a cólica do mês seguinte.",
    "Sono é prioridade: você pode precisar de 30-60min a mais hoje.",
  ],
  folicular: [
    "Energia em alta — bom momento para treinos intensos e ganho de força.",
    "Foco e criatividade no pico. Aproveite para projetos importantes.",
    "Comunicação verbal favorecida pelo estrogênio — apresentações vão fluir.",
    "Pele mais bonita: o estrogênio aumenta colágeno e brilho natural.",
    "Memória aprende mais rápido — fase ótima para estudar coisa nova.",
    "Libido começa a subir — corpo se preparando para a ovulação.",
    "Sociabilidade em alta — marque encontros e reuniões importantes.",
    "Resistência cardio também aumenta — corra mais, pedale mais.",
  ],
  ovulacao: [
    "Pele e cabelo no auge — é só biologia, aproveite o brilho.",
    "Confiança aumentada: ótimo dia para apresentações e negociações.",
    "Hidrate-se mais que o normal — o corpo trabalha mais nessa fase.",
    "Libido no pico (estrogênio + testosterona). Conexão íntima favorecida.",
    "Pode sentir leve dor de um lado da barriga — é o folículo rompendo (mittelschmerz).",
    "Olfato e paladar mais aguçados — perfumes parecem mais fortes.",
    "Se evita gravidez, atenção redobrada: janela fértil é agora.",
  ],
  lutea: [
    "Pode rolar inchaço e oscilação de humor — é hormonal, não é você.",
    "Reduza cafeína e açúcar refinado nos últimos 5 dias.",
    "Magnésio (300mg) ajuda a prevenir cólica do mês seguinte.",
    "Temperatura corporal sobe ~0.3°C — ajuste o quarto pra dormir melhor.",
    "Chocolate amargo 70% (porção pequena) reduz a vontade de doce.",
    "Treinos mais leves e ioga ajudam mais que HIIT nessa fase.",
    "Vitamina B6 (25mg) reduz sintomas de TPM (estudo BMJ 1999).",
    "Sentimento de 'não dou conta' é comum e passa em poucos dias.",
    "Sono ruim agora é normal — durma 30min mais cedo se possível.",
  ],
};

/**
 * Recadinhos surpresa que ele pode mandar com 1 toque.
 */
export const SWEET_NOTES = [
  "Você é meu lugar favorito do mundo. 💗",
  "Mesmo nos dias difíceis, escolho você de novo.",
  "Obrigado por existir do meu lado.",
  "Sua risada é o som da minha casa.",
  "Te amo no folicular, te amo na TPM, te amo sempre.",
  "Você não precisa estar bem o tempo todo. Eu fico.",
  "Pequeno lembrete: você é incrível.",
  "Lembrei do seu cheiro agora e sorri sozinho.",
  "Tô com saudade mesmo te tendo aqui.",
  "Você é minha pessoa.",
  "Hoje pensei: que sorte a minha.",
  "Nada faz mais sentido que a gente.",
  "Quando você ri assim, o mundo melhora.",
  "Tô torcendo por você o dia inteiro.",
  "Você é abrigo.",
];

/**
 * Emojis de cutucada carinhosa ("Lembrei de você").
 */
export const NUDGE_EMOJIS = ["💗", "🌸", "✨", "🤗", "☕", "🌷"] as const;
