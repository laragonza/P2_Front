"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

// Para mostrar una tarjeta de cocktail
type Props = {
  id: string
  name: string
  thumb?: string
}

export default function CocktailCard({ id, name, thumb }: Props){
const router = useRouter()
  return (
    <div className="card" onClick={() => router.push(`/cocktail/${id}`)} role="button">
      {thumb ? (
      // Uso de img por simplicidad y de esta forma tambien consigo evitar configuración adicional
      <img src={thumb} alt={name} />
      ) : (
      <div style={{height:160,background:'#111'}} />
      )}
      <div className="body">
   <h3>{name}</h3>
      </div>
    </div>
  )
}
