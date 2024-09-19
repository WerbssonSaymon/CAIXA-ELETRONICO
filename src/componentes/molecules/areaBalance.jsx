import React from "react";

export default function areaBalance({nome, pontuacao}) {
  return (
    <div className="d-flex justify-content-between">
      <h3 className="text-white">Participante: {nome}</h3>
      <span className="fs-4 text-white fw-semibold">
        {pontuacao.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </span>
    </div>
  );
}
