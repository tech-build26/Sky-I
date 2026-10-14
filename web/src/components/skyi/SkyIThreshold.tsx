"use client";

import { useEffect, useRef } from "react";
import { useSkyIMotion } from "./SkyIProvider";
import styles from "./SkyIThreshold.module.css";

const staticEdge = "M0 72 C420 72 500 18 865 18 C1140 18 1260 38 1440 38";

// A connected aperture opens into the editorial surface, driven only by scroll.
export function SkyIThreshold() {
  const root = useRef<HTMLDivElement>(null);
  const surface = useRef<SVGPathElement>(null);
  const rim = useRef<SVGPathElement>(null);
  const { paused, menuOpen } = useSkyIMotion();

  useEffect(() => {
    const node = root.current;
    if (!node || paused || menuOpen) return;
    const sheet = surface.current;
    const line = rim.current;
    let frame = 0;
    let visible = false;
    const draw = () => {
      frame = 0;
      if (document.hidden) return;
      const rect = node.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (innerHeight * .95 - rect.top) / (innerHeight * .8 + rect.height * .3)));
      const eased = progress * progress * (3 - 2 * progress);
      const left = 190 - eased * 178;
      const crown = 58 - eased * 46;
      const right = 108 - eased * 96;
      const bend = 144 - eased * 132;
      const edge = `M0 ${left.toFixed(2)} C420 ${left.toFixed(2)} 500 ${crown.toFixed(2)} 865 ${crown.toFixed(2)} C1140 ${crown.toFixed(2)} 1260 ${bend.toFixed(2)} 1440 ${right.toFixed(2)}`;
      sheet?.setAttribute("d", `${edge} L1440 242 L0 242 Z`);
      line?.setAttribute("d", edge);
      node.style.setProperty("--aperture-progress", progress.toFixed(3));
    };
    const schedule = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(draw); };
    const scroll = () => { if (visible) schedule(); };
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
      else { cancelAnimationFrame(frame); frame = 0; }
    }, { rootMargin: "100px 0px" });
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else schedule();
    };
    observer.observe(node);
    const resize = new ResizeObserver(schedule);
    resize.observe(node);
    const hero = document.getElementById("opening");
    if (hero) resize.observe(hero);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", schedule);
    document.addEventListener("visibilitychange", visibility);
    schedule();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resize.disconnect();
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", schedule);
      document.removeEventListener("visibilitychange", visibility);
      sheet?.setAttribute("d", `${staticEdge} L1440 242 L0 242 Z`);
      line?.setAttribute("d", staticEdge);
      node.style.removeProperty("--aperture-progress");
    };
  }, [paused, menuOpen]);

  return <div ref={root} className={styles.threshold} aria-hidden="true" data-skyi-threshold>
    <svg viewBox="0 0 1440 240" preserveAspectRatio="none" focusable="false">
      <path ref={surface} className={styles.surface} d={`${staticEdge} L1440 242 L0 242 Z`} />
      <path ref={rim} className={styles.rim} d={staticEdge} vectorEffect="non-scaling-stroke" />
    </svg>
    <span className={styles.invitation}>Look <em>closer.</em></span>
  </div>;
}
