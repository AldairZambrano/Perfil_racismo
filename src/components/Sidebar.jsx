import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Icon from "./Icon";

const NAV_ITEMS = [
  { to: "/", label: "Data Entry", icon: "edit_note", end: true },
  { to: "/history", label: "Daily History", icon: "history" },
  { to: "/averages", label: "Averages Dashboard", icon: "analytics" },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "FO";

  return (
    <aside
      className={`hidden md:flex flex-col py-6 h-screen left-0 top-0 fixed bg-white border-r border-[#c0c9bb] z-40 transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Profile */}
      <div className={`mb-8 mt-16 ${collapsed ? "px-3" : "px-6"}`}>
        <div className={`flex items-center gap-3 mb-2 ${collapsed ? "justify-center" : ""}`}>
          <div
            className="w-12 h-12 shrink-0 rounded-full bg-[#acf4a4] flex items-center justify-center text-[#00450d] font-semibold"
            title={user?.email || "Field Operator"}
          >
            {initials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-semibold text-sm truncate">{user?.email || "Field Operator"}</p>
              <p className="text-[10px] text-[#41493e] uppercase tracking-wider">Zone A - North Plantation</p>
            </div>
          )}
        </div>
        <button
          title="New Profile"
          className={`mt-4 w-full bg-[#00450d] text-white py-2 rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2`}
        >
          <Icon name="add" />
          {!collapsed && "New Profile"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            title={item.label}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-full px-4 py-3 mx-2 mb-1 transition-all ${
                collapsed ? "justify-center px-0" : ""
              } ${isActive ? "bg-[#1b5e20] text-white scale-95" : "text-[#41493e] hover:bg-[#e8e8e8]"}`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} filled={isActive} />
                {!collapsed && <span className="text-sm font-semibold">{item.label}</span>}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#c0c9bb] pt-4">
        <a
          title="Settings"
          className={`flex items-center gap-3 text-[#41493e] px-4 py-3 mx-2 hover:bg-[#e8e8e8] rounded-full ${
            collapsed ? "justify-center px-0" : ""
          }`}
          href="#"
        >
          <Icon name="settings" />
          {!collapsed && <span className="text-sm font-semibold">Settings</span>}
        </a>
        <a
          title="Support"
          className={`flex items-center gap-3 text-[#41493e] px-4 py-3 mx-2 hover:bg-[#e8e8e8] rounded-full ${
            collapsed ? "justify-center px-0" : ""
          }`}
          href="#"
        >
          <Icon name="help" />
          {!collapsed && <span className="text-sm font-semibold">Support</span>}
        </a>
        <button
          title="Cerrar sesión"
          onClick={handleLogout}
          className={`flex items-center gap-3 text-[#ba1a1a] px-4 py-3 mx-2 hover:bg-[#ffdad6] rounded-full transition-all ${
            collapsed ? "justify-center px-0 w-[calc(100%-16px)]" : "w-[calc(100%-16px)]"
          }`}
        >
          <Icon name="logout" />
          {!collapsed && <span className="text-sm font-semibold">Cerrar sesión</span>}
        </button>
      </footer>
    </aside>
  );
}