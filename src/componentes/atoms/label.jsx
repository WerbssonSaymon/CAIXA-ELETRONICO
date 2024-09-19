import React from 'react'

export default function label(params) {
  return (
    <label className={`text-${params.cor} fw-semibold fs-5`}>
        {params.text}
        {params.children}
    </label>
  )
}
