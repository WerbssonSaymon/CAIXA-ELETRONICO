export function restartarJogo(
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
) {
    setPerguntasSelecionadas([]);
    setPerguntaAtual(0);
    setPontuacao(0);
    setJogoTerminado(false);
    setMensagemFinal("");
    setAlternativasEmbaralhadas([]);
    setNome("");
    setCliques(0);
    setGrafico(false);
    setBotaoCartas(false)
    setBotaoGrafico(false)
  }

export function pararJogo(
    valores,
    perguntaAtual,
    setPontuacao,
    setMensagemFinal,
    setJogoTerminado
) {
    const novaPontuacao = valores.parar[perguntaAtual];
    setPontuacao(novaPontuacao);
    setMensagemFinal(
      `Você parou! Seu prêmio final é de ${novaPontuacao} reais.`
    );
    setJogoTerminado(true);
    console.log(novaPontuacao);
  }
  
// Ajudas do jogo

export function mostrarCartas(
    cartas,
    setCartas,
    setBotaoCartas
){
    setCartas(!cartas)
    setBotaoCartas(true);
  }

export function mostrarGrafico(
    grafico,
    setGrafico,
    setBotaoGrafico
){
    setGrafico(!grafico)
    setBotaoGrafico(true);
  }

export function obterPerguntaNaoUsada(
    dificuldade,
    perguntasSelecionadas,
    embaralharPerguntas
) {
    const perguntasSalvas = JSON.parse(localStorage.getItem("perguntas")) || [];
    const perguntasDaMesmaDificuldade = perguntasSalvas.filter(
      (p) =>
        p.dificuldade === dificuldade &&
        !perguntasSelecionadas.some((q) => q.pergunta === p.pergunta)
    );

    return embaralharPerguntas(perguntasDaMesmaDificuldade)[0];
  }

export function pularPergunta(
    perguntasSelecionadas,
    perguntaAtual,
    obterPerguntaNaoUsada,
    embaralharPerguntas,
    setAlternativasEmbaralhadas,
    setPerguntasSelecionadas,
    setCliques
) {
    if (perguntasSelecionadas.length > 0) {
      const dificuldadeAtual = perguntasSelecionadas[perguntaAtual].dificuldade;
      const novaPergunta = obterPerguntaNaoUsada(
        dificuldadeAtual,
        perguntasSelecionadas,
        embaralharPerguntas
      );
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

export function eliminarAlternativas(
    carta,
    alternativasEmbaralhadas,
    perguntasSelecionadas,
    perguntaAtual,
    embaralharPerguntas,
    setAlternativasEmbaralhadas
) {
    let novasAlternativas = [...alternativasEmbaralhadas];
    const alternativaCorreta = perguntasSelecionadas[perguntaAtual].resposta;

    // Filtra as alternativas incorretas
    let alternativasIncorretas = novasAlternativas.filter(
      (alt) => alt !== alternativaCorreta
    );

    switch (carta) {
      case "rei":
        alert("nenhuma alternativa removida");
        break;
      case "ás":
        if (alternativasIncorretas.length > 0) {
          alternativasIncorretas = alternativasIncorretas.slice(0, -1);
          alert("Uma alternativa removida");
        }
        break;
      case "2":
        if (alternativasIncorretas.length > 1) {
          alternativasIncorretas = alternativasIncorretas.slice(0, -2);
          alert("Dois alternativa removida");
        }
        break;
      case "3":
        if (alternativasIncorretas.length > 2) {
          alternativasIncorretas = alternativasIncorretas.slice(0, -3);
          alert("Três alternativa removida");
        }
        break;
      default:
        break;
    }

    novasAlternativas = [alternativaCorreta, ...alternativasIncorretas];
    setAlternativasEmbaralhadas(embaralharPerguntas(novasAlternativas));
  }

 // Logica das perguntas 

 export function verificarResposta(
    alternativa,
    perguntasSelecionadas,
    perguntaAtual,
    valores,
    setPontuacao,
    setPerguntaAtual,
    setAlternativasEmbaralhadas,
    setMensagemFinal,
    setJogoTerminado,
    embaralharPerguntas,
) {
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

  export function embaralharPerguntas(arrayPerguntas) {
    return arrayPerguntas.sort(() => Math.random() - 0.5);
  }

  export function selecionarPerguntas(
    embaralharPerguntas
  ) {
    const perguntas = JSON.parse(localStorage.getItem("perguntas"));

    const perguntasFaceis = perguntas.filter((p) => p.dificuldade === "fácil");
    const perguntasMedias = perguntas.filter((p) => p.dificuldade === "médio");
    const perguntasDificeis = perguntas.filter(
      (p) => p.dificuldade === "difícil"
    );

    const perguntasEmbaralhadasFaceis = embaralharPerguntas(
      perguntasFaceis
    ).slice(0, 10);
    const perguntasEmbaralhadasMedias = embaralharPerguntas(
      perguntasMedias
    ).slice(0, 7);
    const perguntasEmbaralhadasDificeis = embaralharPerguntas(
      perguntasDificeis
    ).slice(0, 5);

    return [
      ...perguntasEmbaralhadasFaceis,
      ...perguntasEmbaralhadasMedias,
      ...perguntasEmbaralhadasDificeis,
    ];
  }

// intregação com banco

export function atualizarHistorico(
    nomeUsuario,
    novaPontuacao
) {
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