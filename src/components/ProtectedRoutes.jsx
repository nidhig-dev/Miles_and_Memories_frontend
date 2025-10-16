import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext/AuthContext";
import Login from "../pages/auth/Login";

export default function ProtectedRoutes() {
    const { cookies } = useAuth();

    return cookies.token ? <Outlet /> : <Login />
}