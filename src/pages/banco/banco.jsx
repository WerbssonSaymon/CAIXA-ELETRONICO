import React from "react";
import { useState, useEffect } from "react";
import Menu from "../../layout/menu";
import Title from "../../componentes/title";
import Table from "../../componentes/table";
import {
  calcularSaldo,
  executarMovimentacao,
  lidarComUsuarioSelecionado
} from "../../services/bancoService";

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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />

      <div
        className="bg-primary-tertiary d-flex justify-content-center align-items-center"
        style={{ flexBasis: "20%", width: "100%", height: "100%" }}
      >
        <div className="col-8">
          <select
            className="form-select form-select-lg border border-primary"
            value={usuarioSelecionado}
            onChange={(e) => lidarComUsuarioSelecionado(e, listaUsuarios, setUsuarioSelecionado, setListaOperacoes)}
          >
            <option value="">Selecione um usuário</option>
            {listaUsuarios.map((x, i) => (
              <option key={i} value={x.nome}>
                {x.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="row bg-primary-tertiary"
        style={{ flexBasis: "80%", width: "100%" }}
      >
        {usuarioSelecionado && (
          <div className="col-4 p-2 bg-primary text-white fw-3">
            <h3 className="text-center">Bem vindo(a): {usuarioSelecionado}</h3>
            <h3 className="text-center">
              Saldo atual:{" "}
              {calcularSaldo(usuarioSelecionado, listaUsuarios).toLocaleString(
                "pt-br",
                { style: "currency", currency: "BRL" }
              )}
            </h3>

            {usuarioSelecionado && (
              <div className="p-2">
                <Title titulo="caixa eletrônico" />

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
            )}
          </div>
        )}

        {usuarioSelecionado && (
          <div className="col-8 bg-body">
            <Title titulo="Historico de movimentação"></Title>

            <div style={{ height: "600px", overflow: "scroll" }}>
              <Table>
                <thead>
                  <tr>
                    <th>Operação</th>
                    <th>Valor</th>
                    <th>Data de Transação</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {listaOperacoes.map((u, i) => (
                    <tr key={i}>
                      <td>{u.operacao} </td>
                      <td>
                        {u.valor.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td>{u.data}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
