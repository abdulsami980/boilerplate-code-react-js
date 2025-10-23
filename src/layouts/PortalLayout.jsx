// src/layouts/PortalLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/Sidebar";

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Add margin-top to push content below the fixed header */}
        <main className="flex-1 p-6 overflow-y-auto mt-[64px] lg:mt-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
