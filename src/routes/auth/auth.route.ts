import { Router } from 'express'

import { handleSignup, handleLogin, handleLogout } from './auth.handlers'
import { missingDataMiddleware } from '@middleware/validations.middleware';

const router = Router()

router.post('/signup', missingDataMiddleware, handleSignup);
router.post('/login', missingDataMiddleware, handleLogin);
router.delete('/logout', handleLogout);

export default router