import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "./Icon";

const NAV_ITEMS = [
  { to: "/", icon: "edit_note", short: "Entry", end: true },
  { to: "/history", icon: "history", short: "History" },
  { to: "/averages", icon: "analytics", short: "Stats" },
];

export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#c0c9bb] flex items-center justify-around z-50">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-[#00450d]" : "text-[#41493e] hover:text-[#00450d]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} filled={isActive} />
              <span className="text-[10px] font-medium">{item.short}</span>
            </>
          )}
        </NavLink>
      ))}
      <a href="#" className="flex flex-col items-center gap-1 text-[#41493e] hover:text-[#00450d]">
        <Icon name="settings" />
        <span className="text-[10px] font-medium">Settings</span>
      </a>
    </nav>
  );
}
