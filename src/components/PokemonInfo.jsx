import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import PokemonCard from './PokemonCard';

export default function PokemonInfo({ show = false, close, title = "pokemon", pokemonData }) {

    const [display, setDisplay] = useState("hidden");

    const handlePreventPropagation = (e) => {
        e.stopPropagation();
    };

    const stats = () => {

        let heightStat = 0;

        pokemonData?.stats?.forEach((item) => {
            if (item?.base_stat >= heightStat) {
                heightStat = item?.base_stat;
            }
        })

        if (heightStat <= 100) heightStat = 100;

        return pokemonData?.stats?.map((item, index) => {

            let percentage = (item?.base_stat / heightStat) * 100;
            return <div key={index}>
                <div className='w-full flex justify-between'>
                    <p className='capitalize'>{item?.stat?.name}</p>
                    <p className='capitalize'>{percentage.toFixed(0)}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-[10px] mb-4 dark:bg-gray-700">
                    <div className="bg-[var(--color-primary)] h-[10px] rounded-full dark:bg-blue-500" style={{ width: `${percentage}%` }} />
                </div>
            </div>
        })
    }

    useEffect(() => {
        if (show) {
            setDisplay("flex");
        } else {
            setDisplay("hidden");
        }
    }, [show])

    return (
        <div
            className={`${display} fixed z-10 inset-0 bg-black bg-opacity-80 items-center justify-center`}
            onClick={close}
        >
            <div className="flex items-center justify-center w-[96%] md:w-[84%] lg:w-[64%] xl:w-[50%] "
                onClick={handlePreventPropagation}>
                <div className="relative flex flex-col  bg-transparent shadow-lg w-full max-h-[96vh]">
                    <div className="flex justify-end py-2 px-2 lg:py-4 lg:px-0 bg-transparent rounded-t-lg">
                        <button onClick={close} className='bg-white bg-transparent text-white border-2 border-[var(--color-primary)]  hover:text-[var(--color-primary)] hover:bg-white hover:border-white rounded-lg shadow-lg px-3 py-1 duration-300'>X</button>
                    </div>
                    <div className="bg-[var(--color-dark)] p-4 grow max-h-[540px] overflow-y-auto overflow-x-hidden text-white">
                        <div className='flex flex-col md:flex-row'>
                            <div className='img-container flex flex-col justify-center  items-center w-full md:w-[40%] xl:w-[30%]'>
                                <PokemonCard data={pokemonData}/>
                            </div>
                            <div className='info-container w-full md:w-[60%] xl:w-[70%] p-4'>
                                {stats()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
