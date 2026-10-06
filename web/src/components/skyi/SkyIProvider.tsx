"use client";

// ===== Shared motion and menu state =====
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useClientReady } from "@/hooks/useClientReady";
import styles from "./SkyI.module.css";

const MotionContext = createContext<{ paused: boolean; menuOpen: boolean; setMenuOpen: (value: boolean) => void }>({ paused: false, menuOpen: false, setMenuOpen: () => {} });
export const useSkyIMotion = () => useContext(MotionContext);

export function SkyIProvider({ children, className }: { children: React.ReactNode; className: string }) {
  const reduced = useReducedMotion();
  const ready = useClientReady();
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);

  // ===== GSAP / Lenis lifecycle, scoped to Sky I home =====
  useEffect(() => {
    if (reduced || menuOpen) return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      let lenis: InstanceType<typeof Lenis> | undefined;
      const tick = (time: number) => lenis?.raf(time * 1000);
      media.add("(hover: hover) and (pointer: fine)", () => {
        lenis = new Lenis({ smoothWheel: true, syncTouch: false, duration: 0.85 });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        return () => { gsap.ticker.remove(tick); lenis?.destroy(); lenis = undefined; };
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(root.current!.querySelector("[data-skyi-logo]"), { scale: 0.7, transformOrigin: "left top", scrollTrigger: { trigger: root.current, start: "top top", end: "+=240", scrub: true } });
      }, root);
      const refresh = () => { lenis?.resize(); ScrollTrigger.refresh(); };
      const visibility = () => document.hidden ? lenis?.stop() : lenis?.start();
      window.addEventListener("resize", refresh);
      window.addEventListener("orientationchange", refresh);
      document.addEventListener("visibilitychange", visibility);
      refresh();
      cleanup = () => {
        window.removeEventListener("resize", refresh);
        window.removeEventListener("orientationchange", refresh);
        document.removeEventListener("visibilitychange", visibility);
        media.revert();
      };
    }).catch(() => { /* Native scrolling remains available if the optional runtime fails. */ });
    return () => { disposed = true; cleanup(); };
  }, [reduced, menuOpen]);

  // ===== Fine-pointer cursor and magnetic controls =====
  useEffect(() => {
    if (reduced || menuOpen || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const node = root.current;
    let frame = 0;
    let active: HTMLElement | null = null;
    const clear = () => {
      if (active) { active.style.removeProperty("translate"); active = null; }
      if (cursor.current) cursor.current.style.opacity = "0";
    };
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (cursor.current) { cursor.current.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`; cursor.current.style.opacity = "1"; }
        const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-magnetic]") : null;
        if (active !== target) { active?.style.removeProperty("translate"); active = target; }
        if (target) {
          const rect = target.getBoundingClientRect();
          target.style.translate = `${(event.clientX - rect.x - rect.width / 2) * 0.12}px ${(event.clientY - rect.y - rect.height / 2) * 0.12}px`;
        }
      });
    };
    node?.addEventListener("pointermove", move);
    node?.addEventListener("pointerleave", clear);
    window.addEventListener("blur", clear);
    return () => { cancelAnimationFrame(frame); clear(); node?.removeEventListener("pointermove", move); node?.removeEventListener("pointerleave", clear); window.removeEventListener("blur", clear); };
  }, [reduced, menuOpen]);

  return <MotionContext.Provider value={{ paused: reduced, menuOpen, setMenuOpen }}>
    <div ref={root} className={`${styles.page} ${className}`} data-enhanced={ready ? "true" : "false"} data-motion={reduced ? "paused" : "running"}>
      {children}
      <span ref={cursor} className={styles.cursor} aria-hidden="true" />
    </div>
  </MotionContext.Provider>;
}
