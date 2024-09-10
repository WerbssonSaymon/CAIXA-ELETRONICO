import React, {useState} from 'react'
import Menu from '../../componentes/organisms/menu'
import Title from '../../componentes/atoms/title'
import FormQuest from '../../componentes/organisms/formQuest';

export default function perguntas() {

  const [listaDePerguntas, setListaDePerguntas] = useState([]);
  
  console.log(localStorage.getItem('perguntas'))
  
  return (

    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Menu />
        <div className='container bg-white d-flex flex-column p-3 mt-3 shadow p-3 mb-5 bg-body-tertiary rounded' style={{ flex: 1, width: "100vw" }}>
            <Title titulo="Cadastro de perguntas" />
            <FormQuest
              setListaDePerguntas={setListaDePerguntas}
            />   
        </div>
    </div>
  )
}
