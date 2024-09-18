import React from "react";

export default function viewExtractItem({usuario, index}) {
  return (
    <tr key={index}>
      <td>{usuario.operacao} </td>
      <td>
        {usuario.valor.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </td>
      <td>{usuario.data}</td>
    </tr>
  );
}
