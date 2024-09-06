import React from 'react'

export default function shop({
    refSelectLoja,
    label,
    onChange
}) {
  return (
    <div style={{ zIndex: "1" }}>
                  <select
                    ref={refSelectLoja}
                    onChange={onChange}
                    className="form-select form-select-lg border border-primary mb-3"
                  >
                    <option value="">{label}</option>
                    <option value="pular">+1 ajuda - Pular</option>
                    <option value="cartas">+1 ajuda - Cartas</option>
                    <option value="universitarios">
                      +1 ajuda - Universitarios
                    </option>
                  </select>
                </div>
  )
}
