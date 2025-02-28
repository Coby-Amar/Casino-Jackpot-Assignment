import { JsonDB, Config } from 'node-json-db'
import { compare, hash } from 'bcrypt'

import { User } from '../models/user';

export class JsonDb implements DatabaseI {
    /**
     * Public only for testing
     *  */
    public db = new JsonDB(new Config("casino_jackpot_db", true, false, '/'));
    constructor() {
        this.init()
    }
    private async init() {
        const exists = await this.db.exists('/users')
        if (!exists) {
            this.db.push('/users', [])
        }
    }

    public get users(): Promise<UserI[]> {
        return this.db.getData('/users')
    }

    public async getUser(id: string): Promise<UserI> {
        const users = await this.users
        const foundUser = users.find(u => u.id === id)
        if (!foundUser) {
            throw Error()
        }
        return foundUser
    }

    public async signup({ username, password }: LoginProps): Promise<UserI> {
        const hashedPassword = await hash(password, 5)
        const user = User.new({
            username,
            password: hashedPassword,
        })
        const users: User[] = await this.users
        users.push(user)
        await this.db.push('/users', users)
        return user

    }
    public async login({ username, password }: LoginProps): Promise<UserI> {
        const users: User[] = await this.db.getData('/users')
        const user = users.find(u => u.username === username)
        if (!user || !await compare(password, user.password)) {
            throw Error()
        }
        return user
    }
    public async updateBalance({ id, balance }: UpdateBalanceProps): Promise<void> {
        const users = await this.users
        const user = users.find(u => u.id === id)
        if (!user) {
            throw Error()
        }
        user.balance = balance
        await this.db.push('/users', users)
    }
}