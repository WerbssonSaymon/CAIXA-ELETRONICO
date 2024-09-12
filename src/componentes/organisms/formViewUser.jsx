import React from "react";
import Title from "./../atoms/title";
import ButtonAction from "./../atoms/buttonAction";
import { Link } from "react-router-dom";
import { limparUsuarios } from "../../services/cadastroUsuarioService";

export default function formViewUser() {
  return (
    <form className="p-1 mt-3 shadow p-3 mb-5 bg-body-tertiary rounded w-75">
      <div className="row g-1">
        <Title titulo="Gerenciamento de usuarios" />
      </div>
      <div className="row g-1">
        <div className="col-md-12">
          <div className="d-flex align-items-stad-flex align-items-start w-100 justify-content-between">
            <div className="d-flex">
              <Link to={`/cadastro-usuarios`}>
                <ButtonAction label="Cadastrar usuario" cor="success" />
              </Link>
            </div>
            <div className="d-flex">
              <ButtonAction
                label="Deletar todos os usuarios"
                cor="danger"
                onClick={limparUsuarios}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
