import { Request, Response, Router } from 'express'
const router = Router()

router.get('/roll', (req: Request, res: Response) => {
    const credits = req.session.user?.credits
    res.status(200).json('User creadits: ' + credits)
});

export default router