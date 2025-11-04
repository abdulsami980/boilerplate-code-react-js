/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { LeftSection } from "./Login";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VerifyUserEmail() {
  const location = useLocation();
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: "",
  });
  const [email, setEmail] = useState("");
  const [resendStatus, setResendStatus] = useState({
    loading: false,
    message: "",
    success: null,
  });

  useEffect(() => {
    const parseParams = () => {
      const searchParams = new URLSearchParams(location.search || "");
      const hash = (location.hash || "").replace(/^#/, "");
      const hashParams = new URLSearchParams(hash);

      // prefer fragment tokens, fallback to query
      const access_token =
        hashParams.get("access_token") || searchParams.get("access_token");
      const refresh_token =
        hashParams.get("refresh_token") || searchParams.get("refresh_token");
      const error = hashParams.get("error") || searchParams.get("error");
      const errorDescription =
        hashParams.get("error_description") ||
        searchParams.get("error_description");

      return {
        access_token,
        refresh_token,
        error,
        errorDescription,
        rawHash: hash,
      };
    };

    const verifyEmail = async () => {
      const { access_token, refresh_token, error, errorDescription, rawHash } =
        parseParams();

      // debug: help inspect what the URL contains while testing
      // remove/disable console logs in production if you prefer


 
      if (error) {
        setStatus({
          loading: false,
          success: false,
          message: decodeURIComponent(errorDescription || error),
        });
        return;
      }

      // If we have tokens in URL fragment, attach them to session
      try {
        if (access_token) {
          // setSession accepts { access_token, refresh_token }
          // this persists the session client-side (works in v1/v2)
          const { data: setData, error: setError } =
            await supabase.auth.setSession({
              access_token,
              refresh_token: refresh_token || undefined,
            });

          if (setError) {
            // couldn't set session — still continue to try reading user

            console.warn("supabase.auth.setSession error:", setError);
          } 
        }

        // Now try to get current user (from session if set)
        const { data: userData, error: getUserError } =
          await supabase.auth.getUser();

        if (getUserError) {
          // If getUser fails, try a last-resort check: if access_token exists,
          // call the legacy getUser(access_token) signature if available.
          // (some SDK versions accept access_token arg)
          try {
            // attempt legacy call (wrapped safely)

            console.warn(
              "supabase.auth.getUser() failed, attempting legacy fallback:",
              getUserError.message
            );
            const fallback = await supabase.auth.getUser(access_token); // may or may not exist in your SDK
            if (fallback?.data?.user?.email_confirmed_at) {
              setStatus({
                loading: false,
                success: true,
                message: "Your email has been verified!",
              });
              return;
            } else {
              setStatus({
                loading: false,
                success: false,
                message:
                  "Email not verified. If this link is old, request a new verification email below.",
              });
              return;
            }
          } catch (fallbackErr) {
            console.error("legacy getUser fallback failed:", fallbackErr);
            setStatus({
              loading: false,
              success: false,
              message:
                "Token invalid or expired, or we couldn't read the session. You can resend a verification email below.",
            });
            return;
          }
        }

        // If we got userData
        const user = userData?.user;
        if (user?.email_confirmed_at) {
          setStatus({
            loading: false,
            success: true,
            message: "Your email has been verified!",
          });
        } else if (user) {
          setStatus({
            loading: false,
            success: false,
            message:
              "Email not verified yet. If this link was old, request a new verification email below.",
          });
        } else {
          // no session & no user
          setStatus({
            loading: false,
            success: false,
            message:
              "Expired or invalid verification link. You can resend the verification email below.",
          });
        }
      } catch (err) {
        // General fallback

        console.error("verifyEmail error:", err);
        setStatus({
          loading: false,
          success: false,
          message:
            err?.message ||
            "Email verification failed or link is invalid. You can request a new verification email below.",
        });
      }
    };

    verifyEmail();
    // include both search & hash so this re-runs if the router updates either
  }, [location.search, location.hash]);

  // Resend verification email (include emailRedirectTo)
  const handleResend = async () => {
    if (!email) {
      setResendStatus({
        loading: false,
        message: "Please enter your email address.",
        success: false,
      });
      return;
    }

    setResendStatus({ loading: true, message: "", success: null });

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify-user-email`,
        },
      });

      if (error) {
        setResendStatus({
          loading: false,
          message: error.message,
          success: false,
        });
      } else {
        setResendStatus({
          loading: false,
          message:
            "A new verification email has been sent to your inbox. Please check your email.",
          success: true,
        });
      }
    } catch (err) {
      setResendStatus({
        loading: false,
        message: err?.message || "Failed to resend verification email.",
        success: false,
      });
    }
  };

  if (status.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-gray-500">
        Verifying your email...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <LeftSection />

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/60 via-white to-green-50 opacity-60" />

        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {status.success ? (
            <CheckCircle2 className="w-20 h-20 text-green-500 drop-shadow-lg" />
          ) : (
            <AlertCircle className="w-20 h-20 text-red-500 drop-shadow-lg" />
          )}

          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`text-2xl font-semibold mt-6 ${
              status.success ? "text-gray-800" : "text-red-600"
            }`}
          >
            {status.message}
          </motion.h1>

          {status.success && (
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-500 mt-2"
            >
              You can now close this tab and log in to your account.
            </motion.p>
          )}

          {/* Expired or Failed case */}
          {!status.success && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-gray-600 flex flex-col items-center space-y-3"
            >
              <p>
                Your verification link is expired or invalid. You can resend it
                below:
              </p>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64"
                />
              </div>
              <Button
                onClick={handleResend}
                disabled={resendStatus.loading}
                className="bg-green-600 hover:bg-green-700 mt-2"
              >
                {resendStatus.loading
                  ? "Sending..."
                  : "Resend Verification Email"}
              </Button>

              {resendStatus.message && (
                <p
                  className={`mt-3 text-sm ${
                    resendStatus.success ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {resendStatus.message}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
