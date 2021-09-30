import Favorite from '../../schemas/Favorite'

async function favoriteRecipe (req, res) {
  const result = await Favorite.findOneAndDelete({ recipe: req.params.id, user: req.user._id })
  if (result) {
    return res.json({ deleted: true })
  }
  const favorite = new Favorite({
    recipe: req.params.id,
    user: req.user._id
  })
  await favorite.save()
  res.json(favorite)
}

export default favoriteRecipe
