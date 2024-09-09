export function restartarJogo(
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
) {
    setPerguntasSelecionadas([]);
    setCategoriasSelecionadas([]);
    setPerguntaAtual(0);
    setPontuacao(0);
    setJogoTerminado(false);
    setMensagemFinal("");
    setAlternativasEmbaralhadas([]);
    setNome("");
    setCliques(0);
    setGrafico(false);
    setBotaoCartas(0)
    setBotaoGrafico(0)
    setIniciar(false)
  }

export function pararJogo(
    nome,
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
    placar(nome, novaPontuacao)
    console.log(novaPontuacao);
  }

export function iniciarJogo(
  setIniciar
){
  setIniciar(true)
}  

export function mudarCategoria(
  categoria,
  setCategoriasSelecionadas
) {
  setCategoriasSelecionadas((categoriaEscolhida) => {
    if (categoriaEscolhida.includes(categoria)) {
      return categoriaEscolhida.filter((escolha) => escolha !== categoria);
    } else {
      return [...categoriaEscolhida, categoria];
    }
  });
}  
  
// Ajudas do jogo

export function mostrarCartas(
    cartas,
    setCartas,
){
    setCartas(!cartas);
  }

export function mostrarGrafico(
    grafico,
    setGrafico,
    setBotaoGrafico
){
    setGrafico(!grafico);
    setBotaoGrafico((botaoGrafico) => botaoGrafico + 1);
  }

export function mostrarLoja(
  loja,
  setLoja
){
  setLoja(!loja)
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

// Função que adiciona uma nova pergunta não usada
export function perguntaSecreta(
  perguntaAtual,
  perguntasSelecionadas,
  obterPerguntaNaoUsada,
  embaralharPerguntas,
  setPerguntasSelecionadas,
  setAlternativasEmbaralhadas
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
    setAlternativasEmbaralhadas,
    setBotaoCartas
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

    setBotaoCartas((botaoCartas) => botaoCartas + 1)
  }

 // Logica das perguntas 

 export function verificarResposta(
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
) {

    if (
      perguntasSelecionadas.length > 0 &&
      alternativa === perguntasSelecionadas[perguntaAtual].resposta
    ) {
      const pontosSeErrar = valores.errar[perguntaAtual]
      setPontuacaoErrar(pontosSeErrar)
      const pontosSeParar = valores.parar[perguntaAtual]
      setPontuacaoParar(pontosSeParar)
      const proximaPosicao = perguntaAtual + 1 < valoresAtualizados.acertar.length 
        ? perguntaAtual + 1 
        : perguntaAtual;

      const pontosSeAcertar = valores.acertar[proximaPosicao];
      setPontuacaoAcertar(pontosSeAcertar);


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
        placar(nome, novaPontuacao)
      }
    } else {

      const novaPontuacao = valores.errar[perguntaAtual];
      setPontuacao(novaPontuacao);
      setMensagemFinal(`Você errou! Seu prêmio é de ${novaPontuacao} reais.`);
      setJogoTerminado(true);
      placar(nome, novaPontuacao)
    }
  }

  export function embaralharPerguntas(arrayPerguntas) {
    return arrayPerguntas.sort(() => Math.random() - 0.5);
  }

  export function selecionarPerguntas(
    embaralharPerguntas,
    categoriasSelecionadas
  ) {
    const perguntas = JSON.parse(localStorage.getItem("perguntas"));

    if(!perguntas)
      return [];

    const perguntasCategorias = perguntas.filter((p) =>
      categoriasSelecionadas.length === 0 || categoriasSelecionadas.includes(p.categoria)
    )

    const perguntasFaceis = perguntasCategorias.filter((p) => p.dificuldade === "fácil");
    const perguntasMedias = perguntasCategorias.filter((p) => p.dificuldade === "médio");
    const perguntasDificeis = perguntasCategorias.filter(
      (p) => p.dificuldade === "difícil"
    );

    const perguntasEmbaralhadasFaceis = embaralharPerguntas(
      perguntasFaceis
    ).slice(0, 4);
    const perguntasEmbaralhadasMedias = embaralharPerguntas(
      perguntasMedias
    ).slice(0, 4);
    const perguntasEmbaralhadasDificeis = embaralharPerguntas(
      perguntasDificeis
    ).slice(0, 4);

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

  export function comprarAjuda(e, nomeUsuario, setCliques, refSelectLoja, setBotaoCartas, setBotaoGrafico, calcularSaldo) {

    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioIndex = usuariosSalvos.findIndex(
      (usuario) => usuario.nome === nomeUsuario
    );
  
    if (usuarioIndex === -1) {
      alert("Usuário não encontrado.");
      return;
    }
  
    const usuario = usuariosSalvos[usuarioIndex];
    const saldoAtual = calcularSaldo(nomeUsuario, usuariosSalvos);
    let valorAjuda;
  
    switch (e) {
      case "pular":
        valorAjuda = 2500;
        break;
      case "cartas":
        valorAjuda = 3500;
        break;
      case "universitarios":
        valorAjuda = 1500;
        break;
      default:
        return;
    }
  
    const transacaoBemSucedida = saldoAtual >= valorAjuda;
  
    if (transacaoBemSucedida) {
      const novaOperacao = {
        operacao: "Comprar",
        valor: valorAjuda,
        data: new Date().toLocaleString(),
      };
  
      if (!usuario.operacoes) {
        usuario.operacoes = [];
      }
  
      usuario.operacoes.push(novaOperacao);
      usuariosSalvos[usuarioIndex] = usuario;
      localStorage.setItem("usuarios", JSON.stringify(usuariosSalvos));
  
      switch (e) {
        case "pular":
          setCliques((cliques) => cliques - 1);
          break;
        case "cartas":
          setBotaoCartas((botaoCartas) => botaoCartas - 1);
          break;
        case "universitarios":
          setBotaoGrafico((botaoGrafico) => botaoGrafico - 1);
      }

      if (refSelectLoja && refSelectLoja.current) {
        refSelectLoja.current.value = "";
      }
  
      alert("Compra realizada com sucesso.");
    } else {
      alert("Saldo insuficiente para essa ajuda.");
    }
  }

  // placar

  export function placar(nomeUsuario, novaPontuacao){

    const placar = JSON.parse(localStorage.getItem("placar")) || []

    const usuarioIndex = placar.findIndex((usuario) => usuario.nome === nomeUsuario)
    if (usuarioIndex !== -1) {
      if (placar[usuarioIndex].pontuacao < novaPontuacao){
        placar[usuarioIndex].pontuacao = novaPontuacao
      }
    } else {
      placar.push({
        nome: nomeUsuario,
        pontuacao: novaPontuacao,
      })
    }

    placar.sort((a, b) => b.pontuacao - a.pontuacao)
    localStorage.setItem("placar", JSON.stringify(placar))
  }
 