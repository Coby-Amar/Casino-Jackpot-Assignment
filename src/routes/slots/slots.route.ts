import { Router } from 'express'
import { handleStart, handleRoll, handleCashout } from './slots.hadlers';
const router = Router()

router.get('/start', handleStart);

router.post('/roll', handleRoll);

router.post('/cashout', handleCashout);

export default router