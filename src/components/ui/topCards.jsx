import React from "react";

export default function TopCards({ cards = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`
            group relative overflow-hidden rounded-2xl border border-green-300/60
            bg-gradient-to-br ${
              card.gradient || "from-emerald-100/40 to-green-100/30"
            }
            ring-1 ${card.ring || "ring-emerald-300/50"} backdrop-blur-xl
            transition-all duration-500 ease-in-out
            hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            hover:-translate-y-1
          `}
        >
          {/* Hover Glow */}
          <div
            className={`
              absolute inset-0 opacity-0 group-hover:opacity-100
              bg-gradient-to-tr ${
                card.glow || "from-green-400/20 to-emerald-400/10"
              }
              transition-all duration-700
            `}
          />

          <div className="relative z-10 p-5 flex justify-between items-center">
            <div>
              <p className="text-xs tracking-wide text-slate-500 font-medium">
                {card.title}
              </p>
              <h3 className="text-3xl font-bold text-[#0b2c3c] mt-1">
                {card.value}
              </h3>
              {card.meta && (
                <p
                  className={`text-xs font-medium mt-1 ${
                    card.text || "text-emerald-600"
                  }`}
                >
                  {card.meta}
                </p>
              )}
            </div>

            {card.icon && (
              <div
                className={`
                  flex items-center justify-center rounded-xl p-3
                  bg-slate-50 shadow-inner ${card.text || "text-emerald-600"}
                  group-hover:scale-110 transition-transform duration-500
                `}
              >
                {card.icon}
              </div>
            )}
          </div>

          {/* Subtle top reflection */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      ))}
    </div>
  );
}
