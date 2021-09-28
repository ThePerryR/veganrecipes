import Recipe from '../../schemas/Recipe'

async function fetchRecipe (req, res) {
  const recipe = await Recipe.findOne({ slug: req.params.slug })
  res.json(recipe)
}

export default fetchRecipe
