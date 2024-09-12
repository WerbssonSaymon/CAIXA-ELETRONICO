import React from "react";
import Menu from "../../componentes/organisms/menu";
import Subtitle from '../../componentes/atoms/subtitle'
import FormViewQuests from "../../componentes/organisms/formViewQuests";
import ViewQuests from "../../componentes/molecules/viewQuests";
import { useState, useEffect } from "react";

export default function adminPergunta() {
  const [listaDePerguntas, setListaDePerguntas] = useState([]);

  useEffect(() => {
    const perguntasSalvas = JSON.parse(localStorage.getItem("perguntas")) || [];
    setListaDePerguntas(perguntasSalvas);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex flex-column align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
        
        <FormViewQuests 
        setListaDePerguntas={setListaDePerguntas} 
        />

        <Subtitle subtitulo="Todas as perguntas cadastradas"/>

        <ViewQuests
          listaDePerguntas={listaDePerguntas}
          setListaDePerguntas={setListaDePerguntas}
        />
      </div>
    </div>
  );
}
