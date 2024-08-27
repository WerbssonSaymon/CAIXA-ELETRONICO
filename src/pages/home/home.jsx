import React from 'react'
import Menu from '../../layout/menu'
import Title from '../../componentes/title'

export default function home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Menu />
        <div className='bg-primary-tertiary d-flex justify-content-center align-items-center' style={{ flex: 1, width: "100vw" }}>
            <Title titulo="Sistema Caixa Eletrônico" />
        </div>
    </div>
    
  )
}
