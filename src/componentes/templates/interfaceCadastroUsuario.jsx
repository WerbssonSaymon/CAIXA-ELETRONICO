import React from 'react'
import Menu from '../organisms/menu'
import FormUser from '../organisms/formUser'
import { cadastrarUsuario, cancelarUsuario } from '../../services/usuarioService'

export default function interfaceCadastroUsuario({
    listaUsuarios,
    setListaUsuarios,
    nome,
    setNome
}) {
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
  )
}
