import React from 'react'

export default function areaUser({ nome, setNome, listaUsuarios, iniciarJogo, setIniciar }) {
  return (
    <>
      <h2 className="text-center my-4">Selecione um jogador</h2>
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
      <button
        className="btn btn-lg btn-success w-100"
        onClick={() => iniciarJogo(setIniciar)}
      >
        Começar jogo
      </button>
    </>
  )
}
