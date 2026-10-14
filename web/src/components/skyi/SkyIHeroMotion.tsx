"use client";

import { useEffect, useRef } from "react";
import { useSkyIMotion } from "./SkyIProvider";

// One finite opening sequence; original labels stay visible and links stay live.
export function SkyIHeroMotion() {
  const { paused, menuOpen } = useSkyIMotion();
  const introduced = useRef(new WeakSet<Element>());
  const introComplete = useRef(false);
  useEffect(() => {
    const hero = document.getElementById("opening");
    const root = hero?.closest<HTMLElement>(".sky-i-foundation");
    const intro = hero?.querySelector<HTMLElement>("[data-intro-phase]");
    delete document.documentElement.dataset.heroPending;
    if (!hero || !root || !intro) return;
    if (menuOpen || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      intro.dataset.introPhase = "complete"; introComplete.current = true; return;
    }
    if (paused) return;
    const animations = new Map<HTMLElement, Animation>();
    let frame = 0;
    let introTimer = 0;
    let introStarted = false;
    const finishIntro = () => {
      clearTimeout(introTimer);
      intro.dataset.introPhase = "complete"; introComplete.current = true;
      animations.forEach((animation, target) => {
        if (intro.contains(target)) { animation.cancel(); animations.delete(target); }
      });
    };
    const settle = (node?: HTMLElement) => {
      if (introStarted && (!node || intro.contains(node))) finishIntro();
      animations.forEach((animation, target) => {
        if (!node || node.contains(target) || target.contains(node)) {
          animation.cancel(); animations.delete(target); target.dataset.heroState = "complete";
        }
      });
    };
    const begin = () => {
      if (document.hidden || hero.getBoundingClientRect().bottom <= 0) return;
      const phase = document.querySelector<HTMLElement>(".brand-entry-overlay")?.dataset.phase;
      if (phase && phase !== "idle" && phase !== "revealing") return;
      if (intro.contains(document.activeElement)) finishIntro();
      if (!introStarted && !introComplete.current) {
        introStarted = true;
        introTimer = window.setTimeout(() => {
          intro.dataset.introPhase = "transitioning";
          const initial = intro.querySelector<HTMLElement>("[data-intro-initial]");
          if (initial) {
            const exit = initial.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-36px)" }], { duration: 650, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
            animations.set(initial, exit);
          }
          const arrivals = Array.from(intro.querySelectorAll<HTMLElement>("[data-intro-enter]")).map((node, index) => {
            const direction = node.dataset.introEnter;
            const from = direction === "left" ? "translateX(-48px)" : direction === "right" ? "translateX(48px)" : "translateY(64px)";
            const arrival = node.animate([{ opacity: 0, transform: from }, { opacity: 1, transform: "none" }], { duration: 1150, delay: index * 80, easing: "cubic-bezier(.2,.75,.25,1)", fill: "backwards" });
            animations.set(node, arrival);
            return arrival.finished;
          });
          void Promise.all(arrivals).then(finishIntro, () => {});
        }, 3200);
      }
      root.querySelectorAll<HTMLElement>("[data-hero-enter],#skyi-social-rail a").forEach((node, index) => {
        if (introduced.current.has(node) || !node.getBoundingClientRect().width) return;
        introduced.current.add(node);
        const kind = node.dataset.heroEnter || "right";
        const artwork = !!node.querySelector("[data-hero-art]");
        const distance = artwork ? (innerWidth < 768 ? 64 : 150) : (innerWidth < 768 ? 42 : 80);
        const from = kind === "left" ? `translateX(-${distance}px)` : kind === "right" ? `translateX(${distance}px)` : kind === "down" ? "translateY(-48px)" : `translateY(${artwork ? 90 : 64}px)`;
        const animation = node.animate([
          { opacity: 0, transform: `${from}${artwork ? " scale(.86)" : ""}` },
          { opacity: 1, transform: "none" },
        ], {
          duration: artwork ? 1750 : 1350,
          delay: Number(node.dataset.heroDelay ?? Math.min(index * 45, 350)),
          easing: "cubic-bezier(.2,.75,.25,1)", fill: "backwards",
        });
        animations.set(node, animation);
        node.dataset.heroState = "entering";
        animation.finished.then(() => {
          node.dataset.heroState = "complete"; animation.cancel(); animations.delete(node);
        }, () => {});
      });
    };
    const ready = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(begin); };
    const focus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        if (intro.contains(event.target)) finishIntro();
        settle(event.target.closest<HTMLElement>("[data-hero-choice]") ?? event.target);
      }
    };
    const visibility = () => { if (document.hidden) settle(); else ready(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) settle(); else ready(); });
    const added = new MutationObserver(records => {
      if (records.some(record => Array.from(record.addedNodes).some(node => node instanceof Element))) ready();
    });
    const blur = () => settle();
    observer.observe(hero); added.observe(root, { childList: true, subtree: true });
    ready();
    const fallback = window.setTimeout(ready, 5000);
    window.addEventListener("brand-entry-reveal", ready);
    window.addEventListener("brand-entry-ready", ready);
    window.addEventListener("blur", blur);
    root.addEventListener("focusin", focus);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame); clearTimeout(fallback); clearTimeout(introTimer); settle(); observer.disconnect(); added.disconnect();
      window.removeEventListener("brand-entry-reveal", ready);
      window.removeEventListener("brand-entry-ready", ready);
      window.removeEventListener("blur", blur);
      root.removeEventListener("focusin", focus);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [paused, menuOpen]);
  return null;
}
