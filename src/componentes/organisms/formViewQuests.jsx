import React from "react";
import ButtonAction from "./../atoms/buttonAction";
import Title from "./../atoms/title";
import {
  adicionarPerguntas,
  limparPerguntas,
} from "../../services/adminPergunta";

export default function formViewQuests({ setListaDePerguntas }) {
  return (
    <form className="p-1 mt-3 shadow p-3 mb-5 bg-body-tertiary rounded w-75">
      <div className="row g-1">
        <Title titulo="Gerenciamento de perguntas"/>
      </div>
      <div className="row g-1">
        <div className="col-md-12">
          <ButtonAction
            label="Adicionar perguntas"
            cor="success"
            onClick={() => adicionarPerguntas(setListaDePerguntas)}
          />
          <ButtonAction
            label="Deletar perguntas"
            cor="danger"
            onClick={limparPerguntas}
          />
        </div>
      </div>
    </form>
  );
}
