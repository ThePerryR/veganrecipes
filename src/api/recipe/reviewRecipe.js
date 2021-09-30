import Review from '../../schemas/Review'
import mongoose from 'mongoose'

async function reviewRecipe (req, res) {
  await Review.findOneAndUpdate({
    user: req.body.userId,
    recipe: req.params.id
  }, {
    stars: req.body.stars
  }, { upsert: true, new: true })
  const [{ ratingValue, ratingCount }] = await Review.aggregate([
    { $match: { recipe: mongoose.Types.ObjectId(req.params.id) } },
    {
      $group: {
        _id: null,
        ratingValue: {
          $avg: '$stars'
        },
        ratingCount: {
          $sum: 1
        }
      }
    }
  ])
  res.json({ ratingValue, ratingCount })
}

export default reviewRecipe
