import React from "react";
import Menu from "../../layout/menu";
import Title from "../../componentes/title";
import { useState, useEffect } from "react";
import { valores } from "../../data/quests";

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

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"));
    if (usuariosSalvos) {
      setListaUsuarios(usuariosSalvos);
    }
  }, []);

  useEffect(() => {
    if (nome) {
      const selecaoPerguntas = selecionarPerguntas();
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

  function embaralharPerguntas(arrayPerguntas) {
    return arrayPerguntas.sort(() => Math.random() - 0.5);
  }

  function selecionarPerguntas() {
    const perguntas = JSON.parse(localStorage.getItem("perguntas"));
    const perguntasFaceis = perguntas.filter((p) => p.dificuldade === "fácil");
    const perguntasMedias = perguntas.filter((p) => p.dificuldade === "médio");
    const perguntasDificeis = perguntas.filter(
      (p) => p.dificuldade === "difícil"
    );

    const perguntasEmbaralhadasFaceis = embaralharPerguntas(
      perguntasFaceis
    ).slice(0, 3);
    const perguntasEmbaralhadasMedias = embaralharPerguntas(
      perguntasMedias
    ).slice(0, 0);
    const perguntasEmbaralhadasDificeis = embaralharPerguntas(
      perguntasDificeis
    ).slice(0, 0);

    return [
      ...perguntasEmbaralhadasFaceis,
      ...perguntasEmbaralhadasMedias,
      ...perguntasEmbaralhadasDificeis,
    ];
  }

  function verificarResposta(alternativa) {
    if (
      perguntasSelecionadas.length > 0 &&
      alternativa === perguntasSelecionadas[perguntaAtual].resposta
    ) {
      const novaPontuacao = valores.acertar[perguntaAtual];
      setPontuacao(novaPontuacao);
      if (perguntaAtual + 1 < perguntasSelecionadas.length) {
        setPerguntaAtual(perguntaAtual + 1);
        setAlternativasEmbaralhadas(
          embaralharPerguntas(
            perguntasSelecionadas[perguntaAtual + 1].alternativas
          )
        );
      } else {
        setMensagemFinal(
          `Parabéns! Você venceu e ganhou ${novaPontuacao} reais.`
        );
        setJogoTerminado(true);
      }
    } else {
      const novaPontuacao = valores.errar[perguntaAtual];
      setPontuacao(novaPontuacao);
      setMensagemFinal(`Você errou! Seu prêmio é de ${novaPontuacao} reais.`);
      setJogoTerminado(true);
    }
  }

  function pararJogo() {
    const novaPontuacao = valores.parar[perguntaAtual];
    setPontuacao(novaPontuacao);
    setMensagemFinal(
      `Você parou! Seu prêmio final é de ${novaPontuacao} reais.`
    );
    setJogoTerminado(true);
    console.log(novaPontuacao);
  }

  function obterPerguntaNaoUsada(dificuldade) {
    const perguntasSalvas = JSON.parse(localStorage.getItem("perguntas")) || [];
    const perguntasDaMesmaDificuldade = perguntasSalvas.filter(
      (p) =>
        p.dificuldade === dificuldade &&
        !perguntasSelecionadas.some((q) => q.pergunta === p.pergunta)
    );

    return embaralharPerguntas(perguntasDaMesmaDificuldade)[0];
  }

  function pularPergunta() {
    if (perguntasSelecionadas.length > 0) {
      const dificuldadeAtual = perguntasSelecionadas[perguntaAtual].dificuldade;
      const novaPergunta = obterPerguntaNaoUsada(dificuldadeAtual);
      if (novaPergunta) {
        setAlternativasEmbaralhadas(
          embaralharPerguntas(novaPergunta.alternativas)
        );
        setPerguntasSelecionadas((perguntas) => {
          const novasPerguntas = [...perguntas];
          novasPerguntas[perguntaAtual] = novaPergunta;
          return novasPerguntas;
        });
      }
    }
    setCliques((cliques) => cliques + 1);
  }

  function atualizarHistorico(nomeUsuario, novaPontuacao) {
    if (novaPontuacao <= 0) {
      console.log("Valores menores de 1 real não serão registrados");
      return;
    }

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioIndex = usuariosSalvos.findIndex(
      (usuario) => usuario.nome === nomeUsuario
    );

    if (usuarioIndex !== -1) {
      const usuario = usuariosSalvos[usuarioIndex];
      const novaOperacao = {
        operacao: "Jogo",
        valor: novaPontuacao,
        data: new Date().toLocaleString(),
      };

      if (!usuario.operacoes) {
        usuario.operacoes = [];
      }
      usuario.operacoes.push(novaOperacao);
      console.log(novaOperacao);

      usuariosSalvos[usuarioIndex] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));
      console.log(localStorage.getItem("usuarios"));
    }
  }

  function restartarJogo() {
    setPerguntasSelecionadas([]);
    setPerguntaAtual(0);
    setPontuacao(0);
    setJogoTerminado(false);
    setMensagemFinal('');
    setAlternativasEmbaralhadas([]);
    setNome('');
    setCliques(0);
  }

  function eliminarAlternativas(carta) {
    let novasAlternativas = [...alternativasEmbaralhadas];
    const alternativaCorreta = perguntasSelecionadas[perguntaAtual].resposta;
  
    // Filtra as alternativas incorretas
    let alternativasIncorretas = novasAlternativas.filter(
      (alt) => alt !== alternativaCorreta
    );
  
    switch (carta) {
      case "rei":
        alert("nenhuma alternativa removida")
        break;
      case "ás":
        if (alternativasIncorretas.length > 0) {
          alternativasIncorretas = alternativasIncorretas.slice(0, -1); 
          alert("Uma alternativa removida")
        }
        break;
      case "2":
        if (alternativasIncorretas.length > 1) {
          alternativasIncorretas = alternativasIncorretas.slice(0, -2); 
          alert("Dois alternativa removida")
        } 
        break;
      case "3":
        if (alternativasIncorretas.length > 2) {
          alternativasIncorretas = alternativasIncorretas.slice(0, -3);
          alert("Três alternativa removida")
        } 
        break;
      default:
        break;
    }
  
    novasAlternativas = [alternativaCorreta, ...alternativasIncorretas];
    setAlternativasEmbaralhadas(embaralharPerguntas(novasAlternativas));
  }
  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex flex-column justify-content-center align-items-center"
        style={{ flex: 1, width: "100vw" }}
      >
        <Title titulo="Show do Milhão" />
        <div>
          <h2>Selecione um Usuário</h2>
          <select onChange={(e) => setNome(e.target.value)} value={nome}>
            <option value="">Selecione um usuário</option>
            {listaUsuarios.map((usuario, index) => (
              <option key={index} value={usuario.nome}>
                {usuario.nome}
              </option>
            ))}
          </select>
          {nome && <h3>Vamos jogar: {nome}</h3>}
          {<span>{pontuacao}</span>}
        </div>

        {!jogoTerminado ? (
          <div className="bg-body">
            {perguntasSelecionadas.length > 0 && (
              <>
                <h2>{perguntasSelecionadas[perguntaAtual].pergunta}</h2>
                {alternativasEmbaralhadas.map((alternativa, index) => (
                  <button
                    className="btn btn-primary"
                    key={index}
                    onClick={() => verificarResposta(alternativa)}
                  >
                    {alternativa}
                  </button>
                ))}
                <button className="btn btn-danger" onClick={pararJogo}>
                  Parar
                </button>
                <button
                  className={`btn btn-warning ${
                    cliques >= 3 ? "disabled" : ""
                  }`}
                  disabled={cliques >= 3}
                  onClick={pularPergunta}
                >
                  Pular
                </button>
                <div>
                  <h3>Escolha uma carta para eliminar alternativas</h3>
                  <select
                    onChange={(e) => eliminarAlternativas(e.target.value)}
                    className="form-select"
                  >
                    <option value="rei">Rei - Nenhuma alternativa é eliminada</option>
                    <option value="ás">Ás - Elimina uma alternativa errada</option>
                    <option value="2">2 - Elimina 2 alternativas erradas</option>
                    <option value="3">3 - Elimina 3 alternativas erradas</option>
                  </select>
                  <button
                    className="btn btn-primary mt-2"
                    onClick={() => {
                      const cartaSelecionada = document.querySelector(
                        'select.form-select'
                      ).value;
                      eliminarAlternativas(cartaSelecionada);
                    }}
                  >
                    Eliminar Alternativas
                  </button>
                </div>

              </>
            )}
          </div>
        ) : (
          <h2>{mensagemFinal}</h2>
        )}
        <button className="btn btn-warning" onClick={restartarJogo}>
           Reiniciar
        </button>
      </div>
      
    </div>
  );
}
