import React from 'react'
import { removerPergunta } from '../../services/cadastroPerguntaService'

export default function viewQuestItem({ pergunta, listaDePerguntas, setListaDePerguntas }) {
  return (
    <tr>
      <td>{pergunta.pergunta}</td>
      <td>
        {pergunta.alternativas.map((alt, index) => (
          <span key={index}>{" " + alt} -</span>
        ))}
      </td>
      <td>{pergunta.resposta}</td>
      <td>{pergunta.dificuldade}</td>
      <td>{pergunta.categoria}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() =>
            removerPergunta(pergunta.pergunta, listaDePerguntas, setListaDePerguntas)
          }
        >
          Remover
        </button>
      </td>
    </tr>
  )
}
