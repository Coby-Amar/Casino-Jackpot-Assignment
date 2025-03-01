import axiosClient from './axios.service'

export interface UpdateCashData {
    balance: number
    credits: number
}

export interface RollData {
    isWinner: boolean;
    credits: number;
    results: string[];
}

export interface LoginData {
    username: string
    password: string
}

export interface User {
    username: string
    balance: number
    credits: number
}

export class ApiService {
    static async user(): Promise<User> {
        const { data } = await axiosClient.get('/user')
        return data
    }

    static async signup(loginData: LoginData): Promise<User> {
        const { data } = await axiosClient.post('/auth/signup', loginData)
        return data
    }
    static async login(loginData: LoginData): Promise<User> {
        const { data } = await axiosClient.post('/auth/login', loginData)
        return data
    }
    static logout(): Promise<void> {
        return axiosClient.delete('/auth/logout')
    }

    static async topUp(credits: number): Promise<UpdateCashData> {
        const { data } = await axiosClient.post('/slots/topup', { credits })
        return data
    }
    static async roll(): Promise<RollData> {
        const { data } = await axiosClient.post('/slots/roll')
        return data
    }
    static async cashIn(credits: number): Promise<UpdateCashData> {
        const { data } = await axiosClient.post('/slots/cashin', { credits })
        return data
    }
    static async cashOut(): Promise<UpdateCashData> {
        const { data } = await axiosClient.post('slots/cashout')
        return data
    }
}