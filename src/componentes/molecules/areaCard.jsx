import React from "react";
import Cards from '../atoms/cards'

export default function areaCard({
  alternativasEmbaralhadas,
  perguntasSelecionadas,
  perguntaAtual,
  embaralharPerguntas,
  setAlternativasEmbaralhadas,
  setBotaoCartas,
  setCartas,
  eliminarAlternativas,
}) {
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      <Cards
        label="Escolha uma carta"
        onChange={(e) =>
          eliminarAlternativas(
            e.target.value,
            alternativasEmbaralhadas,
            perguntasSelecionadas,
            perguntaAtual,
            embaralharPerguntas,
            setAlternativasEmbaralhadas,
            setBotaoCartas
          )
        }
      />
      <button
        className="w-100 mt-1 mb-3 btn btn-danger text-white flex-grow-1"
        onClick={() => setCartas(false)}
      >
        X
      </button>
    </div>
  );
}
