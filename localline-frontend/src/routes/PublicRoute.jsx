import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function PublicRoute() {
  const { isLoggedIn, checkingAuth } = useAuthContext();

  if (checkingAuth) return null;

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
}