import React from "react";
import Grafico from '../atoms/grafich'

export default function areaGrafich({ setGrafico }) {
  return (
    <div className="w-100 d-flex flex-column align-items-center justify-content-center">
      <Grafico />
      <button
        className="w-100 mt-1 mb-3 btn btn-danger text-white flex-grow-1"
        onClick={() => setGrafico(false)}
      >
        X
      </button>
    </div>
  );
}
