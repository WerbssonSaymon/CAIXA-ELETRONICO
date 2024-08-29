export function coletarAlternativas(
  index,
  value,
  alternativas,
  setAlternativas
) {
  const todasAsAlternativas = [...alternativas];
  todasAsAlternativas[index] = value;
  setAlternativas(todasAsAlternativas);
}

export function cadastrarPergunta(
  pergunta,
  alternativas,
  resposta,
  dificuldade,
  listaDePerguntas,
  setListaDePerguntas,
  setPergunta,
  setAlternativas,
  setResposta,
  setDificuldade
) {
  const novaPergunta = {
    pergunta,
    alternativas,
    resposta,
    dificuldade,
  };

  const perguntasExistentes = JSON.parse(localStorage.getItem('perguntas')) || [];

  const novaListaDePerguntas = [...perguntasExistentes, novaPergunta];

  localStorage.setItem('perguntas', JSON.stringify(novaListaDePerguntas));
  
  setListaDePerguntas(novaListaDePerguntas);

  setPergunta("");
  setAlternativas(["", "", "", ""]);
  setResposta("");
  setDificuldade("");
}
