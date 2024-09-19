import React from 'react'

export default function buttonHelp({ label, botaoEstado, onClick }) {
    return (
      <button
        className={`col-md-3 py-4 btn btn-warning ${botaoEstado ? 'disabled' : ''}`}
        disabled={botaoEstado}
        onClick={onClick}
      >
        {label}
        
      </button>
    );
  }
