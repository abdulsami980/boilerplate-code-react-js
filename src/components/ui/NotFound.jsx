/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { PATH } from "@/config";
import { RefreshCcw } from "lucide-react";
import Iridescence from "@/components/reactbits/Iridescence";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 text-center">
      {/* Background animation */}
      <div className="absolute inset-0 -z-10 opacity-70">
        <Iridescence
          color={[0.0, 0.55, 0.2]}
          mouseReact={false}
          amplitude={0.05}
          speed={1}
          className="w-full h-full"
        />
      </div>

      {/* Floating shapes */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-32 left-1/4 w-72 h-72 bg-green-600/20 rounded-full blur-3xl animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-32 right-1/4 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse"
      />

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-xl border border-green-200/60 rounded-3xl shadow-xl p-10 max-w-md mx-auto"
      >
        <h1 className="text-[100px] md:text-[120px] font-extrabold text-green-500 leading-none">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-green-800 mt-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          Oops! The page you’re looking for doesn’t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={() => navigate(PATH.LANDING || "/")}
            className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-semibold px-6 py-2 rounded-full shadow-md"
          >
            Go Home
          </Button>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-green-400 text-green-700 hover:bg-green-100 font-semibold px-6 py-2 rounded-full"
          >
            <RefreshCcw className="w-4 h-4 mr-2" /> Reload Page
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
