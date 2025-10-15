// routes/routesConfig.js
import { PATH } from "@/config";
import { lazy } from "react";

// =====================
// Lazy-loaded Pages
// =====================
const Landing = lazy(() => import("@/pages/landing/Landing"));
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const Dashboard = lazy(() => import("@/pages/portal/Dashboard"));

export const routes = [
  {
    path: PATH.LANDING,
    component: Landing,
    sidebar: false,
    private: false,
  },
  {
    path: PATH.LOGIN,
    component: Login,
    sidebar: false,
    private: false,
  },
  {
    path: PATH.SIGNUP,
    component: Signup,
    sidebar: false,
    private: false,
  },
  {
    path: PATH.DASHBOARD,
    component: Dashboard,
    sidebar: true,
    private: true,
    roles: ["admin", "user"],
    icon: "dashboard",
    title: "Dashboard",
  },
];
