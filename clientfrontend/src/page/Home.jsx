import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Home() {
   const { isLoggedIn } =useContext(AuthContext);
   
  return (
    <div className="h-screen relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      <nav className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between z-10 relative">
        <div className="text-2xl font-bold text-orange-600 cursor-pointer">BeanGate</div>
        <div className="flex gap-4">
       {isLoggedIn ? (
  <NavLink
    to="/logout"
    className="rounded bg-orange-600 text-white hover:bg-orange-700 transition-all px-4 py-2 cursor-pointer"
  >
    LogOut
  </NavLink>
) : (
  <>
    <NavLink
      to="/signup"
      className="rounded bg-orange-600 text-white hover:bg-orange-700 transition-all px-4 py-2 cursor-pointer"
    >
      Register
    </NavLink>
    <NavLink
      to="/login"
      className="rounded border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all px-4 py-2 cursor-pointer"
    >
      Login
    </NavLink>
  </>
)}

         
        </div>
      </nav>
      <div className="h-screen flex flex-col items-center justify-center container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-700 mb-4 text-center">
            BeanGate <span className="text-orange-600">Account</span>
          </h1>

          <p className="text-gray-500 mb-6 text-center max-w-sm">
            Manage your BeanGate account. Choose whether you’d like to view your credit or debit details.
          </p>

          <div className="flex flex-col gap-4 md:gap-6 justify-center items-center max-w-sm w-full">
            <div className="flex gap-2">
              <Link to="/credit" className="flex-1">
                <button className=" rounded py-3 px-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-lg shadow-lg shadow-orange-600/40 hover:shadow-orange-600/60 transition-all flex items-center justify-center gap-3">
                  <ArrowUpCircle className="w-5 h-5 text-green-300" />
                  Transaction
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>

             
            </div>

            <Link to="/admin" className="w-full">
              <button className="w-full rounded py-3 px-2 border-2 border-orange-600 text-orange-600 hover:bg-orange-600/10 font-semibold text-md transition-all flex items-center justify-center gap-3">
                <ArrowDownCircle className="w-5 h-5 text-red-600" />
                View Balance
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
