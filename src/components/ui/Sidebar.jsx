import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/pages/portal/routes/routesConfig";
import Icons from "@/components/ui/Icons";
import IMAGES from "@/assets/images";
import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getUserInfo } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const bottomItems = [
  {
    label: "Help",
    icon: "fallback",
    getPath: (role) => {
      if (role === "investor") return PATH.INVESTOR.HELP;
      if (role === "founder") return PATH.FOUNDER.HELP;
      return PATH.LANDING;
    },
  },
  {
    label: "Log Out",
    icon: "logout",
    getPath: () => PATH.LANDING, // fallback path
  },
];
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { name } = getUserInfo();
  const [openMobile, setOpenMobile] = useState(false);

  const role =
    user?.user_metadata?.role?.toLowerCase?.() ||
    user?.role?.toLowerCase?.() ||
    "guest";

  const sidebarItems = routes.filter(
    (r) =>
      r.sidebar === true &&
      r.private === true &&
      (!r.roles || r.roles.includes(role))
  );

  const isActivePath = (item) => {
    const path = item.getPath(role);
    const currentPath = location.pathname;
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };
  const handleProfileClick = () => {
    switch (role) {
      case "admin":
        navigate(PATH.ADMIN.PROFILE);
        break;
      case "investor":
        navigate(PATH.INVESTOR.PROFILE);
        break;
      case "founder":
        navigate(PATH.FOUNDER.PROFILE);
        break;
      default:
        navigate(PATH.LANDING);
    }
    setOpenMobile(false);
  };

  const handleBottomItemClick = async (item) => {
    const path = item.getPath(role); // compute path dynamically
    if (item.label === "Log Out") {
      const logoutPromise = (async () => await logout())();
      toast.promise(logoutPromise, {
        loading: "Logging out...",
        success: "Logged out successfully!",
        error: "Failed to log out. Try again.",
      });
      navigate(PATH.LOGIN);
    } else {
      navigate(path);
    }
    setOpenMobile(false);
  };
  return (
    <>
      {/* 🔹 MOBILE HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d2437]/95 backdrop-blur-md border-b border-green-700/30 flex items-center justify-between px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <img
            src={IMAGES.MLGGO}
            alt="Logo"
            className="w-8 h-8 rounded-md object-contain"
          />
          <span className="text-white font-semibold text-lg">Business Hub</span>
        </div>
        <button
          onClick={() => setOpenMobile((p) => !p)}
          className="text-white hover:text-green-400 transition-all"
          aria-label="Toggle sidebar"
        >
          {openMobile ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* 🔹 SIDEBAR */}
      <aside
        className={`group fixed lg:static z-40 top-0 left-0 bg-gradient-to-b from-[#0d2437] via-[#10354a] to-[#0d2437]
        text-white shadow-xl border-r border-green-700/30 rounded-r-2xl
        flex flex-col justify-between overflow-hidden transition-all duration-300 ease-in-out
        ${
          openMobile
            ? "translate-x-0 w-64 mt-[64px] h-[calc(100vh-64px)] overflow-y-auto"
            : "-translate-x-full w-64 lg:translate-x-0 lg:w-24 hover:lg:w-64 mt-0 h-screen"
        }`}
      >
        {/* 🔹 CONTENT WRAPPER WITH PADDING TOP/BOTTOM */}
        <div className="flex flex-col justify-between flex-1 py-6">
          {/* 🔹 Logo Section (no duplicate issue now) */}
          <div className="flex items-center justify-center mb-6 px-3">
            <img
              src={IMAGES.LGOO}
              alt="Main Logo"
              className={`transition-all duration-300 ${
                openMobile ? "block" : "hidden lg:group-hover:block"
              } w-[90px] h-auto`}
            />
            <img
              src={IMAGES.MLGGO}
              alt="Small Logo"
              className={`transition-all duration-300 hidden lg:block lg:group-hover:hidden w-10 h-10 rounded-md`}
            />
          </div>

          {/* 🔹 Nav Links */}
          <nav className="flex-1 overflow-y-auto no-scrollbar mt-2 px-3 space-y-1">
            {sidebarItems.map(({ path, icon, title }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpenMobile(false)}
                className="block"
              >
                {({ isActive }) => (
                  <div
                    className={`relative flex items-center ${
                      openMobile
                        ? "justify-start"
                        : "lg:group-hover:justify-start justify-center"
                    } gap-2 py-3 px-4 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-green-500/15 text-green-300 shadow-[inset_0_0_10px_rgba(34,197,94,0.25)]"
                          : "hover:bg-green-500/10 text-gray-300"
                      }`}
                  >
                    {isActive && (
                      <span className="absolute left-1 top-1/2 -translate-y-1/2 h-6 w-1 bg-green-400 rounded-full shadow-[0_0_10px_#22c55e]" />
                    )}
                    <div
                      className={`flex items-center justify-center min-w-[2.5rem]
                        ${
                          isActive
                            ? "text-green-400"
                            : "text-white/90 group-hover:text-green-400"
                        }`}
                    >
                      <Icons name={icon} size={22} />
                    </div>
                    <span
                      className={`text-sm font-medium tracking-wide truncate ${
                        openMobile
                          ? "inline-block"
                          : "hidden lg:group-hover:inline-block"
                      }`}
                    >
                      {title}
                    </span>
                  </div>
                )}
              </NavLink>
            ))}

            {sidebarItems.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-4 italic">
                No sections available for your role
              </div>
            )}
          </nav>

          {/* 🔹 Profile + Logout */}
          <div className="px-3 mt-auto border-t border-green-700/30 pt-4 space-y-3">
            {bottomItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleBottomItemClick(item)}
                className={`flex items-center ${
                  openMobile
                    ? "justify-start"
                    : "lg:group-hover:justify-start justify-center"
                } gap-4 w-full py-2.5 px-4 rounded-xl transition-all duration-200
      ${
        isActivePath(item)
          ? "bg-green-500/15 text-green-300"
          : "text-gray-300 hover:bg-green-500/10"
      }`}
              >
                <div
                  className={`flex items-center justify-center min-w-[2.5rem] ${
                    isActivePath(item)
                      ? "text-green-400"
                      : "text-white/90 group-hover:text-green-400 transition-colors duration-200"
                  }`}
                >
                  <Icons name={item.icon} size={22} />
                </div>
                <span
                  className={`text-sm font-medium text-gray-300 ${
                    openMobile
                      ? "inline-block"
                      : "hidden lg:group-hover:inline-block"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}

            <div
              onClick={handleProfileClick}
              className={`relative flex items-center cursor-pointer ${
                openMobile
                  ? "justify-start"
                  : "lg:group-hover:justify-start justify-center"
              } gap-4 py-3 px-4 rounded-xl transition-all duration-300
                ${
                  location.pathname.includes("/profile")
                    ? "bg-green-500/15 text-green-300 shadow-[inset_0_0_10px_rgba(34,197,94,0.25)]"
                    : "text-gray-300 hover:bg-green-500/10"
                }`}
            >
              <img
                src={IMAGES.SHAKEEL_BG}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-green-400/60 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
              />
              <div
                className={`flex flex-col whitespace-nowrap ${
                  openMobile ? "flex" : "hidden lg:group-hover:flex"
                }`}
              >
                <span className="font-semibold text-sm text-white">
                  {name || "User"}
                </span>
                <span className="text-xs text-green-400/80 capitalize">
                  {role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 🔹 Overlay for mobile */}
      {openMobile && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setOpenMobile(false)}
        />
      )}
    </>
  );
}
