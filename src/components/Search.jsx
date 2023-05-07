import { getTypes } from "@/hooks/getType";
import { useEffect, useState } from "react";


export default function Search({ setSelectedType }) {

    const [types, setTypes] = useState([]);

    useEffect(() => {
        getTypes().then((data) => {
            setTypes(data.results);
        })
    }, [])

    return (
        <div className="p-2 shadow bg-[var(--color-bg)]">
            <label htmlFor="name">ค้นหา</label>
            <input type="text" id="name" />
            <select name="" id="">
                <option value={"all"}>all</option>
                {types?.map((item, index) => {
                    return <option key={index} value={item.name}>{item.name}</option>
                })}
            </select>
        </div>
    )
}
