"use client";
import React, { useEffect, useMemo, useState } from "react";
import CountryCard from "./CountryCard";

type Country = any;

export default function CountryList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Request only the fields we need to reduce payload and avoid issues
    fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setCountries(data || []);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const regions = useMemo(() => {
    const set = new Set<string>();
    countries.forEach((c) => c.region && set.add(c.region));
    return Array.from(set).sort();
  }, [countries]);

  const filtered = useMemo(() => {
    return countries.filter((c) => {
      const name = (c?.name?.common || "").toString().toLowerCase();
      if (search && !name.includes(search.toLowerCase())) return false;
      if (region && String(c.region) !== region) return false;
      return true;
    });
  }, [countries, search, region]);

  return (
    <div>
      <div className="controls">
        <input
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <select value={region} onChange={(e)=>setRegion(e.target.value)}>
          <option value="">Todas las regiones</option>
          {regions.map((r)=> <option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={()=>{setSearch(''); setRegion('');}} className="btn">Restablecer</button>
      </div>

      {loading && <p>Cargando países...</p>}
      {error && <p style={{color:'red'}}>Error: {error}</p>}

      <div className="grid">
        {filtered.map((c) => (
          <CountryCard key={c.cca3 || c.name?.common} country={c} />
        ))}
      </div>

      <p className="light-text">Mostrando {filtered.length} de {countries.length} países</p>
    </div>
  );
}
