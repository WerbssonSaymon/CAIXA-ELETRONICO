import React from 'react'
import { useState, useEffect } from 'react'
import Menu from '../../layout/menu'
import Title from '../../componentes/title'
import Table from '../../componentes/table'

export default function banco() {

  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [tipoAcao, setTipoAcao] = useState('');
  const [valor, setValor] = useState('');
  const [usuarioDestinatario, setUsuarioDestinatario] = useState('');
  const [listaOperacoes, setListaOperacoes] = useState([]);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem('usuarios'));

    const primeiraOperacao = {
      operacao: 'Valor Inicial',
      valor: 1000,
      data: new Date().toLocaleString() 
    };

    // {
    //   nome: saymon,
    // }

    if (usuariosSalvos) {
      const usuariosAtualizados = usuariosSalvos.map(usuario => {

        if (!usuario.operacoes || usuario.operacoes.length === 0) {
          return { 
            ...usuario, operacoes: [primeiraOperacao] 
          };
        }
        return usuario;
      });

      // usuario 
      // {
      //   nome: saymon,
      //   operacao: [
      //     {
      //       operacao: 'Valor Inicial',
      //       valor: 1000,
      //       data: new Date().toLocaleString() 
      //     }
      //   ]
      // }

      localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
      setListaUsuarios(usuariosAtualizados);
    }
  }, []);

  function calcularSaldo(usuarioNome){
    const usuario = listaUsuarios.find(usuario => usuario.nome === usuarioNome);
    if (!usuario || !usuario.operacoes) 
      return '0,00';

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
  };

  function executarMovimentacao(){
    
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
      localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
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
      localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));
      setListaOperacoes(usuario.operacoes);
      setValor('');
    }
  };

  function lidarComUsuarioSelecionado(e) {
    const usuarioNomeSelecionado = e.target.value;
    setUsuarioSelecionado(usuarioNomeSelecionado);
  
    const usuarioEncontrado = listaUsuarios.find(usuario => usuario.nome === usuarioNomeSelecionado);
  
    if (usuarioEncontrado && usuarioEncontrado.operacoes) {
      setListaOperacoes(usuarioEncontrado.operacoes);
    } else {
      setListaOperacoes([]);  // Garante que seja uma lista vazia
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Menu />

        <div className='bg-primary-tertiary d-flex justify-content-center align-items-center' style={{ flexBasis: "20%", width: "100%", height: "100%"}}>         
          <div className="col-8">

          <select
            className="form-select form-select-lg border border-primary"
            value={usuarioSelecionado}
            onChange={lidarComUsuarioSelecionado}
          >
            <option value="">Selecione um usuário</option>
            {listaUsuarios.map((x, i) => (
              <option key={i} value={x.nome}>{x.nome}</option>
            ))}
          </select>

         
          </div>

        </div>

        <div className="row bg-primary-tertiary" style={{ flexBasis: "80%", width: "100%"}}>
          
            {usuarioSelecionado && (
              <div className="col-4 p-2 bg-primary text-white fw-3">
                <h3 className='text-center'>Bem vindo(a): {usuarioSelecionado}</h3> 
                <h3 className='text-center'>Saldo atual: {calcularSaldo(usuarioSelecionado)}</h3>

                {usuarioSelecionado && (
                    <div className="p-2">

                    <Title titulo="caixa eletrônico"/>

                    <div className="d-grid gap-2 mt-3">
                      <select className="form-select form-select-lg border border-primary mb-3"
                              value={tipoAcao}
                              onChange={e => setTipoAcao(e.target.value)}
                            >

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
                            className="btn btn-success" 
                            onClick={executarMovimentacao}>Confirmar</button>
                        </>
                      )}
                    </div>
                    </div>)}
            </div>)}


          
            {usuarioSelecionado && (
              <div className="col-8 bg-body">

                  <Title titulo="Historico de movimentação"></Title>
                  
                  <div style={{height: "600px", overflow: "scroll" }}>

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
                              <td>{x.valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td> 
                              <td>{x.data}</td>
                            </tr>
                          ))} 
                        
                      </tbody>

                    
                    </Table>
                  </div>
                  
                </div>)}

        </div>

        
    </div>
  )
}
