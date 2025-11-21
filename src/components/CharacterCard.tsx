import { useState } from "react"
import type { Character } from "../types"
import { useCharacters } from "../hooks/useCharacters";
import CharacterModal from "./CharacterModal";

type CardProps = {
    character: Character
}

export default function CharacterCard({ character }: CardProps) {

    const { name, image, status, species, gender } = character
    const { state, dispatch } = useCharacters()
    const isFavorite = state.favorites.some((fav) => fav.id === character.id);
    const [open, setOpen] = useState(false)

    const handleAdd = () => {
        if (isFavorite) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { id: character.id } })
        } else {
            dispatch({ type: 'ADD_FAVORITE', payload: character })
        }
    }

    return (
        <>
        <div className="w-full max-w-xs bg-gray-900 border-2 border-gray-700 rounded-3xl p-4 shadow-lg hover:shadow-green-500/20 hover:scale-105 hover:border-yellow-400 hover:bg-cyan-500 transition-all duration-300 flex flex-col gap-4">

            <div onClick={() => setOpen(true)} className="w-full aspect-square bg-gray-800 rounded-2xl border-2 border-gray-600 overflow-hidden relative group">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-opacity"
                />
                {/* Etiqueta de Status flotante (opcional, pero útil) */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold border ${status === 'Alive' ? 'bg-green-900/80 border-green-500 text-green-300' :
                    status === 'Dead' ? 'bg-red-900/80 border-red-500 text-red-300' :
                        'bg-gray-700/80 border-gray-500 text-gray-300'
                    }`}>
                    {status}
                </div>
            </div>

            {/* 2. Character Name Box */}
            <div onClick={() => setOpen(true)} className="bg-gray-800 border-2 border-gray-600 rounded-2xl p-3 text-center shadow-inner">
                <h2 className="text-xl font-bold text-lime-400 truncate">
                    {name}
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                    {species} - {gender}
                </p>
            </div>

            {/* 3. Botones inferiores */}
            <div className="flex gap-3 mt-auto">
                <button onClick={() => setOpen(true)} className="flex-1 bg-gray-700 hover:bg-blue-600 text-white text-sm font-semibold py-2 rounded-xl border border-gray-600 hover:border-blue-400 transition-colors">
                    Biografia
                </button>
                <button onClick={handleAdd}
                    className={`flex-1 text-sm font-semibold py-2 rounded-xl border transition-colors ${isFavorite
                            ? 'bg-pink-600 text-white border-pink-600 hover:bg-pink-700'
                            : 'bg-gray-700 text-white border-gray-600 hover:bg-pink-600 hover:border-pink-400'
                        }`}>
                    {isFavorite ? 'Quitar Fav ❤' : 'Agregar Fav ❤'}
                </button>
            </div>

        </div>

        {open && <CharacterModal character={character} onClose={() => setOpen(false)} />}
        </>
    );
}
