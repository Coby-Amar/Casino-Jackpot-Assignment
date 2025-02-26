import { Symbol } from "./symbol";

export class SlotMachine {
    public credits: number
    public isWinner: boolean = false
    public results: Symbol[] = []
    private options: Symbol[]
    constructor(credits = 0, options: Symbol[]) {
        this.credits = credits
        this.options = options
    }
    private rollSlot() {
        return this.options[Math.floor(Math.random() * this.options.length)];
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