// src/pages/MessageSent.tsx
import { useNavigate } from "react-router-dom";

export default function MessageSent() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen w-screen flex flex-col justify-center items-center relative text-white px-4"
      style={{
        backgroundImage: "url('/bg-image3.png')", // 👈 use your new background
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#0F172A",
      }}
    >
      {/* Background Logo */}
      <img
        src="/main-logo3.png"
        alt="Background Logo"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Confirmation Content */}
      <div className="relative z-10 w-full max-w-3xl">
        <h1 className="text-lg font-light text-left mb-3 flex gap-4">
          Message sent
          <img src ="/marked-icon.gif" className="w-5 h-5 mt-1" />
        </h1>

        <p className="text-sm text-left mb-6 lg:mb-7 lg:mr-[15pc] mr-[1pc]">
          A link has been sent to your mail to continue your process of resetting
          your password. Kindly check your inbox or spam.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="bg-white text-[#003E9c] px-6 py-2 rounded hover:bg-gray-200 transition cursor-pointer font-serif"
        >
          Back to Login
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-xs text-gray-300 text-center w-full">
        Copyright © 2025 @ TeshCodes Ltd
      </footer>
    </div>
  );
}
