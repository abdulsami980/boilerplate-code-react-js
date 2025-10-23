import IMAGES from "@/assets/images";
import Masonry from "@/components/reactbits/Masonry";

export default function PortfolioGallerySection() {
  const items = [
    { id: "1", img: IMAGES.AKHTAR, height: 200 },
    { id: "2", img: IMAGES.ARABIC, height: 300 },
    { id: "3", img: IMAGES.DUBAI, height: 500 },
    { id: "4", img: IMAGES.FAHAD, height: 200 },
    { id: "5", img: IMAGES.SALMAN, height: 450 },
    { id: "6", img: IMAGES.TECH, height: 250 },
    { id: "7", img: IMAGES.WASIM_NETWORK, height: 250 },
    { id: "8", img: IMAGES.HANDSHAKE, height: 160 },
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-emerald-900 via-emerald-700 to-emerald-900 overflow-hidden text-white">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.25),transparent_70%)] pointer-events-none" />

      {/* Header Section */}
      <div className="relative max-w-3xl mx-auto mb-20 text-center space-y-8">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent">
            The Meer Group Portfolio
          </span>
        </h2>

        <p className="text-emerald-100/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
          A fusion of innovation, capital, and vision — driving Pakistan’s
          transformation toward{" "}
          <span className="text-green-400 font-medium">Vision 2030</span>. Each
          venture reflects excellence, sustainability, and global leadership.
        </p>

        {/* Highlighted Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto text-left mt-10">
          {[
            {
              label: "Global Investors",
              desc: "Bringing international capital and influence to empower progress.",
            },
            {
              label: "Influential Organizations",
              desc: "Strategic partnerships fueling sustainable growth and innovation.",
            },
            {
              label: "Celebrity Ambassadors",
              desc: "Inspiring global awareness and uniting communities through vision.",
            },
            {
              label: "Visionary Leaders",
              desc: "Pioneering execution and mentoring the next generation of entrepreneurs.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
            >
              <span className="flex-shrink-0 text-green-400 text-2xl">★</span>
              <div>
                <h3 className="font-semibold text-emerald-50 text-lg mb-1">
                  {item.label}
                </h3>
                <p className="text-emerald-100/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="relative max-w-7xl mx-auto">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.7}
          stagger={0.08}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.96}
          blurToFocus={true}
          colorShiftOnHover={false}
          className="rounded-3xl overflow-hidden shadow-[0_0_60px_-10px_rgba(16,185,129,0.4)]"
        />
      </div>
    </section>
  );
}
