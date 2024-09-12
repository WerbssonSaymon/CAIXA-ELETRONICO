import React from "react";
import Menu from "../../componentes/organisms/menu";
import Grafico from "../../componentes/atoms/grafich";
import Rank from "../../componentes/molecules/rank";
import ButtonAction from "../../componentes/atoms/buttonAction";
import ButtonHelp from "../../componentes/atoms/buttonHelp";
import ButtonShop from "../../componentes/atoms/buttonShop";
import Shop from "../../componentes/atoms/shop";
import Cards from "../../componentes/atoms/cards";
import AreaPoints from "../../componentes/molecules/areaPoints";
import CategoryButton from "../../componentes/molecules/categoryButton";
import AreaUser from "../../componentes/molecules/areaUser";
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

  const [pontuacaoAcertos, setPontuacaoAcertos] = useState(0);
  const [pontuacaoErros, setPontuacaoErros] = useState(0);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosSalvos) {
      setListaUsuarios(usuariosSalvos);
    }
  }, []);

  useEffect(() => {
    if (nome) {
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
  }, [nome, treinamento, categoriasSelecionadas]);

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

  function mudancaDeModo(modo){
    if (modo === "jogo"){
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
    } else if (modo === "treino"){
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
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      {iniciar === true && <Rank />}

      <div
        className="bg-primary-tertiary d-flex flex-column justify-content-center align-items-center"
        style={{
          flex: 1,
          width: "100vw",
          backgroundImage: `url(/tela-jogo.avif)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-primary bg-opacity-75 rounded p-5">
          {iniciar === false && !treinamento ? (
            <>
              <CategoryButton
                mudarCategoria={mudarCategoria}
                setCategoriasSelecionadas={setCategoriasSelecionadas}
              />
              <AreaUser
                nome={nome}
                setNome={setNome}
                listaUsuarios={listaUsuarios}
                iniciarJogo={iniciarJogo}
                setIniciar={setIniciar}
              />
              {!iniciar && (
                <>
                <button
                  className="w-100 btn btn-lg btn-primary text-uppercase border border-5 border-light mt-2"
                  onClick={() => iniciarTreinamento(setTreinamento)}
                >
                  Iniciar treinamento
                </button>
                <button
                className="w-100 btn btn-lg btn-primary text-uppercase border border-5 border-light mt-2"
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
              >
                Adicionar Pergunta Secreta
              </button>
              </>
              )}
                      <div className="bg-game col d-flex flex-column justify-content-center align-items-center p-2">
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
            </>
          ) : (
            ""
          )}
        </div>

        {iniciar === true && !jogoTerminado ? (
          <div className="row w-75">
            <div className="bg-primary bg-opacity-75 col">
              {perguntasSelecionadas.length > 0 && (
                <>
                  <div className="bg-game col-md-12 p-3">
                    <h2 className="text-white text-uppercase">
                      {perguntasSelecionadas[perguntaAtual].pergunta}
                    </h2>
                  </div>
                  <div className="d-flex flex-column gap-1 m-1">
                    {alternativasEmbaralhadas.map((alternativa, index) => (
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
                    ))}
                  </div>
                  {iniciar === true && (
                    <div className="bg-game p-3 d-flex flex-column justify-content-around">
                      <div className="d-flex justify-content-around">
                        <h3 className="text-white text-uppercase">
                          Partipante: {nome}
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
                    label="Escolha uma cartas"
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
                  setIniciar
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

        {treinamento && (
          <div className="container">
            <div className="bg-body p-3">
              <h2 className="text-center">Treinamento</h2>

              <h4>
                {perguntasSelecionadas.length > 0 &&
                perguntasSelecionadas[perguntaAtual]
                  ? perguntasSelecionadas[perguntaAtual].pergunta
                  : "Carregando pergunta..."}
              </h4>

              <div className="alternativas">
                {alternativasEmbaralhadas.map((alternativa, index) => (
                  <button
                    key={index}
                    className="btn btn-primary"
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
                ))}
              </div>

              <div className="pontuacoes my-4">
                <p>Acertos: {pontuacaoAcertos}</p>
                <p>Erros: {pontuacaoErros}</p>
              </div>
            </div>
            <button
              className="btn btn-lg btn-danger w-100"
              onClick={() =>
                sairTreinamento(
                  setPerguntasSelecionadas,
                  setCategoriasSelecionadas,
                  setPerguntaAtual,
                  setPontuacao,
                  setJogoTerminado,
                  setAlternativasEmbaralhadas,
                  setTreinamento
                )
              }
            >
              Sair do treinamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
