import { Router } from 'express'
import slotsRoute from './slots'

const router = Router()

router.use('/slots', slotsRoute)

export default router