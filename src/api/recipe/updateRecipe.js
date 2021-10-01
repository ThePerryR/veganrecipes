import Recipe from '../../schemas/Recipe'

async function updateRecipe (req, res) {
  const recipe = await Recipe.findById(req.params.id)
  if (!recipe) {
    return res.sendStatus(401)
  }
  if (!recipe.author.equals(req.user._id)) {
    return res.sendStatus(409)
  }
  if (![null, undefined].includes(req.body.name)) recipe.name = req.body.name
  if (![null, undefined].includes(req.body.description)) recipe.description = req.body.description
  if (![null, undefined].includes(req.body.category)) recipe.category = req.body.category
  if (![null, undefined].includes(req.body.images)) recipe.images = req.body.images
  if (![null, undefined].includes(req.body.ingredients)) recipe.ingredients = req.body.ingredients
  if (![null, undefined].includes(req.body.instructions)) recipe.instructions = req.body.instructions
  await recipe.save()
  res.json(recipe)
}

export default updateRecipe
