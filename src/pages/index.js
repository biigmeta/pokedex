import { POKEMON_LOGO_IMAGE } from "@/assets";
import Display from "@/components/Display";
import Search from "@/components/Search";
import { getTypes } from "@/hooks/getType";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [selectedTypes, setSelectedTypes] = useState([]);


  return (
    <div className="w-screen bg-[var(--color-black)]">
      <div className="min-h-screen mx-auto sm:w-full md:w-[85%] lg:w-[75%] bg-[var(--color-white)]">
        <div className="p-4">
          <Image src={POKEMON_LOGO_IMAGE.src} width={720} height={240} alt="Pokemon Logo" className="w-[50%] md:w-[15%]" />
        </div>
        <Search setSelectedType={setSelectedTypes} />
        <Display />
      </div>
    </div>
  )
}
