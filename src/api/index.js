import { Router } from 'express'

import recipeRoutes from './recipe'
import userRoutes from './user'

const router = new Router({ mergeParams: true })

function api () {
  router.use('/user', userRoutes)
  router.use('/recipe', recipeRoutes)
  return router
}

export default api
