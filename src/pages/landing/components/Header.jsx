import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn, Menu, X } from "lucide-react";
import { PATH } from "@/config";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const [active, setActive] = useState("home");
  const [isOverDark, setIsOverDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    setActive(id);
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { label: "Home", id: "hero-section" },
    { label: "Vision", id: "vision" },
    { label: "Impact", id: "impact" },
    { label: "Ideas", id: "benefits" },
    { label: "How It Works", id: "how-it-works" },
  ];

  // ✅ Detect overlap (light/dark sections)
  useEffect(() => {
    const checkOverlap = () => {
      const headerRect = headerRef.current?.getBoundingClientRect();
      if (!headerRect) return;

      const sections = document.querySelectorAll("section[data-theme]");
      let overDark = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isOverlapping =
          rect.top < headerRect.bottom && rect.bottom > headerRect.top;

        if (isOverlapping && section.getAttribute("data-theme") === "dark") {
          overDark = true;
        }
      });

      setIsOverDark(overDark);
    };

    const handleShrink = () => {
      if (window.scrollY > 30) setIsScrolled(true);
      else setIsScrolled(false);
      checkOverlap();
    };

    window.addEventListener("scroll", handleShrink);
    window.addEventListener("resize", checkOverlap);
    checkOverlap();

    return () => {
      window.removeEventListener("scroll", handleShrink);
      window.removeEventListener("resize", checkOverlap);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-3 left-0 right-0 mx-auto z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
    ${
      isScrolled
        ? "max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]"
        : "max-w-[96%] sm:max-w-[92%] md:max-w-[85%] lg:max-w-[80%]"
    }`}
    >
      <div
        className={`
          relative flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-xl border transition-all duration-500
          ${
            isOverDark
              ? "bg-transparent border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-[#0e1820]/85 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          }
          ${isScrolled ? "scale-100" : "scale-[1.02]"}
        `}
      >
        {/* Accent Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-xl opacity-20 -z-10" />

        {/* Logo */}
        <div
          onClick={() => handleScroll("hero-section")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span
            className={`font-semibold text-lg md:text-xl tracking-tight transition-colors duration-300 ${
              isOverDark ? "text-green-400" : "text-green-300"
            }`}
          >
            Investor Portal
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`
                relative cursor-pointer transition-all duration-300 
                hover:text-green-400
                ${
                  active === item.id
                    ? "text-green-400"
                    : isOverDark
                    ? "text-gray-200"
                    : "text-gray-300"
                }
              `}
            >
              {item.label}
              <span
                className={`absolute left-0 bottom-[-4px] h-[2px] bg-green-500 rounded-full transition-all duration-300 ease-in-out ${
                  active === item.id ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => navigate(PATH.LOGIN)}
            className={`
              border text-sm font-medium rounded-full px-4 py-1.5 transition-all duration-200 cursor-pointer flex items-center gap-2
              ${
                isOverDark
                  ? "border-white/20 text-green-400 hover:bg-white/10"
                  : "border-white/20 text-green-300 hover:bg-white/10"
              }
            `}
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </button>

          <Button
            onClick={() => navigate(PATH.SIGNUP)}
            className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-full px-5 py-1.5 text-sm font-medium shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile & Tablet Menu Toggle */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`lg:hidden transition-colors ${
            isOverDark ? "text-green-400" : "text-green-300"
          }`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      <div
        className={`
          lg:hidden mt-3 transition-all duration-500 overflow-hidden rounded-2xl backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] 
          ${menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}
          ${isOverDark ? "bg-transparent" : "bg-[#0e1820]/85"}
        `}
      >
        {/* Accent Glow same as header */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-xl opacity-20 -z-10" />

        <nav className="flex flex-col gap-2 py-4 text-center relative z-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className={`px-4 py-2 rounded-lg text-base transition-all duration-200 ${
                active === item.id
                  ? "text-green-400 bg-green-500/10"
                  : "text-gray-300 hover:text-green-400 hover:bg-green-500/5"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="flex flex-col gap-2 mt-3 px-4">
            <button
              onClick={() => {
                navigate(PATH.LOGIN);
                setMenuOpen(false);
              }}
              className="border border-green-400/50 text-green-300 rounded-full py-2 font-medium hover:bg-green-500/10 transition-all"
            >
              <LogIn className="inline w-4 h-4 mr-1" />
              Sign in
            </button>
            <Button
              onClick={() => {
                navigate(PATH.SIGNUP);
                setMenuOpen(false);
              }}
              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white rounded-full py-2 font-medium shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
            >
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
