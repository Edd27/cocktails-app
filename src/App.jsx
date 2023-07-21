import { useEffect, useState } from 'react'
import Cocktail from './components/Cocktail'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Loader from './components/Loader'
import Footer from './components/Footer'
import { fetchRandomCocktails } from './utils/fetchRandomCocktails'

const App = () => {
  const [cocktails, setCocktails] = useState([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchInitCocktails = async () => {
    setIsLoading(true)
    const response = await fetchRandomCocktails()
    setCocktails(response)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchInitCocktails()
  }, [])

  return (
    <main className="bg-primary-900 w-full overflow-y-auto overflow-x-hidden text-primary-50 text-lime-500">
      <Header fetchInitCocktails={fetchInitCocktails} />
      <SearchBar
        query={query}
        setQuery={setQuery}
        setIsLoading={setIsLoading}
        setCocktails={setCocktails}
      />
      {isLoading && <Loader />}
      {!isLoading && cocktails.length === 0 && (
        <div className="px-2 sm:px-4 md:px-24 pb-18 sm:pb-20">
          <h1 className="text-xl text-center bg-primary-800 rounded-md py-10 duration-300">
            No cocktails found
          </h1>
        </div>
      )}
      {!isLoading && cocktails.length > 0 && (
        <div className="px-2 sm:px-4 md:px-24 pb-32 grid gap-3 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {cocktails.map((cocktail) => (
            <Cocktail key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      )}
      <Footer />
    </main>
  )
}

export default App
