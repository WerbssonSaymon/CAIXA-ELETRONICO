import React from 'react'

export default function table(params) {
  return (
    <div>
      <table className="table table-striped table-hover mt-5">
            {params.children}
      </table>
    </div>
  )
}
