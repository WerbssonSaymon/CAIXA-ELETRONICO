import React from 'react'

export default function buttonHelp({ label, onClick }) {
    return (
      <button
        className={`btn btn-success py-4 w-100 flex-grow-1'}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }