import { useState, useEffect } from 'react'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react'

const Cocktail = ({ cocktail }) => {
  const [image, setImage] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const generateImage = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: `${cocktail.name ?? ''} cocktail`,
        n: 1,
        size: '1024x1024'
      })
    }
    const reponse = await fetch(import.meta.env.VITE_OPENAPI_API_URL, options)
    const data = await reponse.json()
    if (data.error) {
      setImage('/cocktail.svg')
      return
    }
    setImage(data.data[0].url)
  }

  useEffect(() => {
    generateImage()
  }, [])

  return (
    <div className="bg-primary-800 w-full max-w-full overflow-hidden rounded-md shadow-lg sm:hover:scale-105 duration-300 h-fit">
      {!image && <div className="h-[250px] bg-gray-700 animate-pulse"></div>}
      {image && (
        <div className="h-[250px]">
          <img
            src={image}
            alt={cocktail.name}
            className="object-cover w-full h-full transition-all ease-in duration-300"
          />
        </div>
      )}
      <div className="flex flex-col justify-between h-fit">
        <div
          className={`p-3 overflow-hidden min-h-[100px] ${
            isExpanded ? 'h-fit' : 'h-[100px]'
          }`}
        >
          <h2 className="font-bold">{capitalizeFirstLetter(cocktail.name)}</h2>
          <p className="text-primary-400 font-light">{cocktail.instructions}</p>
          <ul className="mt-6">
            <li>Ingredients:</li>
            {cocktail.ingredients.map((ingredient) => (
              <li key={ingredient} className="flex">
                <IconChevronRight />
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-primary-700 flex items-center justify-center hover:bg-primary-600 duration-300 p-2"
        >
          <IconChevronDown
            className={`${
              isExpanded ? 'rotate-180 duration-300' : 'rotate-0 duration-300'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default Cocktail
