import { pokemonTypes } from '@/utils/pokemonTypes';
import React, { useEffect, useState } from 'react'

export default function TypeBadge({ type }) {
    const [bgColor, setBgColor] = useState("red");
    useEffect(() => {
        if (type) {
            let currentType = pokemonTypes.find(item => item.name.toLowerCase() === type.name.toLowerCase());
            if (currentType) {
                setBgColor(currentType.color);
                console.log("set current type", currentType.color)
            } else {
                console.log("no current type")
            }
        }
    }, [type]);
    return (
        <div className={`rounded-full shadow px-4 py-1 text-white`} style={{ backgroundColor: bgColor }}>
            <p>{type?.name}</p>
        </div>
    )
}
