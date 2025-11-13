/* eslint-disable no-unused-vars */
import {
  Building2,
  Handshake,
  Rocket,
  Globe,
  Briefcase,
  Users,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { PATH } from "@/config";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WhyJoinSection() {
  const navigate = useNavigate();
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: "easeOut" },
    viewport: { once: true },
  });

  return (
    <section className="relative py-18 overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-100">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-green-400/20 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/20 blur-[180px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          {...fadeUp(0)}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-green-700 mb-4">
            Why Join This Platform
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Where businesses meet investors — empowering growth, innovation, and
            collaboration for Pakistan’s next billion-dollar success stories.
          </p>
        </motion.div>

        {/* Dual Cards: Businesses / Investors */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Businesses Card */}
          <motion.div
            {...fadeUp(0.3)}
            className="group relative bg-white/80 backdrop-blur-2xl border border-green-200/70 rounded-3xl p-10 shadow-[0_12px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_70px_rgba(16,185,129,0.25)] transition-all duration-500"
          >
            {/* Glow Accent */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-300/20 to-emerald-500/20 opacity-0  blur-2xl transition duration-700"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500/10 p-4 rounded-2xl border border-green-300/40 text-green-600">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  For Founders
                </h3>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <Building2 className="w-6 h-6 text-green-600 mt-1" />
                  <p>
                    <span className="font-semibold text-green-700">
                      Connect with Confidence:
                    </span>{" "}
                    Gain direct access to a curated network of vetted local and
                    international investors actively seeking growth
                    opportunities in Pakistan.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Handshake className="w-6 h-6 text-green-600 mt-1" />
                  <p>
                    <span className="font-semibold text-green-700">
                      Beyond Funding:
                    </span>{" "}
                    Secure more than just a cheque — find strategic partners,
                    corporate collaborations, and mentorship to accelerate your
                    growth.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Rocket className="w-6 h-6 text-green-600 mt-1" />
                  <p>
                    <span className="font-semibold text-green-700">
                      Join the Movement:
                    </span>{" "}
                    Be part of the force driving Pakistan toward a
                    multi-billion-dollar economy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Investors Card */}
          <motion.div
            {...fadeUp(0.3)}
            className="group relative bg-white/80 backdrop-blur-2xl border border-emerald-200/70 rounded-3xl p-10 shadow-[0_12px_60px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_70px_rgba(16,185,129,0.25)] transition-all duration-500"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 to-green-500/20 opacity-0  blur-2xl transition duration-700"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-300/40 text-emerald-600">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-green-600">
                  For Investors
                </h3>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-600 mt-1" />
                  <p>
                    <span className="font-semibold text-emerald-700">
                      Curated Deal Flow:
                    </span>{" "}
                    Access a rigorously vetted pipeline of Pakistani businesses
                    poised for exponential growth, across all sectors.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-emerald-600 mt-1" />
                  <p>
                    <span className="font-semibold text-emerald-700">
                      Global Network, Local Insight:
                    </span>{" "}
                    Leverage Neer Group’s international connections while
                    benefiting from deep local market intelligence.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600 mt-1" />
                  <p>
                    <span className="font-semibold text-emerald-700">
                      Seamless Collaboration:
                    </span>{" "}
                    Our platform facilitates secure, efficient matchmaking for
                    partnerships, joint ventures, and direct investment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 text-center">
        {/* CTA helper text */}
        <p className="text-gray-500 text-lg md:text-xl font-medium mb-4 px-4">
          Step into a connected investment ecosystem — where founders scale and
          investors lead innovation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Investor CTA */}
          <Button
            onClick={() => navigate(PATH.SIGNUP)}
            variant="outline"
            className="border-green-600 text-green-700 rounded-full px-8 py-3 text-base flex items-center gap-2 font-semibold transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-[1.05]"
          >
            <ArrowRight className="w-4 h-4" />
            I'm an Investor
          </Button>

          {/* Founder CTA */}
          <Button
            onClick={() => navigate(PATH.SIGNUP)}
            className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-full px-8 py-3 text-base font-semibold flex items-center gap-2 shadow-md transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.05] hover:from-green-700 hover:to-emerald-600"
          >
            <User className="w-4 h-4" />
            I'm a Founder
          </Button>
        </div>
      </div>
    </section>
  );
}
