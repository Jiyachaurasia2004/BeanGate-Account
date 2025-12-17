import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Header from "../../components/Header";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setOpen(false); // auto close sidebar on mobile
      } else {
        setOpen(true); // open on desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-orange-100 border border-orange-300 rounded-md"
        >
          <svg
            className="w-6 h-6 text-orange-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-orange-200 shadow-lg
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="p-6 h-full flex flex-col">
          <h2 className="text-2xl font-bold mb-6 text-orange-600">
            Admin Panel
          </h2>

          <nav className="flex flex-col gap-2">
            {[
              { to: "/admin/user", label: "User" },
              { to: "/admin/credit", label: "Credit" },
              { to: "/admin/debit", label: "Debit" },
              { to: "/", label: "Home" },
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded transition-colors ${
                    isActive
                      ? "bg-orange-300 font-semibold text-orange-900"
                      : "text-gray-700 hover:bg-orange-100"
                  }`
                }
                onClick={() => isMobile && setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      {isMobile && open && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/30 z-30"
        />
      )}

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
