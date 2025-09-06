'use client';
type Props = { 
  label: string; 
  active?: boolean; 
  onClick?: () => void; 
  icon?: React.ReactNode;
  primaryVar?: string;
  accentVar?: string;
};
export default function OptionCard({ label, active=false, onClick, icon, primaryVar, accentVar }: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full h-[120px] md:h-[140px] rounded-xl border shadow-sm flex flex-col items-center justify-center",
        "transition-all focus:outline-none",
        active ? "" : "border-zinc-200 bg-white hover:border-zinc-300"
      ].join(" ")}
      style={active ? {
        borderColor: primaryVar,
        backgroundColor: accentVar + '10',
        outline: 'none',
        boxShadow: `0 0 0 2px ${primaryVar}40`
      } : {
        outline: 'none'
      }}
      aria-pressed={active}
    >
      {icon ? <div className="mb-3">{icon}</div> : null}
      <span 
        className={`text-base md:text-lg ${active ? "font-semibold" : "text-zinc-800"}`}
        style={active ? { color: primaryVar } : {}}
      >
        {label}
      </span>
    </button>
  );
}
