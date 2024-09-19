import React from "react";

export default function selectUser({listaUsuarios, setUsuarioSelecionado, setListaOperacoes, usuarioSelecionado, lidarComUsuarioSelecionado}) {
  return (
    <select
      className="form-select form-select-lg border border-primary"
      value={usuarioSelecionado}
      onChange={(e) =>
        lidarComUsuarioSelecionado(
          e,
          listaUsuarios,
          setUsuarioSelecionado,
          setListaOperacoes
        )
      }
    >
      <option value="">Selecione um usuário</option>
      {listaUsuarios.map((x, i) => (
        <option key={i} value={x.nome}>
          {x.nome}
        </option>
      ))}
    </select>
  );
}
