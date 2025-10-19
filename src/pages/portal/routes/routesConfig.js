// routes/routesConfig.js
import { PATH } from "@/config";
import { lazy } from "react";

// =====================
// Landing Page
// =====================
const Landing = lazy(() => import("@/pages/landing/Landing"));

// =====================
// Authentication
// =====================
const Login = lazy(() => import("@/pages/auth/Login"));
const Signup = lazy(() => import("@/pages/auth/Signup"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const VerifyUserEmail = lazy(() => import("@/pages/auth/VerifyUserEmail"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));

// =====================
// Admin
// =====================
const Dashboard = lazy(() => import("@/pages/portal/admin/Dashboard"));

// =====================
// Investor
// =====================
const InvestorDashboard = lazy(() =>
  import("@/pages/portal/investor/Dashboard")
);

// =====================
// Founder
// =====================
const FounderDashboard = lazy(() => import("@/pages/portal/founder/Dashboard"));

export const routes = [
  // =====================
  // Landing Page
  // =====================
  {
    path: PATH.LANDING,
    component: Landing,
    sidebar: false,
    private: false,
  },

  // =====================
  // Authentication
  // =====================
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
    path: PATH.FORGOT_PASSWORD,
    component: ForgotPassword,
    sidebar: false,
    private: false,
  },
  {
    path: PATH.VERIFY_USER_EMAIL,
    component: VerifyUserEmail,
    sidebar: false,
    private: false,
  },
  {
    path: PATH.RESET_PASSWORD,
    component: ResetPassword,
    sidebar: false,
    private: false,
  },

  // =====================
  // Admin
  // =====================
  {
    path: PATH.ADMIN.DASHBOARD,
    component: Dashboard,
    sidebar: true,
    private: true,
    roles: ["admin"],
    icon: "dashboard",
    title: "Dashboard",
  },

  // =====================
  // Investor
  // =====================
  {
    path: PATH.INVESTOR.DASHBOARD,
    component: InvestorDashboard,
    sidebar: true,
    private: true,
    roles: ["investor"],
    icon: "dashboard",
    title: "Dashboard",
  },

  // =====================
  // Founder
  // =====================
  {
    path: PATH.FOUNDER.DASHBOARD,
    component: FounderDashboard,
    sidebar: true,
    private: true,
    roles: ["founder"],
    icon: "dashboard",
    title: "Dashboard",
  },
];
