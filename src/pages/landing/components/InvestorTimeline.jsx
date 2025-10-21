/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { UserPlus, ShieldCheck, Search, Star, Handshake } from "lucide-react";

export default function InvestorTimeline() {
  const sectionRef = useRef(null);
  const investorRef = useRef(null);
  const founderRef = useRef(null);

  // Scroll Animations
  const { scrollYProgress: investorProgress } = useScroll({
    target: investorRef,
    offset: ["start start", "end end"],
  });
  const investorLineHeight = useTransform(
    investorProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const { scrollYProgress: founderProgress } = useScroll({
    target: founderRef,
    offset: ["start start", "end end"],
  });
  const founderLineHeight = useTransform(
    founderProgress,
    [0, 1],
    ["0%", "100%"]
  );

  const investorSteps = [
    {
      title: "Register on Platform",
      desc: "Sign up as an investor by creating your verified profile. Provide your basic personal or company details, upload KYC documentation, and specify your preferred investment regions, industries, and funding stages. This ensures you receive personalized deal recommendations right from the start.",
      icon: <UserPlus className="text-white w-6 h-6" />,
    },
    {
      title: "Complete Verification",
      desc: "Go through a seamless verification process to confirm your identity and investor accreditation. Verified investors gain access to confidential business plans, NDAs, and exclusive pitch materials from founders seeking genuine partnerships.",
      icon: <ShieldCheck className="text-white w-6 h-6" />,
    },
    {
      title: "Explore Curated Ideas",
      desc: "Discover a curated selection of high-potential startup ideas tailored to your preferences. Filter opportunities by sector, funding stage, or traction level — and view analytics, team details, and pitch videos to evaluate fit and scalability potential.",
      icon: <Search className="text-white w-6 h-6" />,
    },
    {
      title: "Shortlist & Evaluate",
      desc: "Add promising projects to your shortlist for deeper evaluation. Request financial documents, track engagement, and schedule introduction calls with founders. Build and manage your investment pipeline with all the data centralized in one place.",
      icon: <Star className="text-white w-6 h-6" />,
    },
    {
      title: "Connect & Invest Securely",
      desc: "Engage directly with founders through integrated messaging and deal rooms. Negotiate investment terms, complete due diligence, and finalize deals confidently using the platform’s secure escrow system and digital agreement workflows.",
      icon: <Handshake className="text-white w-6 h-6" />,
    },
  ];

  const founderSteps = [
    {
      title: "Register on Platform",
      desc: "Begin your journey by creating a verified founder account. Enter essential business and personal details to build your profile and unlock access to the startup ecosystem. This is your first step toward visibility and potential funding opportunities.",
      icon: <UserPlus className="text-white w-6 h-6" />,
    },
    {
      title: "Complete Profile",
      desc: "Showcase who you are and what your venture stands for. Upload your company overview, vision, and supporting documents to build credibility. A complete profile improves your chances of attracting investor interest and getting shortlisted faster.",
      icon: <ShieldCheck className="text-white w-6 h-6" />,
    },
    {
      title: "Submit Your Idea",
      desc: "Bring your startup idea to life by submitting detailed information about your business model, market opportunity, and financial projections. Upload your pitch deck, introduce your team, and highlight the problem you’re solving to stand out among founders.",
      icon: <Search className="text-white w-6 h-6" />,
    },
    {
      title: "Get Shortlisted",
      desc: "Once your idea is published, verified investors will discover your project through tailored recommendations. When shortlisted, you’ll receive direct engagement opportunities — including pitch requests, Q&A sessions, and mentorship discussions.",
      icon: <Star className="text-white w-6 h-6" />,
    },
    {
      title: "Secure Funding",
      desc: "Negotiate investment terms and finalize funding within a secure digital environment. From due diligence to document signing, our platform streamlines every step, allowing you to focus on scaling your business and building impactful relationships with investors.",
      icon: <Handshake className="text-white w-6 h-6" />,
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-theme="dark"
      className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center justify-start py-20 sm:py-28 lg:py-32 px-4 sm:px-6"
    >
      {/* Header */}
      <div className="text-center mb-16 sm:mb-20 max-w-3xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-400 mb-4">
          How It Works
        </h2>
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          A simple, transparent process designed for both investors
          <br className="hidden sm:block" /> and founders.
        </p>
      </div>

      {/* INVESTOR FLOW */}
      <div
        ref={investorRef}
        className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-start mb-32 sm:mb-40"
      >
        {/* Left Title */}
        <div className="w-full lg:w-1/3 text-center lg:text-left lg:sticky lg:top-24 mb-10 lg:mb-0">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-400 leading-tight pt-20">
            For <br className="hidden sm:block" /> Investors
          </h3>
        </div>

        {/* Timeline for desktop */}
        <div className="relative hidden lg:block w-[10px] bg-gray-700 rounded-full mx-12 overflow-hidden self-stretch z-0">
          <motion.div
            style={{ height: investorLineHeight }}
            className="absolute top-0 left-0 w-full bg-green-500 rounded-full shadow-[0_0_20px_#22c55e]"
          />
        </div>

        {/* Cards */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start gap-16 sm:gap-20 pb-10">
          {investorSteps.map((step, i) => (
            <StepCard key={i} {...step} side="right" />
          ))}
        </div>
      </div>

      {/* FOUNDER FLOW */}
      <div
        ref={founderRef}
        className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-start"
      >
        {/* Cards */}
        <div className="w-full lg:w-1/3 flex flex-col justify-start gap-16 sm:gap-20 pb-10 order-2 lg:order-2">
          {founderSteps.map((step, i) => (
            <StepCard key={i} {...step} side="left" />
          ))}
        </div>

        {/* Timeline for desktop only */}
        <div className="relative hidden lg:block w-[10px] bg-gray-700 rounded-full mx-12 overflow-hidden self-stretch z-0 order-3 lg:order-2">
          <motion.div
            style={{ height: founderLineHeight }}
            className="absolute top-0 left-0 w-full bg-green-500 rounded-full shadow-[0_0_20px_#22c55e]"
          />
        </div>

        {/* Right Title */}
        <div className="w-full lg:w-1/3 text-center lg:text-right lg:sticky lg:top-24 mb-6 lg:mb-0 order-1 lg:order-3">
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-400 leading-tight pt-20">
            For <br className="hidden sm:block" /> Founders
          </h3>
        </div>
      </div>
    </section>
  );
}

function StepCard({ title, desc, icon, side = "right" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.25"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, scale }}
      className={`relative flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-10 z-20 ${
        side === "left" ? "sm:flex-row-reverse lg:text-right" : "lg:text-left"
      }`}
    >
      {/* Icon */}
      <motion.div
        style={{ opacity }}
        className="relative sm:static flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-full bg-green-500 shadow-[0_0_15px_#22c55e] z-10"
      >
        {icon}
      </motion.div>

      {/* Card */}
      <motion.div
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 sm:p-8 w-full"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-3">
          {title}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          {desc}
        </p>
      </motion.div>
    </motion.div>
  );
}
