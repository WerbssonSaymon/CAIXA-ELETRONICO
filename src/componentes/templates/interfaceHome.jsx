import React from 'react'
import Menu from '../organisms/menu'
import HeroContent from '../molecules/heroContent'

export default function interfaceHome() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Menu />
      <div
        className="bg-primary-tertiary d-flex justify-content-start align-items-center"
        style={{
          flex: 1,
          width: "100vw",
          backgroundImage: `url(/tela-inicio.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <HeroContent />
      </div>
    </div>
  )
}
