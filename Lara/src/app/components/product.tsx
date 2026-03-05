'use client';

type CosaCompra = {
    name: string,
    id: string
}

type Params = {
    name: string,
    lista: CosaCompra[],
    setLista: React.Dispatch<React.SetStateAction<CosaCompra[]>>
}

const Producto = ({name, lista, setLista}: Params) => {
return(
    <div>
        <h2>{name}</h2>
        <button onClick={()=>{
            setLista([...lista, {
                name: name,
                id: String(Math.random())
            }])
        }}>Buy</button>
    </div>
)
};

export default Producto;