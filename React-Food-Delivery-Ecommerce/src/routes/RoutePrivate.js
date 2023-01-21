import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function RoutePrivate() {
  const { authenticated } = useAuth();
  return authenticated ? <Outlet /> : <Navigate to="/login" />;
}
