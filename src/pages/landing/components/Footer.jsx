/* eslint-disable no-unused-vars */
import IMAGES from "@/assets/images";
import LegalModal from "@/components/ui/LegalModal";
import {
  COOKIE_POLICY_CONTENT,
  LEGAL_CONTENT,
  NDA_CONTENT,
  PATH,
} from "@/config";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", id: "hero-section" },
  { label: "Vision", id: "vision" },
  { label: "Impact", id: "impact" },
  { label: "How It Works", id: "how-it-works" },
  { label: "About", id: "portfolio" },
  { label: "Ambassadors", id: "ambassadors" },
];

export default function Footer() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showNDAModal, setShowNDAModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);

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
    <>
      <footer
        ref={ref}
        className="relative bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-gray-300 pt-10 pb-10 px-6 md:px-20 overflow-hidden border-t border-green-700/30"
      >
        {/* Vision2030 Background Text (Static) */}
        <h1
          className="
      absolute 
      bottom-[-20px] 
      left-1/2 
      -translate-x-1/2 
      font-extrabold 
      text-green-400/30 
      tracking-widest 
      select-none 
      pointer-events-none
      font-[Orbitron]
      leading-none
      text-[4rem] 
      sm:text-[6rem] 
      md:text-[10rem] 
      lg:text-[12rem]
    "
        >
          Vision2030
        </h1>

        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-transparent to-transparent pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 grid md:grid-cols-2 gap-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img
                src={IMAGES.MAIN_LOGO}
                alt="Main Logo"
                className="w-32 h-auto"
              />
            </div>

            <p className="text-gray-300 text-sm leading-relaxed">
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

          {/* Quick Links + Contact (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
                      className="text-sm text-gray-300 hover:text-green-400 transition font-medium cursor-pointer"
                    >
                      {item.label}
                    </button>
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out group-hover:w-full group-hover:skew-x-6"></span>
                  </li>
                ))}
              </ul>

              <ul className="space-y-3 mt-3">
                {[{ label: "Contact Support", path: PATH.CONTACT_SUPPORT }].map(
                  (item) => (
                    <li key={item.label} className="relative group w-fit">
                      <button
                        onClick={() => navigate(item.path)}
                        className="text-sm text-gray-300 hover:text-green-400 transition font-medium cursor-pointer"
                      >
                        {item.label}
                      </button>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500 ease-out group-hover:w-full group-hover:skew-x-6"></span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-green-400 text-lg font-semibold mb-5">
                Contact
              </h3>
              <ul className="space-y-4 text-sm text-gray-300">
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
        </div>

        {/* Divider + Bottom Bar */}
        <div className="relative z-10 mt-12 border-t border-green-700/40 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-300">
          <div>
            © 2025{" "}
            <span className="text-green-400 font-medium">Business Hub</span>{" "}
            Pakistan. All rights reserved.
          </div>

          {/* Legal Buttons */}
          <div className="mt-3 md:mt-0 flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="text-gray-300 hover:text-green-400 transition font-medium text-sm cursor-pointer"
            >
              Terms & Privacy
            </button>
            <button
              onClick={() => setShowNDAModal(true)}
              className="text-gray-300 hover:text-green-400 transition font-medium text-sm cursor-pointer"
            >
              NDA Rules
            </button>
            <button
              onClick={() => setShowCookiesModal(true)}
              className="text-gray-300 hover:text-green-400 transition font-medium text-sm cursor-pointer"
            >
              Cookies Policy
            </button>
          </div>
        </div>
      </footer>

      <LegalModal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="Terms & Privacy"
        content={LEGAL_CONTENT}
      />

      <LegalModal
        open={showNDAModal}
        onClose={() => setShowNDAModal(false)}
        title="Non-Disclosure Agreement"
        content={NDA_CONTENT}
      />

      <LegalModal
        open={showNDAModal}
        onClose={() => setShowNDAModal(false)}
        title="Non-Disclosure Agreement"
        content={NDA_CONTENT}
      />

      <LegalModal
        open={showCookiesModal}
        onClose={() => setShowCookiesModal(false)}
        title="Cookies Policy"
        content={COOKIE_POLICY_CONTENT}
      />
    </>
  );
}
