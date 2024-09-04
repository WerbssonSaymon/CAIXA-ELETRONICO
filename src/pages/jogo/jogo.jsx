import React from "react";
import Menu from "../../layout/menu";
import Title from "../../componentes/title";
import Grafico from "../../componentes/grafich";
import { useState, useEffect } from "react";
import { valores } from "../../data/quests";
import {
  restartarJogo,
  pararJogo,
  mostrarCartas,
  mostrarGrafico,
  pularPergunta,
  eliminarAlternativas,
  obterPerguntaNaoUsada,
  verificarResposta,
  embaralharPerguntas,
  selecionarPerguntas,
  atualizarHistorico,
} from "../../services/jogoService";

export default function Jogo() {
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [jogoTerminado, setJogoTerminado] = useState(false);
  const [mensagemFinal, setMensagemFinal] = useState("");
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [cliques, setCliques] = useState(0);
  const [cartas, setCartas] = useState(false);
  const [grafico, setGrafico] = useState(false);
  const [botaoCartas, setBotaoCartas] = useState(false);
  const [botaoGrafico, setBotaoGrafico] = useState(false);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosSalvos) {
      setListaUsuarios(usuariosSalvos);
    }
  }, []);

  useEffect(() => {
    if (nome) {
      const selecaoPerguntas = selecionarPerguntas(embaralharPerguntas);

      setPerguntasSelecionadas(selecaoPerguntas);
      if (selecaoPerguntas.length > 0) {
        setAlternativasEmbaralhadas(
          embaralharPerguntas(selecaoPerguntas[0].alternativas)

        );
        console.log(selecaoPerguntas)
      }
    }
  }, [nome]);

  useEffect(() => {
    if (jogoTerminado) {
      atualizarHistorico(nome, pontuacao);
      console.log(nome, pontuacao);
    }
  }, [jogoTerminado]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex flex-column justify-content-center align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
        <Title titulo="Show do Milhão" />
        <div>
          {!nome && (
            <>
              <h2>Selecione um Usuário</h2>
              <select
                className="form-select form-select-lg border border-primary"
                onChange={(e) => setNome(e.target.value)}
                value={nome}
              >
                <option value="">Selecione um jogador</option>
                {listaUsuarios.map((usuario, index) => (
                  <option key={index} value={usuario.nome}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        

        {nome && !jogoTerminado ? (
          <div className="d-flex">
            <div className="bg-body w-75">
            {nome && (
              <div className="bg-primary p-3 d-flex align-items-center justify-content-around">
                <h3 className="text-white">Partipante: {nome}</h3>
                <span className="fs-3 text-white fw-semibold">
                  {pontuacao.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            )}
            {perguntasSelecionadas.length > 0 && (
              <>
                <div className="bg-danger p-3">
                  <h2 className="text-white">
                    {perguntasSelecionadas[perguntaAtual].pergunta}
                  </h2>
                </div>
                <div className="d-flex flex-column gap-1 m-1">
                  {alternativasEmbaralhadas.map((alternativa, index) => (
                    <button
                      className="btn btn-danger p-3 fw-3 w-75 d-flex justify-content-start"
                      key={index}
                      onClick={() =>
                        verificarResposta(
                          alternativa,
                          perguntasSelecionadas,
                          perguntaAtual,
                          valores,
                          setPontuacao,
                          setPerguntaAtual,
                          setAlternativasEmbaralhadas,
                          setMensagemFinal,
                          setJogoTerminado,
                          embaralharPerguntas
                        )
                      }
                    >
                      {index + 1} - {alternativa}
                    </button>
                  ))}
                </div>

                <div className="d-flex gap-1 m-2 pt-3">
                  <button
                    className={`btn btn-warning flex-grow-1 ${
                      cliques >= 3 ? "disabled" : ""
                    }`}
                    disabled={cliques >= 3}
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
                  >
                    Pular
                  </button>
                  <button
                    className={`btn btn-warning flex-grow-1 `}
                    onClick={() =>
                      mostrarCartas(cartas, setCartas, setBotaoCartas)
                    }
                    disabled={botaoCartas}
                  >
                    Cartas
                  </button>
                  <button
                    className={`btn btn-warning flex-grow-1`}
                    onClick={() =>
                      mostrarGrafico(grafico, setGrafico, setBotaoGrafico)
                    }
                    disabled={botaoGrafico}
                  >
                    Universitário
                  </button>
                </div>
                {cartas && (
                  <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                    <select
                      onChange={(e) =>
                        eliminarAlternativas(
                          e.target.value,
                          alternativasEmbaralhadas,
                          perguntasSelecionadas,
                          perguntaAtual,
                          embaralharPerguntas,
                          setAlternativasEmbaralhadas
                        )
                      }
                      className="form-select"
                    >
                      <option value="">Escolha uma carta</option>
                      <option value="rei">X</option>
                      <option value="ás">X</option>
                      <option value="2">X</option>
                      <option value="3">X</option>
                    </select>
                    <button
                      className="btn btn-danger text-white flex-grow-1"
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
                      className="btn btn-danger text-white flex-grow-1"
                      onClick={() => setGrafico(false)}
                    >
                      X
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
            <div className="bg-body w-50 p-2" style={{ height: "500px", overflow: "scroll" }}>
              <ul>
                <h2>Perguntas desta rodada</h2>
                {perguntasSelecionadas.map((perguntas, index) => (
                  <li key={index}>
                    <p>{perguntas.dificuldade} - {perguntas.pergunta}</p>
                  </li>
                ))}
              </ul>
            </div>  
          </div>

        ) : (
          <h2>{mensagemFinal}</h2>
        )}
      </div>
      
      <footer className="w-100 d-flex justify-content-center">
        <button
          className="btn btn-warning w-50"
          onClick={() =>
            restartarJogo(
              setPerguntasSelecionadas,
              setPerguntaAtual,
              setPontuacao,
              setJogoTerminado,
              setMensagemFinal,
              setAlternativasEmbaralhadas,
              setNome,
              setCliques,
              setGrafico,
              setBotaoCartas,
              setBotaoGrafico
            )
          }
        >
          Reiniciar
        </button>
        <button
          className="btn btn-danger w-50"
          onClick={() =>
            pararJogo(
              valores,
              perguntaAtual,
              setPontuacao,
              setMensagemFinal,
              setJogoTerminado
            )
          }
        >
          Parar
        </button>
      </footer>
    </div>
  );
}
