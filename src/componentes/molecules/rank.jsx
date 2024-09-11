import React, {useEffect, useState} from 'react'
import Subtitle from '../atoms/subtitle'

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
      <nav className="navbar bg-body-tertiary d-flex justify-content-center">
        
        <ul className="w-100 d-flex justify-content-around align-items-center" style={{listStyle: "none"}}>  
          {placar.map((usuario, index) => (
            <li key={index} className="mx-2">
              {index + 1}° {usuario.nome} - {usuario.pontuacao} reais
            </li>
          ))}
        </ul>
        <Subtitle subtituto="Recordes Atuais"/>
      </nav>
    </>
  )
}
