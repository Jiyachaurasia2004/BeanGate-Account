"use client";
import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Header from "../../components/Header";

export default function AdminLayout() {
  const [open, setOpen] = useState(true); // Sidebar open by default
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <div className="flex h-screen relative bg-gray-50">
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="absolute top-4 left-4 z-50 p-2 bg-orange-100 border border-orange-300 rounded-md"
        >
          <svg
            className="w-6 h-6 text-orange-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-40 bg-orange-200 shadow-lg transition-transform duration-300
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">Admin Panel</h2>
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/admin/user"
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-orange-100 transition-colors ${
                  isActive ? "bg-orange-200 font-semibold" : "text-gray-700"
                }`
              }
            >
              User
            </NavLink>
            <NavLink
              to="/admin/credit"
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-orange-100 transition-colors ${
                  isActive ? "bg-orange-200 font-semibold" : "text-gray-700"
                }`
              }
            >
              Credit
            </NavLink>
            <NavLink
              to="/admin/debit"
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-orange-100 transition-colors ${
                  isActive ? "bg-orange-200 font-semibold" : "text-gray-700"
                }`
              }
            >
              Debit
            </NavLink>
             <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded hover:bg-orange-100 transition-colors ${
                  isActive ? "bg-orange-200 font-semibold" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && open && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
        ></div>
      )}

      {/* Main Section */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          open && !isMobile ? "ml-64" : "ml-0"
        }`}
      >
      
     

        {/* Content */}
        <main className="w-full p-6  bg-gray-50">
          <Header/>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
