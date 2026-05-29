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
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 mt-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">❤️</span>
        <h3 className="text-2xl font-semibold text-pink-700">Quiz do Casal</h3>
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
                        ? "bg-pink-500 text-white"
                        : "bg-pink-50 hover:bg-pink-100 text-gray-700"
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
          <p className="text-2xl font-medium text-pink-700 mb-3">
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
