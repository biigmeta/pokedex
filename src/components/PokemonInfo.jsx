import React, { useEffect, useState } from 'react'

export default function PokemonInfo({ show = false, close }) {

    const [display, setDisplay] = useState("hidden");

    const handleClickBackdrop = () => {
        close()
    }

    const handlePreventPropagation = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (show) {
            setDisplay("flex");
        } else {
            setDisplay("hidden");
        }
    }, [show])

    return (
        <div
            className={`${display} fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50`}
            onClick={close}
        >
            <div className="flex items-center justify-center m-auto" onClick={handlePreventPropagation}>
                <div className="relative bg-[var(--color-dark)] border border-[var(--color-primary)]">
                    <div className="text-center py-4 px-6 bg-gray-100 rounded-t-lg">
                        <h2 className="text-xl font-bold">{"title"}</h2>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-700">{"message"}</p>
                    </div>
                    <div className="flex justify-end px-6 py-4 bg-gray-100 rounded-b-lg">
                        <button
                            onClick={null}
                            className="text-gray-500 bg-transparent border border-gray-500 font-semibold px-4 py-2 mr-2 rounded hover:text-white hover:bg-gray-500 hover:border-transparent focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={null}
                            className="text-white bg-blue-500 border-0 font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
