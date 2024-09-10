import React from 'react'

export default function buttonHelp({ label, botaoEstado, onClick }) {
    return (
      <button
        className={`btn btn-warning flex-grow-1 ${botaoEstado ? 'disabled' : ''}`}
        disabled={botaoEstado}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
