import { createContext, Dispatch } from "react";
import { RollData, UpdateCashData, User } from "./api.service";
import { router } from "~/page/router";

export enum GlobalReducerActions {
    LOGIN = 'login',
    LOGOUT = 'logout',
    TOPUP = 'top up',
    CASH_IN = 'cash in',
    CASH_OUT = 'cash out',
    ROLL = 'roll',
    ROLL_RESET = 'roll reset',

}

type GlobalReducerAction = {
    type: GlobalReducerActions
    payload: User | RollData | UpdateCashData | null
}

interface InitState {
    user: User | null,
    roll: Omit<RollData, 'credits'> | null,
    isAuthenticated: boolean
}

export const initialState: InitState = {
    isAuthenticated: false,
    user: null,
    roll: null,
}

interface Store {
    state: InitState;
    dispatch?: Dispatch<GlobalReducerAction>;
}

export const GlobalStoreContext = createContext<Store>({ state: initialState })

export const reducer = (state: InitState, { type, payload }: GlobalReducerAction) => {
    switch (type) {
        case GlobalReducerActions.LOGIN:
            return {
                ...state,
                isAuthenticated: !!payload,
                user: payload

            }
        case GlobalReducerActions.LOGOUT:
            router.navigate('/login', { replace: true })
            return {
                ...state,
                isAuthenticated: false,
                user: null
            }
        case GlobalReducerActions.CASH_IN:
        case GlobalReducerActions.CASH_OUT:
        case GlobalReducerActions.TOPUP:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...payload
                }
            }
        case GlobalReducerActions.ROLL:
            return {
                ...state,
                roll: payload,
                user: {
                    ...state.user,
                    credits: payload?.credits
                }
            }
        case GlobalReducerActions.ROLL_RESET:
            return {
                ...state,
                roll: null,
            }
        default:
            throw new Error('Not among actions');
    }
}
