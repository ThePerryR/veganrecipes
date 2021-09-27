import User from '../../schemas/User'
import attemptLogin from './attemptLogin'

export default function (req, res, next) {
  if (!req.body.email) {
    return res.status(401).json({ err: { email: true } })
  }
  if (!req.body.password) {
    return res.status(401).json({ err: { password: true } })
  }
  if (!req.body.displayName) {
    return res.status(401).json({ err: { displayName: true } })
  }

  User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
    if (err) {
      return res.status(500).json({ err: err.errors })
    }
    if (user) {
      return res.status(400).json({ err: { email: 'This email is already in use.' } })
    }

    User.register({
      email: req.body.email.toLowerCase(),
      displayName: req.body.displayName
    }, req.body.password, async (err, user) => {
      if (err) {
        return res.status(400).json({ err: err.errors })
      }
      if (!user) {
        return res.status(500).json({ err: { email: true } })
      }

      attemptLogin(req, res, next)
    })
  })
}
