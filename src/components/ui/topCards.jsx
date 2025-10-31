import React from "react";

export default function TopCards({ cards = [] }) {
  // ✅ Default style fallback
  const defaultStyles = {
    gradient: "from-green-100/40 to-emerald-200/40",
    ring: "ring-green-300/50",
    text: "text-green-600",
    glow: "from-green-400/20 to-emerald-400/10",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => {
        const merged = { ...defaultStyles, ...card }; // Merge defaults with card props

        return (
          <div
            key={i}
            className={`
              group relative overflow-hidden rounded-2xl border border-green-300/60
              bg-gradient-to-br ${merged.gradient}
              ring-1 ${merged.ring} backdrop-blur-xl
              transition-all duration-500 ease-in-out
              hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
              hover:-translate-y-1
            `}
          >
            {/* Hover Glow */}
            <div
              className={`
                absolute inset-0 opacity-0 group-hover:opacity-100
                bg-gradient-to-tr ${merged.glow}
                transition-all duration-700
              `}
            />

            <div className="relative z-10 p-5 flex justify-between items-center">
              <div>
                <p className="text-xs tracking-wide text-slate-500 font-medium">
                  {merged.title}
                </p>
                <h3 className="text-3xl font-bold text-[#0b2c3c] mt-1">
                  {merged.value}
                </h3>
                {merged.meta && (
                  <p className={`text-xs font-medium mt-1 ${merged.text}`}>
                    {merged.meta}
                  </p>
                )}
              </div>

              {merged.icon && (
                <div
                  className={`
                    flex items-center justify-center rounded-xl p-3
                    bg-slate-50 shadow-inner ${merged.text}
                    group-hover:scale-110 transition-transform duration-500
                  `}
                >
                  {merged.icon}
                </div>
              )}
            </div>

            {/* Subtle top reflection */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        );
      })}
    </div>
  );
}
