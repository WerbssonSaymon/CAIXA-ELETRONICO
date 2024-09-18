import React from 'react'

export default function areaUserBank({usuarioSelecionado, listaUsuarios, calcularSaldo}) {
  return (
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
  )
}
