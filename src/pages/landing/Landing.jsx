import { PATH } from "@/config";
import { useNavigate } from "react-router-dom";

// src/pages/landing/Landing.jsx
export default function Landing() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center justify-center h-screen text-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
      <p className="text-lg text-gray-600 mb-6">
        Your AI-powered solution starts here.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => {
            navigate(PATH.LOGIN);
          }}
          className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate(PATH.SIGNUP);
          }}
          className="px-6 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
}
