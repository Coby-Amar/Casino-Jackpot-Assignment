import { Application, Request, Response } from 'express'

import { Symbol } from '../../models/symbol';
import { User } from '../../models/user';

const options = ['C', 'L', 'O', 'W'].map((symbol, i) => new Symbol({
    name: symbol,
    worth: 10 * (i + 1)
}))


export function handleStart(req: Request, res: Response) {
    const user = User.new()
    req.session.user = user;
    res.status(200).json(user.credits);
}


class SlotMachine {
    public credits: number
    public isWinner: boolean = false
    public results: Symbol[] = []
    constructor(credits = 0) {
        this.credits = credits
    }
    private rollSlot() {
        return options[Math.floor(Math.random() * options.length)];
    }
    public get worth() {
        return this.isWinner ? this.results[0].worth : 0
    }
    public roll() {
        const rollResult = [this.rollSlot(), this.rollSlot(), this.rollSlot()];
        this.results = rollResult
        this.isWinner = new Set(rollResult).size === 1
    }
}

export function handleRoll(req: Request, res: Response) {
    const slotMachine = new SlotMachine(req.session.user?.credits)
    if (!slotMachine.credits || slotMachine.credits < 1) {
        res.status(400).json({ error: 'Not enough credits' });
        return
    }
    slotMachine.credits -= 1
    slotMachine.roll()

    if (slotMachine.isWinner) {
        const creditsBetween40And60AndShouldReroll = slotMachine.credits >= 40 && slotMachine.credits <= 60 && Math.random() < 0.3
        const creditsAbove60AndShouldReroll = slotMachine.credits > 60 && Math.random() < 0.6
        if (creditsBetween40And60AndShouldReroll || creditsAbove60AndShouldReroll) {
            slotMachine.roll()
        }
    }
    req.session.user!.credits = slotMachine.credits + slotMachine.worth;
    res.status(200).json(slotMachine)
}

export function handleCashout(req: Request, res: Response) {
    const credits = req.session.user!.credits;
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: 'Failed to end session' });
        res.json(credits);
    });
}

