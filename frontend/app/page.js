"use client"

import { Button } from "@heroui/button"
import Link from "next/link"
import { ArrowRight, ArrowUpCircle, ArrowDownCircle } from "lucide-react"

export default function Home() {
  return (
    <>
     <div className="h-screen relative overflow-hidden ">
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

      
      {/* Navbar */}
      <nav className="w-full  bg-white shadow-md py-3 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-orange-600 cursor-pointer">
          BeanGate
        </div>
        <div className="flex gap-4">
          <Link href="/signup" passHref>
            <Button
              className="rounded bg-orange-600 text-white hover:bg-orange-700 transition-all px-4 py-2 cursor-pointer"
            >
              Register
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button
              className="rounded border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white transition-all px-4 py-2 cursor-pointer"
            >
              Login
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="h-screen flex flex-col items-center justify-center container mx-auto px-4 ">
        <div className="flex flex-col items-center justify-center"> 
           <h1 className="text-4xl md:text-5xl font-bold text-zinc-700 mb-4 text-center">
        BeanGate <span className="text-orange-600">Account</span>
      </h1>
      <p className="text-gray-500 mb-6 text-center max-w-sm">
        Manage your Beangate IT account. Choose whether you’d like to view your credit or debit details.
      </p>
      <div className="flex flex-col gap-2 md:gap-6 justify-center items-center max-w-sm">
       <div className="flex flex-row gap-2 md:gap-6 justify-center items-center">
        <Link href="/credit" className="w-full">
          <Button
            className="rounded py-7 px-3 md:px-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-semibold text-lg shadow-lg shadow-orange-600/40 hover:shadow-orange-600/60 transition-all gap-2 cursor-pointer"
          >
            <div className="flex justify-center gap-4 p-4  items-center">
              <ArrowUpCircle className="w-5 h-5 text-green-300" />
              Credit
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
        </Link>
     
        <Link href="/debit" className="w-full">
          <Button
            className="rounded py-6 px-3 md:px-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-600/10 font-semibold text-lg transition-all cursor-pointer"
          >
            <div className="flex justify-center gap-4 p-2 items-center">
              <ArrowDownCircle className="w-5 h-5 text-red-600" />
              Debit
              <ArrowRight className="w-4 h-4" />
            </div>
          </Button>
        </Link>
        </div>
          <Link href="/admin" className="w-full">
          <Button
            className="rounded ml-25 py-6 px-5 md:px-4 border-2 border-orange-600 text-orange-600 hover:bg-orange-600/10 font-semibold text-md transition-all cursor-pointer"
          >
            <div className="flex justify-center gap-4 p-2 items-center">
              <ArrowDownCircle className="w-5 h-5 text-red-600" />
              View Balance
             
            </div>
          </Button>
        </Link>
      </div>
      </div>
    
    </div>
    </div>
    </>
  )
}
