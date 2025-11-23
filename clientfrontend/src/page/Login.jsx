import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { storeTokenInLs, serverUrl } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = response.data;
      alert(data.message);
      storeTokenInLs(data.token);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.extraDetails
      ) {
        toast.error(error.response.data.extraDetails);
      } else {
        alert("Login failed. Please try again.");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-xl bg-white p-8 rounded-xl shadow-lg border border-orange-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl mb-4 shadow-xl shadow-orange-600/50 animate-pulse">
            {/* Optional icon placeholder */}
            <span className="text-white text-2xl font-bold">🔑</span>
          </div>
          <h2 className="text-3xl font-bold text-orange-600 mb-2">Client Login</h2>
          <p className="text-gray-400">Access your Beangate IT client portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          />

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-orange-600 accent-orange-600"
              />
              Remember me
            </label>
            <NavLink
              to="/forget-password"
              className="text-orange-500 hover:text-orange-400 underline"
            >
              Forgot password?
            </NavLink>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-md shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In to Portal"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-orange-600/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-400">Don't have an account?</span>
          </div>
        </div>

        {/* Register Link */}
        <Link
          to="/signup"
          className="w-full block text-center py-3 border-2 border-orange-600/50 text-orange-500 rounded-md hover:bg-orange-600/10 hover:border-orange-600 transition-all font-medium"
        >
          Register Here
        </Link>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2 text-gray-500 text-xs">
          <p>© 2024 Beangate IT Solutions. All rights reserved.</p>
          <p>
            By signing in, you agree to our{" "}
            <a href="#" className="text-orange-500 hover:text-orange-400 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-orange-500 hover:text-orange-400 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
