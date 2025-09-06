"use client";
export function postIframeHeight() {
  try {
    const h = document.documentElement.scrollHeight;
    window.parent?.postMessage({ type: "nxg-height", value: h }, "*");
  } catch {}
}

export function setupAutoHeight() {
  const tick = () => postIframeHeight();
  tick();
  const ro = new ResizeObserver(tick);
  ro.observe(document.documentElement);
  window.addEventListener("load", tick);
  window.addEventListener("hashchange", tick);
  return () => {
    ro.disconnect();
    window.removeEventListener("load", tick);
    window.removeEventListener("hashchange", tick);
  };
}
