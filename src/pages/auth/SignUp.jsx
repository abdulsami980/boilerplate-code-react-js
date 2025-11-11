// src/pages/auth/SignUp.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { Briefcase, User } from "lucide-react";
import { useState } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LeftSection } from "./Login";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [activeRole, setActiveRole] = useState("Investor");
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    if (!email || !password || !fullName) return;

    setLoading(true);
    const success = await signup(email, password, fullName, activeRole);
    setLoading(false);

    if (success) {
      navigate(PATH.LOGIN);
    }
  };

  const roles = [
    { name: "Investor", icon: <Briefcase className="w-4 h-4 mr-1.5" /> },
    { name: "Founder", icon: <User className="w-4 h-4 mr-1.5" /> },
  ];

  return (
    <div className="flex min-h-screen">
      <LeftSection />

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 bg-white/70 backdrop-blur-lg">
        {/* Role Tabs */}
        <div className="flex justify-center gap-3 mb-6">
          {roles.map((role) => (
            <button
              key={role.name}
              type="button"
              onClick={() => setActiveRole(role.name)}
              className={`flex items-center px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeRole === role.name
                  ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md scale-105"
                  : "bg-white border border-green-300 text-green-700 hover:bg-green-100"
              }`}
            >
              {role.icon}
              {role.name}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-green-700">Create Account</h2>
          <p className="text-gray-600 text-sm">
            Sign up as a {activeRole.toLowerCase()}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
          <div className="space-y-2">
            <Input
              id="fullName"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              isSubmitting={submitClicked}
            />
          </div>

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

          <Button
            type="submit"
            disabled={loading}
            isLoading={loading}
            loadingText="Creating Account..."
            className="w-full bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-full px-7 py-2 text-sm md:text-base font-medium flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:scale-[1.05] hover:from-green-700 hover:to-emerald-600"
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center w-full max-w-sm my-4">
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

        {/* Sign in link */}
        <p className="mt-4 text-sm text-gray-700">
          Already have an account?{" "}
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
