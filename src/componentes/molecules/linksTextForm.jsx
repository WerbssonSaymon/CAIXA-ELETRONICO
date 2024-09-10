import React from 'react'
import Minititle from '../atoms/minititle'

export default function linksTextForm({texto, paragrafo}) {
  return (
    <div className='d-flex align-items-center justify-content-between'>
      <Minititle texto={texto}/>
      <p className='text-primary fw-medium'>{paragrafo}</p>
    </div>
  )
}
