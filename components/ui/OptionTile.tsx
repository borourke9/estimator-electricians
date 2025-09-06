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
        "group relative rounded-[calc(var(--radius)-8px)] border border-black/5",
        "shadow-sm hover:shadow-md transition transform hover:-translate-y-[1px]",
        "p-4 md:p-5 h-28 w-full text-left",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]/40",
        selected
          ? "border-[color:var(--brand)] bg-[color:var(--brand-soft)] ring-1 ring-[color:var(--brand)]/30"
          : "bg-white",
      ].join(" ")}
    >
      <div className="h-8 w-8 md:h-9 md:w-9 text-neutral-700">{icon}</div>
      <div className="mt-3 text-sm md:text-base font-medium text-neutral-800">{label}</div>
    </button>
  );
}