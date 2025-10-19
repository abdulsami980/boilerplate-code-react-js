// src/components/routing/RequireAuth.jsx
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth({ roles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation(); // captures the attempted URL

  // If user is not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If roles are defined and the user's role is not authorized
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and authorized — render child routes
  return <Outlet />;
}
