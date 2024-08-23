import React from 'react'

export default function button({onClick, nome}) {
  return (
    <div>
      <button 
      type="button" 
      className="btn btn-primary btn-lg" 
      onClick={onClick}>
        {nome}
      </button>
    </div>
  )
}
