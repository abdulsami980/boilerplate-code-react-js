import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Loader2, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/config";

export default function HlsVideoSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoSrc = import.meta.env.VITE_MAIN_VIDEO_UTL;
  const navigate = useNavigate();

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

  return (
    <section
      id="vision"
      data-theme="light"
      className="relative w-full min-h-[80vh] bg-white flex flex-col items-center justify-center text-center pt-20 pb-10 px-5 overflow-hidden"
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

      {/* ✨ Enhanced CTA Section */}
      {/* Glowing orbs */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-300/20 blur-[80px] rounded-full" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-400/20 blur-[100px] rounded-full" />

      <h3 className="text-3xl md:text-4xl font-bold text-[#0e2c3f] mb-4 mt-12">
        Be Part of Pakistan’s Next Growth Story
      </h3>
      <p className="text-gray-600 max-w-xl mb-8 text-base md:text-lg">
        Whether you’re an investor seeking the next breakthrough or a founder
        driving innovation — this is your moment to make an impact.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 ">
        <Button
          onClick={() => navigate(PATH.SIGNUP)}
          variant="outline"
          className="border-green-500/50 text-green-600 hover:bg-green-100 rounded-full px-7 py-3 text-sm md:text-base flex items-center gap-2 font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:scale-105"
        >
          <ArrowRight className="w-4 h-4" />
          I’m an Investor
        </Button>
        <Button
          onClick={() => navigate(PATH.SIGNUP)}
          className="bg-gradient-to-r from-green-700 to-emerald-600 text-white hover:from-green-800 hover:to-emerald-700 rounded-full px-7 py-3 text-sm md:text-base font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:scale-105"
        >
          <User className="w-4 h-4" />
          I’m a Founder
        </Button>
      </div>
    </section>
  );
}
