import React from 'react'

export default function money({saldo}) {

  const corSaldo = saldo > 0 ? 'text-success' : 'text-danger';  

  return (
    <div>
    <p className={`mt-5 fs-2 ${corSaldo}`}> 
        <span className="text-dark">Meu Saldo: R$ </span>
         {saldo.toFixed(2)} 
    </p>
    </div>
  )
}
