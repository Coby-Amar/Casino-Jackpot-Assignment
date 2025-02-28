import { Request, Response, Router } from 'express'
import path from 'path'

import authRoute from './auth/auth.route'
import userRoute from './user/user.route'
import slotsRoute from './slots/slots.route'
import { authSessionMiddleware } from '@middleware/auth.middleware'

const router = Router()

router.use('/api/v1/auth', authRoute)

router.use('/api/v1/user', authSessionMiddleware, userRoute)
router.use('/api/v1/slots', authSessionMiddleware, slotsRoute)

router.get('*', (_: Request, res: Response) => res.sendFile(path.join(__dirname, '../../public/index.html')))
export default router