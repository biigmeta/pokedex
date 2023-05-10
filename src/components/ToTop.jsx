import { useEffect, useState } from "react";


export default function ToTop() {

    const [display, setDisplay] = useState("hidden");

    const handleScroll = () => {
        const scrollPosition = window.scrollY; // => scroll position

        if (scrollPosition >= 500) {
            setDisplay("block");
        } else {
            setDisplay("hidden");
        }
    };

    const handleToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    }

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="fixed m-2 bottom-5 right-5 w-[48px] h-[48px]">
            <button onClick={handleToTop} className={`${display} w-full h-full bg-[var(--color-dark)] border-2 hover:border-[var(--color-primary)] rounded-full duration-300`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
            </button>
        </div >
    )
}
