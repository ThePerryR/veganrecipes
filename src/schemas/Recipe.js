import mongoose, { Schema } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const Recipe = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Recipe', Recipe)
