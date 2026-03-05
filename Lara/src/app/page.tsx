"use client";
import CountryList from "./components/CountryList";
import "./page.css";

export default function Home() {
  return (
    <main className="container">
      <h1>Países</h1>
      <p>Listado de países obtenido de la API pública REST Countries. Usa el campo de búsqueda o el filtro por región para refinar los resultados.</p>
      <CountryList />
    </main>
  );
}
