import { lookupCocktail } from '../../../lib/api'
import BackButton from '../../../components/BackButton'

type Props = { params: { id: string } }

export default async function CocktailPage({ params }: Props){
 const id = params.id
  const drink = await lookupCocktail(id)

  if (!drink) return <p className="muted">Cocktail no encontrado</p>

  // Recojo ingredientes existentes 
  const ingredients: string[] = []
  for (let i = 1; i <= 15; i++){
  const ing = drink[`strIngredient${i}`]
  const meas = drink[`strMeasure${i}`]
    if (ing && ing.trim()){
      ingredients.push(`${ing}${meas ? ` — ${meas.trim()}` : ''}`)
    }
  }

  // Texto alcohol
  const alcoholText = drink.strAlcoholic
    ? (drink.strAlcoholic === 'Alcoholic' ? 'Sí' : (/not/i.test(drink.strAlcoholic) ? 'No' : drink.strAlcoholic))
    : '—'

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <div style={{display:'flex',alignItems:'center'}}>
        <BackButton />
        <h2 style={{marginLeft:6}}>{drink.strDrink}</h2>
        </div>
        <div className="muted">Categoría: {drink.strCategory} • Alcohol: {alcoholText}</div>
      </div>

      <div className="detail">
        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        <div className="meta">
       <p><strong>Vaso:</strong> {drink.strGlass}</p>
        <p><strong>Instrucciones (EN):</strong> {drink.strInstructions}</p>

          <div className="ingredients">
        <h4>Ingredientes</h4>
        <ul>
        {ingredients.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
