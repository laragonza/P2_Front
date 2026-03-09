import axios from 'axios'

// Capa para llamadas a thecocktaildb
const API_BASE = 'https://www.thecocktaildb.com/api/json/v1/1'

export const client = axios.create({
  baseURL: API_BASE,
timeout: 5000,
})

export async function searchCocktails(q = 'margarita'){
  const res = await client.get(`/search.php`, { params: { s: q } })
  // devuelvo lista o array vacío para evitar nulls
return res.data?.drinks ?? []
}

export async function lookupCocktail(id: string | number){ const res = await client.get(`/lookup.php`, { params: { i: id } })
return res.data?.drinks?.[0] ?? null
}

export async function randomCocktail(){
  const res = await client.get(`/random.php`)
  return res.data?.drinks?.[0] ?? null
}
