import React from 'react'
import { Link } from "react-router-dom";

export default function menu() {
  return (
    <nav className="navbar bg-primary">
        <div className="container-fluid d-flex justify-content-evenly">
            <Link className='navbar-brand text-white fw-2' to={`/`}>inicio</Link>
            <Link className='navbar-brand text-white fw-2' to={`/jogo`}>jogo</Link>
            <Link className='navbar-brand text-white fw-2' to={`/perguntas`}>perguntas</Link>
            <Link className='navbar-brand text-white fw-2' to={`/usuarios`}>usuario</Link>
            <Link className='navbar-brand text-white fw-2' to={`/banco`}>banco</Link>
            <Link className='navbar-brand text-white fw-2' to={`/gestao`}>gestao</Link>
            <Link className='navbar-brand text-white fw-2' to={`/ad-perguntas`}>ad-perguntas</Link>
        </div>
    </nav>
  )
}
