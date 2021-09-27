import { Router } from 'express'

import recipeRoutes from './recipe'

const router = new Router({ mergeParams: true })

function api () {
  router.use('/recipe', recipeRoutes)
  return router
}

export default api
