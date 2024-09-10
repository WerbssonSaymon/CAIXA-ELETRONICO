import {perguntas} from '../data/quests'

export function removerPergunta(
  perguntaSelecionada,
  listaDePerguntas,
  setListaDePerguntas
) {
  const novaListaDePerguntas = listaDePerguntas.filter(
    (p) => p.pergunta !== perguntaSelecionada
  );

  setListaDePerguntas(novaListaDePerguntas);
  localStorage.setItem("perguntas", JSON.stringify(novaListaDePerguntas));
}

export function limparPerguntas() {
  localStorage.removeItem("perguntas");
  window.location.reload(false);
}

export function adicionarPerguntas(
    setListaDePerguntas
) {
  const perguntasSalvas = JSON.parse(localStorage.getItem("perguntas")) || [];
  const perguntasAtualizadas = [...perguntasSalvas, ...perguntas];

  localStorage.setItem("perguntas", JSON.stringify(perguntasAtualizadas));

  setListaDePerguntas(perguntasAtualizadas);
}
