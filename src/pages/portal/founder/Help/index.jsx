"use client";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import {
  Play,
  Loader2,
  Rocket,
  Users,
  Globe,
  Target,
  Shield,
  Star,
  Layers,
} from "lucide-react";

export default function FounderHelpScreen() {
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
    <section className="w-full flex flex-col items-center text-center py-20 px-6 md:px-12 lg:px-24">
      {/* Heading */}
      <div className="max-w-3xl mx-auto mb-16 space-y-6">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 tracking-tight">
          Unlock Your Business Potential
        </h2>
        <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light">
          The Business Hub is your gateway to investors, mentorship, and a
          thriving ecosystem — empowering founders to scale their startups and
          make an impact both locally and globally.
        </p>
      </div>

      {/* Video Section */}
      <div className="relative max-w-6xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200/20 group hover:scale-[1.01] transition-all duration-500">
        <video
          ref={videoRef}
          onClick={togglePlay}
          onEnded={handleEnded}
          className="w-full h-full object-cover cursor-pointer"
          playsInline
        />
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
              <Play className="w-10 h-10 text-green-400" />
            </div>
          </button>
        )}
      </div>

      {/* Step-by-Step Grid */}
      <div className="mt-20 grid md:grid-cols-2 gap-10 w-full max-w-6xl text-left">
        {[
          {
            icon: Rocket,
            title: "Step 1: Join the Business Hub",
            desc: "Create your founder profile and connect with investors, mentors, and a trusted ecosystem to scale your startup efficiently.",
          },
          {
            icon: Globe,
            title: "Step 2: Understand the Vision",
            desc: "Part of Vision Pakistan 2030 — empowering entrepreneurship, global investment, and sustainable development across Pakistan.",
          },
          {
            icon: Users,
            title: "Step 3: Benefits for Founders",
            list: [
              "Direct access to vetted local and international investors.",
              "Strategic partnerships, mentorship, and corporate collaborations.",
              "Global visibility and growth opportunities.",
            ],
          },
          {
            icon: Target,
            title: "Step 4: Founder Journey",
            list: [
              "Register & complete your profile with company info and documents.",
              "Submit your startup idea with market analysis and pitch deck.",
              "Get shortlisted by investors and engage in discussions.",
              "Secure funding and strategic collaborations safely.",
            ],
          },
          {
            icon: Shield,
            title: "Step 5: Impact You Make",
            desc: "By participating, you contribute to Pakistan’s entrepreneurial revolution, drive economic growth, and expand your startup’s reach.",
          },
          {
            icon: Star,
            title: "Step 6: Leadership & Guidance",
            desc: "Led by Shakeel Ahmad Meer — fostering conscious entrepreneurship to create sustainable business growth and national impact.",
          },
        ].map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-3 p-6 rounded-2xl border border-green-400/20 shadow-lg backdrop-blur-md bg-green-100 hover:from-white/10 hover:via-green-100/10 hover:to-green-200/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <step.icon className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
            </div>
            {step.desc && (
              <p className="text-gray-600 text-base">{step.desc}</p>
            )}
            {step.list && (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {step.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
