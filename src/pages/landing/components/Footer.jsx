/* eslint-disable no-unused-vars */
import { Mail, Phone, MapPin } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const navItems = [
  { label: "Home", id: "hero-section" },
  { label: "Vision", id: "vision" },
  { label: "Impact", id: "impact" },
  { label: "Ideas", id: "benefits" },
  { label: "How It Works", id: "how-it-works" },
];

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={ref}
      className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-gray-300 pt-20 pb-10 px-6 md:px-20 overflow-hidden border-t border-green-700/30"
    >
      {/* Vision2030 Scroll-Animated Glow */}
      <motion.h1
        style={{ y, opacity }}
        className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-[9rem] md:text-[14rem] font-extrabold text-green-400/40 tracking-widest select-none"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        Vision2030
      </motion.h1>

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent pointer-events-none" />

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-3 gap-12">
        {/* Brand Info */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center text-lg font-bold text-green-400">
              L
            </div>
            <h2 className="text-xl font-semibold text-green-400">
              Business Hub
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            A national innovation platform connecting verified investors with
            entrepreneurs — fueling Pakistan’s economic growth with trust,
            technology, and opportunity.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5">
            {["facebook", "instagram", "x", "tiktok"].map((icon) => (
              <motion.a
                key={icon}
                href="#"
                whileHover={{ scale: 1.2, color: "#4ade80" }}
                className="text-gray-300 hover:text-green-400 transition"
              >
                <i className={`ri-${icon}-fill text-xl`}></i>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-5">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.label} className="relative group w-fit">
                <button
                  onClick={() => handleScrollTo(item.id)}
                  className="text-sm text-gray-400 hover:text-green-400 transition font-medium"
                >
                  {item.label}
                </button>

                {/* Animated diagonal line effect */}
                <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out group-hover:w-full group-hover:skew-x-6"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-green-400 text-lg font-semibold mb-5">Contact</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-green-400" />
              <span>info@meergroup.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-green-400" />
              <span>+971-555901047</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-green-400 mt-1" />
              <span>
                Deira - 99 Al Maktoum Rd, Port Saeed - Dubai, United Arab
                Emirates
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="relative z-10 mt-12 border-t border-green-700/40 pt-6 text-center text-sm text-gray-300">
        © 2025 <span className="text-green-400 font-medium">Vision 2030</span>{" "}
        Pakistan. All rights reserved.
      </div>
    </footer>
  );
}
