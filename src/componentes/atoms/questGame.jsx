import React from "react";

export default function questGame({perguntasSelecionadas, perguntaAtual}) {
  return (
    <div className="bg-game col-md-12 p-3">
      <h3 className="text-white text-uppercase">
        {perguntasSelecionadas[perguntaAtual].pergunta}
      </h3>
    </div>
  );
}
