import { POKEBALL_ICON_IMAGE } from "@/assets";
import Head from "next/head";


export default function AppWrapper({ children }) {
    return (
        <>
            <Head>
                <title>{`Pokédex`}</title>
                <meta name="description" content="Pokédex using Pokemon API V.2 created by next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href={POKEBALL_ICON_IMAGE.src} />
            </Head>
            {children}
        </>
    )
}
