import { useState } from 'react'
import type { Character } from "../types"

type Props = {
    character: Character
    onClose: () => void
}

// ===== Función para el maenjo de los datos del personaje ==== //
function readField(value: any) {
    if (!value) return 'Unknown'
    if (typeof value === 'string') return value
    if (Array.isArray(value)) return value.length ? value.join(', ') : 'Unknown'
    if (typeof value === 'object') return (value.name ?? JSON.stringify(value))
    return String(value)
}

export default function CharacterModal({ character, onClose }: Props) {
    const { name, image, status, species, gender, episode, origin, location } = character
    const [closing, setClosing] = useState(false)

    const handleClose = () => {
        setClosing(true)
        setTimeout(() => onClose(), 220)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${closing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            />

            {/* Modal panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label={`${name} biografía`}
                className={`relative z-50 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl p-4 md:p-6 text-white shadow-xl transform transition-all duration-200 ${closing ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}
            >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-full md:w-1/2 bg-cyan-500 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={image} alt={name} className="w-full h-auto max-h-80 object-cover rounded-lg" />
                    </div>

                    <div className="w-full md:w-1/2">

                        <div className="flex items-start justify-between mb-4 md:mb-0">
                            <h2 className="text-xl md:text-2xl font-bold text-lime-400">{name}</h2>
                            <button onClick={handleClose} className="text-gray-300 hover:text-white ml-4 text-2xl">✕</button>
                        </div>

                        <div className="mt-4 bg-gray-800 border-amber-300 border-2 rounded-lg p-4 text-sm md:text-md">
                            <p className="mb-2"><span className="font-semibold">Estatus:</span> {readField(status)}</p>
                            <p className="mb-2"><span className="font-semibold">Especie:</span> {readField(species)}</p>
                            <p className="mb-2"><span className="font-semibold">Género:</span> {readField(gender)}</p>
                            <p className="mb-2"><span className="font-semibold">Origen:</span> {readField(origin)}</p>
                            <p className="mb-2"><span className="font-semibold">Última ubicación:</span> {readField(location)}</p>
                            <p className="mb-2"><span className="font-semibold">Núm. De episodios:</span> {Array.isArray(episode) ? episode.length : readField(episode)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
