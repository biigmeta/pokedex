import PokemonCard from "./PokemonCard"

export default function Display({ pokemons, openInfo }) {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 p-4">
      {pokemons && pokemons.length == 0 ?
        <div className="p-4 col-span-5 text-center">
          <p className="text-center text-white">Pokemon not found.</p>
        </div> :
        <>{pokemons ? pokemons.map((item, index) => { return <PokemonCard key={index} data={item} openInfo={openInfo} /> }) : <></>}</>}
    </div>
  )
}


