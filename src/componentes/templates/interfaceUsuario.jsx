import React from 'react'
import Menu from '../organisms/menu'
import FormViewUser from '../organisms/formViewUser'
import Subtitle from '../atoms/subtitle'
import ViewUsers from '../molecules/viewUsers'

export default function interfaceUsuario({ listaUsuarios, setListaUsuarios }) {
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
  )
}
