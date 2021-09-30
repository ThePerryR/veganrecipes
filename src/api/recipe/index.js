import { Router } from 'express'

import fetchRecipe from './fetchRecipe'
import createRecipe from './createRecipe'
import deleteRecipe from './deleteRecipe'
import fetchRecipes from './fetchRecipes'
import favoriteRecipe from './favoriteRecipe'
import reviewRecipe from './reviewRecipe'
import searchRecipe from './searchRecipe'

const router = Router({ mergeParams: true })

router.post('/', createRecipe)
router.get('/', fetchRecipes)
router.get('/search/:query', searchRecipe)
router.get('/:slug', fetchRecipe)
router.delete('/:id', deleteRecipe)
router.post('/:id/favorite', favoriteRecipe)
router.post('/:id/review', reviewRecipe)

export default router
