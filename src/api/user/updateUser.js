import User from '../../schemas/User'

async function updateUser (req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(user)
}

export default updateUser
