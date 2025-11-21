import { useContext } from "react";
import { CharactersContext } from "../context/CharactersContext";

export const useCharacters = () => {
    const context = useContext(CharactersContext);

    if(!context) {
        throw new Error('El hook useCharacters debe de usar un provider')
    }

    return context
}