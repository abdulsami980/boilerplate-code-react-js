import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PATH } from "@/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeftSection } from "./Login";
import { useAuth } from "@/hooks/useAuth";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setFormSubmitting(false);
      return;
    }

    const success = await resetPassword(password);

    setFormSubmitting(false);

    if (success) {
      // ✅ Redirect after success toast
      setTimeout(() => navigate(PATH.LOGIN), 1500);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <LeftSection />

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white/70 backdrop-blur-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">Reset Password</h2>
          <p className="text-gray-600 text-sm">
            Enter your new password below to reset your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            isLoading={formSubmitting}
            loadingText="Resetting..."
            className="w-full"
          >
            Reset Password
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-700">
          Back to{" "}
          <button
            onClick={() => navigate(PATH.LOGIN)}
            className="text-green-600 font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
