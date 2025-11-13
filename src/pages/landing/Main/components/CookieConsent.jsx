/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { COOKIE_POLICY_CONTENT } from "@/config";
import LegalModal from "@/components/ui/LegalModal";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookies_accepted") === "true";
    if (!hasAccepted) setShowBanner(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookies_accepted", "true");
    setShowBanner(false);
  };

  const handleDecline = () => {
    setShowBanner(false);
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="
            fixed bottom-6 left-1/2 transform -translate-x-1/2
            w-[90%] md:w-[70%] lg:w-[50%]
            backdrop-blur-xl bg-white/60 dark:bg-gray-900/60
            border border-green-400/30 dark:border-green-300/30
            shadow-[0_0_35px_rgba(34,197,94,0.3)]
            rounded-3xl p-6 z-50
          "
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-green-600 dark:text-green-400 flex items-center gap-2">
                  🍪 We use cookies!
                </h3>
                <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  We use cookies to improve your experience, analyze traffic,
                  and serve personalized content. By clicking{" "}
                  <span className="font-medium text-green-600 dark:text-green-400">
                    "Accept"
                  </span>
                  , you agree to our use of cookies.
                  <a
                    onClick={() => setShowCookiesModal(true)}
                    className="hover:underline ml-1 text-green-500 ark:text-green-400 transition-colors"
                  >
                    Learn more
                  </a>
                </p>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <Button
                  onClick={handleDecline}
                  variant="outline"
                  className="border-green-500/50 text-green-600 hover:bg-red-500 hover:text-white rounded-full px-7 py-3 text-sm md:text-base flex items-center gap-2 font-medium transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:scale-105"
                >
                  <span className="relative z-10">Decline</span>
                </Button>

                <Button
                  onClick={handleAccept}
                  className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-full px-7 py-3 text-sm md:text-base font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.05] hover:from-green-700 hover:to-emerald-600"
                >
                  Accept
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <LegalModal
        open={showCookiesModal}
        onClose={() => setShowCookiesModal(false)}
        title="Cookies Policy"
        content={COOKIE_POLICY_CONTENT}
      />
    </>
  );
}
