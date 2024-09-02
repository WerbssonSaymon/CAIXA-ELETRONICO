import React from 'react'

export default function telaJogo() {
  return (
    <div>
      <div className='d-flex flex-column bg-body p-5 w-50'>
              <div>
                <h2>pergunta</h2>
              </div>
              <div className='pt-5 d-flex flex-column gap-3'>
                <button className='btn btn-primary'>resposta 1</button>
                <button className='btn btn-primary'>resposta 2</button>
                <button className='btn btn-primary'>resposta 3</button>
                <button className='btn btn-primary'>resposta 4</button>
              </div>
              <div className='pt-5 d-flex gap-2'>
                <button className='btn btn-success'>Confirmar</button>
                <button className='btn btn-danger'>Parar</button>
              </div>
            </div>
    </div>
  )
}
