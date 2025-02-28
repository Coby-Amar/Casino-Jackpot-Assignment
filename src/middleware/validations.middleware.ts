import { Request, Response, NextFunction } from 'express'

export function missingDataMiddleware(req: Request, res: Response, next: NextFunction) {
    const body = req.body
    if (!body || Object.values(body).find(value => !value)) {
        res.appRes.errors.handle400('Missing data')
        return
    }
    next()
}
