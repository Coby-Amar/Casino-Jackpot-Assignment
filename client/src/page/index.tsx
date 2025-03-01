import { useReducer } from "react";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { GlobalStoreContext, initialState, reducer } from "~/services/state.service";

export function PageRouter() {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (

        <GlobalStoreContext.Provider value={{ state, dispatch }} >
            <RouterProvider router={router} />
        </GlobalStoreContext.Provider>
    )
}