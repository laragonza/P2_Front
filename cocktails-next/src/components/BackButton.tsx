"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

// Botón para volver atrás
export default function BackButton(){
  const router = useRouter()
  return (
 <button type="button" className="btn-back" onClick={() => router.back()}>
      Volver
    </button>
  )
}
