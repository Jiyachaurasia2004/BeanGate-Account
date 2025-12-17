import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function ForgetPassword() {
 const [email, setEmail] = useState("");
const { serverUrl } = useContext(AuthContext);
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${serverUrl}/api/auth/forget-password`, { email });
    alert(`Verification code sent to ${email}`);
    
    // Save email to localStorage
    localStorage.setItem("email", email);

    setEmail("");

    // Navigate to verification page
    navigate("/verification");
  } catch (error) {
    console.error(error);
    alert("Error sending verification code");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>

      {/* Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      {/* Main Form */}
      <div className="relative z-10 w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10 p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Enter Email Address
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg h-10 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-lg shadow-lg shadow-orange-600/50 hover:shadow-xl hover:shadow-orange-600/70 transition-all gap-2 mt-6 border-2 border-orange-500/20"
          >
            Send
          </button>
        </form>

        <div className="my-4 text-center text-gray-500">or</div>

        <div className="flex justify-center space-x-4 mb-4">
          <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200">G</button>
          <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200">A</button>
          <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200"></button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
