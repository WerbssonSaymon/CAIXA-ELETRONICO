import React, {useState} from 'react'
import InterfaceCadastroPergunta from '../../componentes/templates/interfaceCadastroPergunta';

export default function perguntas() {

  const [listaDePerguntas, setListaDePerguntas] = useState([]);
  
  return (

    <InterfaceCadastroPergunta
      listaDePerguntas={listaDePerguntas}
      setListaDePerguntas={setListaDePerguntas}
    />
  )
}
