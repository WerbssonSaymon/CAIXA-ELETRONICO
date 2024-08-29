export function cadastrarUsuario(listaUsuarios, nome, setListaUsuarios, setNome) {

    const usuarioIgual = listaUsuarios.find(usuario => usuario.nome.toLowerCase() === nome.toLowerCase());

    if (usuarioIgual) {
      alert('Já existe um usuário com esse nome.');
      setNome('');
      return;
    }

    if (nome === '') {
      alert('Por favor, defina um nome');
      setNome('');
      return;
    }

    const novoUsuario = {
      nome: nome,
    };

    const novaListaUsuarios = [...listaUsuarios, novoUsuario];
    setListaUsuarios(novaListaUsuarios);
    setNome('');


    localStorage.setItem('usuarios', JSON.stringify(novaListaUsuarios));

    alert(`Usuário ${novoUsuario.nome.toUpperCase()} cadastrado com sucesso`);
  }