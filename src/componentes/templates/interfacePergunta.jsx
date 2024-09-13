import React from 'react'
import Menu from '../organisms/menu'
import FormViewQuests from '../organisms/formViewQuests'
import Subtitle from '../atoms/subtitle'
import ViewQuests from '../molecules/viewQuests'

export default function interfacePergunta({
    listaDePerguntas,
    setListaDePerguntas
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex flex-column align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
        
        <FormViewQuests 
        setListaDePerguntas={setListaDePerguntas} 
        />

        <Subtitle subtitulo="Todas as perguntas cadastradas"/>

        <ViewQuests
          listaDePerguntas={listaDePerguntas}
          setListaDePerguntas={setListaDePerguntas}
        />
      </div>
    </div>
  )
}
