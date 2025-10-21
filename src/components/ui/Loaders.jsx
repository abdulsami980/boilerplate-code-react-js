import { GREEN_COLOR } from "@/config";
import { SyncLoader } from "react-spinners";
import { FcIdea } from "react-icons/fc";

export function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <SyncLoader color={GREEN_COLOR} size={12} speedMultiplier={1.2} />
      <span className="text-gray-700 text-lg font-medium">Loading…</span>
    </div>
  );
}

export function ComingSoonOverlay({
  title = "Coming Soon!",
  subtitle = "Something amazing is on the way – stay tuned!",
  blur = 10,
  bgOpacity = 40,
  icon = <FcIdea />,
  titleSize = "text-5xl",
  customClass = "",
}) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${customClass}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity / 100})`,
      }}
    >
      <div className="flex flex-col items-center justify-center text-center max-w-[90%] px-4">
        <div className="relative flex flex-col items-center">
          {/* Icon */}
          {icon && (
            <span className="mb-4 inline-flex items-center justify-center text-7xl text-green-500 animate-bounce">
              {icon}
            </span>
          )}

          {/* Title */}
          <h1
            className={`pb-4 font-bold ${titleSize} bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 drop-shadow-lg`}
          >
            {title}
          </h1>

          {/* Animated underline */}
          <span className="block h-1 w-64 mt-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        {subtitle && (
          <p className="mt-6 text-gray-700/90 text-lg sm:text-xl max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
