import React from 'react'
import Title from './../atoms/title'
import Subtitle from './../atoms/subtitle'

export default function heroContent() {
  return (
    <div className='bg-body bg-opacity-75 w-25 p-5 rounded mx-5'>
      <Title titulo="Sistema Bancario e Jogo Show do Milhâo" />
      <Subtitle subtitulo="Projeto React de sistema web em 2024"/>
      <p className='text-start mt-4'>
        Esse sistema busca simular o desenvolvimento de softwares bancarios e a criação de jogos usando os recursos
         implementados na biblioteca React. 
      </p>
    </div>
  )
}
