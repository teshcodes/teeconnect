// src/pages/ResetPassword.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkStrength = (password: string) => {
    if (password.length < 6) return "Weak";
    if (
      password.length >= 6 &&
      /[A-Za-z]/.test(password) &&
      /\d/.test(password)
    )
      return "Medium";
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    )
      return "Strong";
    return "Weak";
  };

  const strength = checkStrength(newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Your password has been reset successfully!");
    navigate("/login");
  };

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white px-4"
      style={{
        backgroundImage: "url('/bg-image.png')", // replace with your bg
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Logo */}
      <img
        src="/main-logo.png"
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Reset Password Form */}
      <div className="relative z-10 text-center w-full max-w-3xl">
        <h1 className="text-lg font-light text-left mb-3">
          Reset <span className="font-bold">Your Password</span>
        </h1>

        <p className="text-sm text-left mb-6 lg:mb-7 lg:mr-[16pc] mr-[1pc]">
          Enter your new password in the field below. Having troubles in
          resetting password?{" "}
          <span className="underline hover:text-gray-400 cursor-pointer">
            Customer support
          </span>
          .
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row items-center lg:items-stretch gap-3"
        >
          {/* New Password */}
          <div className="relative w-full lg:w-[295px]">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="px-3 py-2 rounded border border-gray-400 bg-white text-black w-full"
              required
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showNewPassword ? <FaEye /> : <FaEyeSlash />}
            </span>

            {/* Strength Indicator */}
            {newPassword && (
              <div className="mt-2 text-left text-xs">
                <span
                  className={`font-semibold ${
                    strength === "Weak"
                      ? "text-red-500"
                      : strength === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {strength} Password
                </span>
                <div className="w-full h-1 bg-gray-300 rounded mt-1">
                  <div
                    className={`h-1 rounded ${
                      strength === "Weak"
                        ? "bg-red-500 w-1/3"
                        : strength === "Medium"
                        ? "bg-yellow-500 w-2/3"
                        : "bg-green-500 w-full"
                    }`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative w-full lg:w-[295px]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="px-3 py-2 rounded border border-gray-400 bg-white text-black w-full"
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-white text-[#003E9c] px-4 py-2 rounded hover:bg-gray-200 transition w-full lg:w-auto"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <p
          onClick={() => navigate("/login")}
          className="mt-4 text-sm text-left hover:underline hover:text-gray-400 cursor-pointer"
        >
          Back to Login
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-300 text-center w-full">
        Copyright © 2025 @ TeshCodes Ltd
      </footer>
    </div>
  );
}
