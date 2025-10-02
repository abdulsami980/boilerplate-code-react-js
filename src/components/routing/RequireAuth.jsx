import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

export default function RequireAuth({ roles }) {
  const { isAuthenticated, user } = useAuth(); 

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
