import React from 'react'
import Menu from '../../componentes/organisms/menu'
import Title from '../../componentes/atoms/title'
import Label from '../../componentes/atoms/label'
import {useState} from 'react'
import { coletarAlternativas, cadastrarPergunta } from '../../services/perguntaService'

export default function perguntas() {

  const [listaDePerguntas, setListaDePerguntas] = useState([]);
  const [pergunta, setPergunta] = useState('');
  const [alternativas, setAlternativas] = useState(['', '', '', '']);
  const [resposta, setResposta] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [categoria, setCategoria] = useState('')

  
  console.log(localStorage.getItem('perguntas'))
  
  return (

    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Menu />
        <div className='bg-primary-tertiary d-flex flex-column justify-content-center align-items-center' style={{ flex: 1, width: "100vw" }}>
            <Title titulo="Cadastro de perguntas" />

            <div className="p-2 d-grid w-75">
                    <Label text="Digite sua pergunta"/>
                    <input
                    className="form-control border border-primary"
                    type="text"
                    value={pergunta}
                    onChange={(e) => setPergunta(e.target.value)}
                    />

                    <Label text="Escolha as alternativas"/>
                    {alternativas.map((alt, index) => (
                      <div key={index}>
                        <Label text="Alternativa "> {index + 1}:</Label>
                        <input
                          type="text"
                          className="p-2 m-1 border border-primary"
                          value={alt}
                          onChange={(e) => coletarAlternativas(index, e.target.value, alternativas, setAlternativas)}
                        />
                      </div>
                    ))}

                    <Label text="Digite a reposta"></Label>
                    <input
                    className="form-control border border-primary"
                    type="text"
                    value={resposta}
                    onChange={(e) => setResposta(e.target.value)}
                    />

                    <Label text="Escolha a dificuldade:"></Label>
                    <select
                      className="form-select form-select-lg border border-primary" 
                      value={dificuldade} 
                      onChange={(e) => setDificuldade(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="facil">Fácil</option>
                      <option value="medio">Médio</option>
                      <option value="dificil">Difícil</option>
                    </select>

                    <Label text="Digite a categoria"></Label>
                    <input
                    className="form-control border border-primary"
                    type="text"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    />

                    <button
                      className="btn btn-lg btn-success" 
                      onClick={() => cadastrarPergunta(
                        pergunta, alternativas, resposta, dificuldade, categoria, setListaDePerguntas, setPergunta, setAlternativas, setResposta, setDificuldade, setCategoria
                      )}>Confirmar
                    </button>

              </div>
        </div>
    </div>
  )
}
