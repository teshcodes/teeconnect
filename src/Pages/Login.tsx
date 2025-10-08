 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "onlyteshcodes@gmail.com" && password === "password@1.") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white"
      style={{
        backgroundImage: "url('/bg-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Logo (watermark) */}
      <img
        src="/main-logo.png"
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Login Form */}
      <div className="relative z-10 text-center">
        <h1 className="text-lg font-light">
          Connect <span className="font-bold">&gt; NOVANT HEALTH</span>
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row items-center mt-6 space-y-3 lg:space-y-0 lg:space-x-2"
        >
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-3 py-2 rounded border border-gray-400 text-black w-60"
            required
          />

          {/* Password with toggle */}
          <div className="relative w-60">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-3 py-2 rounded border border-gray-400 text-black w-full"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-400 transition w-full lg:w-auto cursor-pointer"
          >
            Login
          </button>
        </form>

        <p
          onClick={() => navigate("/forget-password")}
          className="mt-3 text-sm text-start hover:underline hover:text-gray-400 cursor-pointer"
        >
          Forgot Password?
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-300">
        Copyright © 2025 @ TeshCodes Ltd
      </footer>
    </div>
  );
}
