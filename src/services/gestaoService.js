export function removerUsuario(nomeUsuario, listaUsuarios, setListaUsuarios){
    const novaListaUsuarios = listaUsuarios.filter(usuario => usuario.nome !== nomeUsuario)

    setListaUsuarios(novaListaUsuarios)
    localStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios))
}

export function limparUsuarios(){
    localStorage.removeItem('usuarios');
    window.location.reload(false);
}

export function calcularSaldo(usuarioNome, listaUsuarios){
    const usuario = listaUsuarios.find(usuario => usuario.nome === usuarioNome);
    if (!usuario || !usuario.operacoes) 
      return '0,00';

    return usuario.operacoes.reduce((saldo, o) => {
      if (o.operacao.startsWith('Depositar'))
        return saldo + o.valor;
      if (o.operacao.startsWith('Sacar'))
        return saldo - o.valor;
      if (o.operacao.startsWith('Debito - '))
        return saldo - o.valor;
      if (o.operacao.startsWith('Credito - '))
        return saldo + o.valor;
      if (o.operacao.startsWith("Jogo")) 
        return saldo + o.valor;
      return saldo = o.valor;
  }, 0);
};

