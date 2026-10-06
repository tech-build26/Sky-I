"use client";

// ===== Section-specific entries; content stays visible when JS is unavailable =====
import { useEffect } from "react";
import { useSkyIMotion } from "./SkyIProvider";

export function SkyIReveals() {
  const { paused } = useSkyIMotion();
  useEffect(() => {
    if (paused) return;
    const animations = new Set<Animation>();
    const recipes = {
      about: [{ opacity: .15, transform: "translateX(-35px)" }, { opacity: 1, transform: "none" }],
      services: [{ opacity: .15, transform: "translateY(25px)" }, { opacity: 1, transform: "none" }],
      industries: [{ opacity: .15, transform: "translateX(35px)" }, { opacity: 1, transform: "none" }],
      process: [{ opacity: .15, transform: "scale(.97)" }, { opacity: 1, transform: "none" }],
      contact: [{ opacity: .15, transform: "translateY(18px) rotate(.4deg)" }, { opacity: 1, transform: "none" }],
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        const id = entry.target.closest("section")?.id as keyof typeof recipes;
        if (recipes[id]) {
          const animation = entry.target.animate(recipes[id], { duration: id === "process" ? 850 : 650, easing: id === "industries" ? "cubic-bezier(.16,.7,.25,1)" : "cubic-bezier(.22,1,.36,1)" });
          animations.add(animation);
          animation.finished.finally(() => animations.delete(animation)).catch(() => {});
        }
        observer.unobserve(entry.target);
      }
    }, { threshold: .12 });
    document.querySelectorAll("[data-skyi-reveal]").forEach(node => observer.observe(node));
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [paused]);
  return null;
}
