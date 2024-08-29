import React from "react";
import Menu from "../../layout/menu";
import Title from "../../componentes/title";
import { limparPerguntas, removerPergunta } from "../../services/adminPergunta";
import { useState, useEffect } from "react";

export default function adminPergunta() {
  const [listaDePerguntas, setListaDePerguntas] = useState([]);

  useEffect(() => {
    const perguntasSalvas = JSON.parse(localStorage.getItem("perguntas")) || [];
    setListaDePerguntas(perguntasSalvas);
  }, []);

  console.log(localStorage.getItem("perguntas"));

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex flex-column justify-content-center align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
        <Title titulo="Area de gerenciamento de perguntas" />

        <button
          className="btn btn-lg btn-danger mt-5 w-50 mb-5"
          onClick={limparPerguntas}
        >
          Apagar todas as perguntas
        </button>

        <h3 className="mb-3">Remoção de usuarios individual</h3>

        <ul className="list-group w-50">
          {listaDePerguntas.map((p, i) => (
            <li
              className="list-group-item d-flex justify-content-between align-items-stretch m-1"
              key={i}
            >
              <ul className="list-group ">
                <li className="list-group-item">{p.pergunta}</li>

                <div>
                    {p.alternativas.map((alt, index) => (
                    <span key={index}>
                        {" " + alt} 
                    </span>
                    ))}
                </div>

                <li className="list-group-item">{p.resposta}</li>
                <li className="list-group-item">{p.dificuldade}</li>
              </ul>

              <button
                className="btn btn-danger"
                onClick={() =>
                  removerPergunta(
                    p.pergunta,
                    listaDePerguntas,
                    setListaDePerguntas
                  )
                }
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
