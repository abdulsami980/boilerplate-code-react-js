// src/context/AuthProvider.jsx
import { PageLoader } from "@/components/ui/Loaders";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";
import { useEffect, useState } from "react";

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

      // 🔹 Step 3: Success feedback
      toast.success("Check your email for a verification link!");
      return true;
    } catch (err) {
      console.error("Signup error:", err.message);
      toast.error(err.message || "Signup failed. Please try again.");
      return false;
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

  // ✅ Login function
  const login = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, user: null };
      }

      toast.success("Welcome back!");
      return { success: true, user: data.user }; // ✅ ensure user returned
    } catch (err) {
      toast.error("Something went wrong", err);
      return { success: false, user: null };
    }
  };

  // ✅ Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    localStorage.clear();
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
