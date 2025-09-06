import * as React from "react";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "h-12 w-full rounded-xl bg-white",
        "border border-neutral-200 px-4",
        "text-[15px] outline-none",
        "focus:ring-2 focus:ring-blue-500/30",
        props.className || ""
      ].join(" ")}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={[
        "h-12 w-full rounded-2xl bg-white",
        "border border-black/10 px-4",
        "text-[15px] outline-none",
        "focus:ring-2 focus:ring-blue-500/30",
        props.className || ""
      ].join(" ")}
    />
  );
}

export function Checkbox({
  label, ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center justify-between h-12 px-4 rounded-2xl border border-black/10 bg-white">
      <span className="text-[15px]">{label}</span>
      <input type="checkbox" {...rest} className="h-5 w-5 accent-blue-600" />
    </label>
  );
}

export function PrimaryButton({
  children, className = "", ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={[
        "h-12 w-full rounded-xl bg-blue-600 text-white font-medium",
        "hover:bg-blue-500 active:bg-blue-700 transition",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
        className
      ].join(" ")}
    >
      {children}
    </button>
  );
}
