import { lazy } from "react";

// Auth screens
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Otp = lazy(() => import("@/pages/auth/Otp"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));

// Portal screens
const Dashboard = lazy(() => import("@/pages/portal/Dashboard"));

export const publicRoutes = [
  { path: "/login", element: <Login />, meta: { titleKey: "auth.login" } },
  { path: "/signup", element: <Signup />, meta: { titleKey: "auth.signup" } },
  { path: "/otp", element: <Otp />, meta: { titleKey: "auth.otp" } },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: { titleKey: "auth.forgotPassword" },
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    meta: {
      titleKey: "portal.dashboard",
      icon: "layout-dashboard",
      roles: ["admin", "user"],
    },
  },
];
