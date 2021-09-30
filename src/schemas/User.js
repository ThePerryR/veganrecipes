import mongoose from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  profilePicture: { type: String }
})

User.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', User)
