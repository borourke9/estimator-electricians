"use client";
import * as React from "react";
import type { ThemeSpec } from "@/configs/clients";

export function ThemeProvider({ theme, children }:{
  theme: ThemeSpec; children: React.ReactNode;
}) {
  const style: React.CSSProperties = {
    ["--brand" as any]: theme.brand,
    ["--brand-soft" as any]: theme.brandSoft,
    ["--text" as any]: theme.text,
    ["--card-bg" as any]: theme.cardBg,
    ["--radius" as any]: `${theme.radius}px`,
  };
  const density = theme.density ?? "comfortable";
  const densityClass =
    density === "cozy" ? "space-y-4 md:space-y-5"
    : density === "spacious" ? "space-y-7 md:space-y-9"
    : "space-y-5 md:space-y-7";
  return <div style={style} className={densityClass}>{children}</div>;
}
