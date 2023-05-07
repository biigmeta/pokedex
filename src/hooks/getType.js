import axios from "axios";

export async function getTypes() {

    const res = await axios.get("https://pokeapi.co/api/v2/type");

    if (res.status !== 200) {
        return false;
    }

    return res.data;
}