
import { FaUsers, FaHome, FaServicestack } from "react-icons/fa";
import { Link } from "react-router-dom"; // react-router for navigation

export default function AdminSidebar() {
  return (
    <div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>

      {/* Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>

      <aside className="w-60 h-full border-r p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 border-orange-600/30 shadow-2xl rounded-lg shadow-orange-600/10">
        <ul className="space-y-6 mt-10 text-[20px] text-zinc-700">
          <li className="flex items-center gap-3 hover:text-orange-700">
            <FaUsers />
            <Link to="/admin/user">Users</Link>
          </li>

          <li className="flex items-center gap-3 hover:text-orange-700">
            <ArrowUpCircle />
            <Link to="/admin/credit">Credit</Link>
          </li>

          <li className="flex items-center gap-3 hover:text-orange-700">
            <FaServicestack />
            <Link to="/admin/debit">Debit</Link>
          </li>

          <li className="flex items-center gap-3 hover:text-orange-700">
            <FaHome />
            <Link to="/">Home</Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}
