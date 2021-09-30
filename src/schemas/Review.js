import mongoose, { Schema } from 'mongoose'

const Review = new mongoose.Schema({
  stars: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true }
})

module.exports = mongoose.model('Review', Review)
