"use client"

import { useContext, useState } from "react"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Card } from "@heroui/card"
import { ArrowLeft, UserPlus, Building2, User, Mail, Phone, Lock, CheckCircle2, Shield, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { AuthContext } from "../database/page"
import axios from "axios"
 import {  toast } from 'react-toastify';

export default function SignupPage() {
  const {storeTokenInLs} = useContext(AuthContext);
    const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted:agreedToTerms
    
  })
  const [isLoading, setIsLoading] = useState(false)


  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


const handleSignup = async (e: any) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
   alert(response.data.message);
    storeTokenInLs(response.data.token);
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      termsAccepted:""
    });
    setIsLoading(true);
  } catch (error: any) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.extraDetails
    ) {
      toast.error(error.response.data.extraDetails); 
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
    <div className="min-h-screen relative overflow-hidden ">
      {/* Animated Background Elements with Orange Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>

      {/* Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-6xl flex gap-8 items-center justify-center">
          
         
         

          {/* Right Side - Form */}
          <div className="flex-1 max-w-xl w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl mb-4 shadow-xl shadow-orange-600/50 animate-pulse">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-zinc-600 mb-2">Create Your Account</h2>
              <p className="text-gray-400">Join Beangate IT Solutions today and transform your business</p>
            </div>

            {/* Form Card */}
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl shadow-orange-600/10 p-8">
              <div className="space-y-5">
                
             
              
                {/* Full Name */}
                <div className="relative">
                  <Input
                   
                    id="fullName"
                    name="username"
                    placeholder="John Doe"
                    value={formData.username}
                    onChange={handleChange}
                    startContent={<User className="w-4 h-4 text-orange-500" />}
                    classNames={{
                      inputWrapper: " backdrop-blur-sm border-2 border-orange-600/30 hover:border-orange-600/50 group-data-[focus=true]:border-orange-600 group-data-[focus=true]:bg-black/30 h-12 transition-all",
                      label: "text-gray-300 font-medium"
                    }}
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Input
                   
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    startContent={<Mail className="w-4 h-4 text-orange-500" />}
                    classNames={{
                      inputWrapper:  "outline-none focus:outline-none focus:ring-0 hover:outline-none [&>input]:outline-none [&>input]:focus:outline-none backdrop-blur-sm border-2 border-orange-600/30 hover:border-orange-600/50 group-data-[focus=true]:border-orange-600 group-data-[focus=true]:bg-black/30 h-12 transition-all",
                      label: "text-gray-300 font-medium"
                    }}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Input
                  
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={handleChange}
                    startContent={<Phone className="w-4 h-4 text-orange-500" />}
                    classNames={{
                    //   input: "bg-black/20 text-white placeholder:text-gray-500",
                      inputWrapper: " backdrop-blur-sm border-2 border-orange-600/30 hover:border-orange-600/50 group-data-[focus=true]:border-orange-600 group-data-[focus=true]:bg-black/30 h-12 transition-all",
                      label: "text-gray-300 font-medium"
                    }}
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Input
                   
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    startContent={<Lock className="w-4 h-4 text-orange-500" />}
                    classNames={{
                    //   input: "bg-black/20 text-white placeholder:text-gray-500",
                      inputWrapper: " backdrop-blur-sm border-2 border-orange-600/30 hover:border-orange-600/50 group-data-[focus=true]:border-orange-600 group-data-[focus=true]:bg-black/30 h-12 transition-all",
                      label: "text-gray-300 font-medium"
                    }}
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Input
                  
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    startContent={<Lock className="w-4 h-4 text-orange-500" />}
                    classNames={{
                    //   input: "bg-black/20 text-white placeholder:text-gray-500",
                      inputWrapper: " backdrop-blur-sm border-2 border-orange-600/30 hover:border-orange-600/50 group-data-[focus=true]:border-orange-600 group-data-[focus=true]:bg-black/30 h-12 transition-all",
                      label: "text-gray-300 font-medium"
                    }}
                    required
                  />
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer py-2">
                  <input 
                    type="checkbox" 
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-orange-600/50 bg-black/20 checked:bg-orange-600 cursor-pointer accent-orange-600" 
                    required 
                  />
                  <span className="text-sm text-zinc-600">
                    I agree to the{" "}
                    <a href="#" className="text-orange-500 hover:text-orange-400 underline font-medium transition-colors">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-orange-500 hover:text-orange-400 underline font-medium transition-colors">
                      Privacy Policy
                    </a>
                  </span>
                </label>

                {/* Submit Button */}
                <Button
                  type="submit"
                  onClick={handleSignup}
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-lg shadow-lg shadow-orange-600/50 hover:shadow-xl hover:shadow-orange-600/70 transition-all gap-2 mt-6 border-2 border-orange-500/20"
                >
                  <UserPlus className="w-5 h-5" />
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-orange-600/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-transparent text-gray-400">Already have an account?</span>
                </div>
              </div>

              {/* Sign In Link */}
              <Link href="/login">
              <Button
                className="w-full h-12  border-2 border-orange-600/50 text-orange-500 hover:bg-orange-600/10 hover:border-orange-600 backdrop-blur-sm font-medium transition-all"
              >
                Sign In 
              </Button>
              </Link>
            </Card>

            {/* Footer */}
            <div className="text-center mt-6 space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-orange-500" />
                <span>Your data is secure and encrypted with 256-bit SSL</span>
              </div>
              <p className="text-xs text-gray-500">© 2024 Beangate IT Solutions. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}