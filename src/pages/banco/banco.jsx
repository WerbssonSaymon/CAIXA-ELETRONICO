import React from 'react'
import Menu from '../../layout/menu'

export default function banco() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Menu />
        <div className='bg-primary-tertiary d-flex justify-content-center align-items-center' style={{ flex: 1, width: "100vw" }}>
            banco
        </div>
    </div>
  )
}
