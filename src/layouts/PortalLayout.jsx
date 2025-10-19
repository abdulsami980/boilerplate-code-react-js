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
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
