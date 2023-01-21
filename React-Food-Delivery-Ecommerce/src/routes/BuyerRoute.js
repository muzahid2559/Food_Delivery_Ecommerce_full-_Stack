import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function BuyerRoute() {
  const { userType } = useAuth();
  return userType === "buyer" ? <Outlet /> : <Navigate to="/login" />;
}
