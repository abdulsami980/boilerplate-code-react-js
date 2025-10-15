// src/layouts/PortalLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/ui/Header";

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> {/* 🔥 Child routes render here */}
        </main>
      </div>
    </div>
  );
}
