import * as React from "react";

export function Card({ className="", children }:{
  className?: string; children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "rounded-[var(--radius)] bg-[var(--card-bg)] text-[var(--text)]",
        "border border-black/5",
        "shadow-[0_10px_30px_rgba(0,0,0,0.18),_0_2px_10px_rgba(0,0,0,0.06)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
