import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        "rounded-2xl bg-white text-neutral-900",
        "border border-black/5 shadow-md",
        "p-6 md:p-8",
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}
