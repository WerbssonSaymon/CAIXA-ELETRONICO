import { React, useRef } from "react";
import Menu from "../organisms/menu";
import CategoryButton from "../molecules/categoryButton";
import ButtonGame from "../atoms/buttonGame";
import AreaQuests from "../molecules/areaQuests";
import AreaUser from "../molecules/areaUser";
import Rank from "../molecules/rank";
import AlternativesGame from "../molecules/alternativesGame";
import AreaBalance from "../molecules/areaBalance";
import AreaPoints from "../molecules/areaPoints";
import AreaCard from "../molecules/areaCard";
import AreaGrafich from "../molecules/areaGrafich";
import AreaHelp from "../molecules/areaHelp";
import Shop from "../atoms/shop";
import ButtonShop from "../atoms/buttonShop";
import FooterGame from "../molecules/footerGame";
import QuestGame from "../atoms/questGame";
import MessageFinal from "../molecules/messageFinal";

import { valores } from "../../data/quests";

import {
  restartarJogo,
  pararJogo,
  mostrarCartas,
  mostrarGrafico,
  mostrarLoja,
  pularPergunta,
  eliminarAlternativas,
  obterPerguntaNaoUsada,
  verificarResposta,
  embaralharPerguntas,
  comprarAjuda,
  mudarCategoria,
  iniciarJogo,
  perguntaSecreta,
  iniciarPerguntas,
} from "../../services/jogoService";

import { calcularSaldo } from "../../services/bancoService";

import {
  iniciarTreinamento,
  verificarRespostaTreino,
} from "../../services/treinamentoService";
import "../../main.css";

export default function interfaceJogo({
  setCategoriasSelecionadas,
  perguntasSelecionadas,
  setPerguntasSelecionadas,
  perguntaAtual,
  setPerguntaAtual,
  pontuacao,
  setPontuacao,
  setPontuacaoErrar,
  setPontuacaoParar,
  setPontuacaoAcertar,
  jogoTerminado,
  setJogoTerminado,
  mensagemFinal,
  setMensagemFinal,
  alternativasEmbaralhadas,
  setAlternativasEmbaralhadas,
  listaUsuarios,
  nome,
  setNome,
  cliques,
  setCliques,
  cartas,
  setCartas,
  grafico,
  setGrafico,
  loja,
  setLoja,
  botaoCartas,
  setBotaoCartas,
  botaoGrafico,
  setBotaoGrafico,
  iniciar,
  setIniciar,
  treinamento,
  setTreinamento,
  setCarregarPerguntas,
  setPontuacaoAcertos,
  setPontuacaoErros,
}) {
  const refSelectLoja = useRef(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      {iniciar === true && <Rank />}

      <div
        className="bg-primary-tertiary d-flex flex-column justify-content-center align-items-center"
        style={{
          flex: 1,
          width: "100vw",
          backgroundImage: `url(/palco.avif)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {iniciar === false && !treinamento ? (
          <div className="bg-primary col-md-6 bg-opacity-75 rounded p-5">
            <>
              <CategoryButton
                mudarCategoria={mudarCategoria}
                setCategoriasSelecionadas={setCategoriasSelecionadas}
              />
              <ButtonGame
                label="Carregar as perguntas"
                onClick={() => iniciarPerguntas(setCarregarPerguntas)}
              />
              <ButtonGame
                label="Adicionar Pergunta Secreta?"
                onClick={() =>
                  perguntaSecreta(
                    perguntaAtual,
                    perguntasSelecionadas,
                    obterPerguntaNaoUsada,
                    embaralharPerguntas,
                    setPerguntasSelecionadas,
                    setAlternativasEmbaralhadas
                  )
                }
              />
              <AreaQuests perguntasSelecionadas={perguntasSelecionadas} />
              <AreaUser
                nome={nome}
                setNome={setNome}
                listaUsuarios={listaUsuarios}
                iniciarJogo={iniciarJogo}
                setIniciar={setIniciar}
                iniciarTreinamento={iniciarTreinamento}
                setTreinamento={setTreinamento}
              />
            </>
          </div>
        ) : (
          ""
        )}

        {(iniciar === true && !jogoTerminado) ||
        (treinamento === true && !jogoTerminado) ? (
          <div className="row container bg-game-secondary p-3 rounded">
            <div className="col-md-6">
              {perguntasSelecionadas.length > 0 && (
                <>
                  <QuestGame
                    perguntasSelecionadas={perguntasSelecionadas}
                    perguntaAtual={perguntaAtual}
                  />
                  <AlternativesGame
                    alternativasEmbaralhadas={alternativasEmbaralhadas}
                    iniciar={iniciar}
                    nome={nome}
                    perguntasSelecionadas={perguntasSelecionadas}
                    perguntaAtual={perguntaAtual}
                    valores={valores}
                    setPontuacao={setPontuacao}
                    setPerguntaAtual={setPerguntaAtual}
                    setPontuacaoErrar={setPontuacaoErrar}
                    setPontuacaoParar={setPontuacaoParar}
                    setPontuacaoAcertar={setPontuacaoAcertar}
                    setAlternativasEmbaralhadas={setAlternativasEmbaralhadas}
                    setMensagemFinal={setMensagemFinal}
                    setJogoTerminado={setJogoTerminado}
                    embaralharPerguntas={embaralharPerguntas}
                    verificarResposta={verificarResposta}
                    verificarRespostaTreino={verificarRespostaTreino}
                    setPontuacaoAcertos={setPontuacaoAcertos}
                    setPontuacaoErros={setPontuacaoErros}
                  />
                  {(iniciar || treinamento) && (
                    <div className="bg-game p-3 d-flex flex-column justify-content-around">
                      <AreaBalance nome={nome} pontuacao={pontuacao} />
                      <AreaPoints
                        valores={valores}
                        perguntaAtual={perguntaAtual}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="bg-game col-md-6 d-flex flex-column justify-content-end">
              {cartas && (
                <AreaCard
                  alternativasEmbaralhadas={alternativasEmbaralhadas}
                  perguntasSelecionadas={perguntasSelecionadas}
                  perguntaAtual={perguntaAtual}
                  embaralharPerguntas={embaralharPerguntas}
                  setAlternativasEmbaralhadas={setAlternativasEmbaralhadas}
                  setBotaoCartas={setBotaoCartas}
                  setCartas={setCartas}
                  eliminarAlternativas={eliminarAlternativas}
                />
              )}
              {grafico && <AreaGrafich setGrafico={setGrafico} />}
              {loja && (
                <Shop
                  refSelectLoja={refSelectLoja}
                  label="Escolha qual ajuda comprar"
                  onChange={(e) =>
                    comprarAjuda(
                      e.target.value,
                      nome,
                      setCliques,
                      refSelectLoja,
                      setBotaoCartas,
                      setBotaoGrafico,
                      calcularSaldo
                    )
                  }
                />
              )}
              <div className="">
                <div className="row d-flex align-items-center justify-content-center">
                  <div className="col-md-12">
                    <ButtonShop
                      label="Comprar ajuda"
                      onClick={() => mostrarLoja(loja, setLoja)}
                    />
                  </div>
                </div>
                <div className="row d-flex align-items-center justify-content-center">
                  <AreaHelp
                    cliques={cliques}
                    perguntasSelecionadas={perguntasSelecionadas}
                    perguntaAtual={perguntaAtual}
                    obterPerguntaNaoUsada={obterPerguntaNaoUsada}
                    embaralharPerguntas={embaralharPerguntas}
                    setAlternativasEmbaralhadas={setAlternativasEmbaralhadas}
                    setPerguntasSelecionadas={setPerguntasSelecionadas}
                    setCliques={setCliques}
                    botaoCartas={botaoCartas}
                    cartas={cartas}
                    setCartas={setCartas}
                    botaoGrafico={botaoGrafico}
                    grafico={grafico}
                    setGrafico={setGrafico}
                    setBotaoGrafico={setBotaoGrafico}
                    mostrarCartas={mostrarCartas}
                    pularPergunta={pularPergunta}
                    mostrarGrafico={mostrarGrafico}
                  />
                </div>
              </div>
            </div>
            <FooterGame
              setPerguntasSelecionadas={setPerguntasSelecionadas}
              setCategoriasSelecionadas={setCategoriasSelecionadas}
              setPerguntaAtual={setPerguntaAtual}
              setPontuacao={setPontuacao}
              setJogoTerminado={setJogoTerminado}
              setMensagemFinal={setMensagemFinal}
              setAlternativasEmbaralhadas={setAlternativasEmbaralhadas}
              setNome={setNome}
              setCliques={setCliques}
              setGrafico={setGrafico}
              setBotaoCartas={setBotaoCartas}
              setBotaoGrafico={setBotaoGrafico}
              setIniciar={setIniciar}
              setTreinamento={setTreinamento}
              nome={nome}
              valores={valores}
              perguntaAtual={perguntaAtual}
              restartarJogo={restartarJogo}
              pararJogo={pararJogo}
            />
          </div>
        ) : (
          <MessageFinal
            setPerguntasSelecionadas={setPerguntasSelecionadas}
            setCategoriasSelecionadas={setCategoriasSelecionadas}
            setPerguntaAtual={setPerguntaAtual}
            setPontuacao={setPontuacao}
            setJogoTerminado={setJogoTerminado}
            setMensagemFinal={setMensagemFinal}
            setAlternativasEmbaralhadas={setAlternativasEmbaralhadas}
            setNome={setNome}
            setCliques={setCliques}
            setGrafico={setGrafico}
            setBotaoCartas={setBotaoCartas}
            setBotaoGrafico={setBotaoGrafico}
            setIniciar={setIniciar}
            setTreinamento={setTreinamento}
            restartarJogo={restartarJogo}
          >
            {mensagemFinal}
          </MessageFinal>
        )}
      </div>
    </div>
  );
}
