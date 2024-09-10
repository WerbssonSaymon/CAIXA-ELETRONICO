import React from 'react'

export default function buttonHelp({ label, onClick }) {
    return (
      <button
        className={`btn btn-success flex-grow-1'}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }