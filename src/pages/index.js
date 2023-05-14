import { POKEMON_LOGO_IMAGE } from "@/assets";
import AppWrapper from "@/components/AppWrapper";
import Display from "@/components/Display";
import PokemonInfo from "@/components/PokemonInfo";
import Search from "@/components/Search";
import ToTop from "@/components/ToTop";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  const [nextAPI, setNextAPI] = useState(null);
  const [loading, setLoading] = useState(false);
  const pokemonPerPage = 24;

  const [displayInfo, setDisplayInfo] = useState(false);
  const [currentPokemonData, setCurrentPokemonData] = useState(null);

  const getInitialPokemon = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=" + pokemonPerPage);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  }

  const loadMore = async () => {
    setLoading(true);

    const res = await axios.get(nextAPI);
    if (res.status !== 200) {
      return false;
    }

    setPokemons(prev => { return [...prev, ...res.data.results] });
    setNextAPI(res.data.next);
    setLoading(false);

    return res.data;
  }

  const handleOpenPokemonInfo = (data) => {
    console.log(data);
    setCurrentPokemonData(data);
    setDisplayInfo(true);
  }

  const handleClosePokemonInfo = () => {
    console.log("close");
    setDisplayInfo(false);
  }

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons])

  useEffect(() => {
    setLoading(true);
    getInitialPokemon().then(data => {

      setPokemons(data.results);
      setNextAPI(data.next);
      setLoading(false);
    })
  }, [])

  return (
    <>
      <AppWrapper>
        <div className="w-100 bg-[var(--color-black)]">
          <div className="relative min-h-screen mx-auto sm:w-full md:w-[85%] lg:w-[70%] bg-[var(--color-dark)]">
            <div className="p-4">
              <Image src={POKEMON_LOGO_IMAGE.src} width={720} height={240} alt="Pokemon Logo" className="w-[50%] md:w-[25%] lg:w-[20%] mx-auto" />
            </div>
            <Search setSelectedType={setSelectedTypes} />
            <Display pokemons={pokemons} openInfo={handleOpenPokemonInfo} />
            <div className="flex justify-center p-4">
              {nextAPI &&
                <button onClick={loadMore} className={`flex justify-center items-center border gap-2 shadow-lg rounded-full p-2 min-w-[120px] text-white bg-[var(--color-dark)] hover:bg-[var(--color-primary)] duration-500`}>
                  {loading && <div className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                  </div>} Load more...
                </button>}
            </div>
          </div>
        </div>
        <PokemonInfo show={displayInfo} open={handleOpenPokemonInfo} close={handleClosePokemonInfo} pokemonData={currentPokemonData} />
        <ToTop />
      </AppWrapper>

    </>

  )
}
