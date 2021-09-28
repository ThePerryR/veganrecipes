import Recipe from '../../schemas/Recipe'

async function fetchRecipes (req, res) {
  const recipes = await Recipe.find({ }).populate('author', 'displayName')
  res.json(recipes)
}

export default fetchRecipes
