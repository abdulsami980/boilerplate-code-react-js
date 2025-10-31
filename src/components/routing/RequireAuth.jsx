import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PATH } from "@/config";
import { PageLoader } from "@/components/ui/Loaders";

export default function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until auth state is known
  if (loading || user === undefined) {
    return <PageLoader />;
  }

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to={PATH.LOGIN} state={{ from: location }} replace />;
  }

  // ✅ FIX: Get the real role from user_metadata
  const role =
    user?.user_metadata?.role?.toLowerCase() || user?.role?.toLowerCase();

  if (!role) {
    return <PageLoader />;
  }

  const pathname = location.pathname.toLowerCase();

  const allowedPaths = {
    admin: "/admin",
    investor: "/investor",
    founder: "/founder",
  };

  const isAuthorizedPath = pathname.startsWith(allowedPaths[role]);

  if (!isAuthorizedPath) {
    // ✅ Redirect to the user's own dashboard
    const redirectPath =
      role === "admin"
        ? PATH.ADMIN.DASHBOARD
        : role === "investor"
        ? PATH.INVESTOR.DASHBOARD
        : role === "founder"
        ? PATH.FOUNDER.DASHBOARD
        : PATH.LANDING;

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
}
