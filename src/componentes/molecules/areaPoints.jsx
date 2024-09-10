import React from 'react'

export default function areaPoints({ valores, perguntaAtual }) {
  return (
    <div className="d-flex justify-content-around">
      <span className="fs-4 text-white fw-semibold">
        Errar {valores.errar[perguntaAtual].toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) || 0}
      </span>
      <span className="fs-4 text-white fw-semibold">
        Acertar {valores.acertar[perguntaAtual].toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) || 0}
      </span>
      <span className="fs-4 text-white fw-semibold">
        Parar {valores.parar[perguntaAtual].toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) || 0}
      </span>
    </div>
  )
}
