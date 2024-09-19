import React from "react";
import Menu from "../organisms/menu";
import Title from "../atoms/title";
import AreaUserBank from "../molecules/areaUserBank";
import BankServices from "../molecules/bankServices";
import ViewExtract from "../molecules/viewExtract";
import FormOperation from "../organisms/formOperation";
import SelectUser from "../atoms/selectUser";
export default function interfaceBanco({
  listaUsuarios,
  setListaUsuarios,
  usuarioSelecionado,
  setUsuarioSelecionado,
  tipoAcao,
  setTipoAcao,
  valor,
  setValor,
  usuarioDestinatario,
  setUsuarioDestinatario,
  listaOperacoes,
  setListaOperacoes,
  calcularSaldo,
  executarMovimentacao,
  lidarComUsuarioSelecionado,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />

      <div
        className="bg-primary-tertiary d-flex justify-content-center align-items-center"
        style={{ flexBasis: "20%", width: "100%", height: "100%" }}
      >
        <div className="col-8">
          <SelectUser
            listaUsuarios={listaUsuarios}
            setUsuarioSelecionado={setUsuarioSelecionado}
            setListaOperacoes={setListaOperacoes}
            usuarioSelecionado={usuarioSelecionado}
            lidarComUsuarioSelecionado={lidarComUsuarioSelecionado}
          />
        </div>
      </div>

      <div
        className="row bg-primary-tertiary d-flex justify-content-around"
        style={{ flexBasis: "80%", width: "100%" }}
      >
        {usuarioSelecionado && (
          <>
            <div className="col-4 py-4 h-50 bg-principal text-white d-flex flex-column justify-content-start rounded-1">
              <AreaUserBank
                usuarioSelecionado={usuarioSelecionado}
                listaUsuarios={listaUsuarios}
                calcularSaldo={calcularSaldo}
              />

              <FormOperation
                tipoAcao={tipoAcao}
                setTipoAcao={setTipoAcao}
                usuarioDestinatario={usuarioDestinatario}
                setUsuarioDestinatario={setUsuarioDestinatario}
                listaUsuarios={listaUsuarios}
                setListaUsuarios={setListaUsuarios}
                valor={valor}
                setValor={setValor}
                setListaOperacoes={setListaOperacoes}
                usuarioSelecionado={usuarioSelecionado}
                calcularSaldo={calcularSaldo}
                executarMovimentacao={executarMovimentacao}
              />
            </div>

            <div className="col-4 h-75 bg-body">
              <div className="row">
                <div className="col bg-principal">
                  <Title titulo="Extrato" cor="white"></Title>
                </div>
              </div>
              <div className="row">
                <ViewExtract listaOperacoes={listaOperacoes} />
              </div>
            </div>
            <BankServices />
          </>
        )}
      </div>
    </div>
  );
}
