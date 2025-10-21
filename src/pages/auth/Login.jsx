import { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import Iridescence from "@/components/reactbits/Iridescence";
import { FaFacebook, FaTwitter } from "react-icons/fa";

// 🧠 Left section memoized for performance
export const LeftSection = memo(() => (
  <div className="relative w-1/2 hidden md:flex flex-col justify-end p-14 text-white overflow-hidden">
    <div className="absolute inset-0 -z-10">
      <Iridescence
        color={[0.0, 0.55, 0.2]}
        mouseReact={false}
        amplitude={0.06}
        speed={1.1}
        className="w-full h-full opacity-90"
      />
    </div>

    <div className="absolute top-20 left-20 w-48 h-48 bg-green-700/40 rounded-full blur-3xl animate-pulse" />

    <div className="z-10 space-y-3">
      <h1 className="text-5xl font-extrabold tracking-tight">
        Connecting People
      </h1>
      <h2 className="text-4xl font-bold text-green-200">Empowering Pakistan</h2>
      <p className="text-base text-gray-100/90 max-w-md leading-relaxed">
        Connecting ideas, innovation, and investment to uplift the economy and
        society. Join the movement to build Pakistan's future.
      </p>
    </div>
  </div>
));

LeftSection.displayName = "LeftSection";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitClicked, setSubmitClicked] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);

    if (!email || !password) return;

    setIsLoggingIn(true);
    const { success, user } = await login(email, password);
    setIsLoggingIn(false);

    if (success && user) {
      const role = user.user_metadata?.role?.toLowerCase() || "guest";

      switch (role) {
        case "admin":
          navigate(PATH.ADMIN.DASHBOARD);
          break;
        case "investor":
          navigate(PATH.INVESTOR.PROFLIE);
          break;
        case "founder":
          navigate(PATH.FOUNDER.PROFLIE);
          break;
        default:
          navigate(PATH.LANDING);
          break;
      }
    }
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      {/* Left Section */}
      <LeftSection />

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-white via-gray-50 to-green-50 p-10">
        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">Welcome Back</h2>
          <p className="text-gray-600 text-sm">
            Sign in to access your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              isSubmitting={submitClicked}
            />
          </div>

          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              isSubmitting={submitClicked}
            />
          </div>

          {/* Forget Password Link */}
          <div className="text-right">
            <button
              onClick={() => navigate(PATH.FORGOT_PASSWORD)}
              type="button"
              className="text-green-600 font-medium text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            type="submit"
            isLoading={isLoggingIn}
            loadingText="Signing In..."
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full max-w-sm my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-gray-500 text-sm font-medium">
            or continue with
          </span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Social Logins */}
        <div className="flex justify-center gap-3 w-full max-w-sm">
          <Button className="bg-[#1877F2] hover:bg-[#166FE0] text-white flex items-center gap-2 px-5">
            <FaFacebook className="w-4 h-4" /> Facebook
          </Button>
          <Button className="bg-[#1DA1F2] hover:bg-[#1991DA] text-white flex items-center gap-2 px-5">
            <FaTwitter className="w-4 h-4" /> Twitter
          </Button>
          <Button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center gap-2 px-5">
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-4 h-4"
            />{" "}
            Google
          </Button>
        </div>

        {/* Sign up link */}
        <p className="mt-8 text-sm text-gray-700">
          Don't have an account?{" "}
          <button
            onClick={() => navigate(PATH.SIGNUP)}
            className="text-green-600 font-medium hover:underline cursor-pointer"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
