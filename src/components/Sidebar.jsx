import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const NAV_ITEMS = [
  { to: "/", label: "Data Entry", icon: "edit_note", end: true },
  { to: "/history", label: "Daily History", icon: "history" },
  { to: "/averages", label: "Averages Dashboard", icon: "analytics" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col py-6 h-screen w-72 left-0 top-0 fixed bg-white border-r border-[#c0c9bb] z-40">
      <div className="px-6 mb-8 mt-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-[#acf4a4] flex items-center justify-center text-[#00450d] font-semibold">
            FO
          </div>
          <div>
            <p className="font-semibold text-sm">Field Operator</p>
            <p className="text-[10px] text-[#41493e] uppercase tracking-wider">Zone A - North Plantation</p>
          </div>
        </div>
        <button className="mt-4 w-full bg-[#00450d] text-white py-2 rounded-xl text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2">
          <Icon name="add" />
          New Profile
        </button>
      </div>

      <nav className="flex-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-full px-4 py-3 mx-2 mb-1 transition-all ${
                isActive ? "bg-[#1b5e20] text-white scale-95" : "text-[#41493e] hover:bg-[#e8e8e8]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon name={item.icon} filled={isActive} />
                <span className="text-sm font-semibold">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <footer className="mt-auto border-t border-[#c0c9bb] pt-4">
        <a className="flex items-center gap-3 text-[#41493e] px-4 py-3 mx-2 hover:bg-[#e8e8e8] rounded-full" href="#">
          <Icon name="settings" />
          <span className="text-sm font-semibold">Settings</span>
        </a>
        <a className="flex items-center gap-3 text-[#41493e] px-4 py-3 mx-2 hover:bg-[#e8e8e8] rounded-full" href="#">
          <Icon name="help" />
          <span className="text-sm font-semibold">Support</span>
        </a>
      </footer>
    </aside>
  );
}
