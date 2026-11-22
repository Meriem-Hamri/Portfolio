"use client";

import { useRef } from "react";

/**
 * Localised satin finish (beetle-shell reflection). With a mouse, the light
 * follows the pointer softly; on touch it stays static, as the brief asks.
 */
export function Iris({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const move = (event: React.PointerEvent) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${((event.clientX - box.left) / box.width) * 100}%`);
    ref.current.style.setProperty("--my", `${((event.clientY - box.top) / box.height) * 100}%`);
  };
  const leave = () => {
    ref.current?.style.removeProperty("--mx");
    ref.current?.style.removeProperty("--my");
  };
  return <span ref={ref} className={`iris ${className}`} onPointerMove={move} onPointerLeave={leave}>{children}</span>;
}
