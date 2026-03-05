"use client";
import Link from "next/link";
import React from "react";

type Country = any;

export default function CountryCard({ country }: { country: Country }) {
  const name = country?.name?.common || country?.name || "-";
  const population = country?.population ? country.population.toLocaleString() : "-";
  const flag = country?.flags?.svg || country?.flags?.png || "";

  return (
    <div className="country-card">
      {flag ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={flag} alt={`Bandera de ${name}`} />
      ) : null}
      <h3>{name}</h3>
      <p>Población: {population}</p>
      <div style={{marginTop:8}}>
        <Link href={`/country/${encodeURIComponent(name)}`}>
          <button className="btn">Ver detalles</button>
        </Link>
      </div>
    </div>
  );
}
