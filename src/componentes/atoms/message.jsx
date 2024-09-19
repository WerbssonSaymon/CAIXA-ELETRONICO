import React from 'react'

export default function message({children}) {
  return (
    <h2 className='text-warning text-uppercase'>
      {children}
    </h2>
  )
}
