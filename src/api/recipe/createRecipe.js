import slugify from 'slugify'
import Recipe from '../../schemas/Recipe'
import generateSlug from '../../utils/generateSlug'

async function createRecipe (req, res) {
  const slug = await generateSlug(req.body.name)

  const recipe = new Recipe({
    slug,
    name: req.body.name,
    category: req.body.category,
    metadata: req.body.metadata,
    description: req.body.description,
    images: req.body.images,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    author: req.user._id
  })
  await recipe.save()
  res.json(recipe)
}

export default createRecipe
