import React from "react";
import ButtonAction from '../atoms/buttonAction'

export default function footerGame({
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
    setTreinamento,
    nome,
    valores,
    perguntaAtual,
    restartarJogo,
    pararJogo,
}) {
  return (
    <footer className="w-100 d-flex justify-content-center gap-3 py-2">
      <ButtonAction
        label="Reiniciar"
        cor="warning"
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
      <ButtonAction
        label="Parar"
        cor="danger"
        onClick={() => {
          pararJogo(
            nome,
            valores,
            perguntaAtual,
            setPontuacao,
            setMensagemFinal,
            setJogoTerminado
          );
        }}
      />
    </footer>
  );
}
