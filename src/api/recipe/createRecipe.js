import Recipe from '../../schemas/Recipe'

async function createRecipe (req, res) {
  console.log(req.body.name)
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    author: req.user._id
  })
  await recipe.save()
  res.json(recipe)
}

export default createRecipe
