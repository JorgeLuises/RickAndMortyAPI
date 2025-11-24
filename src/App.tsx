import { useEffect, useState } from "react"
import SearchBar from "./components/SearchBar";
import CharacterCard from "./components/CharacterCard";
import Pagination from "./components/Pagination";
import FavoriteToggle from "./components/FavoriteToggle";
import { useCharacters } from "./hooks/useCharacters";

function AppContent() {
  const { state, dispatch } = useCharacters()
  const characters = state.characters
  const favCharacters = state.favorites

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('')

  // ====== Estado local para mostrar la vista de favoritos ===== //
  const [showFavorites, setShowFavorites] = useState<boolean>(false)

  // ========= Paginación y fetching del API ======== //
  const pagination = async (pageNumber: number, name?: string) => {
    try {
      const base = 'https://rickandmortyapi.com/api/character/'
      const url = name && name.length > 0 ? `${base}?page=${pageNumber}&name=${encodeURIComponent(name)}` : `${base}?page=${pageNumber}`
      const response = await fetch(url)
      const data = await response.json();

      setTotalPages(data.info?.pages ?? 0);
      dispatch({ type: 'SET_CHARACTERS', payload: data.results ?? [] });

      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (!showFavorites) {
      pagination(page, searchQuery.trim())
    }
  }, [page, searchQuery, showFavorites])

  // ========== Paginación de favoritos (local) ====== //
  const PAGE_SIZE = 20
  const filteredFavs = favCharacters.filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const favoriteTotalPages: number = Math.max(1, Math.ceil(filteredFavs.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = page * PAGE_SIZE;
  const paginatedFavs = filteredFavs.slice(start, end);

  useEffect(() => {
    setPage(1)
  }, [showFavorites])

  // ===== Funciones para la busqueda =====
  const handleSearch = (q: string) => {
    setSearchQuery(q)
    setPage(1)
  }

  const handleClear = () => {
    setSearchQuery('')
    setPage(1)
  }

  return (
    <>
      <header className="font-title text-5xl lg:text-6xl text-center mt-10 mx-auto drop-shadow-lg tracking-wide uppercase">
        <h1 className="bg-linear-to-r from-lime-500 to-yellow-500 text-transparent bg-clip-text">
          The Wubba Lubba Dub Dub Lexicon
        </h1>
      </header>

      <section className="mt-10 md:flex md:items-center md:justify-between max-w-2xl mx-auto block px-4">
        <div className="flex-1 mr-0 md:mr-8 mb-4 md:mb-0">
          <SearchBar value={searchQuery} onChange={handleSearch} onClear={handleClear} />
        </div>

        <div className="flex justify-end md:justify-auto">
          <FavoriteToggle isFavorites={showFavorites} onToggle={() => setShowFavorites((s) => !s)} />
        </div>
      </section>

      <main className="container mx-auto mt-10 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!showFavorites ? (
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        ) : (
          paginatedFavs.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        )}
      </main>

      <footer className="bg-black text-white pb-24">
        <Pagination
          currentPage={!showFavorites && page > totalPages ? 1 : page}
          totalPages={!showFavorites ? Math.max(1, totalPages) : favoriteTotalPages}
          onPageChange={(newPage: number) => setPage(newPage)}
        />
      </footer>
    </>
  )
}

function App() {
  return <AppContent />
}

export default App
