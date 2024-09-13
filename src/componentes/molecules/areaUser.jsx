import React from "react";

export default function areaUser({
  nome,
  setNome,
  listaUsuarios,
  iniciarJogo,
  setIniciar,
  iniciarTreinamento,
  setTreinamento,
}) {
  return (
    <>
      <h2 className="text-center text-white my-4">Selecione um jogador</h2>
      <select
        className="form-select form-select-lg border border-primary"
        onChange={(e) => setNome(e.target.value)}
        value={nome}
      >
        <option value="">Quem vai jogar?</option>
        {listaUsuarios.map((usuario, index) => (
          <option key={index} value={usuario.nome}>
            {usuario.nome}
          </option>
        ))}
      </select>
      <div className="w-100 d-flex">
      <button
        className="w-100 btn btn-lg btn-primary text-uppercase border border-5 border-light mt-2 me-1"
        onClick={() => iniciarJogo(setIniciar)}
      >
        Começar jogo
      </button>
      <button
        className="w-100 btn btn-lg btn-primary text-uppercase border border-5 border-light mt-2"
        onClick={() => iniciarTreinamento(setTreinamento)}
      >
        Iniciar treinamento
      </button>
      </div>
    </>
  );
}
