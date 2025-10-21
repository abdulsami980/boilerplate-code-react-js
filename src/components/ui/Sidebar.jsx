import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { routes } from "@/pages/portal/routes/routesConfig";
import Icons from "@/components/ui/Icons";
import IMAGES from "@/assets/images";
import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getUserInfo } from "@/lib/utils";

const bottomItems = [
  // { path: PATH.LANDING, icon: "settings", label: "Settings" },
  // { path: PATH.LANDING, icon: "bell", label: "Notifications" },
  { path: PATH.LANDING, icon: "logout", label: "Log Out" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { name } = getUserInfo();

  // Get user role safely
  const role =
    user?.user_metadata?.role?.toLowerCase?.() ||
    user?.role?.toLowerCase?.() ||
    "guest";

  // ✅ Filter sidebar routes based on role
  const sidebarItems = routes.filter(
    (r) =>
      r.sidebar === true &&
      r.private === true &&
      (!r.roles || r.roles.includes(role))
  );

  const isActivePath = (path) => location.pathname === path;

  const handleProfileClick = () => {
    switch (role) {
      case "admin":
        navigate(PATH.ADMIN.PROFLIE);
        break;
      case "investor":
        navigate(PATH.INVESTOR.PROFLIE);
        break;
      case "founder":
        navigate(PATH.FOUNDER.PROFLIE);
        break;
      default:
        navigate(PATH.LANDING);
    }
  };

  const handleBottomItemClick = async (label) => {
    switch (label) {
      case "Settings":
        switch (role) {
          case "admin":
            navigate(PATH.ADMIN.SETTINGS);
            break;
          case "investor":
            navigate(PATH.INVESTOR.SETTINGS);
            break;
          case "founder":
            navigate(PATH.FOUNDER.SETTINGS);
            break;
          default:
            navigate(PATH.LANDING);
            break;
        }
        break;

      case "Notifications":
        // Add role-specific notification screens later if needed
        navigate(PATH.LANDING);
        break;

      case "Log Out": {
        const logoutPromise = (async () => {
          await logout();
        })();

        toast.promise(logoutPromise, {
          loading: "Logging out...",
          success: "Logged out successfully!",
          error: "Failed to log out. Try again.",
        });
        navigate(PATH.LOGIN);
        break;
      }

      default:
        navigate(PATH.LANDING);
    }
  };

  return (
    <aside
      className="
        relative h-screen bg-gradient-to-b from-[#0d2437] via-[#10354a] to-[#0d2437]
        text-white w-25 hover:w-64 transition-all duration-300 ease-in-out
        flex flex-col justify-between py-5
        shadow-xl rounded-r-2xl overflow-hidden group
        border-r border-green-700/30
      "
      aria-label="Sidebar"
    >
      {/* --- Logo --- */}
      <div className="flex flex-col items-center mb-2 transition-all duration-300">
        <img
          src={IMAGES.MLGGO}
          alt="Logo Compact"
          className="w-10 h-10 rounded-md group-hover:hidden mb-4 drop-shadow-[0_0_5px_rgba(16,185,129,0.4)]"
        />
        <img
          src={IMAGES.LGOO}
          alt="Logo Full"
          className="hidden group-hover:block w-20 h-auto mt-2 drop-shadow-[0_0_5px_rgba(16,185,129,0.4)]"
        />
      </div>

      {/* --- Role-based Navigation --- */}
      <nav className="flex flex-col gap-1 mt-2 flex-1 px-3">
        {sidebarItems.map(({ path, icon, title }) => (
          <NavLink key={path} to={path}>
            {({ isActive }) => (
              <div
                className={`
                  relative flex items-center justify-center group-hover:justify-start gap-2
                  py-3 px-4 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-green-500/15 text-green-300 shadow-[inset_0_0_10px_rgba(34,197,94,0.25)]"
                      : "hover:bg-green-500/10 text-gray-300"
                  }
                `}
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

                <span className="hidden group-hover:inline-block text-sm font-medium tracking-wide">
                  {title}
                </span>
              </div>
            )}
          </NavLink>
        ))}

        {/* If no sidebar items found for this role */}
        {sidebarItems.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-4 italic">
            No sections available for your role
          </div>
        )}
      </nav>

      {/* --- Bottom Section --- */}
      <div className="flex flex-col gap-2 px-3 mt-auto border-t border-green-700/30 pt-4">
        {bottomItems.map(({ path, icon, label }) => (
          <button
            key={path}
            onClick={() => handleBottomItemClick(label)}
            className={`flex items-center justify-center group-hover:justify-start gap-4 w-full py-2.5 px-4 rounded-xl transition-all duration-200
        ${
          isActivePath(path)
            ? "bg-green-500/15 text-green-300"
            : "text-gray-300 hover:bg-green-500/10"
        }`}
          >
            <div
              className={`flex items-center justify-center min-w-[2.5rem]
    ${
      isActivePath(path)
        ? "text-green-400"
        : "text-white/90 group-hover:text-green-400 transition-colors duration-200"
    }`}
            >
              <Icons name={icon} size={22} />
            </div>

            <span className="hidden group-hover:inline-block text-sm font-medium text-gray-300">
              {label}
            </span>
          </button>
        ))}

        {/* --- Profile --- */}
        <div
          onClick={handleProfileClick}
          className={`relative flex items-center justify-center group-hover:justify-start gap-4 w-full py-3 px-4 rounded-xl cursor-pointer
    transition-all duration-300
    ${
      location.pathname.includes("/profile")
        ? "bg-green-500/15 text-green-300 shadow-[inset_0_0_10px_rgba(34,197,94,0.25)]"
        : "text-gray-300 hover:bg-green-500/10"
    }`}
        >
          <div className="relative">
            <img
              src={IMAGES.SHAKEEL_BG}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-green-400/60 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
            />
          </div>

          <div className="hidden group-hover:flex flex-col whitespace-nowrap transition-all duration-300">
            <span className="font-semibold text-sm leading-tight text-white">
              {name || "User"}
            </span>
            <span className="text-xs text-green-400/80 capitalize">{role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
