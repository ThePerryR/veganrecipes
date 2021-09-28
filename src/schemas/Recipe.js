import mongoose, { Schema } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Recipe = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  images: [String],
  ingredients: [String],
  instructions: [String]
})

module.exports = mongoose.model('Recipe', Recipe)
