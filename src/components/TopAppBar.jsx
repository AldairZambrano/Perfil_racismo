import React from "react";
import Icon from "./Icon";

export default function TopAppBar() {
  return (
    <header className="bg-white border-b border-[#c0c9bb] flex justify-between items-center h-16 px-4 md:px-8 w-full z-50 fixed top-0 left-0">
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined md:hidden text-[#41493e]">menu</span>
        <h1 className="text-2xl md:text-3xl font-bold text-[#00450d]">AgriProfile Banana</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:bg-[#eeeeee] transition-colors p-2 rounded-full active:opacity-80">
          <Icon name="sync" className="text-[#00450d]" />
        </button>
        <button className="hover:bg-[#eeeeee] transition-colors p-2 rounded-full active:opacity-80">
          <Icon name="account_circle" className="text-[#00450d]" />
        </button>
      </div>
    </header>
  );
}
