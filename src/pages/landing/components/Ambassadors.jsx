/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import IMAGES from "@/assets/images";

const ambassadors = [
  {
    name: "Wasim Akram",
    role: "Brand Ambassador - Vision 2030",
    image: IMAGES.WASIM_AKRAM_BG, // replace with actual image
  },
  {
    name: "Shahid Afridi",
    role: "Brand Ambassador - Vision 2030",
    image: IMAGES.SHAHID_AFRIDI_BG,
  },
  {
    name: "Shakeel Ahmad Meer",
    role: "Director & Founder - Vision 2030",
    image: IMAGES.SHAKEEL_BG,
  },
  {
    name: "Irfan Malik",
    role: "Tech Lead - Vision 2030",
    image: IMAGES.IRFAN_MALIK_BG,
  },
];

export default function Ambassadors() {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-100 via-white to-green-50 opacity-50 pointer-events-none"></div>

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-500 mb-4">
        Our Ambassadors
      </h2>
      <motion.p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
      >
        Meet the inspiring faces representing our mission, driving change and
        innovation across communities.
      </motion.p>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-20">
        {ambassadors.map((amb, i) => (
          <motion.div
            key={i}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-green-200 hover:border-green-500 hover:shadow-2xl transition-all duration-300"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="overflow-hidden relative">
              <motion.img
                src={amb.image}
                alt={amb.name}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-700/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-green-500 mb-1">
                {amb.name}
              </h3>
              <p className="text-gray-500 text-sm">{amb.role}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating glow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-green-400/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
    </section>
  );
}
