/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Iridescence from "@/components/reactbits/Iridescence";
import Header from "../Main/components/Header";
import Footer from "../Main/components/Footer";

const sections = [
  {
    title: "1. Purpose",
    content:
      "The Business Hub connects verified investors with credible businesses seeking partnerships, funding, or growth opportunities. It provides a trusted environment for all interactions.",
  },
  {
    title: "2. Scope",
    content:
      "These Terms apply to all users, including investors, businesses, and affiliates. By using the platform, you agree to follow these rules and responsibilities.",
  },
  {
    title: "3. User Responsibilities",
    list: [
      "Provide accurate, complete, and up-to-date information.",
      "Complete required KYC/AML verification for account access.",
      "Maintain confidentiality of shared business or investment information.",
      "Upload content that is lawful, ethical, and professional.",
    ],
  },
  {
    title: "4. Code of Conduct",
    content:
      "All users should communicate respectfully and professionally. Misrepresentation, misuse of data, or illegal activity is strictly prohibited.",
  },
  {
    title: "5. Platform Compliance",
    content:
      "The platform adheres to corporate governance and AML standards, ensuring all operations meet regulatory requirements and maintain a secure environment.",
  },
  {
    title: "6. Liability & Updates",
    list: [
      "The platform only facilitates connections; users are responsible for due diligence and financial decisions.",
      "The platform is not liable for any loss or disputes arising from user activity.",
      "These Terms may be updated at any time without prior notice. Continued use constitutes acceptance.",
    ],
  },
];

export default function TermsService() {
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
            Terms & Services
          </h1>
        </motion.div>
      </section>

      {/* Policy Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          Welcome to the Business Hub. These Terms of Service outline your
          responsibilities and the rules for using our platform, ensuring a safe
          and professional environment for investors and businesses. By using
          the platform, you agree to comply with these terms and engage
          ethically.
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
