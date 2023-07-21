import { useState } from 'react'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import {
  IconChevronDown,
  IconChevronRight,
  IconCategory,
  IconGlass,
  IconAlertTriangleFilled,
  IconList
} from '@tabler/icons-react'

const Cocktail = ({ cocktail }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const ingredients = Array.from(
    new Set(
      Object.entries(cocktail)
        .filter(([key, value]) => key.includes('strIngredient') && value)
        .map(([key, value]) => value)
    )
  )

  return (
    <div className="bg-zinc-800 w-full max-w-full overflow-hidden rounded-md shadow-lg h-fit">
      <div className="h-[250px] relative">
        <div className="w-full h-full animate-pulse bg-zinc-700"></div>
        <img
          loading="lazy"
          src={cocktail.strDrinkThumb || '/cocktail.png'}
          alt={cocktail.strDrink}
          className="object-cover w-full h-full transition-all ease-in duration-300 absolute top-0 left-0 hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between h-fit">
        <div
          className={`p-3 overflow-hidden min-h-[100px] flex flex-col gap-5 ${
            isExpanded ? 'h-fit' : 'h-[100px]'
          }`}
        >
          <div>
            <h2 className="font-bold text-lg">
              {capitalizeFirstLetter(cocktail.strDrink)}
            </h2>
            <p className="text-primary-400 font-semibold text-zinc-200">
              {cocktail.strInstructions}
            </p>
          </div>
          <div>
            <p className="font-bold text-md flex items-center gap-1">
              <span>
                <IconList />
              </span>
              <span>Ingredients</span>
            </p>
            <ul className="text-zinc-200 ml-5 font-semibold">
              {ingredients.map((ingredient) => (
                <li key={`${cocktail.strDrink}.${ingredient}`} className="flex">
                  <IconChevronRight />
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-bold text-md flex items-center gap-1">
              <span>
                <IconGlass />
              </span>
              <span>Glass type</span>
            </p>
            <p className="text-zinc-200 ml-7 font-semibold">
              {cocktail.strGlass}
            </p>
          </div>
          <div>
            <p className="font-bold text-md flex items-center gap-1">
              <span>
                <IconCategory />
              </span>
              <span>Category</span>
            </p>
            <p className="text-zinc-200 ml-7 font-semibold">
              {cocktail.strCategory}
            </p>
          </div>
          <div>
            <p className="font-bold text-md flex items-center gap-1">
              <span>
                <IconAlertTriangleFilled />
              </span>
              <span>Alcoholic</span>
            </p>
            <p className="text-zinc-200 ml-7 font-semibold">
              {cocktail.strAlcoholic.toLowerCase() === 'alcoholic'
                ? 'Yes'
                : 'No'}
            </p>
          </div>
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
