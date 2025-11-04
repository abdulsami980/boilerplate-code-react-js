// src/layouts/PortalLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/Sidebar";

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Add margin-top to push content below the fixed header */}
        <main className="flex-1 overflow-y-auto mt-[64px] lg:mt-0 p-6 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
