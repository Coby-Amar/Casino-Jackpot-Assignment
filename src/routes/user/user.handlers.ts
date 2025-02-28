import { Request, Response } from 'express'


export async function handleGetUser(req: Request, res: Response) {
    try {
        const { username, balance, credits } = req.session.appData!
        res.status(200).json({ username, balance, credits })
    } catch (error) {
        res.appRes.errors.handle500('get user')
    }
}