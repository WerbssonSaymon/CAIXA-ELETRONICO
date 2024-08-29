import React from 'react'
import { Link } from "react-router-dom";

export default function menu() {
  return (
    <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-evenly">
            <Link className='navbar-brand' to={`/`}>inicio</Link>
            <Link className='navbar-brand' to={`/usuarios`}>usuario</Link>
            <Link className='navbar-brand' to={`/banco`}>banco</Link>
            <Link className='navbar-brand' to={`/gestao`}>gestao</Link>
        </div>
    </nav>
  )
}
