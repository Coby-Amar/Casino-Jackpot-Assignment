// import { Request } from "express"

declare type LoginProps = Pick<UserI, 'username' | 'password'>
declare type UpdateBalanceProps = Pick<UserI, 'id' | 'balance'>

declare interface DatabaseI {
    /**
    * Public only for testing
    *  */
    db: unknown

    async getUser(id: string): Promise<UserI>

    async signup(data: LoginProps): Promise<UserI>
    async login(data: LoginProps): Promise<UserI>
    async updateBalance(data: UpdateBalanceProps): Promise<void>
}


declare namespace Express {
    export interface Request {
        db: DatabaseI
    }
    export interface Response {
        appRes: AppResponses
    }
}

// type AppResponsesCallback = function(data: ResponseDataI): void;

declare interface AppErrorResponses {
    public handle400(error: string): void
    public handle401(): void
    public handle500(action: string): void
}

declare interface AppResponses {
    public updateAppSessionAndResponedWithCode200(data: ResponseDataI): void
    public updateAppSessionAndResponedWithCode201(data: ResponseDataI): void
    public updateAppSessionAndResponedWithCode202(data: ResponseDataI): void
    errors: AppErrorResponses
}

declare type SessionAppData = Pick<UserI, 'id' | 'balance' | 'username'> & {
    credits: number
}

declare type ResponseDataI = Partial<Pick<SessionAppData, 'username' | 'id'>> & Pick<SessionAppData, 'balance' | 'credits'>