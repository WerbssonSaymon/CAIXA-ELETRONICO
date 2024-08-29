export function removerPergunta(perguntaSelecionada, listaDePerguntas, setListaDePerguntas){
    const novaListaDePerguntas = listaDePerguntas.filter(p => p.pergunta !== perguntaSelecionada)

    setListaDePerguntas(novaListaDePerguntas)
    localStorage.setItem('perguntas', JSON.stringify(novaListaDePerguntas))
}

export function limparPerguntas(){
    localStorage.removeItem('perguntas');
    window.location.reload(false);
}