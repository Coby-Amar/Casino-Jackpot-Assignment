export interface SymbolI {
    name: string
    worth: number
}



export class Symbol implements SymbolI {
    public name: string
    public worth: number
    constructor({
        name,
        worth,
    }: SymbolI) {
        this.name = name
        this.worth = worth
    }
}
