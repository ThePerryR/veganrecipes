import Recipe from '../../schemas/Recipe'

async function searchRecipe (req, res) {
  const recipes = await Recipe.aggregate([
    {
      $search: {
        index: 'search',
        text: {
          query: req.params.query,
          path: {
            wildcard: '*'
          }
        }
      }
    },
    {
      $limit: 5
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    },
    {
      $unwind: {
        path: '$author'
      }
    },
    {
      $project: {
        name: 1,
        slug: 1,
        images: 1,
        'author._id': 1,
        'author.displayName': 1
      }
    }
  ])

  res.json(recipes)
}

export default searchRecipe
