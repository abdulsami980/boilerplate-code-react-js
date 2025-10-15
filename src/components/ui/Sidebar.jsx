// components/ui/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { routes } from "@/routes/routesConfig";
import Icons from "@/components/ui/Icons"; // make sure this exists

export default function Sidebar() {
  // Filter only private routes that should appear in the sidebar
  const sidebarItems = routes.filter((r) => r.sidebar && r.private);

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4">
      <nav className="flex flex-col gap-2">
        {sidebarItems.map(({ path, icon, title }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg ${
                isActive ? "bg-blue-600 text-white" : "text-gray-700"
              }`
            }
          >
            <Icons name={icon} size={24} />
            {title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
