import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { Button } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/config";

export default function BenefitsSection() {
  const navigate = useNavigate();

  const benefits = [
    {
      title: "For Investors",
      icon: "⭐",
      text: "Access verified investment opportunities backed with real data and smart filters for better decision making.",
    },
    {
      title: "For Founders",
      icon: "🏢",
      text: "Raise capital, access mentorship, and showcase your startup to trusted local & global investors.",
    },
    {
      title: "For Country",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/32/Flag_of_Pakistan.svg"
          alt="Pakistan Flag"
          className="w-8 h-8"
        />
      ),
      text: "Fuel Pakistan’s economic growth through innovation, investment, and job creation.",
    },
    {
      title: "For Community",
      icon: "👥",
      text: "Build a collaborative entrepreneurial ecosystem that fosters learning, opportunity, and national progress.",
    },
  ];

  return (
    <section
      id="benefits"
      data-theme="dark"
      className="bg-gradient-to-br from-green-500 via-green-700 to-green-900 py-10 px-6 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold text-white mb-4 text-center">
        Benefits for Everyone
      </h2>

      {/* Benefits Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full mb-14">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-white hover:bg-white/20 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-sm leading-relaxed opacity-90">{benefit.text}</p>
          </div>
        ))}
      </div>
      {/* CTA helper text */}
      <p className="text-white/80 text-center mb-6 text-base">
        Join a movement shaping the future — whether you're funding ideas or
        building them.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* Investor CTA */}
        <Button
          onClick={() => navigate(PATH.SIGNUP)}
          variant="outline"
          className="border-green-400 text-green-200 backdrop-blur-md rounded-full px-8 py-3 text-base flex items-center gap-2 font-medium transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:scale-[1.05]"
        >
          <ArrowRight className="w-4 h-4" />
          I'm an Investor
        </Button>

        {/* Founder CTA */}
        <Button
          onClick={() => navigate(PATH.SIGNUP)}
          className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-full px-8 py-3 text-base font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.05] hover:from-green-700 hover:to-emerald-600"
        >
          <User className="w-4 h-4" />
          I'm a Founder
        </Button>
      </div>
    </section>
  );
}
