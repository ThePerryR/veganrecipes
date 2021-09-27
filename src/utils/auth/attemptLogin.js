import passport from 'passport'

const attemptLogin = (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ err: { authError: true } })
    }
    req.login(user, { session: true }, (err) => {
      if (err) {
        return res.status(400).json({ err: { authError: true, message: err } })
      }
      const userJson = { ...user.toObject() }
      delete userJson.salt
      delete userJson.hash
      // { expiresIn: '5m' }
      return res.json({ success: true, user: userJson })
    })
  })(req, res, next)
}

export default attemptLogin
