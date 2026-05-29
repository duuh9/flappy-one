/**
 * Biblioteca de quizzes educativos — 15 categorias, 100+ perguntas
 * Cada quiz tem 4-8 perguntas com explicação científica.
 */

export type QuizCategory = 
  | "ciclo" 
  | "sintomas" 
  | "casal" 
  | "geral"
  | "nutricao"
  | "exercicio"
  | "saude-mental"
  | "intimidade"
  | "historia"
  | "cultura"
  | "mitos"
  | "hormonios"
  | "gravidez"
  | "menopausa"
  | "autocuidado";

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
  nutricao: "Nutrição & alimentação",
  exercicio: "Exercício & movimento",
  "saude-mental": "Saúde mental",
  intimidade: "Intimidade & desejo",
  historia: "História & tabus",
  cultura: "Cultura & sociedade",
  mitos: "Mitos & verdades",
  hormonios: "Hormônios",
  gravidez: "Gravidez & fertilidade",
  menopausa: "Menopausa",
  autocuidado: "Autocuidado",
};

// ============================================================
// 15 CATEGORIAS — 105 PERGUNTAS NO TOTAL
// ============================================================

export const QUIZZES: Quiz[] = [
  // ═══════════════════════════════════════════════════════════
  // 1. FASES DO CICLO (7 perguntas)
  // ═══════════════════════════════════════════════════════════
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
        explanation: "A fase folicular tem aumento gradual do estrogênio, melhorando humor, memória verbal e disposição física.",
      },
      {
        q: "O pico de fertilidade acontece em qual fase?",
        options: ["Menstrual", "Folicular", "Ovulação", "Lútea"],
        correctIndex: 2,
        explanation: "A ovulação libera o óvulo e dura cerca de 12-24h, mas a janela fértil é maior pela sobrevida dos espermatozoides.",
      },
      {
        q: "Por que a temperatura corporal sobe na fase lútea?",
        options: ["Por causa do estrogênio", "Pela progesterona produzida pelo corpo lúteo", "Pelo cortisol", "Pela testosterona"],
        correctIndex: 1,
        explanation: "A progesterona, produzida após a ovulação, aumenta a temperatura basal em ~0.3°C — por isso o sono pode ficar mais leve.",
      },
      {
        q: "Quanto dura, em média, um ciclo menstrual?",
        options: ["14 dias", "21 dias", "28 dias", "40 dias"],
        correctIndex: 2,
        explanation: "A média é 28 dias, mas variações entre 21 e 35 dias também são totalmente normais.",
      },
      {
        q: "O que é o endométrio?",
        options: ["Camada muscular do útero", "Camada interna do útero que descama na menstruação", "Órgão que produz hormônios", "Outro nome para a trompa"],
        correctIndex: 1,
        explanation: "O endométrio é a camada interna do útero. Ele se constrói a cada ciclo e descama se não houver gravidez.",
      },
      {
        q: "Qual hormônio atinge o pico antes da ovulação?",
        options: ["Progesterona", "Estrogênio", "Testosterona", "Cortisol"],
        correctIndex: 1,
        explanation: "O estrogênio sobe até o pico pré-ovulatório, desencadeando o pico de LH que libera o óvulo.",
      },
      {
        q: "A fase menstrual costuma durar quantos dias?",
        options: ["1-2 dias", "3-7 dias", "10-14 dias", "15-20 dias"],
        correctIndex: 1,
        explanation: "A menstruação dura em média 3 a 7 dias. Ciclos muito curtos ou muito longos merecem atenção médica.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 2. SINTOMAS & BEM-ESTAR (7 perguntas)
  // ═══════════════════════════════════════════════════════════
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
        explanation: "Estudos mostram que 300mg/dia de magnésio reduzem significativamente a intensidade da cólica.",
      },
      {
        q: "Caminhada leve durante a menstruação...",
        options: ["Aumenta a cólica", "Não tem efeito", "Reduz a dor em ~25%", "Deve ser evitada"],
        correctIndex: 2,
        explanation: "30 minutos de caminhada leve durante a menstruação reduz a dor relatada em cerca de 25% (BMC Women's Health, 2018).",
      },
      {
        q: "A vontade de doce na fase lútea é causada principalmente por:",
        options: ["Falta de força de vontade", "Queda de serotonina e busca por carboidratos", "Excesso de água", "Falta de proteína"],
        correctIndex: 1,
        explanation: "A queda de estrogênio reduz serotonina, e o cérebro busca carboidratos rápidos para compensar. É bioquímica, não fraqueza.",
      },
      {
        q: "Qual hábito ajuda mais a reduzir o inchaço?",
        options: ["Beber menos água", "Beber mais água regularmente", "Comer mais sal", "Tomar diurético sempre"],
        correctIndex: 1,
        explanation: "Beber mais água reduz a retenção: o corpo só retém quando recebe pouco. Hidratação constante é a chave.",
      },
      {
        q: "A cólica menstrual é causada por:",
        options: ["Inflamação no útero", "Contrações do útero para expelir o endométrio", "Infecção bacteriana", "Deficiência de cálcio"],
        correctIndex: 1,
        explanation: "A prostaglandina causa contrações uterinas para expelir o endométrio. É um processo natural, mas pode ser doloroso.",
      },
      {
        q: "Qual alimento é rico em ferro e ajuda na menstruação?",
        options: ["Banana", "Espinafre", "Maçã", "Arroz branco"],
        correctIndex: 1,
        explanation: "O espinafre é rico em ferro heme e não-heme, ajudando a repor o ferro perdido durante a menstruação.",
      },
      {
        q: "O inchaço pré-menstrual (TPM) afeta cerca de:",
        options: ["10% das mulheres", "30% das mulheres", "75% das mulheres", "95% das mulheres"],
        correctIndex: 2,
        explanation: "Cerca de 75% das mulheres relatam algum sintoma de TPM, e 20-40% têm sintomas que atrapalham a rotina.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 3. PARA O CASAL (7 perguntas)
  // ═══════════════════════════════════════════════════════════
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
        explanation: "Na folicular, estrogênio em alta favorece fluência verbal e humor estável — ótimo para conversas que exigem clareza.",
      },
      {
        q: "Casais que conhecem a fase do ciclo um do outro relatam:",
        options: ["Mais brigas", "Nenhuma diferença", "~30% mais satisfação na comunicação durante a TPM", "Menos intimidade"],
        correctIndex: 2,
        explanation: "Estudo de Mark et al. (2018): conhecer a fase aumenta empatia e reduz mal-entendidos durante a TPM.",
      },
      {
        q: "O pico natural de libido feminina costuma ocorrer:",
        options: ["Na menstruação", "2-3 dias antes da ovulação", "Apenas na fase lútea", "É sempre constante"],
        correctIndex: 1,
        explanation: "Aumento de estrogênio e testosterona logo antes da ovulação eleva o desejo (Hormones and Behavior, 2013).",
      },
      {
        q: "Na fase menstrual, o que costuma ser mais bem-vindo?",
        options: ["Programas agitados", "Pressão para sair", "Acolhimento, calor e tempo de qualidade calmo", "Crítica construtiva"],
        correctIndex: 2,
        explanation: "Energia mais baixa pede recolhimento. Bolsa quente, filme juntos e silêncio amoroso fazem milagre.",
      },
      {
        q: "Durante a TPM, o parceiro ideal deve:",
        options: ["Dar espaço total e sumir", "Forçar conversa sobre sentimentos", "Oferecer suporte prático sem cobrar", "Dizer que é 'só hormonal'"],
        correctIndex: 2,
        explanation: "Suporte prático (fazer jantar, dar colo, não cobrar) é mais efetivo que palavras vazias ou minimização.",
      },
      {
        q: "A ovulação é o melhor momento para:",
        options: ["Discutir finanças", "Planejar uma viagem romântica", "Resolver conflitos antigos", "Fazer reforma em casa"],
        correctIndex: 1,
        explanation: "Na ovulação, a mulher tende a se sentir mais confiante, sociável e com maior desejo — momento ideal para romance.",
      },
      {
        q: "Qual atitude do parceiro mais ajuda durante a TPM?",
        options: ["Dizer 'já passa'", "Traz chocolate e não cobra nada em troca", "Sugerir 'ficar de boa' sozinha", "Comparar com outras mulheres"],
        correctIndex: 1,
        explanation: "Chocolate (magnésio + endorfina) + gesto carinhoso sem cobrança = combinação cientificamente aprovada para TPM.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 4. NUTRIÇÃO & ALIMENTAÇÃO (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "nutricao-ciclo",
    category: "nutricao",
    emoji: "🥗",
    title: "Nutrição ao longo do ciclo",
    description: "O que comer em cada fase para se sentir melhor.",
    questions: [
      {
        q: "Na fase menstrual, qual nutriente é mais importante repor?",
        options: ["Cálcio", "Ferro", "Vitamina D", "Ômega-3"],
        correctIndex: 1,
        explanation: "A perda de sangue menstrual reduz os estoques de ferro. Carnes, folhas escuras e legumes são essenciais.",
      },
      {
        q: "Qual alimento ajuda a reduzir cólicas por ser anti-inflamatório?",
        options: ["Leite integral", "Gengibre", "Pão branco", "Refrigerante"],
        correctIndex: 1,
        explanation: "O gengibre tem propriedades anti-inflamatórias e analgésicas naturais, reduzindo a intensidade das cólicas.",
      },
      {
        q: "Na fase lútea, é recomendado reduzir:",
        options: ["Frutas", "Cafeína e açúcar refinado", "Proteínas", "Legumes"],
        correctIndex: 1,
        explanation: "Cafeína e açúcar podem piorar irritabilidade, inchaço e oscilações de humor na fase lútea.",
      },
      {
        q: "Qual vitamina está ligada à redução de sintomas de TPM?",
        options: ["Vitamina A", "Vitamina B6", "Vitamina C", "Vitamina K"],
        correctIndex: 1,
        explanation: "A vitamina B6 ajuda na síntese de serotonina e pode reduzir irritabilidade e inchaço na TPM.",
      },
      {
        q: "O chocolate amargo ajuda na TPM porque contém:",
        options: ["Cafeína", "Magnésio", "Açúcar", "Sódio"],
        correctIndex: 1,
        explanation: "Chocolate 70%+ é rico em magnésio, que relaxa músculos e melhora humor — além de liberar endorfinas.",
      },
      {
        q: "Na ovulação, o corpo precisa de mais:",
        options: ["Carboidratos simples", "Proteínas de alta qualidade", "Gorduras trans", "Alimentos processados"],
        correctIndex: 1,
        explanation: "Na ovulação, o metabolismo está acelerado e a proteína ajuda na recuperação muscular e produção hormonal.",
      },
      {
        q: "Qual bebida é mais recomendada durante toda a menstruação?",
        options: ["Café forte", "Chá de camomila", "Refrigerante diet", "Energético"],
        correctIndex: 1,
        explanation: "Camomila tem efeito calmante e anti-inflamatório suave, ajudando no sono e no relaxamento uterino.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 5. EXERCÍCIO & MOVIMENTO (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "exercicio-ciclo",
    category: "exercicio",
    emoji: "🏃‍♀️",
    title: "Exercício e o ciclo",
    description: "Como se movimentar em cada fase para potencializar resultados.",
    questions: [
      {
        q: "Na fase folicular, o corpo responde melhor a:",
        options: ["Exercícios leves apenas", "Treinos de força e HIIT", "Yoga somente", "Não exercitar"],
        correctIndex: 1,
        explanation: "Com estrogênio alto, o corpo tem mais energia, recuperação rápida e tolerância a treinos intensos.",
      },
      {
        q: "Durante a menstruação, é seguro fazer exercício?",
        options: ["Não, deve evitar totalmente", "Sim, mas moderado conforme sensação", "Só caminhada", "Só alongamento"],
        correctIndex: 1,
        explanation: "Exercício é seguro e libera endorfinas que reduzem dor. O importante é respeitar os limites do corpo.",
      },
      {
        q: "Na fase lútea, qual exercício é mais indicado?",
        options: ["Crossfit intenso", "Pilates, yoga e caminhada", "Maratona", "Musculação pesada"],
        correctIndex: 1,
        explanation: "Na fase lútea, a temperatura corporal está mais alta e a energia menor — exercícios suaves são mais adequados.",
      },
      {
        q: "O exercício regular pode ajudar a regular o ciclo?",
        options: ["Não tem efeito", "Sim, mas excesso pode atrasar", "Só exercício intenso", "Apenas yoga"],
        correctIndex: 1,
        explanation: "Exercício moderado regulariza hormônios, mas excesso (especialmente com pouca gordura corporal) pode causar amenorreia.",
      },
      {
        q: "Qual é o melhor momento do ciclo para ganhar músculo?",
        options: ["Menstrual", "Folicular", "Ovulação", "Lútea"],
        correctIndex: 1,
        explanation: "Na folicular, os níveis de testosterona (sim, mulheres também têm) favorecem a hipertrofia muscular.",
      },
      {
        q: "A dor de cabeça pré-menstrual pode melhorar com:",
        options: ["Exercício vigoroso", "Alongamento e respiração", "Café em jejum", "Ignorar e esperar passar"],
        correctIndex: 1,
        explanation: "Alongamento, respiração diafragmática e movimentos suaves aumentam oxigenação e reduzem tensão muscular.",
      },
      {
        q: "Qual esporte NÃO é recomendado na menstruação intensa?",
        options: ["Natação", "Corrida leve", "Musculação moderada", "Salto em altura competitivo"],
        correctIndex: 3,
        explanation: "Impacto excessivo e esforço máximo podem aumentar fluxo e desconforto. Natação é segura com absorvente interno.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 6. SAÚDE MENTAL (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "saude-mental-ciclo",
    category: "saude-mental",
    emoji: "🧘‍♀️",
    title: "Saúde mental & ciclo",
    description: "Como as emoções mudam e como cuidar da mente.",
    questions: [
      {
        q: "A TPM pode piorar sintomas de ansiedade pré-existente?",
        options: ["Não, são coisas separadas", "Sim, a queda hormonal afeta neurotransmissores", "Só em mulheres acima de 40", "Apenas se não fizer exercício"],
        correctIndex: 1,
        explanation: "A queda de estrogênio e progesterona afeta serotonina e GABA, neurotransmissores que regulam humor e ansiedade.",
      },
      {
        q: "Qual prática ajuda a reduzir irritabilidade na TPM?",
        options: ["Ficar isolada", "Mindfulness e respiração lenta", "Café extra", "Redes sociais"],
        correctIndex: 1,
        explanation: "Mindfulness reduz atividade do eixo HPA (resposta ao estresse) e melhora regulação emocional na TPM.",
      },
      {
        q: "A depressão pós-menstrual existe?",
        options: ["Não, é mito", "Sim, transtorno disfórico pré-menstrual (TDPM)", "Só em quem já tem depressão", "É TPM normal"],
        correctIndex: 1,
        explanation: "O TDPM afeta 3-8% das mulheres e causa depressão severa, ansiedade extrema e fadiga — precisa de acompanhamento médico.",
      },
      {
        q: "O sono na fase lútea tende a:",
        options: ["Melhorar", "Ficar mais leve e fragmentado", "Não mudar", "Apenas aumentar duração"],
        correctIndex: 1,
        explanation: "A progesterona aumenta a temperatura corporal e pode fragmentar o sono REM, causando sonhos mais vívidos também.",
      },
      {
        q: "Qual atividade é mais benéfica para humor na fase menstrual?",
        options: ["Trabalho intenso", "Socialização leve e hobbies", "Competição", "Exposição a notícias negativas"],
        correctIndex: 1,
        explanation: "Atividades prazerosas e conexão social leve aumentam dopamina e oxitocina, compensando a queda hormonal.",
      },
      {
        q: "A meditação regular pode alterar a percepção da dor menstrual?",
        options: ["Não, é placebo", "Sim, reduz sensibilidade central à dor", "Só se for guiada", "Apenas em conjunto com remédio"],
        correctIndex: 1,
        explanation: "A meditação reduz a ativação da amígdala e modula a via descendente de inibição da dor — efeito real e mensurável.",
      },
      {
        q: "Qual é a melhor estratégia para 'brain fog' na TPM?",
        options: ["Cafeína excessiva", "Soneca de 20 min + hidratação", "Ficar acordada até tarde", "Multitarefa intensa"],
        correctIndex: 1,
        explanation: "Soneca curta (power nap) restaura alerta sem entrar em sono profundo. Hidratação melhora fluxo sanguíneo cerebral.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 7. INTIMIDADE & DESEJO (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "intimidade-ciclo",
    category: "intimidade",
    emoji: "💋",
    title: "Intimidade & desejo",
    description: "Como a libido muda e como aproveitar cada fase.",
    questions: [
      {
        q: "O desejo sexual feminino é mais intenso em qual fase?",
        options: ["Menstrual", "Folicular", "Pré-ovulação e ovulação", "Lútea"],
        correctIndex: 2,
        explanation: "O pico de estrogênio + testosterona pré-ovulatório aumenta libido, lubrificação e sensibilidade.",
      },
      {
        q: "Durante a menstruação, a intimidade é:",
        options: ["Perigosa", "Imprópria", "Segura e algumas mulheres relatam aumento de desejo", "Proibida"],
        correctIndex: 2,
        explanation: "É segura com proteção. Algumas mulheres relatam aumento de libido devido à queda de progesterona e fluxo sanguíneo pélvico.",
      },
      {
        q: "A secura vaginal pode ocorrer em qual fase?",
        options: ["Só na menopausa", "Na fase lútea tardia e menstrual", "Só na ovulação", "Nunca"],
        correctIndex: 1,
        explanation: "Na fase lútea tardia e menstrual, a queda de estrogênio reduz a lubrificação natural — uso de lubrificante ajuda.",
      },
      {
        q: "Orgasmos durante a menstruação podem:",
        options: ["Aumentar cólica", "Reduzir cólica por contrações uterinas", "Causar infecção", "Não ter efeito"],
        correctIndex: 1,
        explanation: "O orgasmo libera oxitocina e causa contrações uterinas que podem acelerar a saída do endométrio, reduzindo a dor.",
      },
      {
        q: "A fase lútea tende a deixar a mulher mais:",
        options: ["Disposta a aventuras", "Em busca de segurança e conexão emocional", "Indiferente", "Agressiva"],
        correctIndex: 1,
        explanation: "A progesterona tem efeito calmante e promove vínculo. A mulher tende a preferir intimidade emocional + física na fase lútea.",
      },
      {
        q: "Qual fase é ideal para experimentar coisas novas?",
        options: ["Menstrual", "Folicular", "Ovulação", "Lútea"],
        correctIndex: 2,
        explanation: "Na ovulação, a mulher está mais confiante, comunicativa e aberta a novas experiências — incluindo na intimidade.",
      },
      {
        q: "A queda de libido na TPM é causada por:",
        options: ["Falta de atração", "Queda de estrogênio + fadiga + inchaço", "Problemas no relacionamento", "Idade"],
        correctIndex: 1,
        explanation: "É principalmente bioquímica: queda de estrogênio reduz lubrificação, fadiga diminui energia e inchaço causa desconforto.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 8. HISTÓRIA & TABUS (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "historia-tabus",
    category: "historia",
    emoji: "📜",
    title: "História & tabus",
    description: "Como a menstruação foi vista ao longo da história.",
    questions: [
      {
        q: "Na Roma antiga, mulheres menstruadas eram consideradas:",
        options: ["Sagradas", "Impuras e capazes de estragar colheitas", "Médicas", "Guerreiras"],
        correctIndex: 1,
        explanation: "Plínio, o Velho escreveu que mulheres menstruadas podiam estragar colheitas, ferrugem em armas e matar abelhas.",
      },
      {
        q: "O primeiro absorvente descartável surgiu em:",
        options: ["1890", "1921", "1950", "1970"],
        correctIndex: 1,
        explanation: "Kimberly-Clark lançou o Kotex em 1921, feito de celulose remanescente da Primeira Guerra Mundial (curativos).",
      },
      {
        q: "Na Idade Média, a menstruação era associada a:",
        options: ["Fertilidade", "Pecado e impureza", "Magia positiva", "Cura"],
        correctIndex: 1,
        explanation: "A Igreja Católica medieval considerava a menstruação impura, e mulheres eram proibidas de comungar durante o período.",
      },
      {
        q: "O copo menstrual foi inventado em:",
        options: ["1930", "1960", "1987", "2000"],
        correctIndex: 2,
        explanation: "A primeira patente de copo menstrual foi em 1937 (Leona Chalmers), mas só popularizou nas décadas de 2010.",
      },
      {
        q: "Em algumas culturas indígenas brasileiras, a menstruação era:",
        options: ["Tabu", "Um rito de passagem celebrado", "Escondida", "Punição"],
        correctIndex: 1,
        explanation: "Em várias culturas indígenas, a primeira menstruação (menarca) é celebrada como transição para a vida adulta e fertilidade.",
      },
      {
        q: "A pílula anticoncepcional foi liberada nos EUA em:",
        options: ["1950", "1960", "1970", "1980"],
        correctIndex: 1,
        explanation: "A FDA aprovou a pílula em 1960, revolucionando a autonomia reprodutiva feminina nos EUA e depois no mundo.",
      },
      {
        q: "O termo 'histeria' vem da palavra grega para:",
        options: ["Loucura", "Útero (hystera)", "Sangue", "Emoção"],
        correctIndex: 1,
        explanation: "'Hystera' = útero em grego. A 'histeria' era atribuída a distúrbios do útero, um diagnóstico sexista usado por séculos.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 9. CULTURA & SOCIEDADE (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "cultura-sociedade",
    category: "cultura",
    emoji: "🌍",
    title: "Cultura & sociedade",
    description: "Como diferentes culturas lidam com a menstruação hoje.",
    questions: [
      {
        q: "No Japão, mulheres menstruadas tradicionalmente não podem:",
        options: ["Trabalhar", "Ser chef de sushi", "Dirigir", "Votar"],
        correctIndex: 1,
        explanation: "Ainda hoje, algumas sushiyas tradicionais proíbem mulheres de serem itamae (chef de sushi) por 'preconceito de impureza'.",
      },
      {
        q: "A 'menstrual leave' (licença menstrual) existe em:",
        options: ["Nenhum país", "Japão, Coreia do Sul, Indonésia, Zâmbia", "Apenas Europa", "Só empresas privadas"],
        correctIndex: 1,
        explanation: "Vários países asiáticos e africanos têm licença menstrual por lei, embora a cultura ainda estigmatize quem usa.",
      },
      {
        q: "O 'period poverty' (pobreza menstrual) afeta:",
        options: ["Só países pobres", "500 milhões de pessoas globalmente", "Apenas adolescentes", "Ninguém no Brasil"],
        correctIndex: 1,
        explanation: "Cerca de 500 milhões de pessoas não têm acesso a produtos menstruais adequados, incluindo mulheres em países desenvolvidos.",
      },
      {
        q: "No Brasil, a distribuição de absorventes em escolas é:",
        options: ["Lei federal desde 2020", "Decisão municipal/estadual", "Proibida", "Só em universidades"],
        correctIndex: 1,
        explanation: "Alguns estados e municípios aprovaram leis, mas não há legislação federal uniforme sobre distribuição em escolas.",
      },
      {
        q: "A taxa de tamponade em países ocidentais é de cerca de:",
        options: ["10%", "30%", "50-70%", "90%"],
        correctIndex: 2,
        explanation: "Cerca de 50-70% das mulheres em países ocidentais usam absorventes internos (tampons), mas o copo menstrual cresce.",
      },
      {
        q: "A cor do sangue menstrual em anúncios publicitários é:",
        options: ["Vermelho real", "Azul", "Verde", "Transparente"],
        correctIndex: 1,
        explanation: "Por décadas, anúncios usavam líquido azul para 'não ofender'. Só recentemente marcas começaram a usar vermelho real.",
      },
      {
        q: "O movimento 'free bleeding' defende:",
        options: ["Uso de produtos caros", "Menstruar sem produtos como protesto contra estigma", "Banimento da menstruação", "Cirurgia"],
        correctIndex: 1,
        explanation: "O free bleeding é um ativismo que desafia o estigma da menstruação, mostrando que sangue menstrual é natural e não sujo.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 10. MITOS & VERDADES (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "mitos-verdades",
    category: "mitos",
    emoji: "🧠",
    title: "Mitos & verdades",
    description: "Desfaça mitos comuns sobre menstruação.",
    questions: [
      {
        q: "É possível engravidar durante a menstruação?",
        options: ["Nunca", "Sim, em ciclos curtos, há possibilidade", "Apenas no último dia", "Só com tratamento"],
        correctIndex: 1,
        explanation: "Em ciclos curtos (<24 dias), a ovulação pode acontecer logo após o fim da menstruação, e espermatozoides sobrevivem até 5 dias.",
      },
      {
        q: "Atividade física durante a menstruação:",
        options: ["Faz mal", "Deve ser evitada totalmente", "É segura e pode reduzir cólica", "Só pode caminhar"],
        correctIndex: 2,
        explanation: "Exercício é seguro e libera endorfinas, ajudando a reduzir dor e melhorar humor. Escute seu corpo para ajustar a intensidade.",
      },
      {
        q: "Sangue menstrual é 'sangue sujo'?",
        options: ["Sim, por isso o corpo descarta", "Não — é endométrio + sangue, totalmente normal", "Só quando tem coágulos", "Depende do mês"],
        correctIndex: 1,
        explanation: "É a descamação do endométrio com sangue. Não há nada de 'sujo' — é parte natural do ciclo de renovação do útero.",
      },
      {
        q: "Anticoncepcional 'guarda óvulos para depois'?",
        options: ["Sim", "Não — ele apenas suprime a ovulação enquanto é usado", "Apenas o injetável", "Só o de progesterona"],
        correctIndex: 1,
        explanation: "A reserva ovariana diminui naturalmente com a idade. Pílula só impede a ovulação enquanto é tomada — não preserva óvulos.",
      },
      {
        q: "Dormir de calcinha apertada causa infecção?",
        options: ["Sim, sempre", "Não, mas roupa muito apertada e sintética pode aumentar umidade", "Só se for de algodão", "Nunca"],
        correctIndex: 1,
        explanation: "A umidade excessiva e falta de ventilação podem alterar o pH vaginal. Algodão solto é ideal, mas não é garantia de infecção.",
      },
      {
        q: "A menstruação sincroniza entre mulheres que convivem?",
        options: ["Sim, comprovado cientificamente", "Não — é coincidência estatística", "Só irmãs", "Só em grupos de 3+"],
        correctIndex: 1,
        explanation: "O 'efeito McClintock' nunca foi replicado com rigor. Ciclos variam e coincidências são estatisticamente esperadas.",
      },
      {
        q: "Banho de mar/piscina durante menstruação:",
        options: ["Atrai tubarões", "É seguro com absorvente interno", "Causa infecção garantida", "Deve ser evitado sempre"],
        correctIndex: 1,
        explanation: "É seguro nadar durante a menstruação com absorvente interno ou copo menstrual. O sangue não atrai tubarões — isso é mito.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 11. HORMÔNIOS (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "hormonios-acao",
    category: "hormonios",
    emoji: "🌙",
    title: "Hormônios em ação",
    description: "Quem faz o quê no seu ciclo.",
    questions: [
      {
        q: "Qual hormônio é dominante na primeira metade do ciclo?",
        options: ["Progesterona", "Estrogênio", "Testosterona", "Cortisol"],
        correctIndex: 1,
        explanation: "O estrogênio sobe gradualmente da fase folicular até o pico antes da ovulação.",
      },
      {
        q: "Qual hormônio aumenta na segunda metade (fase lútea)?",
        options: ["Estrogênio", "Progesterona", "Insulina", "Adrenalina"],
        correctIndex: 1,
        explanation: "O corpo lúteo produz progesterona, que prepara o útero para uma possível gravidez.",
      },
      {
        q: "O que provoca o pico do hormônio LH?",
        options: ["A menstruação", "Disparar a ovulação", "Iniciar a TPM", "Reduzir a cólica"],
        correctIndex: 1,
        explanation: "O pico de LH (luteinizante) acontece ~24-36h antes da ovulação e é o gatilho para liberar o óvulo.",
      },
      {
        q: "Por que a TPM piora nos últimos dias da fase lútea?",
        options: ["Pelo aumento de estrogênio", "Pela queda rápida de estrogênio e progesterona", "Por excesso de sono", "Por falta de exercício"],
        correctIndex: 1,
        explanation: "Nos 5-7 dias finais, ambos os hormônios caem rápido — afeta serotonina, sono e humor. É química, não 'frescura'.",
      },
      {
        q: "A testosterona nas mulheres é responsável por:",
        options: ["Nada", "Libido, energia e massa muscular", "Apenas voz grossa", "Crescimento de barba"],
        correctIndex: 1,
        explanation: "Mulheres produzem testosterona nas suprarrenais e ovários. Ela regula libido, energia e manutenção muscular.",
      },
      {
        q: "O hormônio FSH é produzido por:",
        options: ["Ovários", "Hipófise (glândula pituitária)", "Tireoide", "Útero"],
        correctIndex: 1,
        explanation: "A hipófise produz FSH (folículo estimulante) e LH, que controlam o ciclo ovariano. É o 'comando central' hormonal.",
      },
      {
        q: "A progesterona tem efeito:",
        options: ["Estimulante", "Sedativo e relaxante", "Nenhum", "Apenas na fertilidade"],
        correctIndex: 1,
        explanation: "A progesterona é conhecida como 'hormônio da calma'. Ela tem efeito GABAérgico, promovendo relaxamento e sono.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 12. GRAVIDEZ & FERTILIDADE (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "gravidez-fertilidade",
    category: "gravidez",
    emoji: "🤰",
    title: "Gravidez & fertilidade",
    description: "Como o ciclo se relaciona com fertilidade e gestação.",
    questions: [
      {
        q: "A janela fértil dura aproximadamente:",
        options: ["1 dia", "3 dias", "5-7 dias", "14 dias"],
        correctIndex: 2,
        explanation: "Espermatozoides sobrevivem 3-5 dias no trato reprodutivo feminino. Somado ao dia da ovulação, a janela é de ~5-7 dias.",
      },
      {
        q: "O teste de ovulação detecta:",
        options: ["Estrogênio", "Progesterona", "Pico de LH", "HCG"],
        correctIndex: 2,
        explanation: "Testes de ovulação medem o pico de LH urinário, que precede a ovulação em 24-36 horas.",
      },
      {
        q: "A temperatura basal sobe após:",
        options: ["A menstruação", "A ovulação", "A TPM", "O coito"],
        correctIndex: 1,
        explanation: "A progesterona pós-ovulatória eleva a temperatura basal em ~0.3-0.5°C — método usado para rastrear ovulação.",
      },
      {
        q: "Qual fator NÃO afeta a fertilidade feminina?",
        options: ["Idade", "Fumo", "Uso de celular no bolso", "Endometriose"],
        correctIndex: 2,
        explanation: "Radiação de celular não afeta fertilidade. Já idade (especialmente >35), fumo e endometriose reduzem significativamente.",
      },
      {
        q: "O muco cervical na ovulação fica:",
        options: ["Espesso e seco", "Claro, elástico e abundante (tipo clara de ovo)", "Amarelo", "Sangue"],
        correctIndex: 1,
        explanation: "O muco fértil na ovulação é claro, elástico e lubrificante — facilita a passagem dos espermatozoides.",
      },
      {
        q: "A primeira menstruação após o parto (lochiostasia) ocorre:",
        options: ["Imediatamente", "Em média 6-8 semanas", "Só após 1 ano", "Nunca se amamentar"],
        correctIndex: 1,
        explanation: "A lactância pode atrasar a menstruação (amenorreia de lactação), mas em média retorna em 6-8 semanas sem amamentação exclusiva.",
      },
      {
        q: "O 'período de esperma' (espermatogênese) dura:",
        options: ["1 dia", "24-48 horas", "74-90 dias", "1 ano"],
        correctIndex: 2,
        explanation: "A produção de espermatozoides leva ~74-90 dias. Mudanças de hábito (dieta, calor) levam meses para afetar a fertilidade.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 13. MENOPAUSA (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "menopausa-vida",
    category: "menopausa",
    emoji: "🦋",
    title: "Menopausa",
    description: "A transição e o que vem depois.",
    questions: [
      {
        q: "A menopausa é definida como:",
        options: ["Última menstruação", "12 meses sem menstruação", "Primeiro sintoma de calor", "Cirurgia de retirada de ovários"],
        correctIndex: 1,
        explanation: "Clinicamente, menopausa é confirmada após 12 meses consecutivos sem menstruação, geralmente aos 45-55 anos.",
      },
      {
        q: "Os fogachos (ondas de calor) afetam cerca de:",
        options: ["10% das mulheres", "30%", "75%", "100%"],
        correctIndex: 2,
        explanation: "Cerca de 75% das mulheres na menopausa experimentam fogachos, e 25% têm sintomas severos que afetam qualidade de vida.",
      },
      {
        q: "A reposição hormonal (TRH) é:",
        options: ["Perigosa para todas", "Segura para muitas mulheres quando bem indicada", "Só para mulheres jovens", "Proibida"],
        correctIndex: 1,
        explanation: "A TRH moderna, personalizada e bem monitorada, é segura e eficaz para muitas mulheres, especialmente nas 5-10 primeiras anos pós-menopausa.",
      },
      {
        q: "A menopausa precoce ocorre antes dos:",
        options: ["35", "40", "45", "50"],
        correctIndex: 1,
        explanation: "Menopausa precoce é antes dos 40 anos. Afeta ~1% das mulheres e requer acompanhamento especializado por riscos cardíacos e ósseos.",
      },
      {
        q: "O risco de osteoporose aumenta na menopausa porque:",
        options: ["A mulher come menos cálcio", "A queda de estrogênio acelera perda óssea", "Não faz exercício", "Genética apenas"],
        correctIndex: 1,
        explanation: "O estrogênio protege os ossos. Sua queda na menopausa acelera a reabsorção óssea, aumentando risco de fraturas.",
      },
      {
        q: "A libido na menopausa:",
        options: ["Sempre some", "Pode mudar, mas muitas mulheres mantêm desejo", "Aumenta", "Depende de remédio"],
        correctIndex: 1,
        explanation: "Embora a lubrificação diminua, muitas mulheres relatam libido estável ou até aumentada pela liberdade de não engravidar.",
      },
      {
        q: "Qual sintoma NÃO é típico da menopausa?",
        options: ["Fogachos", "Secura vaginal", "Aumento de energia", "Mudanças de humor"],
        correctIndex: 2,
        explanation: "A menopausa geralmente causa fadiga e cansaço, não aumento de energia. Fogachos, secura e mudanças de humor são comuns.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 14. AUTOCUIDADO (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "autocuidado-diario",
    category: "autocuidado",
    emoji: "🛁",
    title: "Autocuidado",
    description: "Pequenas práticas que fazem grande diferença.",
    questions: [
      {
        q: "Qual é a frequência ideal de troca de absorvente?",
        options: ["A cada 12h", "A cada 4-6h", "Só quando estiver cheio", "Uma vez por dia"],
        correctIndex: 1,
        explanation: "Trocar a cada 4-6h previne proliferação bacteriana, odor e risco de Síndrome do Choque Tóxico (TSS), embora rara.",
      },
      {
        q: "O copo menstrual pode ser usado por:",
        options: ["4h", "8h", "Até 12h", "24h"],
        correctIndex: 2,
        explanation: "O copo menstrual pode ficar até 12h, mas é recomendado esvaziar a cada 4-8h para higiene e conforto.",
      },
      {
        q: "Qual óleo essencial é mais indicado para massagem na TPM?",
        options: ["Menta", "Lavanda", "Alecrim", "Eucalipto"],
        correctIndex: 1,
        explanation: "Lavanda tem propriedades analgésicas e calmantes comprovadas, reduzindo ansiedade e tensão muscular na TPM.",
      },
      {
        q: "A bolsa de água quente alivia cólica porque:",
        options: ["Distraí", "Aumenta fluxo sanguíneo e relaxa músculos uterinos", "É placebo", "Queima nervos"],
        correctIndex: 1,
        explanation: "O calor aumenta a circulação sanguínea na região pélvica e relaxa as contrações uterinas, reduzindo a dor efetivamente.",
      },
      {
        q: "Qual é o melhor momento para fazer o exame de toque?",
        options: ["Durante a menstruação", "Na fase folicular (após menstruação)", "Na ovulação", "Na TPM"],
        correctIndex: 1,
        explanation: "Na fase folicular, os seios estão menos sensíveis e o endométrio mais fino, facilitando a avaliação clínica.",
      },
      {
        q: "O diário do ciclo ajuda a:",
        options: ["Nada", "Identificar padrões e prevenir problemas", "Só lembrar da menstruação", "Diagnosticar doenças sozinho"],
        correctIndex: 1,
        explanation: "Registrar sintomas, humor e fluxo ajuda a identificar padrões, prever TPM e levar informações precisas ao médico.",
      },
      {
        q: "Qual hábito NOTURNO ajuda no sono durante a TPM?",
        options: ["Café às 20h", "Celular na cama", "Chá de camomila 1h antes de dormir", "Exercício vigoroso à noite"],
        correctIndex: 2,
        explanation: "Camomila tem efeito sedativo leve. Evitar cafeína, luz azul e exercício intenso 2-3h antes de dormir também ajuda.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // 15. CONHECIMENTO GERAL (7 perguntas)
  // ═══════════════════════════════════════════════════════════
  {
    id: "geral-curiosidades",
    category: "geral",
    emoji: "🌟",
    title: "Curiosidades gerais",
    description: "Fatos surpreendentes sobre o corpo feminino.",
    questions: [
      {
        q: "Uma mulher menstrua em média quantas vezes na vida?",
        options: ["100", "250", "450-500", "1000"],
        correctIndex: 2,
        explanation: "Uma mulher menstrua ~450-500 vezes na vida. Antigamente era menos (mais gestações e amamentação).",
      },
      {
        q: "O útero pode expandir até quantas vezes seu tamanho original na gravidez?",
        options: ["2x", "5x", "500x", "1000x"],
        correctIndex: 2,
        explanation: "O útero passa de ~7cm para ~35cm no final da gravidez — expansão de ~500 vezes o volume original.",
      },
      {
        q: "Qual animal tem ciclo menstrual mais parecido com o humano?",
        options: ["Cachorro", "Gato", "Chimpanzé", "Cavalo"],
        correctIndex: 2,
        explanation: "Chimpanzés e algumas espécies de macacos têm ciclos menstruais de ~28-35 dias, similares aos humanos.",
      },
      {
        q: "A primeira menstruação (menarca) no Brasil ocorre em média aos:",
        options: ["9 anos", "12-13 anos", "15 anos", "17 anos"],
        correctIndex: 1,
        explanation: "A média brasileira é 12-13 anos, mas varia. Fatores como nutrição, peso e genética influenciam o timing.",
      },
      {
        q: "Qual é o único órgão que se reconstrói completamente a cada mês?",
        options: ["Pele", "Fígado", "Endométrio", "Intestino"],
        correctIndex: 2,
        explanation: "O endométrio é o único tecido humano que se desmonta e reconstrói completamente a cada ciclo menstrual.",
      },
      {
        q: "O sangue menstrual perdido por ciclo é em média:",
        options: ["5ml", "30-80ml", "200ml", "500ml"],
        correctIndex: 1,
        explanation: "A perda média é 30-80ml por ciclo. Mais de 80ml é considerada menorragia e merece investigação médica.",
      },
      {
        q: "A ovulação ocorre em qual ovário?",
        options: ["Sempre no direito", "Sempre no esquerdo", "Alterna a cada ciclo (geralmente)", "Só um funciona"],
        correctIndex: 2,
        explanation: "Geralmente alterna a cada ciclo (ovulação alternada), mas não é regra absoluta — variações são normais.",
      },
    ],
  },
];

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

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

export function getQuizzesByCategory(category: QuizCategory): Quiz[] {
  return QUIZZES.filter((q) => q.category === category);
}

export function getTotalQuestions(): number {
  return QUIZZES.reduce((total, quiz) => total + quiz.questions.length, 0);
}

export function getTotalQuizzes(): number {
  return QUIZZES.length;
}