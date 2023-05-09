import { pokemonTypes } from '@/utils/pokemonTypes';
import React, { useEffect, useState } from 'react'

export default function TypeBadge({ type }) {
    const [bgColor, setBgColor] = useState("red");
    useEffect(() => {
        if (type) {
            let currentType = pokemonTypes.find(item => item.name.toLowerCase() === type.name.toLowerCase());
            if (currentType) {
                setBgColor(currentType.color);
            } 
        }
    }, [type]);
    return (
        <div className={`rounded-full shadow px-4 text-white`} style={{ backgroundColor: bgColor }}>
            <label>{type?.name}</label>
        </div>
    )
}
