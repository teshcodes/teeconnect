 import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  navigate("/message-sent"); 
};


  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white px-4"
      style={{
        backgroundImage: "url('/bg-image2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#1F2937",
      }}
    >
      {/* Background Logo */}
      <img
        src="/main-logo2.png"
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Forgot Password Form */}
      <div className="relative z-10 text-center w-full max-w-3xl">
        <h1 className="text-lg font-light text-left mb-3">
          Forget <span className="font-bold">Your Password</span>
        </h1>

        <p className="text-sm text-left mb-6 lg:mb-7 lg:mr-[16pc] mr-[2pc]">
          We will send a verification link to your email. Kindly check your inbox
          or spam. Can't remember your mail? Contact <span className="underline hover:text-gray-400 cursor-pointer"> Customer support</span>.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row items-center lg:items-stretch gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-3 py-2 rounded border border-gray-400 bg-white text-black w-full lg:w-[595px]"
            required
          />
          <button
            type="submit"
            className="bg-white text-[#003E9c] px-4 py-2 rounded hover:bg-gray-200 transition w-full lg:w-auto"
          >
            Send Code
          </button>
        </form>

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
