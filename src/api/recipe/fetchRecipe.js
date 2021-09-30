import Recipe from '../../schemas/Recipe'

import populateAuthorAndRating from '../../utils/pipelines/populateAuthorAndRating'

async function fetchRecipe (req, res) {
  const [recipe] = await Recipe.aggregate([
    { $match: { slug: req.params.slug } },
    ...populateAuthorAndRating
  ])
  res.json(recipe)
}

export default fetchRecipe
