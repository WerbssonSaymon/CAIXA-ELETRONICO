import React from "react";
import InterfaceCadastroUsuario from "../../componentes/templates/interfaceCadastroUsuario";
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
    <InterfaceCadastroUsuario
      listaUsuarios={listaUsuarios}
      setListaUsuarios={setListaUsuarios}
      nome={nome}
      setNome={setNome}
    />
  );
}
