const symbols = ["🍒", "🍋", "🍊", "🍉"]
const symbolsLength = symbols.length
const symbolsWorth = new Array(symbolsLength).fill(0).map((_, index) => 10 * (index + 1))

export class SlotMachine {
    public credits: number
    public balance: number
    public isWinner: boolean = false
    public results: string[] = []
    constructor(credits = 0, balance: number) {
        this.credits = credits
        this.balance = balance
    }
    get total() {
        return this.credits + this.balance
    }
    get canNotPlay() {
        return !this.credits || this.credits < 1
    }
    get creditsBetween40And60AndShouldReroll() {
        return this.total >= 40 && this.total <= 60 && Math.random() < 0.3
    }
    get creditsAbove60AndShouldReroll() {
        return this.total > 60 && Math.random() < 0.6
    }
    get worth(): number {
        if (!this.isWinner) {
            return 0
        }
        const first = this.results[0]
        const foundIndex = symbols.findIndex(symbol => symbol === first)
        return symbolsWorth[foundIndex]
    }
    get clientResponse() {
        const { isWinner, results, credits } = this
        return {
            isWinner,
            credits: credits + this.worth,
            results
        }
    }
    private rollSlot() {
        return symbols[Math.floor(Math.random() * symbolsLength)];
    }
    public roll() {
        const rollResult = [this.rollSlot(), this.rollSlot(), this.rollSlot()];
        this.results = rollResult
        this.isWinner = new Set(rollResult).size === 1
    }
    public rerollIfNeeded() {
        if (this.isWinner && (this.creditsBetween40And60AndShouldReroll || this.creditsAbove60AndShouldReroll)) {
            this.roll()
        }
    }
}