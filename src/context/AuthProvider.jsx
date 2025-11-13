/* eslint-disable no-unused-vars */
// src/context/AuthProvider.jsx
import { PageLoader } from "@/components/ui/Loaders";
import { MAX_FAILED_ATTEMPTS, SUSPEND_DURATION_MINUTES } from "@/config";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Signup function (with email verification)
  const signup = async (email, password, fullName, role) => {
    try {
      // 🔹 Step 1: Check if the email already exists in profiles
      const { data: existingUser, error: fetchError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (fetchError) {
        console.error("Error checking existing user:", fetchError);
        throw new Error("Unable to verify email. Please try again.");
      }

      if (existingUser) {
        toast.error("Email already registered. Please log in instead.");
        return false;
      }

      // 🔹 Step 2: Proceed with signup
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role },
          emailRedirectTo:
            "https://incomparable-cobbler-5d9687.netlify.app/verify-user-email",
        },
      });

      if (error) {
        // Handle "user already registered" gracefully
        if (error.message?.toLowerCase().includes("already registered")) {
          toast.error("Email already registered. Please log in instead.");
          return false;
        }
        throw error;
      }

      // 🔹 Step 3: Store role in localStorage
      localStorage.setItem("user_role", role);

      // 🔹 Step 4: Success feedback
      toast.success("Check your email for a verification link!");
      return true;
    } catch (err) {
      console.error("Signup error:", err.message);
      toast.error(err.message || "Signup failed. Please try again.");
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      // 1️⃣ Lookup profile
      const { data: profile } = await supabase
        .from("profiles")
        .select(
          "role, auth_provider, is_active, failed_login_attempts, last_failed_login, login_suspended_until"
        )
        .eq("email", email)
        .maybeSingle();

      let providerName = profile?.auth_provider || null;
      let profileRole = profile?.role;
      let isActive = profile?.is_active ?? true;
      let failedLoginAttempts = profile?.failed_login_attempts ?? 0;
      console.log(providerName, profileRole, isActive, failedLoginAttempts);

      let loginSuspendedUntil = profile?.login_suspended_until
        ? new Date(profile.login_suspended_until)
        : null;

      let loginSuspendedUntilLocal = loginSuspendedUntil
        ? new Date(loginSuspendedUntil + 5 * 60 * 60 * 1000)
        : null;

      console.log("Login suspended until:", loginSuspendedUntil);

      const now = new Date();
      console.log("Current time:", now);

      // 2️⃣ Highest priority → account permanently suspended
      if (!isActive) {
        toast.error("Your account has been suspended. Kindly contact support.");
        return { success: false, user: null };
      }

      // 3️⃣ Second priority → temporary block due to failed login attempts
      if ((loginSuspendedUntilLocal, loginSuspendedUntilLocal > now)) {
        toast.error(
          `You are temporarily blocked due to more than 5 failed login attempts. Please try again after ${loginSuspendedUntilLocal.toLocaleString()}.`
        );
        return { success: false, user: null };
      }

      // 4️⃣ Attempt email/password login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // 5️⃣ Handle failed login
      if (error) {
        failedLoginAttempts += 1;
        let suspendedUntil = null;

        if (failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
          suspendedUntil = new Date();
          suspendedUntil.setMinutes(
            suspendedUntil.getMinutes() + SUSPEND_DURATION_MINUTES
          );
        }

        await supabase
          .from("profiles")
          .update({
            failed_login_attempts: failedLoginAttempts,
            last_failed_login: new Date(),
            login_suspended_until: suspendedUntil,
          })
          .eq("email", email);

        // 5a️⃣ Third priority → auth provider mismatch
        if (providerName && providerName.toLowerCase() !== "email") {
          const prettyProvider =
            providerName.charAt(0).toUpperCase() + providerName.slice(1);
          toast.error(
            `This account was created with ${prettyProvider}. Please sign in using ${prettyProvider}.`
          );
          if (profileRole) {
            localStorage.setItem("user_role", profileRole.toLowerCase());
          }
          return { success: false, user: null };
        }

        // 5b️⃣ Fourth priority → generic invalid email/password
        toast.error("Invalid email or password.");
        return { success: false, user: null };
      }

      // 6️⃣ Successful login → reset failed attempts
      await supabase
        .from("profiles")
        .update({
          failed_login_attempts: 0,
          last_failed_login: null,
          login_suspended_until: null,
        })
        .eq("email", email);

      const userRole =
        data.user?.user_metadata?.role?.toLowerCase() ||
        localStorage.getItem("user_role") ||
        "investor";

      localStorage.setItem("user_role", userRole);

      toast.success("Welcome back!");
      return { success: true, user: data.user };
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      return { success: false, user: null };
    }
  };

  // ✅ Reset password after user opens the Supabase email link
  const resetPassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error("Password reset error:", error.message);
        toast.error(error.message || "Failed to reset password");
        return false;
      }

      toast.success("Password reset successful!");
      return true;
    } catch (err) {
      console.error("Unexpected reset password error:", err);
      toast.error("Something went wrong. Please try again.");
      return false;
    }
  };

  // ✅ Login with Google account function
  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/authentication-callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Google login error:", err.message);
      toast.error("Google sign-in failed. Please try again.");
      return { success: false };
    }
  };

  // ✅ Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);

    const cookiesAccepted = localStorage.getItem("cookies_accepted");

    localStorage.clear();

    if (cookiesAccepted !== null) {
      localStorage.setItem("cookies_accepted", cookiesAccepted);
    }
  };

  // ✅ Password reset (Forget Password)
  const sendResetLink = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success("Password reset link sent! Check your email.");
      return true;
    } catch (err) {
      console.error("Password reset error:", err.message);
      toast.error(err.message || "Failed to send reset link.");
      return false;
    }
  };

  // ✅ Restore session on app load or refresh
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session restore error:", error.message);
      }
      setUser(data?.session?.user ?? null);
      setIsLoading(false);
    };

    getSession();

    // ✅ Realtime listener for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        sendResetLink,
        resetPassword,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
