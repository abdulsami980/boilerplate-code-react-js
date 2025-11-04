import { GREEN_COLOR } from "@/config";
import { SyncLoader } from "react-spinners";
import { FcIdea } from "react-icons/fc";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2, Play } from "lucide-react";

export function PageLoader({ text = "Loading…" }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <SyncLoader color={GREEN_COLOR} size={12} speedMultiplier={1.2} />
      <span className="text-gray-700 text-lg font-medium">{text}</span>
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
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoSrc = import.meta.env.VITE_MAIN_VIDEO_UTL;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));
      hls.on(Hls.Events.ERROR, () => setIsLoading(false));

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadeddata", () => setIsLoading(false));
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [videoSrc]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    // NOTE: z-20 chosen so sidebar/header with z-40 / z-50 appear above this overlay.
    // This keeps overlay covering main content while allowing mobile sidebar to slide over it.
    <div
      className={`fixed inset-0 z-[50] flex flex-col items-center justify-center p-4 ${customClass}`}
      style={{
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(255,255,255,${bgOpacity / 100})`,
      }}
    >
      {/* Icon */}
      {icon && (
        <span className="inline-flex items-center justify-center text-7xl text-green-500 animate-bounce motion-reduce:animate-none translate-y-2">
          {icon}
        </span>
      )}

      {/* Title */}
      <h1
        className={`pb-4 font-bold ${titleSize} bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 drop-shadow-lg`}
      >
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-2 text-gray-700/90 text-lg sm:text-xl max-w-xl leading-relaxed text-center">
          {subtitle}
        </p>
      )}

      {/* Video container */}
      <div className="relative w-full max-w-[900px] aspect-[4/3] rounded-xl overflow-hidden shadow-lg z-10 mt-6 mx-auto">
        <video
          ref={videoRef}
          onClick={togglePlay}
          onEnded={handleEnded}
          className="w-full h-full object-cover cursor-pointer"
          playsInline
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
            <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
          </div>
        )}

        {/* Play overlay */}
        {!isPlaying && !isLoading && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Play className="w-8 h-8 text-green-400" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function InlineLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-500 text-md">{text}</p>
    </div>
  );
}
