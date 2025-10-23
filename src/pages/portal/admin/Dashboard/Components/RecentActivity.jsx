import React from "react";
import { Clock } from "lucide-react";

export default function RecentActivity({ items = [] }) {
  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl border border-slate-200/60
        bg-gradient-to-br from-white/90 via-white/70 to-slate-100/50
        backdrop-blur-xl
        shadow-[0_4px_20px_rgba(0,0,0,0.05)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        transition-all duration-500 hover:-translate-y-[2px]
        p-6
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h4 className="text-[#10354a] font-semibold tracking-wide text-sm flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#22c55eaa]" />
          Recent Activity
        </h4>
        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
          Timeline
        </span>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 before:absolute before:left-[14px] before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b from-emerald-400/70 via-slate-200 to-transparent">
        {items.map((it, i) => (
          <div
            key={i}
            className="
              relative mb-6 last:mb-0
              group transition-all duration-300
              hover:translate-x-[4px]
            "
          >
            {/* Marker */}
            <div
              className="
                absolute -left-[10px] top-[6px] w-4 h-4
                bg-white border-2 border-emerald-500
                rounded-full flex items-center justify-center
                shadow-[0_0_12px_#22c55e66]
                group-hover:scale-110 transition-transform
              "
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>

            {/* Content */}
            <div className="ml-4">
              <p className="text-sm text-[#0d2437] font-medium leading-snug tracking-wide">
                {it.text}
              </p>
              <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                <Clock size={11} className="text-emerald-500" />
                <span>{it.time} ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Glow accent at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-emerald-500 to-transparent opacity-60" />
    </div>
  );
}
