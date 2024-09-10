import React from 'react'
import Title from './../atoms/title'
import ButtonAction from './../atoms/buttonAction'
import { limparUsuarios } from '../../services/gestaoService'

export default function formViewUser() {
  return (
    <form className="p-1 mt-3 shadow p-3 mb-5 bg-body-tertiary rounded w-75">
      <div className="row g-1">
        <Title titulo="Gerenciamento de usuarios"/>
      </div>
      <div className="row g-1">
        <div className="col-md-12">
          <ButtonAction
            label="Deletar usuarios"
            cor="danger"
            onClick={limparUsuarios}
          />
        </div>
      </div>
    </form>
  )
}
