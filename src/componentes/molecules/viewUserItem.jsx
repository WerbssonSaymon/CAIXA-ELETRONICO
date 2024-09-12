import React from "react";
import { calcularSaldo, removerUsuario } from "../../services/cadastroUsuarioService";

export default function viewUserItem({usuario, listaUsuarios, setListaUsuarios}) {
  return (
    <tr>
      <td>{usuario.nome}</td>
      <td>
        <span>
          {calcularSaldo(usuario.nome, listaUsuarios).toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </td>
      <td className="text-end">
        <button
          className="btn btn-danger"
          onClick={() =>
            removerUsuario(usuario.nome, listaUsuarios, setListaUsuarios)
          }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}
