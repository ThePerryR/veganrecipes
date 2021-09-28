import Recipe from '../../schemas/Recipe'

async function fetchRecipe (req, res) {
  const recipe = await Recipe.findById(req.params.id)
  console.log(recipe)
  res.json(recipe)
}

export default fetchRecipe
