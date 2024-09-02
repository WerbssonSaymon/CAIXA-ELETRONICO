import React from 'react';
import Menu from '../../layout/menu';
import Title from '../../componentes/title';
import { useState, useEffect } from 'react';
import { perguntas, valores } from '../../data/quests';

export default function Jogo() {

  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [jogoTerminado, setJogoTerminado] = useState(false);
  const [mensagemFinal, setMensagemFinal] = useState('');
  const [alternativasEmbaralhadas, setAlternativasEmbaralhadas] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [nome, setNome] = useState('');

  function embaralharPerguntas(arrayPerguntas) {
    return arrayPerguntas.sort(() => Math.random() - 0.5);
  }

  function selecionarPerguntas() {
    const perguntasFaceis = perguntas.filter((p) => p.dificuldade === "fácil");
    const perguntasMedias = perguntas.filter((p) => p.dificuldade === "médio");
    const perguntasDificeis = perguntas.filter((p) => p.dificuldade === "difícil");

    const perguntasEmbaralhadasFaceis = embaralharPerguntas(perguntasFaceis).slice(0, 3);
    const perguntasEmbaralhadasMedias = embaralharPerguntas(perguntasMedias).slice(0, 1);
    const perguntasEmbaralhadasDificeis = embaralharPerguntas(perguntasDificeis).slice(0, 1);

    return [...perguntasEmbaralhadasFaceis, ...perguntasEmbaralhadasMedias, ...perguntasEmbaralhadasDificeis];
  }

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'));

    if (usuariosSalvos) {
      setListaUsuarios(usuariosSalvos);
    }
  }, []);

  useEffect(() => {
    if (nome) {
      const selecaoPerguntas = selecionarPerguntas();
      setPerguntasSelecionadas(selecaoPerguntas);
      
      if (selecaoPerguntas.length > 0) {
        setAlternativasEmbaralhadas(embaralharPerguntas(selecaoPerguntas[0].alternativas));
      }
    }
  }, [nome]);

  function verificarResposta(alternativa) {
    if (perguntasSelecionadas.length > 0 && alternativa === perguntasSelecionadas[perguntaAtual].resposta) {
      const novaPontuacao = pontuacao + valores.acertar[perguntaAtual];
      setPontuacao(novaPontuacao);

      if (perguntaAtual + 1 < perguntasSelecionadas.length) {
        setPerguntaAtual(perguntaAtual + 1);
        setAlternativasEmbaralhadas(embaralharPerguntas(perguntasSelecionadas[perguntaAtual + 1].alternativas));
      } else {
        setMensagemFinal(`Parabéns! Você venceu e ganhou ${novaPontuacao} reais.`);
        setJogoTerminado(true);
      }
    } else {
      const novaPontuacao = pontuacao + valores.errar[perguntaAtual];
      setPontuacao(novaPontuacao);
      setMensagemFinal(`Você errou! Seu prêmio é de ${novaPontuacao} reais.`);
      setJogoTerminado(true);
    }
  }

  function pararJogo() {
    const novaPontuacao = pontuacao + valores.parar[perguntaAtual];
    setPontuacao(novaPontuacao);
    setMensagemFinal(`Você parou! Seu prêmio final é de ${novaPontuacao} reais.`);
    setJogoTerminado(true);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Menu />
      <div className='bg-primary-tertiary d-flex flex-column justify-content-center align-items-center' style={{ flex: 1, width: "100vw" }}>
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
        </div>

        { !jogoTerminado ? (
          <div className='bg-body'>
            {perguntasSelecionadas.length > 0 && (
              <>
                <h2>{perguntasSelecionadas[perguntaAtual].pergunta}</h2>
                {alternativasEmbaralhadas.map((alternativa, index) => (
                  <button className='btn btn-primary' key={index} onClick={() => verificarResposta(alternativa)}>
                    {alternativa}
                  </button>
                ))}
                <button className='btn btn-danger' onClick={pararJogo}>Parar</button>
              </>
            )}
          </div>
        ) : (
          <h2>{mensagemFinal}</h2>
        )}
      </div>
    </div>
  );
}
