import { Router } from 'express'

import Recipe from '../../schemas/Recipe'
import fetchRecipe from './fetchRecipe'
import createRecipe from './createRecipe'
import deleteRecipe from './deleteRecipe'
import fetchRecipes from './fetchRecipes'

const router = Router({ mergeParams: true })

router.post('/', createRecipe)
router.get('/', fetchRecipes)
router.get('/:id', fetchRecipe)
router.delete('/:id', deleteRecipe)

export default router
