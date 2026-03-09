"use client"

import React, { useEffect, useState } from 'react'
import { searchCocktails, randomCocktail } from '../lib/api'
import CocktailCard from '../components/CocktailCard'
import { useRouter } from 'next/navigation'

type Cocktail = any

export default function Home(){
  const [cocktailsLista, setCocktailsLista] = useState<Cocktail[]>([])
  const [loading, setLoading] = useState(false)
  const [ejemploCocktail, setEjemploCocktail] = useState<Cocktail | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('margarita')
  const router = useRouter()

  // Cargo lista inicial (margarita) y defino un ejemplo destacado
  useEffect(() => {
   setLoading(true)
  searchCocktails('margarita')
    .then((list) => {        setCocktailsLista(list)
 if (list && list.length) setEjemploCocktail(list[0]) // cocktail de ejemplo
      })
      .finally(() => setLoading(false))
  }, [])

  async function handleRandom(){
    setLoading(true)
 const d = await randomCocktail()
    setLoading(false)
   if (d?.idDrink) {
      // navegación cliente usando router de Next
      router.push(`/cocktail/${d.idDrink}`)
    }
  }

  // Buscar por término (por nombre)
  async function handleSearch(e?: React.FormEvent){
 if (e) e.preventDefault()
    if (!searchTerm || !searchTerm.trim()) return
    setLoading(true)
    try{
     const res = await searchCocktails(searchTerm.trim())
    setCocktailsLista(res)
      if (res && res.length) setEjemploCocktail(res[0])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="controls">
        <button className="btn" onClick={handleRandom}>Dime algo bonito</button>
      <div className="muted">Búsqueda inicial: margarita</div>
      </div>

      {loading && <p className="muted">Cargando…</p>}

      {/* Cocktail de ejemplo al inicio */}
      {ejemploCocktail && (
        <section style={{marginBottom:18}}>
          <h2>Ejemplo: {ejemploCocktail.strDrink}</h2>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <img src={ejemploCocktail.strDrinkThumb} alt={ejemploCocktail.strDrink} style={{width:120,borderRadius:8}}/>
          </div>
        </section>
      )}

      {/* Buscador */}
      <form onSubmit={handleSearch} style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
        <input
      aria-label="Buscar cóctel"
     value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Ejemplo: Margarita"
          style={{padding:8,borderRadius:8,border:'1px solid rgba(255,255,255,0.06)',background:'transparent',color:'var(--text)'}}
        />
        <button className="btn" onClick={() => handleSearch()}>Buscar</button>
      </form>

      <div className="grid">
        {cocktailsLista && cocktailsLista.length ? (
      cocktailsLista.map((d: any) => (
            <CocktailCard key={d.idDrink} id={d.idDrink} name={d.strDrink} thumb={d.strDrinkThumb} />
          ))
        ) : (
          <p className="muted">No se encontraron cócteles.</p>
        )}
      </div>
    </div>
  )
}
