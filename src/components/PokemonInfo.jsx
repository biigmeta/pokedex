import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function PokemonInfo({ show = false, close, title = "pokemon", data }) {

    const [display, setDisplay] = useState("hidden");

    const handlePreventPropagation = (e) => {
        e.stopPropagation();
    };

    const stats = () => {

        let heightStat = 0;

        data?.stats?.forEach((item) => {
            if (item?.base_stat >= heightStat) {
                heightStat = item?.base_stat;
            }
        })

        if (heightStat <= 100) heightStat = 100;

        return data?.stats?.map((item, index) => {

            let percentage = (item?.base_stat / heightStat) * 100;
            return <div key={index}>
                <div className='w-full flex justify-between'>
                    <p className='capitalize'>{item?.stat?.name}</p>
                    <p className='capitalize'>{percentage.toFixed(0)}</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-[12px] mb-4 dark:bg-gray-700">
                    <div className="bg-[var(--color-primary)] h-[12px] rounded-full dark:bg-blue-500" style={{ width: `${percentage}%` }} />
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
            className={`${display} fixed z-10 inset-0 bg-black bg-opacity-50 items-center justify-center`}
            onClick={close}
        >
            <div className="flex items-center justify-center w-[96%] md:w-[84%] lg:w-[64%] xl:w-[50%]"
                onClick={handlePreventPropagation}>
                <div className="relative flex flex-col bg-[var(--color-dark)] shadow-lg w-full min-h-[640px]">
                    <div className="text-center py-4 px-6 bg-gray-100 rounded-t-lg">
                        <h2 className="text-xl font-bold">{data?.name}</h2>
                    </div>
                    <div className="p-4 grow max-h-[540px] overflow-y-auto overflow-x-hidden text-white">
                        <div className='flex flex-col md:flex-row'>
                            <div className='img-container flex justify-center items-center w-full md:w-[40%] xl:w-[25%] p-4 border rounded-lg'>
                                <Image src={data?.sprites?.front_default} width={480} height={480} alt='Pokemon Image' className='w-full' />
                            </div>
                            <div className='info-container w-full md:w-[60%] xl:w-[75%] p-4'>
                                {stats()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
