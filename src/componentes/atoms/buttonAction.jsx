import React from 'react';

export default function BotaoAcao({ label, onClick, cor }) {
  return (
    <button className={`btn btn-lg btn-${cor} p-3`} 
    onClick={onClick}>
      {label}
    </button>
  );
}