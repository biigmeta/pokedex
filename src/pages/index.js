import { POKEMON_LOGO_IMAGE } from "@/assets";
import AppWrapper from "@/components/AppWrapper";
import Display from "@/components/Display";
import Search from "@/components/Search";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  const initialAPI = "https://pokeapi.co/api/v2/pokemon";
  const [nextAPI, setNextAPI] = useState(null);
  const [previousAPI, setPreviousAPI] = useState(null);
  const pokemonPerPage = 20;

  const getInitialPokemon = async () => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=" + pokemonPerPage);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  }

  useEffect(() => {
    getInitialPokemon().then(data => {
      setPokemons(data.results);
    })
  }, [])

  return (
    <>
      <AppWrapper>
        <div className="w-screen bg-[var(--color-black)]">
          <div className="min-h-screen mx-auto sm:w-full md:w-[85%] lg:w-[75%] bg-[var(--color-white)]">
            <div className="p-4">
              <Image src={POKEMON_LOGO_IMAGE.src} width={720} height={240} alt="Pokemon Logo" className="w-[50%] md:w-[15%]" />
            </div>
            <Search setSelectedType={setSelectedTypes} />
            <Display pokemons={pokemons}/>
            <div className="flex justify-between p-2">
              <button className="rounded p-2 min-w-[120px] text-white bg-[var(--color-dark)] hover:bg-[var(--color-accent)] duration-500">previous</button>
              <button className="rounded p-2 min-w-[120px] text-white bg-[var(--color-dark)] hover:bg-[var(--color-accent)] duration-500">next</button>
            </div>
          </div>
        </div>
      </AppWrapper>

    </>

  )
}
