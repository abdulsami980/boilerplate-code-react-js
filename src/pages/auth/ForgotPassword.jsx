import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { LeftSection } from "./Login";
import { PATH } from "@/config";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { sendResetLink } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setError("");

    try {
      const success = await sendResetLink(email);

      if (success) {
        // ✅ Show toast already handled in AuthProvider
        setTimeout(() => {
          navigate(PATH.LOGIN);
        }, 2500); // redirect after 2.5 seconds
      } else {
        setError("Failed to send reset link. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <LeftSection />

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white/70 backdrop-blur-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">Forgot Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={formSubmitting}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-full px-7 py-3 text-sm md:text-base font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.05] hover:from-green-700 hover:to-emerald-600"
            isLoading={formSubmitting}
            disabled={formSubmitting}
            loadingText="Sending..."
          >
            Send Password Reset Link
          </Button>
        </form>

        <p className="mt-8 text-sm text-gray-700">
          Remembered your password?{" "}
          <button
            onClick={() => navigate(PATH.LOGIN)}
            className="text-green-600 font-medium hover:underline cursor-pointer"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
