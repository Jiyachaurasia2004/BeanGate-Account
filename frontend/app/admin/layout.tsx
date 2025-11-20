"use client";
import React, { useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
 const toggleSidebar = () => setOpen(prev => !prev);
const handleClose = () => setOpen(false);

  return (
    <div className="flex h-screen relative">
     

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden absolute top-4 left-4 z-50 p-2 bg-orange/40 border border-orange/20 rounded-md"
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

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-64 z-40 bg-transparent transition-transform duration-300
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <AdminSidebar  onActionComplete={handleClose}/>
      </div>

      {/* Main Section */}
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
