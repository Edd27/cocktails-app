import { IconHeart, IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import Cocktail from './components/Cocktail'

const App = () => {
  const [cocktails, setCocktails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('a')

  const getCocktails = async () => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
      }
    }
    const reponse = await fetch(
      `${import.meta.env.VITE_RAPID_API_URL}?name=${query}`,
      options
    )
    const data = await reponse.json()
    setCocktails(data.slice(0, 10))
  }

  useEffect(() => {
    getCocktails()

    return () => setIsLoading(false)
  }, [query])

  return (
    <main className="bg-primary-900 w-full overflow-y-auto overflow-x-hidden text-primary-50">
      <header className="fixed w-full flex items-center justify-between px-2 sm:px-4 py-2 sm:py-4 md:px-24 md:py-4 select-none h-16 overflow-hidden bg-primary-800 z-50">
        <div className="flex gap-2 items-center">
          <img src="/cocktail.svg" className="w-10 h-10" />
          <h1 className="text-2xl">Cocktails App</h1>
        </div>
        <div>
          <button>
            <IconHeart size={32} />
          </button>
        </div>
      </header>
      <div className="px-2 sm:px-4 py-10 md:px-24 mt-16 flex gap-2 sm:gap-4 w-full md:w-1/2 mx-auto">
        <input
          onChange={(e) =>
            setQuery(e.target.value.length > 0 ? e.target.value : 'a')
          }
          type="text"
          className="w-full rounded-md px-4 py-2 outline-none focus:outline-none bg-primary-700 hover:bg-primary-600 focus:bg-primary-600 duration-300"
          placeholder="Search cocktails..."
        />
        <button>
          <IconSearch size={32} />
        </button>
      </div>
      {isLoading && (
        <div className="px-2 sm:px-4 md:px-24 pb-18 sm:pb-20 flex items-center justify-center h-52">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-primary-200 animate-spin fill-secondary-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {cocktails.length > 0 && !isLoading && (
        <div className="px-2 sm:px-4 md:px-24 pb-32 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 duration-300">
          {cocktails.map((cocktail) => (
            <Cocktail key={cocktail.name} cocktail={cocktail} />
          ))}
        </div>
      )}
      {cocktails.length === 0 && !isLoading && (
        <div className="px-2 sm:px-4 md:px-24 pb-18 sm:pb-20">
          <h1 className="text-xl text-center bg-primary-800 rounded-md py-10 duration-300">
            No cocktails found
          </h1>
        </div>
      )}
      <footer>
        <div className="bg-primary-800 h-16 flex items-center justify-center fixed w-full bottom-0">
          <p className="text-primary-400 text-sm">
            Made with ❤️ by{' '}
            <a
              href="https://www.edgarbenavides.dev/"
              target="_blank"
              className="text-primary-50"
              rel="noreferrer"
            >
              Edgar
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App
