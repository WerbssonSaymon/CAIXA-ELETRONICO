import React from "react";
import Label from "../atoms/label";

export default function areaPoints({ valores, perguntaAtual }) {
  return (
    <div className="d-flex flex-column justify-content-around">
      <Label text="Errar" cor="white" />
      <span className="bg-warning p-2 fs-4 text-white fw-semibold shadow-sm rounded">
        {valores.errar[perguntaAtual].toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) || 0}
      </span>
      <Label text="Acertar" cor="white" />
      <span className="bg-warning p-2 fs-4 text-white fw-semibold shadow-sm rounded">
        {valores.acertar[perguntaAtual].toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) || 0}
      </span>
      <Label text="Se parar" cor="white" />
      <span className="bg-warning p-2 fs-4 text-white fw-semibold shadow-sm rounded">
        {valores.parar[perguntaAtual].toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        }) || 0}
      </span>
    </div>
  );
}
