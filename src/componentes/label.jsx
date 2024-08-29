import React from 'react'

export default function label(params) {
  return (
    <label className='fs-3'>
        {params.text}
        {params.children}
    </label>
  )
}
