import { useState } from "react";

const perguntas = [
  "Como você acha que ela está se sentindo hoje?",
  "Qual gesto seu ajudaria mais agora?",
  "Qual linguagem do amor ela mais precisa hoje?",
];

const opcoes = [
  ["😊 Feliz", "🥱 Cansada", "😣 Irritada", "🤗 Quer colo", "😌 Tranquila"],
  [
    "Mandar mensagem carinhosa",
    "Fazer um café/chá",
    "Dar um abraço longo",
    "Cozinhar algo gostoso",
    "Deixar ela quietinha",
  ],
  ["Palavras de afirmação", "Tempo de qualidade", "Presentes", "Atos de serviço", "Toque físico"],
];

export default function QuizCasal() {
  const [respostas, setRespostas] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const responder = (perguntaIndex: number, opcaoIndex: number) => {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaIndex] = opcaoIndex;
    setRespostas(novasRespostas);

    if (novasRespostas.length === perguntas.length) {
      setMostrarResultado(true);
    }
  };

  return (
    <div className="rounded-3xl p-6 shadow-sm border border-border/60 mt-6 bg-card/80">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">❤️</span>
        <h3 className="text-2xl font-semibold text-primary">Quiz do Casal</h3>
      </div>

      <p className="text-gray-600 mb-6">Responda como você acha que ela está se sentindo hoje</p>

      {!mostrarResultado ? (
        <div className="space-y-8">
          {perguntas.map((pergunta, index) => (
            <div key={index} className="space-y-3">
              <p className="font-medium text-gray-800">{pergunta}</p>
              <div className="grid gap-2">
                {opcoes[index].map((opcao, i) => (
                  <button
                    key={i}
                    onClick={() => responder(index, i)}
                    className={`w-full p-4 rounded-2xl text-left transition-all ${
                      respostas[index] === i
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/50 hover:bg-card/80 text-muted-foreground"
                    }`}
                  >
                    {opcao}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❤️</div>
          <p className="text-2xl font-medium text-primary mb-3">
            Obrigado por tentar entender ela melhor!
          </p>
          <p className="text-gray-600 max-w-xs mx-auto">
            Isso já faz uma diferença enorme no relacionamento de vocês dois.
          </p>
        </div>
      )}
    </div>
  );
}
