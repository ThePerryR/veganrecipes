import mongoose, { Schema } from 'mongoose'
import categories from '../constants/categories'

const Recipe = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  category: { type: String, required: false, enum: categories.map(({ value }) => value) },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  images: [String],
  ingredients: [String],
  instructions: [String]
},
{
  timestamps: true
})

module.exports = mongoose.model('Recipe', Recipe)
