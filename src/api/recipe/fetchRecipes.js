import Recipe from '../../schemas/Recipe'
import mongoose from 'mongoose'

async function fetchRecipes (req, res) {
  const query = {}
  if (req.query.author) {
    query.author = mongoose.Types.ObjectId(req.query.author)
  }
  const recipes = await Recipe.find(query).populate('author', 'displayName profilePicture')
  res.json(recipes)
}

export default fetchRecipes
