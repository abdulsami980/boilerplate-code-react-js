// src/App.jsx
import RequireAuth from "@/components/routing/RequireAuth";
import PortalLayout from "@/layouts/PortalLayout";
import { routes } from "@/pages/portal/routes/routesConfig";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { PageLoader } from "./components/ui/Loaders";
import NotFound from "./components/ui/NotFound";

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />

      <Suspense fallback={<PageLoader />}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
