import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { FcIdea } from "react-icons/fc";

export default function BusinessHubSection() {
  const targets = [
    {
      title: "Foster an Entrepreneurial Revolution",
      icon: "🚀",
      text: "Create a dynamic ecosystem that empowers local entrepreneurs and innovators.",
    },
    {
      title: "Achieve Multi-Billion Dollar Collaborations",
      icon: "💰",
      text: "Facilitate and track investment and partnership deals on the platform to meet a multi-billion dollar target.",
    },
    {
      title: "Boost Local and National Economy",
      icon: "📈",
      text: "Drive economic growth by connecting talent and capital, leading to job creation and business expansion.",
    },
    {
      title: "Cultivate a Culture of Collaboration",
      icon: "🤝",
      text: "Promote a sense of shared purpose and positive national identity among all participants.",
    },
  ];

  return (
    <section
      id="business-hub"
      data-theme="dark"
      className="bg-gradient-to-br from-green-500 via-green-700 to-green-900 py-16 px-6 flex flex-col items-center relative overflow-hidden"
    >
      <ScrollVelocity />

      <span className="mb-4 inline-flex items-center justify-center text-7xl text-green-500 animate-bounce">
        <FcIdea />
      </span>
      <div className="h-[2px] w-32 bg-white/30 rounded-full mb-3"></div>

      {/* Section Header */}
      <div className="max-w-4xl text-center mb-12">
        <div className="text-white/90 text-lg md:text-xl leading-relaxed space-y-4">
          <p>
            "The Business Hub" is a flagship project under the "Vision Pakistan
            2030" initiative by the Meer Group. Its core objective is to
            cultivate an environment of strategic collaboration and positive
            national passion among startups, established businesses, and
            investors.
          </p>
          <p>
            The project is designed to be a catalyst for an entrepreneurial
            revolution in Pakistan. It will begin with a digital-first approach
            to connect key stakeholders, followed by the establishment of
            physical hubs to foster face-to-face interaction and mentorship.
          </p>
          <p>
            This phased strategy aims to significantly boost the local and
            overall economy, attracting and facilitating multi-billion dollar
            collaborations, with a special focus on international expansion and
            attracting global investment through Meer Group's extensive network.
          </p>
        </div>
      </div>

      {/* Targets / Key Points Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full">
        {targets.map((target, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 text-white hover:bg-white/20 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{target.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{target.title}</h3>
            <p className="text-sm leading-relaxed opacity-90">{target.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
