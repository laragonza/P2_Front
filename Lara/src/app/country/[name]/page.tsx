import Link from "next/link";

type Props = {
  params: { name: string };
}

async function fetchCountryByName(name: string) {
  // defensive: ensure we have a valid name
  if (!name) return null;
  const normalized = String(name).trim();
  if (!normalized) return null;

  const encoded = encodeURIComponent(normalized);
  // Intentar fullText primero, luego fallback sin fullText
  const fields = "name,capital,subregion,languages,currencies,flags,population,region";
  const urls = [
    `https://restcountries.com/v3.1/name/${encoded}?fullText=true&fields=${fields}`,
    `https://restcountries.com/v3.1/name/${encoded}?fields=${fields}`
  ];

  for (const url of urls) {
    try {
      const r = await fetch(url);
      if (!r.ok) {
        // debug: registrar respuestas no OK para diagnosticar HTTP 400/404 de la API
        console.warn(`restcountries: ${r.status} ${r.statusText} para ${url}`);
        // continue to next strategy
        continue;
      }
      const data = await r.json();
      if (Array.isArray(data) && data.length) return data[0];
    } catch (e) {
      console.error(`restcountries: fallo al obtener ${url}:`, e);
      // try next
    }
  }

  // Fallback final: solicitar todos y buscar localmente (ayuda con diacríticos, nombres parciales, etc.)
  try {
  const allR = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3,altSpellings");
    if (allR.ok) {
      const all = await allR.json();
      if (Array.isArray(all)) {
        const lower = normalized.toLowerCase();
        const found = all.find((c: any) => {
          const common = (c?.name?.common || "").toString().toLowerCase();
          const official = (c?.name?.official || "").toString().toLowerCase();
          const altNames = Object.values(c?.altSpellings || {}).map(String).join(' ').toLowerCase();
          return common === lower || official === lower || altNames.includes(lower);
        });
        if (found) return found;
      }
    } else {
      console.warn(`restcountries /all fallback devolvió ${allR.status} ${allR.statusText}`);
    }
  } catch (e) {
    console.error('restcountries /all fallback falló:', e);
  }

  return null;
}

function formatLanguages(langs: any) {
  if (!langs) return "-";
  return Object.values(langs).join(', ');
}

function formatCurrencies(currencies: any) {
  if (!currencies) return "-";
  return Object.entries(currencies)
    .map(([code, info]: any) => `${info.name} (${code})${info.symbol ? ' ' + info.symbol : ''}`)
    .join(', ');
}

export default async function CountryPage({ params }: Props) {
  // `params` can be a Promise in newer Next.js versions — await it to be safe
  const resolvedParams: any = await params;
  const name = resolvedParams?.name;
  const country = await fetchCountryByName(name);

  if (!country) {
    return (
      <main className="container">
        <h2>País no encontrado</h2>
        <p>No se encontró ningún país para &quot;{name}&quot;.</p>
        <p><Link href="/">Volver al listado</Link></p>
      </main>
    );
  }

  const official = country?.name?.official || "-";
  const capital = Array.isArray(country?.capital) ? country.capital.join(', ') : country?.capital || "-";
  const subregion = country?.subregion || "-";
  const languages = formatLanguages(country?.languages);
  const currencies = formatCurrencies(country?.currencies);
  const flag = country?.flags?.svg || country?.flags?.png || '';

  return (
    <main className="container details">
      <p><Link href="/">← Volver</Link></p>
      <h1>{country.name.common}</h1>
      {flag ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={flag} alt={`Bandera de ${country.name.common}`} />
      ) : null}
      <ul>
        <li><strong>Nombre oficial:</strong> {official}</li>
        <li><strong>Capital:</strong> {capital}</li>
        <li><strong>Subregión:</strong> {subregion}</li>
        <li><strong>Idiomas:</strong> {languages}</li>
        <li><strong>Monedas:</strong> {currencies}</li>
      </ul>
    </main>
  );
}
