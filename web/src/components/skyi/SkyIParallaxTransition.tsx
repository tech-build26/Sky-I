"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useSkyIMotion } from "./SkyIProvider";
import styles from "./SkyIParallaxTransition.module.css";

// Adapted from the owner's four-layer GSAP reference. Lenis stays owned by
// SkyIProvider; this scope owns only the hero/About timeline and trigger.
const layers = [
  { layer: "1", rate: 70 },
  { layer: "2", rate: 55 },
  { layer: "3", rate: 40 },
  { layer: "4", rate: 10 },
];

export function SkyIParallaxTransition({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const { paused, menuOpen } = useSkyIMotion();

  useEffect(() => {
    const set = root.current;
    const hero = set?.querySelector<HTMLElement>("#opening");
    if (!set || !hero || paused || menuOpen || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      let native = Boolean(location.hash) || set.contains(document.activeElement);
      let visible = set.getBoundingClientRect().bottom > 0 && set.getBoundingClientRect().top < innerHeight;
      let timeline!: ReturnType<typeof gsap.timeline>;
      let trigger!: ReturnType<typeof ScrollTrigger.create>;
      const measure = () => set.style.setProperty("--hero-hold-top", `${Math.min(0, innerHeight - hero.offsetHeight)}px`);
      const render = (self: ReturnType<typeof ScrollTrigger.create>) => {
        if (native || document.hidden || !visible) return;
        const progress = self.progress;
        set.dataset.parallaxProgress = progress.toFixed(3);
        if (progress <= 0 || progress >= 1) {
          delete set.dataset.parallaxActive;
          timeline.progress(0).pause();
        } else {
          set.dataset.parallaxActive = "true";
          timeline.progress(progress).pause();
        }
      };
      const context = gsap.context(() => {
        timeline = gsap.timeline({ paused: true });
        layers.forEach(({ layer, rate }) => {
          const nodes = hero.querySelectorAll<HTMLElement>(`[data-parallax-layer="${layer}"]`);
          // Keep the reference's 70/55/40/10 depth ratios, bounded to this
          // actual composition rather than shifting readable copy by 70%.
          timeline.fromTo(nodes, { y: 0 }, {
            y: () => Math.min(innerHeight * .18, 144) * (innerWidth < 768 ? .44 : 1) * rate / 100,
            duration: 1, ease: "none", immediateRender: false,
          }, 0);
        });
        timeline.fromTo(hero, { opacity: 1 }, { opacity: 0, duration: .86, ease: "power1.inOut", immediateRender: false }, 0);
        trigger = ScrollTrigger.create({
          id: "skyi-hero-parallax", trigger: set,
          start: () => set.getBoundingClientRect().top + scrollY + Math.max(0, hero.offsetHeight - innerHeight),
          end: () => set.getBoundingClientRect().top + scrollY + hero.offsetHeight,
          onUpdate: render,
          onRefresh: self => { measure(); timeline.invalidate(); render(self); },
        });
      }, set);
      // CSS does the hold without a pin spacer. ScrollTrigger scrubs this one
      // paused timeline directly, so stopping/reversing scroll is immediate.
      const settle = () => {
        native = true;
        delete set.dataset.parallaxActive;
        timeline.progress(0).pause();
      };
      const resume = () => {
        if (!visible || document.hidden) return;
        native = false; trigger.update(); render(trigger);
      };
      const key = (event: KeyboardEvent) => {
        if (event.target instanceof Element && event.target.closest("input,textarea,select,[contenteditable=true]")) return;
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) resume();
      };
      const link = (event: MouseEvent) => {
        const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
        if (!anchor) return;
        const url = new URL(anchor.href, location.href);
        if (url.origin === location.origin && url.pathname === location.pathname && url.hash) settle();
      };
      const focus = (event: FocusEvent) => { if (event.target instanceof Node && set.contains(event.target)) settle(); };
      const visibility = () => { if (!document.hidden) { trigger.update(); render(trigger); } };
      const restore = () => { if (location.hash) settle(); trigger.refresh(); };
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { trigger.update(); render(trigger); } });
      const resize = new ResizeObserver(() => trigger.refresh());
      observer.observe(set); resize.observe(hero);
      window.addEventListener("wheel", resume, { passive: true });
      window.addEventListener("touchmove", resume, { passive: true });
      window.addEventListener("keydown", key);
      window.addEventListener("hashchange", settle);
      window.addEventListener("pageshow", restore);
      document.addEventListener("click", link, true);
      document.addEventListener("focusin", focus);
      document.addEventListener("visibilitychange", visibility);
      measure(); trigger.refresh();
      cleanup = () => {
        observer.disconnect(); resize.disconnect(); context.revert();
        delete set.dataset.parallaxActive; delete set.dataset.parallaxProgress;
        set.style.removeProperty("--hero-hold-top");
        window.removeEventListener("wheel", resume); window.removeEventListener("touchmove", resume);
        window.removeEventListener("keydown", key); window.removeEventListener("hashchange", settle);
        window.removeEventListener("pageshow", restore); document.removeEventListener("click", link, true);
        document.removeEventListener("focusin", focus); document.removeEventListener("visibilitychange", visibility);
      };
    }).catch(() => { /* Original document flow remains available if the runtime cannot load. */ });
    return () => { disposed = true; cleanup(); };
  }, [paused, menuOpen]);

  return <div ref={root} className={styles.set} data-skyi-parallax>
    <div className={styles.track}>{children}</div>
  </div>;
}
