"use client";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Play, Loader2 } from "lucide-react";

export default function Help() {
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
    <section className="relative w-full min-h-screen flex flex-col items-center text-center py-20 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="relative max-w-3xl mx-auto mb-16 space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 tracking-tight">
          Unlocking Pakistan’s Multi-Billion Dollar Potential
        </h2>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          A revolutionary platform empowering entrepreneurs, investors, and
          innovators to collaborate — driving sustainable growth, global
          visibility, and a brighter economic future for Pakistan.
        </p>
      </div>

      {/* Video */}
      <div className="relative max-w-6xl w-full aspect-video rounded-2xl overflow-hidden shadow-lg group hover:scale-[1.01] transition-transform duration-500">
        <video
          ref={videoRef}
          onClick={togglePlay}
          onEnded={handleEnded}
          className="w-full h-full object-cover cursor-pointer"
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-20">
            <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
          </div>
        )}
        {!isPlaying && !isLoading && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Play className="w-10 h-10 text-green-400 transition-transform duration-300" />
            </div>
          </button>
        )}
      </div>

      {/* Step-by-Step Investor Guide */}
      <div className="relative z-10 mt-16 flex flex-col items-start max-w-4xl w-full space-y-12 text-left">
        {[
          {
            title: "Step 1: Unlocking Pakistan’s Potential",
            content:
              "The Business Hub connects investors with high-potential Pakistani startups and businesses, unlocking multi-billion dollar potential through a trusted, transparent, and efficient ecosystem.",
          },
          {
            title: "Step 2: The Vision",
            content:
              "Part of Vision Pakistan 2030, led by Shakeel Ahmad Meer and the Meer Group. Fostering entrepreneurship, attracting global investment, and creating sustainable economic growth.",
          },
          {
            title: "Step 3: What Investors Gain",
            content: [
              "Curated Deal Flow: Only high-potential, vetted businesses.",
              "Global Network, Local Insight: International reach combined with local expertise.",
              "Seamless Collaboration: Secure partnerships, joint ventures, and investments.",
            ],
          },
          {
            title: "Step 4: Investor Journey",
            content: [
              "Register on the Platform – Create a verified investor profile.",
              "Complete Verification – Access confidential business plans and pitch materials.",
              "Explore Curated Ideas – Browse startups filtered by sector, stage, traction, and team.",
              "Shortlist & Evaluate – Track engagement, request documents, schedule meetings.",
              "Connect & Invest Securely – Negotiate deals, perform due diligence, finalize investments.",
            ],
          },
          {
            title: "Step 5: The Broader Impact",
            content:
              "By participating, you’re contributing to a multi-billion dollar economy, empowering Pakistan’s next generation of innovators, and joining a network of investors and businesses working toward shared success.",
          },
          {
            title: "Step 6: Leadership",
            content:
              "Shakeel Ahmad Meer is the visionary founder behind Business Hub and Vision Pakistan 2030. He believes in conscious business — profitable projects that also serve a national purpose.",
          },
          {
            title: "Step 7: Key Takeaways",
            content: [
              "Access to verified, high-quality deals.",
              "Strategic networking with top founders.",
              "Global exposure with local insights.",
              "Secure and streamlined investment processes.",
            ],
          },
        ].map((step, idx) => (
          <div key={idx}>
            <h3 className="text-2xl font-bold mb-3 text-green-600">
              {step.title}
            </h3>
            {Array.isArray(step.content) ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {step.content.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">{step.content}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
