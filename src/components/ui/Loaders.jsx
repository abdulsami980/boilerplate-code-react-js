import { GREEN_COLOR } from "@/config";
import Hls from "hls.js";
import { Maximize, Minimize, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FcIdea } from "react-icons/fc";
import { SyncLoader } from "react-spinners";

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
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoSrc = import.meta.env.VITE_MAIN_VIDEO_URL;

  // Toggle play/pause
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

  // Restart when ended
  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Seek handler
  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * video.duration;
    video.currentTime = newTime;
    setProgress((clickX / rect.width) * 100);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Video + HLS setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage || 0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    let hls;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));
      hls.on(Hls.Events.ERROR, () => setIsLoading(false));
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadeddata", () => setIsLoading(false));
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (hls) hls.destroy();
    };
  }, [videoSrc]);

  // Prevent background scroll
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
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
      <div
        className="
    relative 
    w-full 
    max-w-[90vw] 
    md:max-w-[400px] 
    lg:max-w-[600px] 
    xl:max-w-[800px]
    aspect-video 
    rounded-xl 
    overflow-hidden 
    shadow-lg 
    z-10 
    mt-6 
    mx-auto 
    group
  "
      >
        <video
          ref={videoRef}
          onClick={togglePlay}
          onEnded={handleEnded}
          className="w-full h-full object-contain cursor-pointer bg-black"
          playsInline
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md z-20 transition-opacity duration-500">
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-400 animate-pulse shadow-[0_0_25px_rgba(34,197,94,0.7)]" />
            </div>
            <p className="mt-5 text-green-300 text-sm tracking-wide font-medium animate-fade-in">
              Loading video, please wait...
            </p>
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

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute bottom-4 right-4 z-30 bg-black/40 backdrop-blur-md border border-white/20 rounded-full p-2 hover:bg-black/60 transition-all duration-300"
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 text-green-400" />
          ) : (
            <Maximize className="w-5 h-5 text-green-400" />
          )}
        </button>

        {/* Custom Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleSeek}
          className="absolute bottom-0 left-0 w-full h-2 bg-black/30 cursor-pointer group-hover:h-3 transition-all duration-200"
        >
          <div
            className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-500 rounded-full transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
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
