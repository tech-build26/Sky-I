"use client";

import { useEffect } from "react";

// Native disclosures remain the source of truth. Keep a mobile selection in
// view after the previously open panel collapses above it.
export function SkyISectorInteractions() {
  useEffect(() => {
    const section = document.getElementById("industries");
    const details = Array.from(section?.querySelectorAll<HTMLDetailsElement>("details") ?? []);
    let frame = 0;
    const open = (event: Event) => {
      const detail = event.currentTarget as HTMLDetailsElement;
      if (!detail.open || !matchMedia("(max-width: 1023px)").matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const summary = detail.querySelector("summary");
        if (summary && summary.getBoundingClientRect().top < 100) summary.scrollIntoView({ block: "start", behavior: "instant" });
      });
    };
    details.forEach(detail => detail.addEventListener("toggle", open));
    return () => { cancelAnimationFrame(frame); details.forEach(detail => detail.removeEventListener("toggle", open)); };
  }, []);
  return null;
}
