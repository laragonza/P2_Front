import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Cocktails Next',
  description: 'App de cocktails con TheCocktailDB',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="site-header">
          <h1>Cocktails</h1>
          <p className="subtitle">Diferentes cócteles que disponemos</p>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer"></footer>
      </body>
    </html>
  )
}
