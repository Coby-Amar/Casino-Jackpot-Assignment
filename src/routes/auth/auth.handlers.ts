import { Request, Response } from 'express'

export async function handleSignup(req: Request, res: Response) {
    try {
        const user = await req.db.signup(req.body)
        res.appRes.updateAppSessionAndResponedWithCode201({
            id: user.id,
            username: user.username,
            balance: user.balance,
            credits: 10,
        })
    } catch {
        res.appRes.errors.handle400('Username/Passwords incorrect')
    }
}

export async function handleLogin(req: Request, res: Response) {
    try {
        const user = await req.db.login(req.body)
        res.appRes.updateAppSessionAndResponedWithCode200({
            id: user.id,
            username: user.username,
            balance: user.balance,
            credits: 10,
        })
    } catch {
        res.appRes.errors.handle400('Username/Passwords incorrect')
    }
}

export async function handleLogout(req: Request, res: Response) {
    try {
        const { id, balance, credits } = req.session.appData!;
        await req.db.updateBalance({
            id,
            balance: balance + credits
        })
        req.session.destroy((error) => {
            if (error)
                return res.status(500).json({ error: 'Failed to logout' })
            res.sendStatus(202)
        })
    } catch {
        res.appRes.errors.handle500('logout')
    }
}