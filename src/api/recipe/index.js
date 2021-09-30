import { Router } from 'express'

import fetchRecipe from './fetchRecipe'
import createRecipe from './createRecipe'
import deleteRecipe from './deleteRecipe'
import fetchRecipes from './fetchRecipes'
import reviewRecipe from './reviewRecipe'

const router = Router({ mergeParams: true })

router.post('/', createRecipe)
router.get('/', fetchRecipes)
router.get('/:slug', fetchRecipe)
router.delete('/:id', deleteRecipe)
router.post('/:id/review', reviewRecipe)

export default router
