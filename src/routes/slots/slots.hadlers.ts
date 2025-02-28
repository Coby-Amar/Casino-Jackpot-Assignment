import { Request, Response } from 'express'

import { SlotMachine } from './slot_machine'

export async function handleTopup(req: Request, res: Response) {
    try {
        const { id, balance, credits } = req.session.appData!
        const newBalance = balance + req.body.credits
        await req.db.updateBalance({
            id,
            balance: newBalance
        })
        res.appRes.updateAppSessionAndResponedWithCode202({
            credits,
            balance: newBalance
        })
    } catch {
        res.appRes.errors.handle500('add funds')
    }
}

export function handleRoll(req: Request, res: Response) {
    try {
        const { credits, balance } = req.session.appData!
        const slotMachine = new SlotMachine(credits, balance)
        if (slotMachine.canNotPlay) {
            res.appRes.errors.handle400('Not enough credits')
            return
        }
        slotMachine.credits -= 1
        slotMachine.roll()
        slotMachine.rerollIfNeeded()
        const clientResponse = slotMachine.clientResponse
        req.session.appData!.credits = clientResponse.credits;
        res.status(200).json(clientResponse)
    } catch {
        res.appRes.errors.handle500('roll')
    }
}

export function handleCashin(req: Request, res: Response) {
    try {
        const { balance, credits } = req.session.appData!;
        const cashInCredits = req.body.credits
        if (cashInCredits < balance) {
            const newBalance = balance - cashInCredits
            req.db.updateBalance({
                id: req.session.appData!.id,
                balance: newBalance
            })
            res.appRes.updateAppSessionAndResponedWithCode202({
                balance: newBalance,
                credits: credits + cashInCredits
            })
        } else {
            res.appRes.errors.handle400('Not enought credits in balance add more')
        }
    } catch {
        res.appRes.errors.handle500('cash in')
    }
}

export async function handleCashout(req: Request, res: Response) {
    try {
        const { id, balance, credits } = req.session.appData!;
        const updatedBalance = balance + credits
        await req.db.updateBalance({
            id,
            balance: updatedBalance
        })
        res.appRes.updateAppSessionAndResponedWithCode202({
            balance: updatedBalance,
            credits: 0
        })
    } catch {
        res.appRes.errors.handle500('cash out')
    }
}

