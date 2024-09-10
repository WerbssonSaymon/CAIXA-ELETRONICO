import React, { useEffect, useState } from "react";
import FormViewUser from "../../componentes/organisms/formViewUser";
import Subtitle from "../../componentes/atoms/subtitle";
import Menu from "../../componentes/organisms/menu";
import ViewUsers from "../../componentes/molecules/viewUsers";

export default function gestao() {
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    setListaUsuarios(usuariosSalvos);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex flex-column align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
        <FormViewUser />

        <Subtitle subtitulo="Todos os usuarios cadastrados" />

        <ViewUsers
          listaUsuarios={listaUsuarios}
          setListaUsuarios={setListaUsuarios}
        />
      </div>
    </div>
  );
}
