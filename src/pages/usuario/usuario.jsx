import React, { useEffect, useState } from "react";
import InterfaceUsuario from "../../componentes/templates/interfaceUsuario";

export default function gestao() {
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    setListaUsuarios(usuariosSalvos);
  }, []);

  return (
    <InterfaceUsuario 
    listaUsuarios={listaUsuarios}
    setListaUsuarios={setListaUsuarios}/>
  );
}
