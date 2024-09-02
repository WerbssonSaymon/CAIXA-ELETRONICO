export function calcularSaldo(usuarioNome, listaUsuarios) {
  if (!listaUsuarios || !usuarioNome) {
    return 0;
  }

  const usuario = listaUsuarios.find((usuario) => usuario.nome === usuarioNome);

  if (!usuario || !usuario.operacoes) {
    return 0;
  }

  return usuario.operacoes.reduce((saldo, o) => {
    if (o.operacao.startsWith("Depositar")) return saldo + o.valor;
    if (o.operacao.startsWith("Sacar")) return saldo - o.valor;
    if (o.operacao.startsWith("Debito - ")) return saldo - o.valor;
    if (o.operacao.startsWith("Credito - ")) return saldo + o.valor;
    if (o.operacao.startsWith("Jogo")) return saldo + o.valor;
    return (saldo = o.valor);
  }, 0);
}

export function executarMovimentacao(
  valor,
  listaUsuarios,
  usuarioSelecionado,
  tipoAcao,
  usuarioDestinatario,
  setValor,
  setListaUsuarios,
  setListaOperacoes,
  setUsuarioDestinatario,
  calcularSaldo
) {
  const usuario = listaUsuarios.find(
    (usuario) => usuario.nome === usuarioSelecionado
  );

  if (!usuario) {
    alert("Selecione um usuário.");
    return;
  }

  let valorInput = Number(valor);

  if (tipoAcao === "Depositar" && valorInput <= 0) {
    alert("O valor do depósito deve ser maior que 0.");
    setValor("");
    return;
  }

  if (tipoAcao === "Sacar") {
    let saldoAtual = calcularSaldo(usuarioSelecionado, listaUsuarios);

    if (valorInput <= 0) {
      alert("O valor do saque deve ser maior que 0.");
      setValor("");
      return;
    }

    if (valorInput > saldoAtual) {
      alert("Saldo insuficiente para o saque.");
      setValor("");
      return;
    }
  }

  if (tipoAcao === "Transferir") {
    const usuarioDeDestino = listaUsuarios.find(
      (usuario) => usuario.nome === usuarioDestinatario
    );
    let saldoAtual = calcularSaldo(usuarioSelecionado, listaUsuarios);

    if (!usuarioDeDestino) {
      alert("Selecione um destinatário válido.");
      return;
    }

    if (valorInput <= 0) {
      alert("O valor da transferência deve ser maior que 0.");
      setValor("");
      return;
    }

    if (valorInput > saldoAtual) {
      alert("Saldo insuficiente para a transferência.");
      setValor("");
      return;
    }

    const novaOperacao = {
      operacao: "Debito - " + usuarioDestinatario,
      valor: valorInput,
      data: new Date().toLocaleString(),
    };

    const novaOperacaoDestinatario = {
      operacao: "Credito - " + usuarioSelecionado,
      valor: valorInput,
      data: new Date().toLocaleString(),
    };

    usuario.operacoes.push(novaOperacao);
    usuarioDeDestino.operacoes.push(novaOperacaoDestinatario);
  } else {
    const novaOperacao = {
      operacao: tipoAcao,
      valor: valorInput,
      data: new Date().toLocaleString(),
    };

    usuario.operacoes.push(novaOperacao);
  }

  const usuariosAtualizados = listaUsuarios.map((u) => {
    if (u.nome === usuarioSelecionado) {
      return { ...u, operacoes: usuario.operacoes };
    }
    if (tipoAcao === "Transferir" && u.nome === usuarioDestinatario) {
      return { ...u, operacoes: u.operacoes };
    }
    return u;
  });

  setListaUsuarios(usuariosAtualizados);
  localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
  setListaOperacoes(usuario.operacoes);
  setValor("");
  setUsuarioDestinatario("");
}

export function lidarComUsuarioSelecionado(e, listaUsuarios, setUsuarioSelecionado, setListaOperacoes) {
    const usuarioNomeSelecionado = e.target.value;
    setUsuarioSelecionado(usuarioNomeSelecionado);

    const usuarioEncontrado = listaUsuarios.find(
      (usuario) => usuario.nome === usuarioNomeSelecionado
    );

    if (usuarioEncontrado && usuarioEncontrado.operacoes) {
      setListaOperacoes(usuarioEncontrado.operacoes);
    } else {
      setListaOperacoes([]);
    }
  }