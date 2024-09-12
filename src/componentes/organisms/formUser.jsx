import React from "react";
import Title from "./../atoms/title";
import Minititle from "./../atoms/minititle";
import Input from "./../atoms/input";
import Label from "./../atoms/label";
import ButtonAction from "./../atoms/buttonAction";
import LinksTextForm from "../molecules/linksTextForm";
import { Link } from "react-router-dom";
import { cancelarUsuario } from "../../services/usuarioService";

export default function formUser({
  nome,
  setNome,
  listaUsuarios,
  setListaUsuarios,
  cadastrarUsuario,
}) {
  return (
    <div className="row bg-body py-5 col-4 shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="container-fluid ">
        <div className="row p-3">
          <i className="fa-regular fa-user text-center fs-1 mb-2"></i>
          <Title titulo="Bem vindo" />
          <Minititle texto="Cadastre-se para usar nossas funcionalidades" />
        </div>
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-8 gap-1">
            <Label text="Digite seu nome" />
            <Input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <LinksTextForm
              texto="Lembrar de mim?"
              paragrafo="Esqueceu sua senha?"
            />
            <div className="d-flex align-items-stad-flex align-items-start w-100 justify-content-between">
              <div className="d-flex">
                <ButtonAction
                  label="Confirmar"
                  cor="success"
                  onClick={() =>
                    cadastrarUsuario(
                      listaUsuarios,
                      nome,
                      setListaUsuarios,
                      setNome
                    )
                  }
                />
                <ButtonAction
                  label="Cancelar"
                  cor="danger"
                  onClick={() => cancelarUsuario(setNome)}
                />
              </div>
              <div className="d-flex">
                <Link to={`/usuarios`}>
                  <ButtonAction label="Voltar" cor="outline-success" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
