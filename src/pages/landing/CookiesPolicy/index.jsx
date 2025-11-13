/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Iridescence from "@/components/reactbits/Iridescence";
import Header from "../Main/components/Header";
import Footer from "../Main/components/Footer";

const sections = [
  {
    title: "1. What are Cookies?",
    content:
      "Cookies are small text files stored on your device by your web browser that help the platform remember your preferences, login information, and interactions.",
  },
  {
    title: "2. Types of Cookies We Use",
    list: [
      "Essential Cookies: Required for core platform functionality, login, and security.",
      "Performance Cookies: Help us analyze platform usage and improve user experience.",
      "Functional Cookies: Remember your preferences and settings for convenience.",
      "Advertising Cookies: Used for marketing purposes and to deliver relevant promotional content.",
    ],
  },
  {
    title: "3. Managing Cookies",
    content:
      "You can manage or disable cookies via your browser settings. Please note that disabling essential cookies may affect the proper functioning of the platform.",
  },
  {
    title: "4. Third-Party Cookies",
    content:
      "We may use third-party services such as analytics or marketing providers that set cookies to measure platform performance and deliver relevant content. These are subject to the respective third-party policies.",
  },
  {
    title: "5. Updates to This Policy",
    content:
      "We may update this Cookie Policy periodically. Changes will be reflected on this page with the last updated date. Continued use of the platform indicates acceptance of the updated policy.",
  },
];

export default function CookiesPolicy() {
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
            Cookie Policy
          </h1>
        </motion.div>
      </section>

      {/* Policy Content */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          Our platform uses cookies and similar technologies to enhance your
          browsing experience and provide personalized services. By using the
          Business Hub, you consent to our use of cookies in accordance with
          this policy.
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
