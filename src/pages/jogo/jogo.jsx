import React from "react";
import Menu from "../../layout/menu";
import Title from "../../componentes/title";
import Grafico from "../../componentes/grafich";
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
  placar
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
  const [loja, setLoja] = useState(false)
  const [botaoCartas, setBotaoCartas] = useState(0);
  const [botaoGrafico, setBotaoGrafico] = useState(0);
  const [placar,setPlacar] = useState([])

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosSalvos) {
      setListaUsuarios(usuariosSalvos);
    }
  }, []);

  useEffect(() => {
    const placarSalvo = JSON.parse(localStorage.getItem("placar")) || []
    if (placarSalvo){
      setPlacar(placarSalvo)
    }
  }, [placar])

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
      <h3>Recordes Atuais</h3>
      <nav className="navbar bg-body-tertiary">
        <ul className="w-100 d-flex justify-content-start" style={{listStyle: "none"}}>  
          {placar.map((usuario, index) => (
            <li key={index} className="mx-2">
              {index + 1}° {usuario.nome} - {usuario.pontuacao} reais
            </li>
          ))}
        </ul>
      </nav>
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
          <div className="d-flex">
            <div className="bg-body w-75">
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
                  <span className="fs-4 text-white fw-semibold">Se errar {pontuacaoErrar}</span>
                  <span className="fs-4 text-white fw-semibold">Se acertar {pontuacaoAcertar}</span>
                  <span className="fs-4 text-white fw-semibold">Se parar {pontuacaoParar}</span>
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
                      <span style={{width: "25px", height: "25px"}} className="fw-bold text-danger bg-white rounded-circle">{index + 1}</span>
                       - {alternativa}
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
                    className={`btn btn-warning flex-grow-1 ${
                      botaoCartas >= 1 ? "disabled" : ""
                    }`}
                    disabled={botaoCartas >= 1}
                    onClick={() =>
                      mostrarCartas(
                        cartas,
                        setCartas
                      )
                    }
                    
                  >
                    Cartas
                  </button>
                  <button
                    className={`btn btn-warning flex-grow-1 ${
                      botaoGrafico >= 1 ? "disabled" : ""
                    }`}
                    disabled={botaoGrafico}
                    onClick={() =>
                      mostrarGrafico(
                        grafico,
                        setGrafico,
                        setBotaoGrafico
                      )
                    }
                    
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
                          setAlternativasEmbaralhadas,
                          setBotaoCartas
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
          className="btn btn-warning w-50 p-3"
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
          className="btn btn-danger w-50 p-3"
          onClick={() =>
            pararJogo(
              nome,
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
        <button
          className="btn btn-success w-50 p-3"
          onClick={() =>
            mostrarLoja(loja, setLoja)
          }
        >
          Comprar ajuda
        </button>
      </footer>
      { loja && (
        <div>
          <select
              ref={refSelectLoja}
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
            className="form-select form-select-lg border border-primary mb-3"
          >
            <option value="">Escolha qual ajuda comprar</option>
            <option value="pular">+1 ajuda - Pular</option>
            <option value="cartas">+1 ajuda - Cartas</option>
            <option value="universitarios">+1 ajuda - Universitarios</option>
          </select>
        </div>
      )}
    </div>
  );
}
