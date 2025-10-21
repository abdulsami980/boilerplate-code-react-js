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
        <div className="relative flex flex-col items-center text-center max-w-2xl px-8 py-12 rounded-3xl bg-white transition-transform transform hover:scale-102 shadow-[0_0_120px_40px_rgba(34,197,94,0.6)]">
          {/* Tagline */}
          <p className="flex items-center justify-center gap-2 text-green-600 text-lg font-medium mb-3 tracking-wide">
            ⚡ Vision 2030
          </p>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#0e2c3f] leading-tight mb-4">
            Connecting People
            <br />
            Empowering Pakistan
          </h1>

          {/* Description */}
          <p className="text-gray-700 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
            Connecting ideas, innovation, and investment to uplift the economy
            and society. Join the movement to build Pakistan’s future.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => {
                navigate(PATH.SIGNUP);
              }}
              variant="outline"
              className="border-green-500/40 text-green-600 hover:bg-green-100 rounded-full px-5 py-2 text-sm flex items-center gap-2 transition-transform hover:scale-110"
            >
              <ArrowRight className="w-4 h-4" />
              I’m an Investor
            </Button>
            <Button
              onClick={() => {
                navigate(PATH.SIGNUP);
              }}
              className="bg-green-700 text-white hover:bg-green-900 rounded-full px-5 py-2 text-sm font-medium flex items-center gap-2 shadow-lg transition-transform hover:scale-110"
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
