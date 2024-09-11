import React from "react";
import { useState, useEffect } from "react";
import Menu from "../../componentes/organisms/menu";
import Title from "../../componentes/atoms/title";
import Table from "../../componentes/atoms/table";
import {
  calcularSaldo,
  executarMovimentacao,
  lidarComUsuarioSelecionado,
} from "../../services/bancoService";
import "../../main.css";

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
        </div>
      </div>

      <div
        className="row bg-primary-tertiary d-flex justify-content-around"
        style={{ flexBasis: "80%", width: "100%" }}
      >
        {usuarioSelecionado && (
          <div className="col-4 py-4 h-50 bg-principal text-white d-flex flex-column justify-content-start rounded-1">
            <div className="d-flex align-items-start w-100 justify-content-between">
              <div className="d-flex">
                <i className="fa-solid fa-user mx-2 fs-1"></i>
                <div className="d-flex flex-column align-items-start">
                  <p>
                    {usuarioSelecionado}
                    <br></br>
                    Saldo:{" "}
                    {calcularSaldo(
                      usuarioSelecionado,
                      listaUsuarios
                    ).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <i className="fa-solid fa-eye-slash fs-4 mx-1"></i>
                <i className="fa-solid fa-bell fs-4 mx-1"></i>
                <i className="fa-solid fa-lock fs-4 mx-1"></i>
              </div>
            </div>

            {usuarioSelecionado && (
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
            )}
 
          </div>
        )}

        {usuarioSelecionado && (
          <div className="col-4 h-75 bg-body">
            <div className="row">
              <div className="col bg-principal">
                <Title titulo="Extrato" cor="white"></Title>
              </div>
            </div>
            <div className="row">
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
          </div>
        )}

        {usuarioSelecionado && (
          <div className="col-2 bg-principal h-50 d-flex flex-column align-items-center justify-content-center rounded">
            <h3 className="text-white">Serviços</h3>
            <div className="d-flex flex-column justify-content-between">
              <button className="btn btn-light my-1 d-flex align-items-center">
              <i className="fs-3 mx-3 fa-solid fa-credit-card"></i>
              Cartôes
              </button>
              <button className="btn btn-light my-1 d-flex align-items-center">
              <i className="fs-3 mx-3 fa-solid fa-qrcode"></i>
              QR Code
              </button>
              <button className="btn btn-light my-1 d-flex align-items-center">
              <i className="fs-3 mx-3 fa-solid fa-code-compare"></i>
              Troca de credito
              </button>
              <button className="btn btn-light my-1 d-flex align-items-center">
              <i className="fs-3 mx-3 fa-solid fa-money-bill-trend-up"></i>
              Investimento
              </button>
              <button className="btn btn-light my-1 d-flex align-items-center">
              <i className="fs-3 mx-3 fa-solid fa-mobile-screen-button"></i>
              Recarga
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
