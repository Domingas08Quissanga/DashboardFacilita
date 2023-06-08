import { Navigate, useNavigate } from "react-router-dom"
import { getUserInfo } from "./config"


export function PublicRoute({ children }) {
    const data = getUserInfo()

    console.log(data);
    if (data) return <Navigate to={"/ecommerce"} replace />
    return children
}

