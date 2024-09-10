import React from 'react'

export default function label(params) {
  return (
    <label className=''>
        {params.text}
        {params.children}
    </label>
  )
}
