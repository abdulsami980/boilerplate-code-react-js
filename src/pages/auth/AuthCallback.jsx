/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/config";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { LeftSection } from "./Login";
import { PageLoader } from "@/components/ui/Loaders";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session?.user) {
        toast.error("Authentication failed. Please try again.");
        navigate(PATH.LOGIN);
        return;
      }

      const user = data.session.user;

      // 🔹 Fetch profile including suspension info
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role, is_active, login_suspended_until, auth_provider")
        .eq("email", user.email)
        .maybeSingle();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        toast.error("Failed to fetch user profile.");
        navigate(PATH.LOGIN);
        return;
      }

      // 🔹 Highest priority → permanently suspended
      if (!profile?.is_active) {
        toast.error("Your account has been suspended. Kindly contact support.");
        await supabase.auth.signOut();
        navigate(PATH.LOGIN);
        return;
      }

      // 🔹 Second priority → temporarily blocked
      if (profile?.login_suspended_until) {
        const suspendedUntil = new Date(profile.login_suspended_until);
        const suspendedUntilLocal = new Date(
          suspendedUntil.getTime() + 5 * 60 * 60 * 1000
        ); // UTC → PKT

        const now = new Date();
        if (suspendedUntilLocal > now) {
          toast.error(
            `Too many failed login attempts. Please try again after ${suspendedUntilLocal.toLocaleString()}.`
          );
          await supabase.auth.signOut();
          navigate(PATH.LOGIN);
          return;
        }
      }

      // 🔹 Store role in localStorage
      const role = profile?.role?.toLowerCase() || "guest";
      localStorage.setItem("user_role", role);

      // 🔹 Redirect based on role
      switch (role) {
        case "admin":
          navigate(PATH.ADMIN.DASHBOARD);
          break;
        case "investor":
          navigate(PATH.INVESTOR.PROFILE);
          break;
        case "founder":
          navigate(PATH.FOUNDER.PROFILE);
          break;
        default:
          navigate(PATH.LANDING);
          break;
      }
    };

    handleRedirect();
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      <LeftSection />
      <div className="relative flex flex-1 flex-col items-center justify-center min-h-screen overflow-hidden px-6 bg-gradient-to-br from-green-100/60 via-white to-green-50 opacity-60">
        <motion.div
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          {/* Loader */}

          <PageLoader text="Signing you in..." />

          <p className="text-gray-500 mt-2 max-w-xs">
            Please wait while we log you in and redirect you to your dashboard.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
