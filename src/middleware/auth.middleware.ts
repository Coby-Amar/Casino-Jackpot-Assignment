import { Request, Response, NextFunction } from 'express'

export function authSessionMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.session.appData) {
        res.appRes.errors.handle401()
        return
    }
    next()
}
