import React from 'react';

export default function BotaoAcao({ label, onClick, cor }) {
  return (
    <button className={`btn btn-sm btn-${cor} p-2 me-1`} 
    onClick={onClick}>
      {label}
    </button>
  );
}