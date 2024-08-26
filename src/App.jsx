import Table from "./componentes/table";
import Title from './componentes/title'; 

import { useEffect, useState } from "react";

function App() {

  const [valor, setValor] = useState('');
  const [tipoAcao, setTipoAcao] = useState('')
  const [listaOperacoes, setListaOperacoes] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [nome, setNome] = useState('')
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');

  useEffect(() => {
    const primeiraOperacao = {
      operacao: 'Valor Inicial',
      valor: 1000,
      data: new Date().toLocaleString() //bug - só o new Date a tela some
    };

    setListaOperacoes([primeiraOperacao]);
  }, [])


  function cadastrarUsuario(){

    const usuarioIgual = listaUsuarios.find(usuario => usuario.nome.toLowerCase() === nome.toLowerCase())

    if (usuarioIgual) {
      alert('Já existe um usuário com esse nome.');
      setNome('')
      return;
    }

    if (nome === ""){
      alert('Por favor, defina um nome');
      setNome('')
      return;
    }

    const novoUsuario = {
      nome: nome
    }

    setListaUsuarios([...listaUsuarios, novoUsuario])
    setNome('')

  }



  function calcularSaldo() {

    let saldo = 0; 

    listaOperacoes.forEach(x => {
      if (x.operacao === "Depositar" ) {
        saldo += x.valor;    
      } else if (x.operacao === "Sacar") {
        saldo -= x.valor; 
      } else {
        saldo = x.valor; // Inicia com o valor 1000, sem esse ELSE ele inicia com 0
      }
    });

    return saldo.toFixed(2);
  }


  function executarMovimentacao() {

    let valorInput = Number(valor)

    if (tipoAcao === 'Depositar' && valorInput <= 0) {
      alert('O valor do depósito deve ser maior que 0.');
      setValor('');
      return;
    }

    if (tipoAcao === 'Sacar') {
      let saldoAtual = calcularSaldo();

      if (valorInput <= 0) {
        alert('O valor do saque deve ser maior que 0.');
        setValor('');
        return;
      }

      if (valorInput > saldoAtual) {
        alert('Saldo insuficiente para o saque.');
        setValor('');
        return;
      }
    }
    
    const novaOperacao = {
      operacao: tipoAcao,
      valor: valorInput,
      data: new Date().toLocaleString()
    };

    setListaOperacoes([...listaOperacoes, novaOperacao]);
    setValor('');
  }


  return (
    <>
      <div className="container bg-body rounded col-lg-12">

        <div className="row p-2 bg-primary">
              {/* <p className="fs-3 pt-2 text-start">Bem vindo</p> */}
              <p className="fs-3 pt-2 text-end text-white fw-semibold">Saldo atual: {calcularSaldo()}</p>
              {/* {listaUsuarios.map((x, i) => ( 
                <>
                  <p key={i}></p>
                  <p>{x.nome}</p>
                </>
              ))} */}
        </div>


        <div className="row p-5">

          <p>Cadastre o usuario</p>

          <input
            className="form-control"
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />
          <button
            className="btn btn-primary" 
            onClick={cadastrarUsuario}>Confirmar
          </button>

          <select
                className="form-select form-select-lg mb-3"
                value={usuarioSelecionado}
                onChange={e => setUsuarioSelecionado(e.target.value)}>
                <option value="">Selecione um usuário</option>
                {listaUsuarios.map((x, i) => (
                  <option key={i} value={x.nome}>{x.nome}</option>
                ))}
              </select>

        </div>





        <div className="row p-5">

          <div className="col-md-6 p-5">

            <Title titulo="caixa eletrônico"/>

            <div className="d-grid gap-2 mt-3">
              <select className="form-select form-select-lg mb-3"
                      value={tipoAcao}
                      onChange={e => setTipoAcao(e.target.value)}>

                  <option value="DEFAULT">Escolha uma opção</option>
                  <option value="Sacar">Sacar</option>
                  <option value="Depositar">Depositar</option>
              </select>

              {tipoAcao && tipoAcao != "DEFAULT"  && (
                <>
                  <input
                    className="form-control"
                    type="number"
                    placeholder={tipoAcao}
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                  />
                  <button
                    className="btn btn-primary" 
                    onClick={executarMovimentacao}>Confirmar</button>
                </>
              )}
            </div>
          </div>
          
          <div className="col-md-6 p-5">

            <Title titulo="Historico de movimentação"></Title>
            
            <div style={{height: "400px", overflow: "scroll" }}>

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
            
          </div>

        </div>
      </div>
        
    </>
  )
}

export default App
