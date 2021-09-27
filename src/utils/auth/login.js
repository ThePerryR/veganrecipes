import attemptLogin from './attemptLogin'
import User from '../../schemas/User'

export default async function (req, res, next) {
  if (!req.body.email) {
    return res.status(401).json({ err: { email: 'Please enter a valid email address.' } })
  }
  if (!req.body.password) {
    return res.status(401).json({ err: { password: 'Please enter your password' } })
  }
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(401).json({ err: { email: 'We could not find an account with this email.' } })
  }

  attemptLogin(req, res, next)
}