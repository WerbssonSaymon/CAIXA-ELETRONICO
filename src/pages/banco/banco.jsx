import React from "react";
import { useState, useEffect } from "react";

import {
  calcularSaldo,
  executarMovimentacao,
  lidarComUsuarioSelecionado,
} from "../../services/bancoService";
import "../../main.css";
import InterfaceBanco from "../../componentes/templates/interfaceBanco";

export default function banco() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");
  const [tipoAcao, setTipoAcao] = useState("");
  const [valor, setValor] = useState("");
  const [usuarioDestinatario, setUsuarioDestinatario] = useState("");
  const [listaOperacoes, setListaOperacoes] = useState([]);

  useEffect(() => {
    const usuariosSalvos = JSON.parse(localStorage.getItem("usuarios"));

    const primeiraOperacao = {
      operacao: "Valor Inicial",
      valor: 1000,
      data: new Date().toLocaleString(),
    };

    if (usuariosSalvos) {
      const usuariosAtualizados = usuariosSalvos.map((usuario) => {
        if (!usuario.operacoes || usuario.operacoes.length === 0) {
          return {
            ...usuario,
            operacoes: [primeiraOperacao],
          };
        }
        return usuario;
      });

      localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
      setListaUsuarios(usuariosAtualizados);
    }
  }, []);

  return (
    <InterfaceBanco
      listaUsuarios={listaUsuarios}
      setListaUsuarios={setListaUsuarios}
      usuarioSelecionado={usuarioSelecionado}
      setUsuarioSelecionado={setUsuarioSelecionado}
      tipoAcao={tipoAcao}
      setTipoAcao={setTipoAcao}
      valor={valor}
      setValor={setValor}
      usuarioDestinatario={usuarioDestinatario}
      setUsuarioDestinatario={setUsuarioDestinatario}
      listaOperacoes={listaOperacoes}
      setListaOperacoes={setListaOperacoes}
      calcularSaldo={calcularSaldo}
      executarMovimentacao={executarMovimentacao}
      lidarComUsuarioSelecionado={lidarComUsuarioSelecionado}
    />
  );
}
