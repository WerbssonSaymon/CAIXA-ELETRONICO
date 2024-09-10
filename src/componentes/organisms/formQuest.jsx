import React, {useState} from "react";
import Label from '../atoms/label'
import Input from '../atoms/input'
import ButtonAction from '../atoms/buttonAction'
import { coletarAlternativas, cadastrarPergunta } from '../../services/perguntaService'

export default function formQuest({ setListaDePerguntas }) {

    const [pergunta, setPergunta] = useState('');
    const [alternativas, setAlternativas] = useState(['', '', '', '']);
    const [resposta, setResposta] = useState('');
    const [dificuldade, setDificuldade] = useState('');
    const [categoria, setCategoria] = useState('')

  return (
    <form className="row g-3">
      <div className="col-md-6">
      <Label text="Digite sua pergunta" />
      <Input
        type="text"
        value={pergunta}
        onChange={(e) => setPergunta(e.target.value)}
      />

      <Label text="Digite a reposta"></Label>
      <Input
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
      <Input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />

      </div>
    
      <div className="col-md-6">
        {alternativas.map((alt, index) => (
            <div key={index}>
            <Label text="Alternativa "> {index + 1}:</Label>
            <Input
                type="text"
                value={alt}
                onChange={(e) =>
                coletarAlternativas(
                    index,
                    e.target.value,
                    alternativas,
                    setAlternativas
                )
                }
            />
            </div>
        ))}
      </div>

      <div className="col-md-3">
        <ButtonAction
            cor="success"
            label="Confirmar"
            onClick={() =>
            cadastrarPergunta(
                pergunta,
                alternativas,
                resposta,
                dificuldade,
                categoria,
                setListaDePerguntas,
                setPergunta,
                setAlternativas,
                setResposta,
                setDificuldade,
                setCategoria
            )
            }
        />
      </div>

      
    </form>
  );
}
