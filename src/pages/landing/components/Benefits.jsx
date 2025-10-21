import ScrollVelocity from "@/components/reactbits/ScrollVelocity";

export default function BenefitsSection() {
  const benefits = [
    {
      title: "For Investors",
      icon: "⭐",
      text: "Access curated deals with real data, smart filters, and verified opportunities. Make informed decisions with comprehensive analytics.",
    },
    {
      title: "For Founders",
      icon: "🏢",
      text: "Access curated deals with real data, smart filters, and verified opportunities. Make informed decisions with comprehensive analytics.",
    },
    {
      title: "For Country",
      icon: "🏳",
      text: "Access curated deals with real data, smart filters, and verified opportunities. Make informed decisions with comprehensive analytics.",
    },
    {
      title: "For Community",
      icon: "👥",
      text: "Access curated deals with real data, smart filters, and verified opportunities. Make informed decisions with comprehensive analytics.",
    },
  ];

  return (
    <>
      {/* <ScrollVelocity
        texts={["React Bits", "Scroll Down"]}
        velocity={100}
        className="custom-scroll-text"
        damping={50}
        stiffness={400}
        numCopies={6}
      /> */}
      <section
        id="benefits"
        data-theme="dark"
        className="bg-gradient-to-br from-green-500 via-green-700 to-green-900 py-16 px-6 flex flex-col items-center"
      >
        <h2 className="text-4xl font-bold text-white mb-10 text-center">
          Benefits for Everyone
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-white hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-3xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-3 ">{benefit.title}</h3>
              <p className="text-sm leading-relaxed opacity-90 ">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
