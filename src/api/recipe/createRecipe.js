import slugify from 'slugify'
import Recipe from '../../schemas/Recipe'

async function createRecipe (req, res) {
  const slug = slugify(req.body.name, { lower: true, strict: true })
  let unique = false
  let number = 0
  while (!unique) {
    const recipe = await Recipe.findOne({ slug: number ? `${slug}-${number}` : slug })
    if (!recipe) {
      unique = true
    } else {
      number++
    }
  }

  const recipe = new Recipe({
    slug: number ? `${slug}-${number}` : slug,
    name: req.body.name,
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
