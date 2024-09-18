import React from 'react'
import BoxError from '../molecules/boxError'

export default function interfaceError() {
  return (
    <div id="error-page" className="d-flex align-items-center justify-content-center flex-column" style={{height: "100vh", 
        backgroundImage: `url(/erro.webp)`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'}}>
        <BoxError/>
      </div>
  )
}
