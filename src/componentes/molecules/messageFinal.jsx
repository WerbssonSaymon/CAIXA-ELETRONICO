import React from 'react'
import Message from '../atoms/message'
import ButtonAction from '../atoms/buttonAction'

export default function messageFinal({children, setPerguntasSelecionadas,
    setCategoriasSelecionadas,
    setPerguntaAtual,
    setPontuacao,
    setJogoTerminado,
    setMensagemFinal,
    setAlternativasEmbaralhadas,
    setNome,
    setCliques,
    setGrafico,
    setBotaoCartas,
    setBotaoGrafico,
    setIniciar,
    setTreinamento, restartarJogo}) {
  return (
    <div>
      <Message>
        {children}
      </Message>
      <ButtonAction
        label="Reiniciar"
        cor="success"
        onClick={() =>
          restartarJogo(
            setPerguntasSelecionadas,
            setCategoriasSelecionadas,
            setPerguntaAtual,
            setPontuacao,
            setJogoTerminado,
            setMensagemFinal,
            setAlternativasEmbaralhadas,
            setNome,
            setCliques,
            setGrafico,
            setBotaoCartas,
            setBotaoGrafico,
            setIniciar,
            setTreinamento
          )
        }
      />
    </div>
  )
}
