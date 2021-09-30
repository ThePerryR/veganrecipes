import mongoose from 'mongoose'

import Recipe from '../../schemas/Recipe'
import populateRecipeCard from '../../utils/pipelines/populateRecipeCard'

async function fetchRecipes (req, res) {
  const query = {}
  if (req.query.author) {
    query.author = mongoose.Types.ObjectId(req.query.author)
  }

  const sort = {}
  if (req.query.sort) {
    const sorts = req.query.sort.split(' ')
    for (const s of sorts) {
      if (s[0] === '-') {
        sort[s.substring(1, s.length)] = -1
      } else {
        sort[s] = 1
      }
    }
  }

  const pipeline = [{ $match: query }, ...populateRecipeCard(req.user), { $sort: sort }]

  if (req.query.search) {
    pipeline.unshift({
      $search: {
        index: 'search',
        text: {
          query: req.query.search,
          path: {
            wildcard: '*'
          }
        }
      }
    })
  }

  const recipes = await Recipe.aggregate(pipeline)
  // const recipes = await Recipe.find(query).populate('author', 'displayName profilePicture').sort(req.query.sort || '-createdAt')
  res.json(recipes)
}

export default fetchRecipes
