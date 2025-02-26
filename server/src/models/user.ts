export interface UserI {
    credits: number
}



export class User implements UserI {
    public credits: number
    constructor({ credits }: UserI) {
        this.credits = credits
    }
    static new() {
        return new User({ credits: 0 })
    }
}
