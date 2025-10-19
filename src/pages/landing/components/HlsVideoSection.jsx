import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Loader2 } from "lucide-react";

export default function HlsVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoSrc = import.meta.env.VITE_MAIN_VIDEO_UTL;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
      });

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

  // Reset when video ends
  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="vision"
      data-theme="light"
      className="relative w-full min-h-[80vh] bg-white flex flex-col items-center justify-center text-center py-20 px-5 overflow-hidden"
    >
      {/* Accent blobs */}
      <div className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[250px] h-[250px] bg-[rgba(34,197,94,0.25)] blur-[120px] rounded-full" />
      <div className="absolute right-[10%] bottom-[10%] w-[200px] h-[200px] bg-[rgba(16,185,129,0.25)] blur-[100px] rounded-full" />

      {/* Heading */}
      <div className="relative z-10 mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 mb-3 tracking-tight">
          Experience the Vision
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          A glimpse into how innovation meets real-world impact.
        </p>
      </div>

      {/* Video container */}
      <div className="relative max-w-6xl w-full aspect-video rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.2)] group transition-transform duration-500 hover:scale-[1.01] z-10">
        <video
          ref={videoRef}
          onClick={togglePlay}
          onEnded={handleEnded}
          className="w-full h-full object-cover cursor-pointer"
          playsInline
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />

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
            className="absolute inset-0 flex items-center justify-center group/play"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Play className="w-10 h-10 text-green-400 group-hover/play:scale-110 transition-transform duration-300" />
            </div>
          </button>
        )}
      </div>
    </section>
  );
}
