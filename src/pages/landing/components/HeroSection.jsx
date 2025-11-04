import Iridescence from "@/components/reactbits/Iridescence";
import { Button } from "@/components/ui/button";
import { PATH } from "@/config";
import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section
      id="hero-section"
      data-theme="light"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-white rounded-b-[80px] shadow-[0_10px_40px_rgba(0,0,0,0.1)]"
    >
      <Iridescence
        color={[0.0, 0.55, 0.2]}
        mouseReact={false}
        amplitude={0.06}
        speed={1.1}
        className="w-full h-full opacity-90"
      />

      {/* White Container with Permanent Green Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center text-center max-w-3xl px-8 py-16 rounded-3xl bg-white/95 backdrop-blur-md shadow-[0_0_120px_40px_rgba(34,197,94,0.5)] transition-transform hover:scale-[1.02]">
          {/* Tagline */}
          <p className="flex items-center justify-center gap-2 text-green-600 text-lg font-semibold mb-3 tracking-wide">
            ⚡ The Business Hub Pakistan
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#0e2c3f] leading-snug mb-6">
            Unlocking Pakistan’s Multi-Billion Dollar Potential
          </h1>

          {/* Description */}
          <p className="text-gray-700 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            A revolutionary platform empowering entrepreneurs, investors, and
            innovators to collaborate — driving sustainable growth, global
            visibility, and a brighter economic future for Pakistan.
          </p>

          {/* Divider & Subtext */}
          <div className="my-6 h-[2px] w-44 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 ">
            <Button
              onClick={() => navigate(PATH.SIGNUP)}
              variant="outline"
              className="border-green-500/50 text-green-600 hover:bg-green-100 rounded-full px-7 py-3 text-sm md:text-base flex items-center gap-2 font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:scale-105"
            >
              <ArrowRight className="w-4 h-4" />
              I’m an Investor
            </Button>
            <Button
              onClick={() => navigate(PATH.SIGNUP)}
              className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-full px-7 py-3 text-sm md:text-base font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.05] hover:from-green-700 hover:to-emerald-600"
            >
              <User className="w-4 h-4" />
              I’m a Founder
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
