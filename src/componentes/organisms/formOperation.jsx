import React from 'react'

export default function formOperation({tipoAcao, setTipoAcao, usuarioDestinatario, setUsuarioDestinatario, listaUsuarios, setListaUsuarios, valor, setValor,
    setListaOperacoes, usuarioSelecionado, calcularSaldo, executarMovimentacao
}) {
  return (
    <div className="p-2">
    <div className="d-grid gap-2 mt-3">
      <select
        className="form-select form-select-lg border border-primary mb-3"
        value={tipoAcao}
        onChange={(e) => setTipoAcao(e.target.value)}
      >
        <option value="DEFAULT">Escolha uma opção</option>
        <option value="Sacar">Sacar</option>
        <option value="Depositar">Depositar</option>
        <option value="Transferir">Transferir</option>
      </select>

      {tipoAcao && tipoAcao !== "DEFAULT" && (
        <>
          {tipoAcao === "Transferir" && (
            <select
              className="form-select form-select-lg border border-primary mb-3"
              value={usuarioDestinatario}
              onChange={(e) =>
                setUsuarioDestinatario(e.target.value)
              }
            >
              <option value="">Escolha um usuario</option>
              {listaUsuarios
                .filter(
                  (usuario) => usuario.nome !== usuarioSelecionado
                )
                .map((x, i) => (
                  <option key={i} value={x.nome}>
                    {x.nome}
                  </option>
                ))}
            </select>
          )}

          <input
            className="form-control border border-primary"
            type="number"
            placeholder={tipoAcao}
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
          <button
            className="btn btn-success"
            onClick={() =>
              executarMovimentacao(
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
              )
            }
          >
            Confirmar
          </button>
        </>
      )}
    </div>
  </div>
  )
}
