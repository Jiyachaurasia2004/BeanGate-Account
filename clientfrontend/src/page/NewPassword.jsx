import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NewPassword() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // OTP from localStorage
  const [email, setEmail] = useState(""); // Email from localStorage
  const navigate = useNavigate();
  const { serverUrl } = useContext(AuthContext);

  // Load OTP and email from localStorage when component mounts
useEffect(() => {
  const savedOtp = localStorage.getItem("otp") || "";
  const savedEmail = localStorage.getItem("email") || "";
  setOtp(savedOtp);
  setEmail(savedEmail);
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!otp || !email) {
      alert("OTP or email is missing. Please go back and verify OTP again.");
      return;
    }

    try {
      const response = await axios.post(`${serverUrl}/api/auth/reset-password`, {
        email,        // include email
        otp,          // include OTP
        newPassword,
        confirmPassword,
      });

      alert("Password changed successfully!");
      // Clean up localStorage
      localStorage.removeItem("otp");
      localStorage.removeItem("email");

      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="relative z-10 w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="••••••"
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-2 rounded-lg hover:bg-orange-400 transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPassword;
