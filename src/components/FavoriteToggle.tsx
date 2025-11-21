interface FavoriteToggleProps {
    isFavorites: boolean;
    onToggle: () => void;
}

export default function FavoriteToggle ({ isFavorites, onToggle }: FavoriteToggleProps) {
    return (
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onToggle}>

            {/* Texto de la etiqueta (opcional, para mayor claridad) */}
            <span className={`font-bold transition-colors duration-300 ${isFavorites ? 'text-pink-400' : 'text-gray-400 group-hover:text-gray-200'}`}>
                {isFavorites ? 'Ver favoritos' : 'Ver todos'}
            </span>

            {/* El Switch Contenedor */}
            <div
                className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${isFavorites ? 'bg-pink-600' : 'bg-gray-700'
                    }`}
            >
                {/* El Círculo (Knob) que se mueve */}
                <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${isFavorites ? 'translate-x-8' : 'translate-x-0'
                        }`}
                >
                    {/* Icono dentro del círculo (Corazón) */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-colors duration-300 ${isFavorites ? 'text-pink-600 fill-pink-600' : 'text-gray-400'}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};