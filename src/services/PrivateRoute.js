import { Navigate, Route, useNavigate } from "react-router-dom"
import { getUserInfo } from "./config"


export function PrivateRoute({ children }) {
    const data = getUserInfo()
    console.log(data);
    if (!data?.sub) return <Navigate to={"/login"} replace />
    return children
}