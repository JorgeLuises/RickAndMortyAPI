type Props = {
  value: string
  onChange: (q: string) => void
  onClear?: () => void
}

export default function SearchBar({ value, onChange, onClear }: Props) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); }}
      className="relative md:w-xl"
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg aria-hidden="true" className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>

      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Buscar personaje por nombre'
        className="block w-full p-4 pl-10 text-sm bg-transparent border-2 border-cyan-500 rounded-full focus:outline-none focus:border-yellow-400 transition-colors duration-300 placeholder-gray-400 text-cyan-500"
      />

      {value.length > 0 && (
        <button
          type="button"
          onClick={() => { onChange(''); onClear && onClear() }}
          className="absolute right-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-200 font-medium rounded-full text-sm px-4 py-2 text-black transition-all duration-300"
        >
          Clear
        </button>
      )}
    </form>
  )
}