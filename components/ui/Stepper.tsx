"use client";
export function Stepper({ current, total, style="pills" }:{
  current:number; total:number; style?:"pills"|"dots";
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] tracking-[0.18em] text-neutral-400 font-medium">STEP</span>
      {Array.from({ length: total }).map((_, i) => {
        const active = i + 1 <= current;
        const base = style==="pills"
          ? "h-7 w-7 rounded-full grid place-items-center text-[13px] border border-neutral-200"
          : "h-2 w-2 rounded-full";
        const activeCls = style==="pills"
          ? "ring-2 ring-blue-600 text-blue-600 border-transparent bg-white"
          : "bg-blue-600";
        const idleCls = style==="pills" ? "text-neutral-500 bg-white" : "bg-neutral-300";
        return <span key={i} aria-current={active ? "step" : undefined} className={`${base} ${active ? activeCls : idleCls}`}>{style==="pills" ? i+1 : null}</span>;
      })}
      <div className="flex-1 border-t border-dashed border-neutral-200/70" />
    </div>
  );
}
