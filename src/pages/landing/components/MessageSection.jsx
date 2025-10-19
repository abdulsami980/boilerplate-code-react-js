/* eslint-disable no-unused-vars */
import IMAGES from "@/assets/images";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

export default function MessageSection() {
  return (
    <section
      id="message"
      data-theme="light"
      className="relative py-28 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white via-green-50 to-emerald-100 overflow-hidden"
    >
      {/* Decorative Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-emerald-400/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-green-300/15 blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-20">
        {/* LEFT IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex justify-center items-center"
        >
          {/* Tilt 3D Image */}
          <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            transitionSpeed={1000}
            perspective={900}
            scale={1.05}
            glareEnable={true}
            glareMaxOpacity={0.1}
            className="relative w-full max-w-md cursor-pointer"
          >
            <motion.img
              src={IMAGES.MEER_SHINY_DRESS}
              alt="Shakeel Ahmad Meer"
              className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 ease-out"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))",
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            />
          </Tilt>

          {/* Floating Glow */}
          <div className="absolute -z-10 top-10 -left-10 w-72 h-72 bg-emerald-400/30 blur-3xl rounded-full opacity-40" />
        </motion.div>

        {/* RIGHT TEXT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Featured Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute -top-10 left-0 bg-gradient-to-r from-emerald-600 to-green-400 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-1.5"
          >
            <Sparkles size={16} />
            Featured Message
          </motion.div>

          <h2 className="text-4xl mb-4 md:text-5xl font-extrabold text-gray-900 leading-tight">
            A Message from{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Shakeel Ahmad Meer
            </span>
          </h2>

          {/* Quote Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative bg-white/80 backdrop-blur-xl border border-emerald-100 shadow-lg rounded-2xl p-8 mb-8"
          >
            <Quote className="w-10 h-10 text-emerald-600 mb-4" />
            <p className="text-gray-700 leading-relaxed text-lg">
              “Vision 2030 Pakistan was born from a belief that technology can
              bridge the gap between ambition and opportunity. Every
              entrepreneur deserves a chance to turn their vision into reality.”
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mt-5">
              “Together, we're not just building a platform — we're shaping
              Pakistan’s economic future. It’s a movement for innovation,
              empowerment, and sustainable progress.”
            </p>
          </motion.div>

          <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full my-6" />

          {/* Signature */}
          <div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h4 className="font-semibold text-gray-900 text-lg tracking-wide">
              Meer Shakeel
            </h4>
            <p className="text-gray-500 text-sm">
              Chairman, <span className="font-medium">Meer Group</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
