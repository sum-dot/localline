import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../context/AuthContext";

export default function AdminRoute() {
  const { isAdmin, checkingAuth } = useAuthContext();

  if (checkingAuth) return null;

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}
