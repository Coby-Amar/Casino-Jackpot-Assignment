import { Response, Router } from 'express'

import slotsRoute from './slots/slots.route'
import path from 'path'

const router = Router()

router.use('/slots', slotsRoute)

router.get('/', (_, res: Response) => res.sendFile(path.join(__dirname, '../public/index.html')))
export default router