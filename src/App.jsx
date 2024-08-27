import Table from "./componentes/table";
import Title from './componentes/title'; 

import { useState } from "react";

function App() {

  // lista de estados do projeto
  const [valor, setValor] = useState('');
  const [tipoAcao, setTipoAcao] = useState('')
  const [listaOperacoes, setListaOperacoes] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([])
  const [nome, setNome] = useState('')
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [usuarioDestinatario, setUsuarioDestinatario] = useState('');

  // Cadastra, valida, inseri primeira transação e renderiza pelo usuario selecionado
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

    const primeiraOperacao = {
      operacao: 'Valor Inicial',
      valor: 1000,
      data: new Date().toLocaleString() //bug - só o new Date a tela some
    };

    const novoUsuario = {
      nome: nome,
      operacoes: [primeiraOperacao]
    }

    setListaUsuarios([...listaUsuarios, novoUsuario])

    if (usuarioSelecionado === nome) {
      setListaOperacoes([primeiraOperacao]);
    }

    setNome('')
    alert(`usuario ${novoUsuario.nome.toUpperCase()} cadastrado com sucesso`)

  }


  // Faz o calculo de saldo do usuario selecionado
  function calcularSaldo(nomeUsuario) {

    const usuario = listaUsuarios.find(usuario => usuario.nome === nomeUsuario);

    if (!usuario) 
      return null;

    return usuario.operacoes.reduce((saldo, o) => {
      if (o.operacao.startsWith('Depositar'))
        return saldo + o.valor;
      if (o.operacao.startsWith('Sacar'))
        return saldo - o.valor;
      if (o.operacao.startsWith('Transferir para'))
        return saldo - o.valor;
      if (o.operacao.startsWith('Recebido de'))
        return saldo + o.valor;
      return saldo = o.valor;
  }, 0).toFixed(2);
  }

  // Faz validações e inseri novas operações bancarias
  function executarMovimentacao() {

    const usuario = listaUsuarios.find(usuario => usuario.nome === usuarioSelecionado);

    if (!usuario) {
      alert('Selecione um usuário.');
      return;
    }

    let valorInput = Number(valor);

    if (tipoAcao === 'Depositar' && valorInput <= 0) {
      alert('O valor do depósito deve ser maior que 0.');
      setValor('');
      return;
    }

    if (tipoAcao === 'Sacar') {
      let saldoAtual = calcularSaldo(usuarioSelecionado);

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

    if (tipoAcao === "Transferir"){

      const usuarioDeDestino = listaUsuarios.find(usuario => usuario.nome === usuarioDestinatario);
      
      if (!usuarioDeDestino) {
        alert('Selecione um destinatário válido.');
        return;
      }

      const novaOperacao = {
        operacao: 'Transferir para ' + usuarioDestinatario,
        valor: valorInput,
        data: new Date().toLocaleString()
      };
  
      const novaOperacaoDestinatario = {
        operacao: 'Recebido de ' + usuarioSelecionado,
        valor: valorInput,
        data: new Date().toLocaleString()
      };
  
      usuario.operacoes.push(novaOperacao);
      usuarioDeDestino.operacoes.push(novaOperacaoDestinatario);
  
      setListaUsuarios([...listaUsuarios]);
      setListaOperacoes(usuario.operacoes);
      setValor('');
      setUsuarioDestinatario('');

    } else {

      const novaOperacao = {
        operacao: tipoAcao,
        valor: valorInput,
        data: new Date().toLocaleString()
      };
  
      usuario.operacoes.push(novaOperacao);
  
      setListaUsuarios([...listaUsuarios]);
      setListaOperacoes(usuario.operacoes);
      setValor('');
    }

  }

  // Verifica o usuario selecionado e mostra seu historico de transações
  function lidarComUsuarioSelecionado(e) {

    const usuarioNomeSelecionado = e.target.value;
    setUsuarioSelecionado(usuarioNomeSelecionado);
  
    const usuarioEncontrado = listaUsuarios.find(usuario => usuario.nome === usuarioNomeSelecionado);
  
    if (usuarioEncontrado) {
      setListaOperacoes(usuarioEncontrado.operacoes);
    } else {
      setListaOperacoes([]);
    }
  }
  


  return (
    <>

    <main className="container">
      <div className="row bg-body">
        <div className={`container-fluid ${usuarioSelecionado ? 'col-4' : 'col-12'}`}>
          <div className="row p-3">
              <i className="fa-regular fa-user text-center fs-1 mb-2"></i>
              <h3 className="fw-semibold text-center">Cadastre seu usuario</h3>
          </div>

          <div className="p-2 w-full d-grid">
              <input
              className="form-control border border-primary mt-5"
              type="text"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            <button
              className="btn btn-lg btn-primary" 
              onClick={cadastrarUsuario}>Confirmar
            </button>

            <select
                  className="form-select form-select-lg border border-primary my-3"
                  value={usuarioSelecionado}
                  onChange={lidarComUsuarioSelecionado}>
                  <option value="">Selecione um usuário</option>
                  {listaUsuarios.map((x, i) => (
                    <option key={i} value={x.nome}>{x.nome}</option>
                  ))}
              </select>
          </div>
        </div>

        <div className="col-8">
        {usuarioSelecionado && (<div className="p-2">

          <Title titulo="caixa eletrônico"/>

          <div className="d-grid gap-2 mt-3">
            <select className="form-select form-select-lg border border-primary mb-3"
                    value={tipoAcao}
                    onChange={e => setTipoAcao(e.target.value)}>

                <option value="DEFAULT">Escolha uma opção</option>
                <option value="Sacar">Sacar</option>
                <option value="Depositar">Depositar</option>
                <option value="Transferir">Transferir</option>
            </select>

            {tipoAcao && tipoAcao !== "DEFAULT"  && (
              <>

                {tipoAcao === "Transferir" && (
                  <select
                    className="form-select form-select-lg border border-primary mb-3"
                    value={usuarioDestinatario}
                    onChange={e => setUsuarioDestinatario(e.target.value)}
                  >
                      <option value="">Escolha um usuario</option>
                      {listaUsuarios
                        .filter(usuario => usuario.nome !== usuarioSelecionado)
                        .map((x, i) => (
                          <option key={i} value={x.nome}>{x.nome}</option>
                        ))}
                  </select>
                )}

                <input
                  className="form-control border border-primary"
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
          </div>)}
        </div>

      </div>


      <div className="row bg-body">
        
          <div className="col-12">

          {usuarioSelecionado && (<div className="row p-2 bg-primary text-white fw-3 d-flex align-items-center justify-content-center">
              <span>Bem vindo(a): {usuarioSelecionado}</span> 
              <span>Saldo atual: {calcularSaldo(usuarioSelecionado)}</span>
          </div>)}

        <div className="row">
        
          {usuarioSelecionado && (<div className="p-2">

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
                    
                        {listaOperacoes.map((x, i) => ( 
                          <tr key={i}>
                            <td>{x.operacao} </td>
                            <td>R$ {x.valor.toFixed(2)}</td> 
                            <td>{x.data}</td>
                          </tr>
                        ))} 
                      
                    </tbody>

                  
                  </Table>
                </div>
                
              </div>)}

            </div>
          </div>
      </div>
    </main>
        
    </>
  )
}

export default App
