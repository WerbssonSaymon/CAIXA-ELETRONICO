import React from 'react'
import ViewUserItem from './viewUserItem'

export default function viewUsers({listaUsuarios, setListaUsuarios}) {
  return (
    <div className="table-responsive w-75" style={{ height: "600px", overflow: "scroll" }}>
      <table className="table table-striped" >
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Saldo</th>
            <th className='text-end'>Deleção</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map((u, i) => (
            <ViewUserItem
              key={i}
              usuario={u}
              listaUsuarios={listaUsuarios}
              setListaUsuarios={setListaUsuarios}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
