import Recipe from '../../schemas/Recipe'

async function createRecipe (req, res) {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    author: req.user._id
  })
  await recipe.save()
  res.json(recipe)
}

export default createRecipe
