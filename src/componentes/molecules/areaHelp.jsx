import React from "react";
import ButtonHelp from "../atoms/buttonHelp";

export default function areaHelp({
    cliques,
  perguntasSelecionadas,
  perguntaAtual,
  obterPerguntaNaoUsada,
  embaralharPerguntas,
  setAlternativasEmbaralhadas,
  setPerguntasSelecionadas,
  setCliques,
  botaoCartas,
  cartas,
  setCartas,
  botaoGrafico,
  grafico,
  setGrafico,
  setBotaoGrafico,
  mostrarCartas,
  pularPergunta,
  mostrarGrafico
}) {
  return (
    <div className="col-md-12 my-2">
      <ButtonHelp
        label="Pular"
        botaoEstado={cliques >= 3}
        onClick={() =>
          pularPergunta(
            perguntasSelecionadas,
            perguntaAtual,
            obterPerguntaNaoUsada,
            embaralharPerguntas,
            setAlternativasEmbaralhadas,
            setPerguntasSelecionadas,
            setCliques
          )
        }
      />
      <ButtonHelp
        label="Cartas"
        botaoEstado={botaoCartas >= 1}
        onClick={() => mostrarCartas(cartas, setCartas)}
      />
      <ButtonHelp
        label="Universitário"
        botaoEstado={botaoGrafico}
        onClick={() => mostrarGrafico(grafico, setGrafico, setBotaoGrafico)}
      />
    </div>
  );
}
