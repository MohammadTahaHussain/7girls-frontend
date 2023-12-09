import { Routes, Route } from "react-router-dom";
import SignupPage from "../pages/signup";
import SignInPage from "../pages/signin";
import PlansPage from "../pages/plans";
import Success from "../pages/success";
import Cancel from "../pages/cancel";
import Checkout from "../pages/checkout";
import MembersPage from "../pages/members";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<SignupPage />}></Route>
            <Route path="/signin" element={<SignInPage />}></Route>
            <Route path="/plans" element={<PlansPage />}></Route>
            <Route path="/checkout" element={<Checkout/>}></Route>
            <Route path="/success" element={<Success/>}></Route>
            <Route path="/cancel" element={<Cancel/>}></Route>
            <Route path="/members" element={<MembersPage/>}></Route>
        </Routes>
    )
}

export default AppRouter