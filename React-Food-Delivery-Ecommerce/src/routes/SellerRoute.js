import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function SellerPrivate() {
  const { userType } = useAuth();
  return userType === "seller" ? <Outlet /> : <Navigate to="/login" />;
}
