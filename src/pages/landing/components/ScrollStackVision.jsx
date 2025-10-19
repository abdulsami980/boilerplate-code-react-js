/* eslint-disable no-unused-vars */
import { BarChart3, Cpu, ShieldCheck, Zap } from "lucide-react";
import { cloneElement, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    icon: <Zap />,
    title: "Quick Access to Funding",
    description:
      "Connect with verified investors and secure funding faster than traditional methods.",
  },
  {
    id: 2,
    icon: <ShieldCheck />,
    title: "Verified Investors",
    description:
      "Gain exposure to a curated network of serious investors looking for opportunities.",
  },
  {
    id: 3,
    icon: <Cpu />,
    title: "Technology Empowerment",
    description:
      "Leverage cutting-edge technology to streamline the investment process.",
  },
  {
    id: 4,
    icon: <BarChart3 />,
    title: "Economic Growth",
    description:
      "Contribute to building a stronger national economy through innovation.",
  },
];

export default function StackCardsSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) target.classList.add("is-visible");
          else target.classList.remove("is-visible");
        });
      },
      { threshold: 0.15 }
    );

    const items = root.querySelectorAll(".card-item");
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full py-28 overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-100">
      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-green-400/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-emerald-500/20 blur-[160px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-green-500">
            Why Choose Our Platform
          </h2>
          <p className="mt-4 text-gray-700 text-lg">
            Empowering entrepreneurs with access, trust, and technology to fuel
            Pakistan’s innovation-driven future.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={rootRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch"
        >
          {cards.map((c) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: c.id * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="card-item relative bg-white/70 backdrop-blur-2xl border border-green-200/60 rounded-3xl p-8 shadow-[0_12px_60px_rgba(0,0,0,0.05)] transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_16px_60px_rgba(16,185,129,0.25)]"
            >
              {/* Gradient Border Hover Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-400/30 via-transparent to-emerald-500/30 opacity-0 transition duration-500 blur-md pointer-events-none" />

              {/* Card Content */}
              <div className="relative z-10 flex items-start gap-5">
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-400/10 border border-green-300/40 rounded-2xl p-4 text-green-600 shadow-inner shadow-green-400/10 transition-transform duration-300"
                >
                  {cloneElement(c.icon, { className: "w-8 h-8" })}
                </motion.div>

                <div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">
                    {c.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {c.description}
                  </p>
                </div>
              </div>

              {/* Subtle Hover Accent Line */}
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 group-hover:w-full rounded-b-3xl"></span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
