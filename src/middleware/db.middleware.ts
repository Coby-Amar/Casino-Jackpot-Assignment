import { Request, Response, NextFunction } from 'express'

export const databaseMiddleware = (db: DatabaseI) => (req: Request, _: Response, next: NextFunction) => {
    if (!req.db) {
        req.db = db
    }
    next()
}