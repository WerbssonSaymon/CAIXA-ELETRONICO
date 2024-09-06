import React, {useEffect, useState} from 'react'

export default function rank() {

    const [placar,setPlacar] = useState([])
    useEffect(() => {
        const placarSalvo = JSON.parse(localStorage.getItem("placar")) || []
        if (placarSalvo){
          setPlacar(placarSalvo)
        }
      }, [])
  return (
    <>
      <h3 className='text-center'>Recordes Atuais</h3>
      <nav className="navbar bg-body-tertiary">
        <ul className="w-100 d-flex justify-content-around align-items-center" style={{listStyle: "none"}}>  
          {placar.map((usuario, index) => (
            <li key={index} className="mx-2">
              {index + 1}° {usuario.nome} - {usuario.pontuacao} reais
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
