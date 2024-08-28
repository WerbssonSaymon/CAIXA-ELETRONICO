import React from 'react'
import Menu from '../../layout/menu'

import { useState, useEffect } from "react";

export default function usuario() {

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');

    useEffect(() => {
        const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'));
            if (usuariosSalvos) {
                setListaUsuarios(usuariosSalvos);
            }
        }, []);

  // Cadastra, valida, inseri primeira transação e renderiza pelo usuario selecionado
  function cadastrarUsuario() {
    const usuarioIgual = listaUsuarios.find(usuario => usuario.nome.toLowerCase() === nome.toLowerCase());

    if (usuarioIgual) {
      alert('Já existe um usuário com esse nome.');
      setNome('');
      return;
    }

    if (nome === '') {
      alert('Por favor, defina um nome');
      setNome('');
      return;
    }

    const novoUsuario = {
      nome: nome,
    };

    const novaListaUsuarios = [...listaUsuarios, novoUsuario];
    setListaUsuarios(novaListaUsuarios);
    setNome('');


    localStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios));

    alert(`Usuário ${novoUsuario.nome.toUpperCase()} cadastrado com sucesso`);
  }

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
                    <select
                        className="form-select form-select-lg border border-primary my-3"
                        value={usuarioSelecionado}
                        onChange={e => setUsuarioSelecionado(e.target.value)}>
                        <option value="">Selecione um usuário</option>
                        {listaUsuarios.map((x, i) => (
                            <option key={i} value={x.nome}>{x.nome}</option>
                            
                        ))}
                    </select>

                    <input
                    className="form-control border border-primary mt-5"
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    />
                    <button
                    className="btn btn-lg btn-success" 
                    onClick={cadastrarUsuario}>Confirmar
                    </button>

                </div>
                
            </div>
        </div>


        </div>
    </div>
  )
}
