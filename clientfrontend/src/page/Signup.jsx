import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

function Signup() {
  const { storeTokenInLs, serverUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    department: "",
    post: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!agreedToTerms) {
      alert("Please accept the terms and privacy policy");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          department: formData.department,
          post: formData.post,
          gender: formData.gender,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      storeTokenInLs(response.data.token);
      alert(response.data.message);

      setFormData({
        username: "",
        email: "",
        phone: "",
        department: "",
        post: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
      setAgreedToTerms(false);
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.extraDetails
      ) {
        toast.error(error.response.data.extraDetails);
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg border border-orange-300">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          />

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="+91 00000 00000"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          />
          {/* Gender */}
          <div className="w-full p-3 border-2 border-orange-300 rounded-md">
            <p className="text-sm mb-2 text-gray-600">Gender</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  required
                  className="accent-orange-600"
                />
                Male
              </label>

              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="accent-orange-600"
                />
                Female
              </label>

              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                  className="accent-orange-600"
                />
                Other
              </label>
            </div>
          </div>
          <select
            name="post"
            value={formData.post}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          >
            <option value="">Select Post</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Executive">Executive</option>
            <option value="CEO">CEO</option>
            <option value="Director">Director</option>
          </select>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Accounts">Accounts</option>
             <option value="Admin">Admin</option>
          </select>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-orange-300 rounded-md focus:outline-none focus:border-orange-500"
          />

          {/* Terms Checkbox */}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 rounded border-orange-600 accent-orange-600"
            />
            I agree to the{" "}
            <a
              href="#"
              className="text-orange-600 underline hover:text-orange-500"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-orange-600 underline hover:text-orange-500"
            >
              Privacy Policy
            </a>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold rounded-md shadow-md transition-all disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-600 underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
