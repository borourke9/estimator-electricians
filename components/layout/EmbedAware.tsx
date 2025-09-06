"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export function useEmbedFlags() {
  const sp = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const blendedParam = mounted ? sp?.get("mode") === "blended" : false;
  const inIframe = useMemo(() => {
    if (!mounted) return false;
    try { return window.self !== window.top; } catch { return true; }
  }, [mounted]);
  const blended = blendedParam || inIframe;
  return { inIframe, blended, mounted };
}

export function EmbedContainer({ 
  children, 
  blended = false 
}:{ 
  children: React.ReactNode; 
  blended?: boolean; 
}) {
  // Page background: standalone = gradient; embed/blended = transparent
  const pageBg = blended
    ? "bg-transparent"
    : "bg-neutral-950 bg-[radial-gradient(1200px_600px_at_50%_-10%,#0B1220,transparent)]";

  return (
    <main className={`min-h-screen ${pageBg} text-white`}>
      <div className="mx-auto max-w-2xl px-4 py-6 md:py-10">
        {children}
      </div>
    </main>
  );
}
