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
    $project: {
      name: 1,
      description: 1,
      category: 1,
      slug: 1,
      ingredients: 1,
      instructions: 1,
      images: 1,
      createdAt: 1,
      updatedAt: 1,
      'author.displayName': 1,
      'author.profilePicture': 1,
      'author._id': 1
    }
  },
  {
    $unwind: {
      path: '$author'
    }
  }
])
