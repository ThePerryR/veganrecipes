import User from '../../schemas/User'

async function fetchUser (req, res) {
  const user = await User.findById(req.params.id)
  res.json(user)
}

export default fetchUser
