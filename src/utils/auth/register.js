import { v4 as uuid } from 'uuid'

import User from '../../schemas/User'
import attemptLogin from './attemptLogin'
import mail from '../mail'

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

    const validationId = uuid()
    User.register({
      email: req.body.email.toLowerCase(),
      displayName: req.body.displayName,
      validationId
    }, req.body.password, async (err, user) => {
      if (err) {
        return res.status(400).json({ err: err.errors })
      }
      if (!user) {
        return res.status(500).json({ err: { email: true } })
      }

      mail(req.body.email, 'welcome', { name: user.displayName, action_url: `https://www.easyvgn.com/confirm-email?token=${validationId}` })

      res.json({ success: true })

      // attemptLogin(req, res, next)
    })
  })
}
