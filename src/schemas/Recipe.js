import mongoose, { Schema } from 'mongoose'
import categories from '../constants/categories'

const Ingredient = new Schema({
  quantity: Number,
  unit: String,
  ingredient: String,
  prep: String
})

const Recipe = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  category: { type: String, required: false, enum: categories.map(({ value }) => value) },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  images: [String],
  ingredients: [Ingredient],
  instructions: [String],
  metadata: {
    prepTime: Number,
    cookTime: Number,
    yield: Number
  }
},
{
  timestamps: true
})

module.exports = mongoose.model('Recipe', Recipe)
