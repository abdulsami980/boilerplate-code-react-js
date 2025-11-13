/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Iridescence from "@/components/reactbits/Iridescence";
import Header from "../Main/components/Header";
import Footer from "../Main/components/Footer";

const sections = [
  {
    title: "1. User Rights",
    content:
      "All users have the right to request deletion of their personal data, including profile details, uploaded documents, and communication history.",
  },
  {
    title: "2. Request Process",
    content: "To delete your account and associated data, users can:",
    list: [
      "Submit a Data Deletion Request through the Help Center → Inquiry Type: Account Deletion, or",
      "Email support@businesshub.pk with subject line “Data Deletion Request.”",
    ],
  },
  {
    title: "3. Verification",
    content:
      "To protect user accounts, all deletion requests will be verified through:",
    list: [
      "Registered email confirmation, or",
      "CNIC/Passport verification (for investors and business owners).",
    ],
  },
  {
    title: "4. Deletion Timeline",
    content:
      "Once verified, the data deletion process will be completed within 15 working days, after which all personal information will be permanently removed from active databases.",
  },
  {
    title: "5. Retention for Legal Compliance",
    content:
      "Certain data (such as transaction records, KYC, or AML documents) may be retained for up to 5 years as required by Pakistani and international financial regulations before being securely erased.",
  },
  {
    title: "6. Third-Party Integrations",
    content:
      "If your account was created using Google, LinkedIn, or other social APIs, Business Hub will trigger data removal requests to those services as well.",
  },
  {
    title: "7. Irreversibility",
    content:
      "Once your account is deleted, it cannot be restored, and all related access, rewards, or connections will be permanently lost.",
  },
];

export default function DataDeletionPolicy() {
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
            Data Deletion Policy
          </h1>
        </motion.div>
      </section>

      {/* Text Sections */}
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        <p className="mt-6 text-lg md:text-xl text-gray-700">
          At Business Hub Pakistan, we value your privacy and ensure full
          transparency about how your data is managed, stored, and deleted.
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
            <p className="text-gray-700 leading-relaxed text-lg">
              {section.content}
            </p>
            {section.list && (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
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
