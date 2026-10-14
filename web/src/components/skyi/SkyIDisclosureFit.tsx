"use client";
import { useEffect } from "react";

// Reserve only the selected panel/index height. No scroll or animation loop.
export function SkyIDisclosureFit({ sectionId, breakpoint }: { sectionId: string; breakpoint: number }) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    const host = section?.querySelector<HTMLElement>("[data-disclosure-layout]");
    if (!section || !host) return;
    const media = matchMedia(`(min-width:${breakpoint}px)`);
    let frame = 0;
    const fit = () => {
      frame = 0;
      if (document.hidden) return;
      if (!media.matches) { host.style.removeProperty("--disclosure-height"); return; }
      const listHeight = Array.from(host.querySelectorAll<HTMLElement>("details>summary")).reduce((total, node) => total + node.offsetHeight, 0);
      const panel = host.querySelector<HTMLElement>("details[open] [data-disclosure-panel]");
      // Sector artwork starts beside its heading, above the list. Reserve only
      // the part below the list's origin; other explorers retain their sizing.
      const panelHeight = panel ? panel.offsetHeight + (panel.hasAttribute("data-disclosure-offset") ? panel.offsetTop - host.offsetTop : 0) : 0;
      const height = `${Math.ceil(Math.max(listHeight, panelHeight) + 24)}px`;
      if (host.style.getPropertyValue("--disclosure-height") !== height) host.style.setProperty("--disclosure-height", height);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(fit); };
    const observer = new ResizeObserver(schedule);
    host.querySelectorAll("summary,[data-disclosure-panel]").forEach(node => observer.observe(node));
    section.addEventListener("toggle", schedule, true);
    media.addEventListener("change", schedule);
    document.addEventListener("visibilitychange", schedule);
    fit();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); section.removeEventListener("toggle", schedule, true); media.removeEventListener("change", schedule); document.removeEventListener("visibilitychange", schedule); host.style.removeProperty("--disclosure-height"); };
  }, [sectionId, breakpoint]);
  return null;
}
