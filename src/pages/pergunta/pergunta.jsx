import React from "react";
import InterfacePergunta from "../../componentes/templates/interfacePergunta";
import { useState, useEffect } from "react";

export default function adminPergunta() {
  const [listaDePerguntas, setListaDePerguntas] = useState([]);

  useEffect(() => {
    const perguntasSalvas = JSON.parse(localStorage.getItem("perguntas")) || [];
    setListaDePerguntas(perguntasSalvas);
  }, []);

  return (
    <InterfacePergunta
      listaDePerguntas={listaDePerguntas}
      setListaDePerguntas={setListaDePerguntas}
    />
  );
}
