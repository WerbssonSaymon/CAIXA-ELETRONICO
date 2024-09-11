import React from 'react'
import { Link } from "react-router-dom";
import '../../main.css'

export default function menu() {
  return (
    <nav className="navbar bg-principal">
        <div className="container-fluid d-flex justify-content-evenly">
            <Link className='navbar-brand text-white fw-2' to={`/`}><img src={`/logo.png`} style={{ width: '200px', height: '50px' }}></img></Link>
            <Link className='navbar-brand text-white fw-2' to={`/`}>Inicio</Link>
            <Link className='navbar-brand text-white fw-2' to={`/jogo`}>Jogo</Link>
            <Link className='navbar-brand text-white fw-2' to={`/perguntas`}>Perguntas</Link>
            <Link className='navbar-brand text-white fw-2' to={`/usuarios`}>Usuario</Link>
            <Link className='navbar-brand text-white fw-2' to={`/banco`}>Banco</Link>
            <Link className='navbar-brand text-white fw-2' to={`/gestao`}>Gestao</Link>
            {/* <Link className='navbar-brand text-white fw-2' to={`/ad-perguntas`}>Ad-perguntas</Link> */}
        </div>
    </nav>
  )
}
