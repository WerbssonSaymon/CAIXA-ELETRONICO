import React from "react";

export default function bankServices() {
  return (
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
  );
}
