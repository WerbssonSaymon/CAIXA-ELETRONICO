import React from "react";
import Table from '../atoms/table'
import ViewExtractItem from "./viewExtractItem";

export default function viewExtract({listaOperacoes}) {
  return (
    <div style={{ height: "500px", overflow: "scroll" }}>
      <Table>
        <thead className="bg-principal">
          <tr>
            <th>Operação</th>
            <th>Valor</th>
            <th>Data de Transação</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {listaOperacoes.map((u, i) => (
            <ViewExtractItem
            key={i}
            usuario={u}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
}
