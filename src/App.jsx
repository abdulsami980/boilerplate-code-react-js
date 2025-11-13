import { Suspense } from "react";
import { PageLoader } from "./components/ui/Loaders";
import RequireAuth from "@/components/routing/RequireAuth";
import PortalLayout from "@/layouts/PortalLayout";
import { routes } from "@/pages/routes/routesConfig";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import NotFound from "./components/ui/NotFound";
import LookupsProvider from "./context/LookupsContext";

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Toaster position="top-right" richColors />

      <Routes>
        {/* public routes */}
        {routes
          .filter((r) => !r.private)
          .map((r) => (
            <Route key={r.path} path={r.path} element={<r.component />} />
          ))}

        {/* private */}
        <Route element={<RequireAuth />}>
          {/* ✅ Lookups available only after auth */}
          <Route
            element={
              <LookupsProvider>
                <PortalLayout routes={routes} />
              </LookupsProvider>
            }
          >
            {routes
              .filter((r) => r.private)
              .map((r) => (
                <Route key={r.path} path={r.path} element={<r.component />} />
              ))}
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
