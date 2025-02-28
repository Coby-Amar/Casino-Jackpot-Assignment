import { Router } from 'express'
import { handleTopup, handleRoll, handleCashin, handleCashout } from './slots.hadlers';
import { missingDataMiddleware } from '@middleware/validations.middleware';
const router = Router()

router.post('/topup', missingDataMiddleware, handleTopup);

router.post('/roll', handleRoll);

router.post('/cashin', missingDataMiddleware, handleCashin);

router.post('/cashout', handleCashout);

export default router