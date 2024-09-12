import React from "react";
import ButtonAction from "./../atoms/buttonAction";
import Title from "./../atoms/title";
import { Link } from "react-router-dom";
import {
  adicionarPerguntas,
  limparPerguntas,
} from "../../services/cadastroPerguntaService";

export default function formViewQuests({ setListaDePerguntas }) {
  return (
    <form className="p-1 mt-3 shadow p-3 mb-5 bg-body-tertiary rounded w-75">
      <div className="row g-1">
        <Title titulo="Gerenciamento de perguntas" />
      </div>
      <div className="row g-1">
        <div className="col-md-12">
          <div className="d-flex align-items-stad-flex align-items-start w-100 justify-content-between">
            <div className="d-flex">
              <Link to={`/cadastro-perguntas`}>
                <ButtonAction label="Cadastrar pergunta" cor="success" />
              </Link>
            </div>
            <div className="d-flex">
              <ButtonAction
                label="Restaurar todas as perguntas"
                cor="success"
                onClick={() => adicionarPerguntas(setListaDePerguntas)}
              />
              <ButtonAction
                label="Deletar todas as perguntas"
                cor="danger"
                onClick={limparPerguntas}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
