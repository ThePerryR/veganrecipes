import { Router } from 'express'

import fetchUser from './fetchUser'
import updateUser from './updateUser'

const router = Router({ mergeParams: true })

router.get('/:id', fetchUser)
router.put('/:id', updateUser)

export default router
