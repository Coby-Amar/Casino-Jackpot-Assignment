import { createBrowserRouter, createRoutesFromElements, Route, redirect } from "react-router-dom";

import SignupLoginPage from "./Signup_Login/Signup_Login.page";
import SlotMachinePage from "./Slot_Machine/Slot_Machine.page";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index loader={() => redirect('/login')} />
            <Route path="*" loader={() => redirect('/login')} />

            <Route path="slot_machine" element={<SlotMachinePage />} />
            <Route path="signup" element={<SignupLoginPage />} />
            <Route path="login" element={<SignupLoginPage />} />
        </Route>
    )
)