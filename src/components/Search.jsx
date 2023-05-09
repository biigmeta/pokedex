import { getTypes } from "@/hooks/getType";
import { useEffect, useRef, useState } from "react";


export default function Search({ setSelectedType }) {

    const [types, setTypes] = useState([]);
    const [selected, setSelected] = useState([]);
    const [initialType, setInitialType] = useState([]);
    const allTypeCheckbox = useRef(null);

    const pokemonTypeCheckbox = () => {

        return types.map((item, index) => {
            return <li key={index} className="w-full border border-gray-200 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id={`pokemonType-${index}`} value={item.name} checked={selected.includes(item?.name)} onChange={handleSelectedTypeChanged} name="pokemonType" type="checkbox" className="pokemontypeCheckbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label htmlFor={`pokemonType-${index}`} className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">{item?.name}</label>
                </div>
            </li>
        })
    }

    const handleSelectedTypeChanged = (e) => {

        const { value } = e.target;

        if (selected.includes(value)) {
            let temp = selected.filter(item => item != value);
            setSelected(temp);

        } else {
            let temp = [...selected, value];
            setSelected(temp);
        }
    }

    const handleSelectAllChanged = (e) => {
        const { checked } = e.target;

        if (checked) {
            setSelected(initialType);
        } else {
            setSelected([]);
        }
    }

    useEffect(() => {
        if (selected.length > 0) {
            if (selected.length == initialType.length) {
                allTypeCheckbox.current.checked = true;
                allTypeCheckbox.current.indeterminate = false;
            }else{
                allTypeCheckbox.current.checked = false;
                allTypeCheckbox.current.indeterminate = true;
            }
        }else{
            allTypeCheckbox.current.checked = false;
            allTypeCheckbox.current.indeterminate = false;
        }

        setSelectedType(selected);
        
    }, [selected]);

    useEffect(() => {
        if (types.length > 0) {
            let temp = types.map(item => item.name);
            setSelected(temp);
            setInitialType(temp);
        }
    }, [types]);

    useEffect(() => {
        getTypes().then((data) => {
            setTypes(data.results);
        })
    }, [])

    return (
        <div className="p-2 bg-[var(--color-bg)]">
            <div className="flex w-full items-center gap-2 text-sm mb-2">
                <label htmlFor="name">Search</label>
                <input type="text" id="name" className="p-2 rounded outline-none" />
            </div>
            <ul className="items-center w-full grid grid-cols-7 hidden text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center pl-3">
                        <input ref={allTypeCheckbox} id={`pokemonType-all`} onChange={handleSelectAllChanged} name="pokemonType" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor={`pokemonType-all`} className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">all</label>
                    </div>
                </li>
                {pokemonTypeCheckbox()}
            </ul>
        </div>
    )
}
