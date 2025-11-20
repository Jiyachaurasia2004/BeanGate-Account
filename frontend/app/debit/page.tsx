"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreditPage() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    amount: "",
    from: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/form/debit", formData);
     toast.success(res.data.message || "Credit submitted successfully!");
     const data = await res.data;
     console.log(data);
      setFormData({
        name: "",
        email: "",
        contact: "",
        amount: "",
        from: ""
      });
    } catch (error: any) {
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
        alert("Error submitting credit data");
      }
    }
  };

  return (
     <div className="min-h-screen flex flex-col justify-center container mx-auto px-4">
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
   
      <h1 className="text-4xl md:text-5xl font-bold text-zinc-700 text-center mb-8">
        Beangate <span className="text-orange-600">Account</span>
      </h1>
      <div className="flex justify-center items-center">
        <form
          className=" p-5 w-full max-w-md bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl text-center font-bold mb-4">Debit Form</h1>
          <div>
             <input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full mb-5 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded" required />
          <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-5 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded" required />
          <input type="tel" id="contact" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} className="w-full mb-5 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded" required />
          <input type="number" id="amount" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} className="w-full mb-5 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded" required />
          <input type="text" id="from" name="from" placeholder="From" value={formData.from} onChange={handleChange} className="w-full mb-5 border border-orange-400 focus:outline-orange-500 px-2 py-2 rounded" required />
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
          </div>
           
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-lg shadow-lg shadow-orange-600/50 hover:shadow-xl hover:shadow-orange-600/70 transition-all gap-2  border-2 border-orange-500/20 cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Submit Debit"}
          </button>
        </form>
      </div>
    </div>
  );
}
