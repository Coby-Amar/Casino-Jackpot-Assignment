import { v4 } from 'uuid'

export class User implements UserI {
    public id: string
    public username: string
    public password: string
    public balance: number

    constructor({ id, username, password, balance }: UserI) {
        this.id = id
        this.username = username
        this.password = password
        this.balance = balance
    }

    static new(data: LoginProps) {
        return new User({ ...data, id: v4(), balance: 0 })
    }
}
