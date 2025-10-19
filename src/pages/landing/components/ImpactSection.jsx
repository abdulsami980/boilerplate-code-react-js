import Counter from "@/components/reactbits/Counter";
import { useEffect, useState } from "react";

export default function ImpactSection() {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("impact");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 150) {
          setStart(true);
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    { value: 1200, label: "Millionaires", suffix: "+" },
    { value: 1000, label: "Businesses", suffix: "+" },
    { value: 60, label: "Capital", suffix: "M+" },
    { value: 400, label: "Team", suffix: "+" },
  ];

  return (
    <section
      id="impact"
      data-theme="dark"
      className="relative w-full py-24 bg-gradient-to-b from-[#0a192f] via-[#0e2c3f] to-[#091a28] text-white text-center overflow-hidden"
    >
      {/* Subtle glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.08)_0%,_transparent_70%)] pointer-events-none" />

      {/* Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-300 tracking-tight">
        The Impact So Far
      </h1>

      {/* Stats — always 4 in a row for md+ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 lg:gap-12 max-w-6xl mx-auto px-6 relative z-10">
        {stats.map((item, i) => {
          const digits = item.value.toString().length;
          const places = Array.from({ length: digits }, (_, idx) =>
            Math.pow(10, digits - idx - 1)
          );

          return (
            <div
              key={i}
              className="flex flex-col items-center bg-white/5 border border-white/10 backdrop-blur-md px-8 py-10 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.15)] hover:shadow-[0_0_35px_rgba(34,197,94,0.3)] transition-all duration-300"
            >
              <div className="flex items-end justify-center">
                {start && (
                  <Counter
                    value={item.value}
                    places={places}
                    fontSize={60}
                    padding={0}
                    gap={8}
                    textColor="white"
                    fontWeight={800}
                    gradientHeight={0}
                    gradientFrom="transparent"
                    gradientTo="transparent"
                  />
                )}
                <span className="text-[60px] font-extrabold text-green-400 ml-1 leading-none">
                  {item.suffix}
                </span>
              </div>
              <h3 className="text-lg md:text-2xl text-gray-300 font-semibold mt-3 tracking-wide">
                {item.label}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
