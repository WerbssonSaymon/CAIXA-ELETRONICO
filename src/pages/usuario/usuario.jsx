import React from 'react'
import Menu from '../../componentes/organisms/menu'
import { cadastrarUsuario } from '../../services/usuarioService';

import { useState, useEffect } from "react";

export default function usuario() {

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nome, setNome] = useState('');

    useEffect(() => {
        const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'));
            if (usuariosSalvos) {
                setListaUsuarios(usuariosSalvos);
            }
        }, []);
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Menu />
        <div className='bg-primary-tertiary d-flex justify-content-center align-items-center' style={{ flex: 1, width: "100vw" }}>
            
        <div className="row bg-body col-10">
            <div className="container-fluid ">
                <div className="row p-3">
                    <i className="fa-regular fa-user text-center fs-1 mb-2"></i>
                    <h3 className="fw-semibold text-center">Cadastre seu usuario</h3>
                </div>

                <div className="p-2 w-full d-grid">

                    <input
                    className="form-control border border-primary mt-5"
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />
                    <button
                    className="btn btn-lg btn-success" 
                    onClick={() => cadastrarUsuario(listaUsuarios, nome, setListaUsuarios, setNome)}>Confirmar
                    </button>

                </div>
                
            </div>
        </div>


        </div>
    </div>
  )
}
