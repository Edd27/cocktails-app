import { IconSearch, IconX } from '@tabler/icons-react'

const SearchBar = ({ query, setQuery, setIsLoading, setCocktails }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (query.length === 0) {
      return
    }

    setIsLoading(true)
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
    )
    const data = await response.json()
    setCocktails(data.drinks || [])
    setIsLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="px-2 sm:px-4 py-10 md:px-24 mt-16 flex gap-2 sm:gap-4 w-full md:w-1/2 mx-auto text-lime-500 font-semibold"
    >
      <div className="w-full rounded-md overflow-hidden h-12 flex items-center justify-between relative bg-zinc-800 shadow-md">
        <span className="px-4">
          <IconSearch />
        </span>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          value={query}
          className="absolute w-full h-full bg-transparent outline-none pl-14"
          placeholder="Margarita..."
        />
        <span
          className="px-4 z-10 cursor-pointer hover:bg-zinc-700 h-full duration-200 flex items-center justify-center"
          onClick={() => setQuery('')}
        >
          <IconX />
        </span>
      </div>
    </form>
  )
}

export default SearchBar
