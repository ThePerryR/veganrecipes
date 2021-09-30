import Recipe from '../../schemas/Recipe'

import populateRecipePage from '../../utils/pipelines/populateRecipePage'

async function fetchRecipe (req, res) {
  const [recipe] = await Recipe.aggregate([
    { $match: { slug: req.params.slug } },
    ...populateRecipePage(req.user)
  ])
  res.json(recipe)
}

export default fetchRecipe
