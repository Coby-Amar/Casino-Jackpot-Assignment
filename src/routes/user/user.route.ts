import { Router } from 'express'

import { handleGetUser } from './user.handlers'

const router = Router()

router.get('/', handleGetUser);

export default router