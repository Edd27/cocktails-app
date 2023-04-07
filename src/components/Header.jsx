const Header = ({ fetchInitCocktails }) => {
  return (
    <header className="fixed w-full flex items-center justify-between px-2 sm:px-4 py-2 sm:py-4 md:px-24 md:py-4 select-none h-16 overflow-hidden bg-zinc-800 z-50 shadow-md">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={fetchInitCocktails}
      >
        <img src="/cocktail.svg" className="w-10 h-10" />
        <h1 className="text-3xl text-zinc-300 font-bold">Cocktails App</h1>
      </div>
    </header>
  )
}

export default Header
