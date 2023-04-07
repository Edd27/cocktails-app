export const fetchRandomCocktails = async () => {
  const cocktails = []

  for (const index of Array(12).keys()) {
    const response = await fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/random.php'
    )
    const data = await response.json()
    const cocktail = data.drinks[0]
    if (cocktail) {
      const alreadyExists = cocktails.some((el) => el.idDrink === data.idDrink)
      if (!alreadyExists) {
        cocktails.push(cocktail)
      }
    }
  }

  return cocktails
}
