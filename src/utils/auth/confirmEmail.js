import User from '../../schemas/User'

async function confirmEmail (req, res) {
  await User.findOneAndUpdate({ validationId: req.query.token }, { validated: true })
  res.redirect('/login')
}

export default confirmEmail
