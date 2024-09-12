import React from 'react'
import ViewQuestItem from './viewQuestItem'
import '../../main.css'

export default function viewQuests({ listaDePerguntas, setListaDePerguntas }) {
  return (
    <div className="table-responsive w-75" style={{ height: "600px", overflow: "scroll" }}>
      <table className="table table-striped" >
        <thead className="table-dark">
          <tr>
            <th>Pergunta</th>
            <th>Alternativas</th>
            <th>Resposta</th>
            <th>Dificuldade</th>
            <th>Categoria</th>
            <th>Deleção</th>
          </tr>
        </thead>
        <tbody>
          {listaDePerguntas.map((p, i) => (
            <ViewQuestItem
              key={i}
              pergunta={p}
              listaDePerguntas={listaDePerguntas}
              setListaDePerguntas={setListaDePerguntas}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
