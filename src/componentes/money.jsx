import React from 'react'

export default function money() { 

  return (
    <div>
    <p className={`mt-5 fs-2 `}> 
        <span className="text-dark">Meu Saldo: R$ </span>
         {saldo.toFixed(2)} 
    </p>
    </div>
  )
}
