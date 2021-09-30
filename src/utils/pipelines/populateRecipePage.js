export default (user) => ([
  {
    $lookup: {
      from: 'users',
      localField: 'author',
      foreignField: '_id',
      as: 'author'
    }
  },
  {
    $lookup: {
      from: 'favorites',
      localField: '_id',
      foreignField: 'recipe',
      as: 'favorites'
    }
  },
  {
    $lookup: {
      from: 'reviews',
      localField: '_id',
      foreignField: 'recipe',
      as: 'reviews'
    }
  },
  {
    $project: {
      name: 1,
      description: 1,
      slug: 1,
      ingredients: 1,
      instructions: 1,
      createdAt: 1,
      updatedAt: 1,
      'author.displayName': 1,
      'author.profilePicture': 1,
      'author._id': 1,
      images: 1,
      isFavorite: user
        ? {
            $in: [user._id, '$favorites.user']
          }
        : 0,
      favoriteCount: {
        $size: '$favorites'
      },
      ratingCount: {
        $size: '$reviews'
      },
      ratingValue: {
        $avg: '$reviews.stars'
      }
    }
  },
  {
    $unwind: {
      path: '$author'
    }
  }
])
