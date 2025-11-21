"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
export default function NewPassword() {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
 const [email,setEmail] = useState("")
  const router = useRouter();
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
         if(newPassword !== confirmPassword) {
            alert("Passwords do not match!");
        } 
    try {
        const response = await axios.post(`${process.env.API_URL}/api/auth/reset-password`, {
             email,
             newPassword,
            confirmPassword
        
        });

        const data = await response.data;
        console.log(data);
        alert("successfully changed password");
        setEmail("")
        setPassword("")
        setconfirmPassword("")
         router.push("/login");
    } catch (error:any) {
         if (
      error.response &&
      error.response.data &&
      error.response.data.extraDetails
    ) {
      alert(error.response.data.extraDetails); 
    }else if (
      error.response &&
      error.response.status === 400 &&
      error.response.data &&
      error.response.data.message
    ) {
      alert(error.response.data.message); 
    }  else {
      alert("Registration failed. Please try again.");
    }
        
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10 w-100 h-100">
        <h2 className="text-2xl font-semibold text-center mb-6">New Password</h2>
        <form onSubmit={handleSubmit}>
         <label className="block text-sm font-medium text-gray-600 mb-1">Enter Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="block text-sm font-medium text-gray-600 mb-1">Enter New Password</label>
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
            onChange={(e) => setconfirmPassword(e.target.value)}
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
