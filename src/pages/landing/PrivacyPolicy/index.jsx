/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Iridescence from "@/components/reactbits/Iridescence";
import Header from "../Main/components/Header";
import Footer from "../Main/components/Footer";

const sections = [
  {
    title: "1. Information Collection",
    content:
      "We collect limited personal and business information during registration, profile setup, and document submission to verify identity, maintain compliance (KYC/AML), and enable secure investor–business interactions.",
  },
  {
    title: "2. Use of Information",
    content:
      "Your data is used only for platform-related purposes — including user verification, business–investor matchmaking, communication, and service improvement. We do not sell or share your data with unauthorized third parties.",
  },
  {
    title: "3. Data Security",
    content:
      "All data is encrypted and stored on secure servers using industry-standard protocols. Unauthorized access, alteration, or disclosure is strictly prohibited, and we regularly review our systems to ensure data safety.",
  },
  {
    title: "4. User Rights",
    content:
      "Users may request access, updates, corrections, or deletion of their data at any time, subject to verification. This gives you full transparency and control over your personal and business information.",
  },
  {
    title: "5. Platform Interaction",
    content:
      "All activities on the platform — including messages, submissions, and uploaded documents — are treated with strict confidentiality. Users are responsible for ensuring that any shared information is accurate, lawful, and compliant with platform policies.",
  },
  {
    title: "6. Updates to Policy",
    content:
      "This Privacy Policy may be revised periodically to reflect operational, legal, or regulatory updates. Continued use of the platform after any changes indicates your acceptance of the updated policy.",
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative w-full min-h-[40vh] text-gray-900 rounded-b-[80px] overflow-hidden pt-48">
        {/* Iridescence Background */}
        <Iridescence
          color={[0.0, 0.55, 0.2]}
          mouseReact={false}
          amplitude={0.06}
          speed={1.1}
          className="absolute inset-0 opacity-90"
        />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col items-center justify-center h-full text-center px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
            Privacy Policy
          </h1>
        </motion.div>
      </section>

      {/* Policy Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your personal and business information on
          the Business Hub platform. It ensures transparency and gives you
          control over your data while using our services.
        </p>
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-green-600 tracking-wide">
              {section.title}
            </h2>
            {section.content && (
              <p className="text-gray-700 leading-relaxed text-lg">
                {section.content}
              </p>
            )}
            {section.list && (
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </section>

      <Footer />
    </>
  );
}
