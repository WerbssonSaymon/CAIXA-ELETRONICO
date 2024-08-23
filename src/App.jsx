import Table from "./componentes/table";
import Input from "./componentes/input";
import Button from './componentes/button';
import Money from './componentes/money';
import Title from './componentes/title'; 

import { useEffect, useState } from "react";

function App() {

  const [saldo, setSaldo ] = useState(1000); // mudar pra calcular
  const [valorSaque, setValorSaque] = useState('');
  const [valorDeposito, setValorDeposito] = useState('');
  const [listaOperacoes, setListaOperacoes] = useState([]);

  useEffect(() => {
    const adicionarOperacao = {
      operacao: 'Valor Inicial',
      valor: saldo,
      data: new Date().toLocaleString() //bug - só o new Date a tela some
    };

    setListaOperacoes([...listaOperacoes, adicionarOperacao]);
  }, [])

  function sacar(){
    if (valorSaque <= saldo && valorSaque > 0){
      let novoSaldo = saldo - valorSaque;
      setSaldo(novoSaldo);
      setValorSaque('')

      const adicionarOperacao = {
        operacao: 'Saque',
        valor: valorSaque,
        data: new Date().toLocaleString() //bug - só o new Date a tela some
      };

      setListaOperacoes([...listaOperacoes, adicionarOperacao]);

    } else {
      alert("erro ao realizar a operação")
      setValorSaque('')
    }
  }

  function depositar(){
    if (valorDeposito > 0){
      let novoSaldo = saldo + valorDeposito;
      setSaldo(novoSaldo);
      setValorDeposito('')

      const adicionarOperacao = {
        operacao: 'Deposito',
        valor: valorDeposito,
        data: new Date().toLocaleString() //bug - só o new Date a tela some
      };

      setListaOperacoes([...listaOperacoes, adicionarOperacao]);

    } else {
      alert("valor não possivel de depositar")
      setValorDeposito('')
    }
  }


  return (
    <>
      <div className="container bg-body rounded">
        
        <Title titulo="caixa eletrônico"/>
        
        <Money saldo={saldo}/>

        <div class="d-grid gap-2">
          <label className="mt-5">Saque seu dinheiro</label>
          <Input value={valorSaque} onChange={e => setValorSaque(Number(e.target.value))}/>
          <Button onClick={sacar} nome="sacar"/>
        </div>
        
        <div class="d-grid gap-2">
          <label className="mt-5">Faça um deposito</label>
          <Input value={valorDeposito} onChange={e => setValorDeposito(Number(e.target.value))}/>
          <Button onClick={depositar} nome="depositar"/>
        </div>
        
        <h3 className="text-center">Historico de movimentação</h3>

        <Table>
          <thead>
            <tr>     
              <th>Operação</th>
              <th>Saldo</th>
              <th>Data de Transação</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {listaOperacoes.map((x, i) => ( //variavel i de index pós meu objeto retornado não tem id pra usar na key
              <tr key={i}>
                <td>{x.operacao} </td>
                <td>{x.valor.toFixed(2)}</td> 
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
