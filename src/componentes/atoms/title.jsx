import React from 'react'

export default function title(params) {
  return (
      <h1 className={`fw-bolder fs-2 mt-2 text-center `}>
        {params.titulo}
      </h1>
  )
}
