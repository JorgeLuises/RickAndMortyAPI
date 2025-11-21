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

  // ====== Estado local para mostrar la vista de favoritos ===== //
  const [showFavorites, setShowFavorites] = useState<boolean>(false)

  // ========= Paginación y fetching del API ======== //
  const pagination = async (pageNumber: number) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${pageNumber}`)
      const data = await response.json();

      setTotalPages(data.info.pages);
      dispatch({ type: 'SET_CHARACTERS', payload: data.results });

      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    pagination(page)
  }, [page])

  // ========== Paginación de favoritos ====== //
  const favoriteTotalPages: number = Math.ceil(favCharacters.length / 20);
  const start = (page - 1) * 20;
  const end = page * 20;
  const paginatedFavs = favCharacters.slice(start, end);

  useEffect(() => {
    setPage(1)
  }, [showFavorites])

  return (
    <>
      <header className="font-title text-5xl lg:text-6xl text-center mt-10 mx-auto drop-shadow-lg tracking-wide uppercase">
        <h1 className="bg-linear-to-r from-lime-500 to-yellow-500 text-transparent bg-clip-text">
          The Wubba Lubba Dub Dub Lexicon
        </h1>
      </header>

      <section className="mt-10 md:flex md:items-center md:justify-between max-w-2xl mx-auto block px-4">
        <div className="flex-1 mr-0 md:mr-8 mb-4 md:mb-0">
          <SearchBar />
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
          totalPages={!showFavorites ? totalPages : favoriteTotalPages}
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
