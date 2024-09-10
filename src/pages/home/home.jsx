import React from 'react'
import Menu from '../../componentes/organisms/menu'
import HeroContent from '../../componentes/molecules/heroContent'

export default function home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Menu />
        <div className='bg-primary-tertiary d-flex justify-content-start align-items-center' 
        style={{ flex: 1,
         width: "100vw",
         backgroundImage: `url(/tela-inicial.jpg)`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat'}}>
            <HeroContent/>
        </div>
    </div>
    
  )
}
