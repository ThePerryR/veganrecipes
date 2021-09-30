import mongoose, { Schema } from 'mongoose'

const Favorite = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }
},
{
  timestamps: true
}
)

module.exports = mongoose.model('Favorite', Favorite)
