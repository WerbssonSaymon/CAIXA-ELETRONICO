import React from "react";
import Menu from "../../componentes/organisms/menu";
import FormUser from "../../componentes/organisms/formUser";
import { cadastrarUsuario, cancelarUsuario } from "../../services/usuarioService";

import { useState, useEffect } from "react";

export default function usuario() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [nome, setNome] = useState("");

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosSalvos) {
      setListaUsuarios(usuariosSalvos);
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex justify-content-center align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
        <FormUser
          nome={nome}
          setNome={setNome}
          listaUsuarios={listaUsuarios}
          setListaUsuarios={setListaUsuarios}
          cadastrarUsuario={cadastrarUsuario}
          cancelarUsuario={cancelarUsuario}
        />
      </div>
    </div>
  );
}
