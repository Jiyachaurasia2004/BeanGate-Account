"use client";
require("dotenv").config();
import axios from "axios";
import Link from "next/link";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Verification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // only allow digits or empty

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = localStorage.getItem("email") || "";

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,
        {
          otp: code.join(""),
          email: email,
        }
      );

      alert("OTP Verified Successfully! You can now reset your password.");
      console.log(response.data);
      setCode(["", "", "", "", "", ""]);
      router.push("/NewPassword");
    } catch (error: any) {
      console.log(error);
      if (error.response) {
        alert(`Error: ${error.response.data.message || "Invalid OTP"}`);
      } else {
        alert("Network error. Try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10 w-100 h-80 text-center relative z-10">
        <h2 className="text-2xl font-semibold mb-2">Verification</h2>
        <p className="text-gray-500 mb-6">Enter Verification Code</p>
        <form onSubmit={handleVerify}>
          <div className="flex justify-between mb-6 max-w-xs mx-auto">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                ref={(el) => {
                  inputsRef.current[i] = el;
                }}
                className="w-12 h-12 text-center text-lg border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                inputMode="numeric"
                pattern="\d*"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-400 transition-all"
          >
            Verify
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4">
          Didn’t receive a code?{" "}
          <Link href="/ForgotPassword" className="text-orange-500 font-medium">
            Resend
          </Link>
        </p>
      </div>
    </div>
  );
}
