"use client";
import * as React from "react";

export function OptionTile({
  selected, icon, label, onClick
}:{
  selected: boolean; icon: React.ReactNode; label: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "group relative rounded-xl border",
        "shadow-sm hover:shadow-md transition transform hover:-translate-y-[1px]",
        "h-20 px-4 py-3 w-full text-left",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
        selected
          ? "border-blue-600 bg-[#EAF2FF] ring-1 ring-blue-600/20"
          : "border-neutral-200 bg-white",
      ].join(" ")}
    >
      <div className="h-5 w-5 text-neutral-700 group-hover:text-blue-600">{icon}</div>
      <div className="mt-2 text-sm font-medium text-neutral-800">{label}</div>
    </button>
  );
}