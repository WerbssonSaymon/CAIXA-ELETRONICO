import Table from "./componentes/table";
import Title from './componentes/title'; 

import { useEffect, useState } from "react";

function App() {

  const [valor, setValor] = useState('');
  const [tipoAcao, setTipoAcao] = useState('')
  const [listaOperacoes, setListaOperacoes] = useState([]);

  useEffect(() => {
    const primeiraOperacao = {
      operacao: 'Valor Inicial',
      valor: 1000,
      data: new Date().toLocaleString() //bug - só o new Date a tela some
    };

    setListaOperacoes([primeiraOperacao]);
  }, [])

  function calcularSaldo() {

    let saldo = 0; 

    listaOperacoes.forEach(x => {
      if (x.operacao === "depositar") {
        saldo += x.valor; 
      } else if (x.operacao === "sacar") {
        saldo -= x.valor; 
      } else {
        saldo = x.valor; // Inicia com o valor 1000, sem esse ELSE ele inicia com 0
      }
    });

    return saldo.toFixed(2);
  }

  function executarMovimentacao() {
    
    const novaOperacao = {
      operacao: tipoAcao,
      valor: Number(valor), 
      data: new Date().toLocaleString()
    };

    setListaOperacoes([...listaOperacoes, novaOperacao]);
    setValor('');
  }


  return (
    <>
      <div className="container bg-body rounded">
        
        <Title titulo="caixa eletrônico"/>
        
        <span>{calcularSaldo()}</span>

        <div className="d-grid gap-2">
          <select className="form-select form-select-lg mb-3"
                  value={tipoAcao}
                  onChange={e => setTipoAcao(e.target.value)}>
            <option value="DEFAULT">Escolha uma opção</option>
            <option value="sacar">Sacar</option>
            <option value="depositar">Depositar</option>
          </select>

          {tipoAcao && tipoAcao != "DEFAULT"  && (
            <>
              <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
              />
              <button onClick={executarMovimentacao}>Confirmar</button>
            </>
          )}
        </div>
        
        <h3 className="text-center">Historico de movimentação</h3>

        <Table>
          <thead>
            <tr>     
              <th>Operação</th>
              <th>Valor</th>
              <th>Data de Transação</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {listaOperacoes.map((x, i) => ( //variavel i de index pós meu objeto retornado não tem id pra usar na key
              <tr key={i}>
                <td>{x.operacao} </td>
                <td>R$ {x.valor.toFixed(2)}</td> 
                <td>{x.data}</td>
              </tr>
            ))} 
          </tbody>
        </Table>
      </div>
        
    </>
  )
}

export default App
