import { LeftSection } from "./Login";

export default function VerifyUserEmail() {
  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <LeftSection />

      {/* Right Section */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-gray-700 text-lg font-medium mt-4">
          Your email has been verified successfully!
        </span>
        <span className="text-gray-500 text-sm mt-2">
          You can now close this tab and log in to your account.
        </span>
      </div>
    </div>
  );
}
