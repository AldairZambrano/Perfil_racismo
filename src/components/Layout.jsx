import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopAppBar from "./TopAppBar";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-[#f9f9f9] text-[#1a1c1c] min-h-screen font-sans">
      <TopAppBar onToggleSidebar={() => setCollapsed((c) => !c)} />
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <main
        className={`pt-24 pb-20 px-4 md:px-8 min-h-screen transition-all duration-300 ${
          collapsed ? "md:ml-20" : "md:ml-72"
        }`}
      >
        <div className="max-w-[1200px] mx-auto">
          <Outlet />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}