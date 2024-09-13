import React from 'react'

export default function areaQuests({perguntasSelecionadas}) {
  return (
    <div className="bg-primary col d-flex flex-column justify-content-center align-items-center border border-5 border-light rounded p-2 mt-3">
      <h2 className="text-white text-center">Perguntas desta rodada</h2>
      <div
        className="table-responsive w-100"
        style={{ height: "300px", overflow: "scroll" }}
      >
        <table className="table table-striped">
          <thead className="table-light">
            <tr>
              <th>Dificuldade</th>
              <th>Pergunta</th>
            </tr>
          </thead>
          <tbody>
            {perguntasSelecionadas.map((perguntas, index) => (
              <tr key={index}>
                <td>{perguntas.dificuldade}</td>
                <td>{perguntas.pergunta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
