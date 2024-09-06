import React from "react";
import Menu from "../../layout/menu";
import Title from "../../componentes/title";
import Grafico from "../../componentes/grafich";
import Rank from "../../componentes/rank";
import ButtonAction from "../../componentes/buttonAction"
import ButtonHelp from "../../componentes/buttonHelp"
import ButtonShop from "../../componentes/buttonShop"
import Shop from "../../componentes/shop"
import Cards from "../../componentes/cards"
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
} from "../../services/jogoService";
import { calcularSaldo } from "../../services/bancoService";

export default function Jogo() {
  const refSelectLoja = useRef(null);

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
      <Title titulo="Show do Milhão" />
      <Rank />
      <div
        className="bg-primary-tertiary d-flex flex-column justify-content-center align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
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
          <div className="row">
            <div className="bg-body col">
              {nome && (
                <div className="bg-primary p-3 d-flex flex-column justify-content-around">
                  <div className="d-flex justify-content-around">
                    <h3 className="text-white">Partipante: {nome}</h3>
                    <span className="fs-3 text-white fw-semibold">
                      {pontuacao.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                  <div className="d-flex justify-content-around">
                    <span className="fs-4 text-white fw-semibold">
                      Se errar {pontuacaoErrar}
                    </span>
                    <span className="fs-4 text-white fw-semibold">
                      Se acertar {pontuacaoAcertar}
                    </span>
                    <span className="fs-4 text-white fw-semibold">
                      Se parar {pontuacaoParar}
                    </span>
                  </div>
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
                        className="btn btn-danger p-3 fw-3 w-75 d-flex align-items-center justify-content-start"
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

                </>
              )}
            </div>
            <div className="bg-body col" style={{ overflow: "scroll" }}>
              <ul>
                <h2>Perguntas desta rodada</h2>
                {perguntasSelecionadas.map((perguntas, index) => (
                  <li key={index}>
                    <p>
                      {perguntas.dificuldade} - {perguntas.pergunta}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-body col d-flex flex-column justify-content-end">
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
                          )}
                      />
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
              <div className="d-flex gap-1 m-2 pt-3">
                <ButtonShop
                  label="Comprar ajuda"
                  onClick={() => mostrarLoja(loja, setLoja)}
                />

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
        ) : (
          <h2>{mensagemFinal}</h2>
        )}
        <footer className="w-100 d-flex justify-content-center gap-3 py-2">
          <ButtonAction
            label="Reiniciar"
            cor="warning"
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
              )
            }}
          />
        </footer>
      </div>
    </div>
  );
}