import Recipe from '../../schemas/Recipe'
import generateSlug from '../../utils/generateSlug'

async function createRecipe (req, res) {
  const slug = await generateSlug(req.body.name)
  const data = {
    slug,
    name: req.body.name,
    metadata: req.body.metadata,
    description: req.body.description,
    images: req.body.images,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    author: req.user._id
  }

  if (req.body.category) data.category = req.body.category
  const recipe = new Recipe(data)
  await recipe.save()
  res.json(recipe)
  fetch('https://www.google.com/ping?sitemap=https://www.easyvgn.com/sitemap.xml')
}

export default createRecipe
