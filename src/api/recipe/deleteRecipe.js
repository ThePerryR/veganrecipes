import Recipe from '../../schemas/Recipe'

async function fetchRecipe (req, res) {
  // TODO verify current user is author
  await Recipe.findByIdAndRemove(req.params.id)
  res.json({ success: true })
}

export default fetchRecipe
