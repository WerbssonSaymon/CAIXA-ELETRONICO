import React from 'react'

export default function categoryButton({mudarCategoria, setCategoriasSelecionadas}) {
  return (
    <>
        <h2 className="text-center text-white">Escolha as categorias</h2>
            <div className="btn-group d-flex justify-content-center" role="group" aria-label="Basic radio toggle button group">
              <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off" value="matematica"
              onChange={() => mudarCategoria("matematica", setCategoriasSelecionadas)}/>
              <label className="btn btn-light" htmlFor="btncheck1">Matematica</label>

              <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off" value="portugues"
              onChange={() => mudarCategoria("portugues", setCategoriasSelecionadas)}/>
              <label className="btn btn-light" htmlFor="btncheck2">Portugues</label>

              <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off" value="ciencia"
              onChange={() => mudarCategoria("ciencia", setCategoriasSelecionadas)}/>
              <label className="btn btn-light" htmlFor="btncheck3">Ciencia</label>

              <input type="checkbox" className="btn-check" id="btncheck4" autoComplete="off" value="historia"
              onChange={() => mudarCategoria("historia", setCategoriasSelecionadas)}/>
              <label className="btn btn-light" htmlFor="btncheck4">Historia</label>

              <input type="checkbox" className="btn-check" id="btncheck5" autoComplete="off" value="geografia"
              onChange={() => mudarCategoria("geografia", setCategoriasSelecionadas)}/>
              <label className="btn btn-light" htmlFor="btncheck5">Geografia</label>
            </div>
    </>
  )
}
