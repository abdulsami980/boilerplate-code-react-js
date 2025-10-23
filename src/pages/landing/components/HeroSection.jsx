import Iridescence from "@/components/reactbits/Iridescence";

export default function HeroSection() {
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
          <div className="mt-4 h-[2px] w-44 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
         
        </div>
      </div>
    </section>
  );
}
