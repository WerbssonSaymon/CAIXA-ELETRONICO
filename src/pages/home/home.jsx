import React from 'react'
import Menu from '../../componentes/organisms/menu'
import Title from '../../componentes/atoms/title'

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
