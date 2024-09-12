import React, { useState } from "react";
import Label from "../atoms/label";
import Input from "../atoms/input";
import ButtonAction from "../atoms/buttonAction";
import {
  coletarAlternativas,
  cadastrarPergunta,
  cancelarPergunta,
} from "../../services/perguntaService";
import { Link } from "react-router-dom";

export default function formQuest({ setListaDePerguntas }) {
  const [pergunta, setPergunta] = useState("");
  const [alternativas, setAlternativas] = useState(["", "", "", ""]);
  const [resposta, setResposta] = useState("");
  const [dificuldade, setDificuldade] = useState("");
  const [categoria, setCategoria] = useState("");

  return (
    <form className="row g-3">
      <div className="col-md-6">
        <Label text="Digite sua pergunta" />
        <Input
          type="text"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
        />

        <Label text="Digite a reposta"></Label>
        <Input
          type="text"
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
        />

        <Label text="Escolha a dificuldade:"></Label>
        <select
          className="form-select form-select-lg border border-primary"
          value={dificuldade}
          onChange={(e) => setDificuldade(e.target.value)}
        >
          <option value="">Selecione</option>
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>

        <Label text="Digite a categoria"></Label>
        <Input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>

      <div className="col-md-6">
        {alternativas.map((alt, index) => (
          <div key={index}>
            <Label text="Alternativa "> {index + 1}:</Label>
            <Input
              type="text"
              value={alt}
              onChange={(e) =>
                coletarAlternativas(
                  index,
                  e.target.value,
                  alternativas,
                  setAlternativas
                )
              }
            />
          </div>
        ))}
      </div>

      <div className="col-md-12 d-flex align-items-center">
        <div className="d-flex align-items-stad-flex align-items-start w-100 justify-content-between">
          <div className="d-flex">
            <ButtonAction
              cor="success"
              label="Confirmar"
              onClick={() =>
                cadastrarPergunta(
                  pergunta,
                  alternativas,
                  resposta,
                  dificuldade,
                  categoria,
                  setListaDePerguntas,
                  setPergunta,
                  setAlternativas,
                  setResposta,
                  setDificuldade,
                  setCategoria
                )
              }
            />
            <ButtonAction
              cor="danger"
              label="Cancelar"
              onClick={() =>
                cancelarPergunta(
                  setPergunta,
                  setAlternativas,
                  setResposta,
                  setDificuldade,
                  setCategoria
                )
              }
            />
          </div>
          <div className="d-flex">
            <Link to={`/usuarios`}>
              <ButtonAction label="Voltar" cor="outline-success" />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
