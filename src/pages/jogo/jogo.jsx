import React from "react";
import Menu from "../../componentes/organisms/menu";
import Grafico from "../../componentes/atoms/grafich";
import Rank from "../../componentes/molecules/rank";
import ButtonAction from "../../componentes/atoms/buttonAction";
import ButtonHelp from "../../componentes/atoms/buttonHelp";
import ButtonShop from "../../componentes/atoms/buttonShop";
import ButtonGame from "../../componentes/atoms/buttonGame";
import Shop from "../../componentes/atoms/shop";
import Cards from "../../componentes/atoms/cards";
import AreaPoints from "../../componentes/molecules/areaPoints";
import CategoryButton from "../../componentes/molecules/categoryButton";
import AreaUser from "../../componentes/molecules/areaUser";
import AreaQuests from "../../componentes/molecules/areaQuests";
import AlternativesGame from "../../componentes/molecules/alternativesGame";
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
                  <div className="bg-game col-md-12 p-3">
                    <h2 className="text-white text-uppercase">
                      {perguntasSelecionadas[perguntaAtual].pergunta}
                    </h2>
                  </div>
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
                      <div className="d-flex justify-content-around">
                        <h3 className="text-white text-uppercase">
                          Participante: {nome}
                        </h3>
                        <span className="fs-4 text-white fw-semibold">
                          {pontuacao.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
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
                <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                  <Cards
                    label="Escolha uma carta"
                    onChange={(e) =>
                      eliminarAlternativas(
                        e.target.value,
                        alternativasEmbaralhadas,
                        perguntasSelecionadas,
                        perguntaAtual,
                        embaralharPerguntas,
                        setAlternativasEmbaralhadas,
                        setBotaoCartas
                      )
                    }
                  />
                  <button
                    className="w-100 mt-1 mb-3 btn btn-danger text-white flex-grow-1"
                    onClick={() => setCartas(false)}
                  >
                    X
                  </button>
                </div>
              )}
              {grafico && (
                <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                  <Grafico />
                  <button
                    className="w-100 mt-1 mb-3 btn btn-danger text-white flex-grow-1"
                    onClick={() => setGrafico(false)}
                  >
                    X
                  </button>
                </div>
              )}
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
                  <div className="col-md-12 my-2">
                    <ButtonHelp
                      label="Pular"
                      botaoEstado={cliques >= 3}
                      onClick={() =>
                        pularPergunta(
                          perguntasSelecionadas,
                          perguntaAtual,
                          obterPerguntaNaoUsada,
                          embaralharPerguntas,
                          setAlternativasEmbaralhadas,
                          setPerguntasSelecionadas,
                          setCliques
                        )
                      }
                    />
                    <ButtonHelp
                      label="Cartas"
                      botaoEstado={botaoCartas >= 1}
                      onClick={() => mostrarCartas(cartas, setCartas)}
                    />
                    <ButtonHelp
                      label="Universitário"
                      botaoEstado={botaoGrafico}
                      onClick={() =>
                        mostrarGrafico(grafico, setGrafico, setBotaoGrafico)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h2>{mensagemFinal}</h2>
        )}

        {iniciar && (
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
        )}
      </div>
    </div>
  );
}
