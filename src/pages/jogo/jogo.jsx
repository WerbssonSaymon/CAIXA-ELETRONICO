import React from "react";
import Menu from "../../componentes/organisms/menu";
import AreaGrafich from "../../componentes/molecules/areaGrafich";
import Rank from "../../componentes/molecules/rank";
import FooterGame from "../../componentes/molecules/footerGame";
import AreaHelp from "../../componentes/molecules/areaHelp";
import ButtonShop from "../../componentes/atoms/buttonShop";
import ButtonGame from "../../componentes/atoms/buttonGame";
import Shop from "../../componentes/atoms/shop";
import AreaCard from "../../componentes/molecules/areaCard";
import AreaPoints from "../../componentes/molecules/areaPoints";
import CategoryButton from "../../componentes/molecules/categoryButton";
import AreaUser from "../../componentes/molecules/areaUser";
import AreaQuests from "../../componentes/molecules/areaQuests";
import AlternativesGame from "../../componentes/molecules/alternativesGame";
import QuestGame from "../../componentes/atoms/questGame";
import AreaBalance from "../../componentes/molecules/areaBalance";
import { useState, useEffect, useRef } from "react";
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
  selecionarPerguntas,
  atualizarHistorico,
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
  selecionarPerguntasTreino,
  sairTreinamento,
} from "../../services/treinamentoService";
import "../../main.css";

export default function Jogo() {
  const refSelectLoja = useRef(null);

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [pontuacaoErrar, setPontuacaoErrar] = useState(0);
  const [pontuacaoParar, setPontuacaoParar] = useState(0);
  const [pontuacaoAcertar, setPontuacaoAcertar] = useState(0);
  const [jogoTerminado, setJogoTerminado] = useState(false);
  const [mensagemFinal, setMensagemFinal] = useState("");
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [cliques, setCliques] = useState(0);
  const [cartas, setCartas] = useState(false);
  const [grafico, setGrafico] = useState(false);
  const [loja, setLoja] = useState(false);
  const [botaoCartas, setBotaoCartas] = useState(0);
  const [botaoGrafico, setBotaoGrafico] = useState(0);
  const [iniciar, setIniciar] = useState(false);
  const [treinamento, setTreinamento] = useState(false);
  const [carregarPerguntas, setCarregarPerguntas] = useState(false);

  const [pontuacaoAcertos, setPontuacaoAcertos] = useState(0);
  const [pontuacaoErros, setPontuacaoErros] = useState(0);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosSalvos) {
      setListaUsuarios(usuariosSalvos);
    }
  }, []);

  useEffect(() => {
    if (carregarPerguntas) {
      const selecaoPerguntas = selecionarPerguntas(
        embaralharPerguntas,
        categoriasSelecionadas
      );

      setPerguntasSelecionadas(selecaoPerguntas);

      if (selecaoPerguntas.length > 0) {
        setAlternativasEmbaralhadas(
          embaralharPerguntas(selecaoPerguntas[0].alternativas)
        );
      }
    }
  }, [carregarPerguntas, treinamento, categoriasSelecionadas]);

  useEffect(() => {
    if (treinamento) {
      const selecaoPerguntasTreino = selecionarPerguntasTreino(
        embaralharPerguntas,
        categoriasSelecionadas
      );

      setPerguntasSelecionadas(selecaoPerguntasTreino);

      if (selecaoPerguntasTreino.length > 0) {
        setAlternativasEmbaralhadas(
          embaralharPerguntas(selecaoPerguntasTreino[0].alternativas)
        );
      }
    }
  }, [treinamento, categoriasSelecionadas, embaralharPerguntas]);

  useEffect(() => {
    if (jogoTerminado) {
      atualizarHistorico(nome, pontuacao);
      console.log(nome, pontuacao);
    }
  }, [jogoTerminado]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      {iniciar === true && <Rank />}

      <div
        className="bg-primary-tertiary d-flex flex-column justify-content-center align-items-center"
        style={{
          flex: 1,
          width: "100vw",
          backgroundImage: `url(/jogo.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-primary col-md-6 bg-opacity-75 rounded p-5">
          {iniciar === false && !treinamento ? (
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
          ) : (
            ""
          )}
        </div>

        {(iniciar === true && !jogoTerminado) ||
        (treinamento === true && !jogoTerminado) ? (
          <div className="row w-75">
            <div className="bg-primary bg-opacity-75 col">
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
          </div>
        ) : (
          <h2>{mensagemFinal}</h2>
        )}

        {iniciar && (
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
        )}
      </div>
    </div>
  );
}
