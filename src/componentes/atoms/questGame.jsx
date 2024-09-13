import React from "react";

export default function questGame({perguntasSelecionadas, perguntaAtual}) {
  return (
    <div className="bg-game col-md-12 p-3">
      <h2 className="text-white text-uppercase">
        {perguntasSelecionadas[perguntaAtual].pergunta}
      </h2>
    </div>
  );
}
