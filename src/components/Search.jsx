import { getTypes } from "@/hooks/getType";
import axios from "axios";
import { useEffect, useRef, useState } from "react";


export default function Search({ nameList, search }) {

    const [searching, setSearching] = useState("");

    const handleSearchingChanged = (e) => {
        setSearching(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let list = nameList.filter(item => item.name.toLowerCase().includes(searching.toLowerCase()));
        search(list);
        return false;
    }

    return (
        <div className="sticky top-0 left-0 p-4 bg-[var(--color-dark)] z-10">
            <form action="#" onSubmit={handleSearch}>
                <div className="flex w-full items-center gap-2 text-sm">
                    <input autoComplete="off" type="search" id="pokemon-name" placeholder="Pokemon's name" className="p-2 w-full rounded outline-none" value={searching} onChange={handleSearchingChanged} required />
                    <button type="submit" className="text-white border h-full p-2 rounded hover:bg-[var(--color-primary)] duration-300"> Search</button>
                </div>
            </form>
        </div>
    )
}
