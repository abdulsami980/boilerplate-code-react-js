// src/App.jsx
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "@/components/routing/RequireAuth";
import PortalLayout from "@/layouts/PortalLayout";
import { routes } from "@/routes/routesConfig";

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-gray-600 text-lg">Loading…</div>
        </div>
      }
    >
      <Routes>
        {/* Public Routes */}
        {routes
          .filter((r) => !r.private)
          .map((r) => (
            <Route key={r.path} path={r.path} element={<r.component />} />
          ))}

        {/* Private Routes */}
        <Route element={<RequireAuth />}>
          <Route element={<PortalLayout routes={routes} />}>
            {routes
              .filter((r) => r.private)
              .map((r) => (
                <Route key={r.path} path={r.path} element={<r.component />} />
              ))}
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">
              404 — Page not found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
}
