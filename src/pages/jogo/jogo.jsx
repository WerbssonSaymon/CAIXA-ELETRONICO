import React from "react";
import InterfaceJogo from "../../componentes/templates/interfaceJogo";
import { useState, useEffect, useRef } from "react";
import {
  embaralharPerguntas,
  selecionarPerguntas,
  atualizarHistorico,
} from "../../services/jogoService";
import { selecionarPerguntasTreino } from "../../services/treinamentoService";

export default function Jogo() {
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
    <InterfaceJogo
      setCategoriasSelecionadas={setCategoriasSelecionadas}
      perguntasSelecionadas={perguntasSelecionadas}
      setPerguntasSelecionadas={setPerguntasSelecionadas}
      perguntaAtual={perguntaAtual}
      setPerguntaAtual={setPerguntaAtual}
      pontuacao={pontuacao}
      setPontuacao={setPontuacao}
      setPontuacaoErrar={setPontuacaoErrar}
      setPontuacaoParar={setPontuacaoParar}
      setPontuacaoAcertar={setPontuacaoAcertar}
      jogoTerminado={jogoTerminado}
      setJogoTerminado={setJogoTerminado}
      mensagemFinal={mensagemFinal}
      setMensagemFinal={setMensagemFinal}
      alternativasEmbaralhadas={alternativasEmbaralhadas}
      setAlternativasEmbaralhadas={setAlternativasEmbaralhadas}
      listaUsuarios={listaUsuarios}
      nome={nome}
      setNome={setNome}
      cliques={cliques}
      setCliques={setCliques}
      cartas={cartas}
      setCartas={setCartas}
      grafico={grafico}
      setGrafico={setGrafico}
      loja={loja}
      setLoja={setLoja}
      botaoCartas={botaoCartas}
      setBotaoCartas={setBotaoCartas}
      botaoGrafico={botaoGrafico}
      setBotaoGrafico={setBotaoGrafico}
      iniciar={iniciar}
      setIniciar={setIniciar}
      treinamento={treinamento}
      setTreinamento={setTreinamento}
      setCarregarPerguntas={setCarregarPerguntas}
      setPontuacaoAcertos={setPontuacaoAcertos}
      setPontuacaoErros={setPontuacaoErros}
    />
  );
}
