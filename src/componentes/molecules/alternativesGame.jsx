import React from 'react'

export default function alternativesGame({
    alternativasEmbaralhadas,
    iniciar,
    nome,
    perguntasSelecionadas,
    perguntaAtual,
    valores,
    setPontuacao,
    setPerguntaAtual,
    setPontuacaoErrar,
    setPontuacaoParar,
    setPontuacaoAcertar,
    setAlternativasEmbaralhadas,
    setMensagemFinal,
    setJogoTerminado,
    embaralharPerguntas,
    verificarResposta,
    verificarRespostaTreino,
    setPontuacaoAcertos,
    setPontuacaoErros
  }) {
  return (
    <div className="d-flex flex-column gap-1 m-1">
      {alternativasEmbaralhadas.map((alternativa, index) =>
        iniciar ? (
          <button
            className="btn bg-game text-white text-uppercase p-3 fw-3 w-75 d-flex align-items-center justify-content-start"
            key={index}
            onClick={() =>
              verificarResposta(
                nome,
                alternativa,
                perguntasSelecionadas,
                perguntaAtual,
                valores,
                setPontuacao,
                setPerguntaAtual,
                setPontuacaoErrar,
                setPontuacaoParar,
                setPontuacaoAcertar,
                setAlternativasEmbaralhadas,
                setMensagemFinal,
                setJogoTerminado,
                embaralharPerguntas
              )
            }
          >
            <span
              style={{ width: "25px", height: "25px" }}
              className="fw-bold text-danger bg-white rounded-circle"
            >
              {index + 1}
            </span>
            - {alternativa}
          </button>
        ) : (
          <button
            key={index}
            className="btn bg-game text-white text-uppercase p-3 fw-3 w-75 d-flex align-items-center justify-content-start"
            onClick={() =>
              verificarRespostaTreino(
                alternativa,
                perguntasSelecionadas,
                perguntaAtual,
                setPontuacaoAcertos,
                setPontuacaoErros,
                setPerguntaAtual,
                setAlternativasEmbaralhadas,
                embaralharPerguntas
              )
            }
          >
            {alternativa}
          </button>
        )
      )}
    </div>
  )
}
