export function sairTreinamento(
    setPerguntasSelecionadas,
    setCategoriasSelecionadas,
    setPerguntaAtual,
    setPontuacao,
    setJogoTerminado,
    setAlternativasEmbaralhadas,
    setTreinamento
) {
    setPerguntasSelecionadas([]);
    setCategoriasSelecionadas([]);
    setPerguntaAtual(0);
    setPontuacao(0);
    setJogoTerminado(false);
    setAlternativasEmbaralhadas([]);
    setTreinamento(false);
  }

export function iniciarTreinamento(
    setTreinamento
){
    setTreinamento(true)
  }

  export function verificarRespostaTreino(
    alternativa,
    perguntasSelecionadas,
    perguntaAtual,
    setPontuacaoAcertos,
    setPontuacaoErros,
    setPerguntaAtual,
    setAlternativasEmbaralhadas,
    embaralharPerguntas
  ) {
    if (
      perguntasSelecionadas.length > 0 &&
      alternativa === perguntasSelecionadas[perguntaAtual].resposta
    ) {

      const novaPontuacaoAcertos = 1;
      setPontuacaoAcertos(acertos => acertos + novaPontuacaoAcertos);
  
      const proximaPosicao = (perguntaAtual + 1) % perguntasSelecionadas.length;
      setPerguntaAtual(proximaPosicao);
      setAlternativasEmbaralhadas(
        embaralharPerguntas(perguntasSelecionadas[proximaPosicao].alternativas)
      );
    } else {

      const novaPontuacaoErros = 1;
      setPontuacaoErros(erros => erros + novaPontuacaoErros);

      const proximaPosicao = (perguntaAtual + 1) % perguntasSelecionadas.length;
      setPerguntaAtual(proximaPosicao);
      setAlternativasEmbaralhadas(
        embaralharPerguntas(perguntasSelecionadas[proximaPosicao].alternativas)
      );
    }
  }
  

  export function selecionarPerguntasTreino(
    embaralharPerguntas,
    categoriasSelecionadas
  ) {
    const perguntas = JSON.parse(localStorage.getItem("perguntas"));
  
    if (!perguntas) 
        return [];
  
    const perguntasCategorias = perguntas.filter((p) =>
      categoriasSelecionadas.length === 0 ||
      categoriasSelecionadas.includes(p.categoria)
    );
  
    const perguntasFaceis = perguntasCategorias.filter((p) => p.dificuldade === "fácil");
    const perguntasMedias = perguntasCategorias.filter((p) => p.dificuldade === "médio");
    const perguntasDificeis = perguntasCategorias.filter((p) => p.dificuldade === "difícil");
  
    const perguntasEmbaralhadasFaceis = embaralharPerguntas(perguntasFaceis).slice(0, 4);
    const perguntasEmbaralhadasMedias = embaralharPerguntas(perguntasMedias).slice(0, 4);
    const perguntasEmbaralhadasDificeis = embaralharPerguntas(perguntasDificeis).slice(0, 4);
  
    return [
      ...perguntasEmbaralhadasFaceis,
      ...perguntasEmbaralhadasMedias,
      ...perguntasEmbaralhadasDificeis,
    ];
  }
  