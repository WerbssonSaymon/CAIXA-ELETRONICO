import React, { useEffect, useState } from 'react'
import Menu from '../../layout/menu'
import Title from '../../componentes/title'

export default function gestao() {

  const [listaUsuarios, setListaUsuarios] = useState([])
  
  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios')) || [];
    setListaUsuarios(usuariosSalvos);
  }, [])

  function removerUsuario(nomeUsuario){
    const novaListaUsuarios = listaUsuarios.filter(usuario => usuario.nome !== nomeUsuario)

    setListaUsuarios(novaListaUsuarios)
    localStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios))
  }

  function limparUsuarios(){
    localStorage.clear();
    window.location.reload(false);
  }
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Menu />
        <div className='bg-primary-tertiary d-flex flex-column justify-content-center align-items-center' style={{ flex: 1, width: "100vw" }}>
            <Title titulo="area de gerenciamento de usuarios"/>

            <button 
                className="btn btn-lg btn-danger mt-5 w-50 mb-5"
                onClick={limparUsuarios}>Apagar todos os usuarios
            </button>

            <h3 className='mb-3'>Remoção de usuarios individual</h3>

            <ul className='list-group w-50'>
                {listaUsuarios.map((u, i) => (
                <li className='list-group-item d-flex justify-content-between align-items-center' 
                    key={i}>
                    {u.nome}
                        <button 
                        className='btn btn-danger'
                        onClick={() => removerUsuario(u.nome)}>Remover
                        </button>
                </li>
            ))}
        </ul>
        </div>
    </div>
  )
}
