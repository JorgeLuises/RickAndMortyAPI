interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination ({ currentPage, totalPages, onPageChange }: PaginationProps) {

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900/90 backdrop-blur-sm border-t border-gray-700 p-4 flex justify-center items-center gap-6 z-50">

            {/* Botón Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1} // Deshabilitar si estamos en la página 1
                className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${currentPage === 1
                        ? 'opacity-50 cursor-not-allowed border-gray-600 text-gray-500'
                        : 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black'
                    }`}
            >
                Anterior
            </button>

            {/* Indicador de Página */}
            <span className="text-gray-300 font-mono">
                Pagina <span className="text-yellow-400 font-bold">{currentPage}</span> de {totalPages}
            </span>

            {/* Botón Siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages} // Deshabilitar si es la última página
                className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed border-gray-600 text-gray-500'
                        : 'border-green-500 text-green-400 hover:bg-green-500 hover:text-black'
                    }`}
            >
                Siguiente
            </button>

        </div>
    );
};