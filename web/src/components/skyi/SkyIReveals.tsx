"use client";

import { useEffect, useRef } from "react";
import { useSkyIMotion } from "./SkyIProvider";

// Each content unit has one entrance owner. Native section depth and quote
// movement remain on separate nested elements.
export function SkyIReveals() {
  const { paused, menuOpen } = useSkyIMotion();
  const seen = useRef(new WeakSet<Element>());
  const suspend = useRef<() => void>(() => {});
  const menu = useRef(menuOpen);
  useEffect(() => { menu.current = menuOpen; suspend.current(); }, [menuOpen]);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector<HTMLElement>(".sky-i-foundation");
    if (!root) return;
    const explicit = "[data-skyi-reveal],[data-about-enter],[data-impact-enter]";
    const animations = new Map<HTMLElement, Animation>();
    const started = new Set<HTMLElement>();
    const registered = new WeakSet<Element>();
    const nodes = new Set<HTMLElement>();
    const visible = new Set<HTMLElement>();
    const watched = new Map<Element, HTMLElement[]>();
    let scanFrame = 0;
    let sectorFrame = 0;
    const start = (node: HTMLElement, delay = 0) => {
      const animation = animations.get(node);
      if (!animation || started.has(node) || document.hidden || menu.current) return;
      started.add(node); seen.current.add(node);
      node.dataset.scrollState = "entering";
      animation.effect?.updateTiming({ delay: Number(node.dataset.scrollDelay || node.dataset.impactDelay || delay) });
      animation.play();
    };
    const observer = new IntersectionObserver(entries => {
      let order = 0;
      entries.forEach(entry => (watched.get(entry.target) || []).forEach(node => {
        if (entry.isIntersecting) {
          visible.add(node);
          start(node, Math.min(order++ * 80, 320));
          if (!document.hidden && !menu.current && started.has(node)) animations.get(node)?.play();
        } else { visible.delete(node); if (started.has(node)) animations.get(node)?.pause(); }
      }));
    }, { threshold: .06, rootMargin: "0px 0px -16px 0px" });
    const register = (node: HTMLElement, index: number) => {
      if (registered.has(node) || seen.current.has(node)) return;
      if (node.contains(document.activeElement)) { seen.current.add(node); return; }
      registered.add(node); nodes.add(node);
      const kind = node.dataset.aboutEnter || node.dataset.impactEnter || node.dataset.skyiReveal || (node.tagName === "H2" ? "up" : index % 3 === 0 ? "right" : "left");
      const distance = innerWidth < 768 ? 30 : 64;
      // Confidence shares this lifecycle, with its own finite choreography.
      // Preserve static skew/opacity on layered planes and quiet vector marks.
      const confidence = kind.startsWith("confidence-");
      const closing = kind.startsWith("closing-");
      const sector = kind.startsWith("sector-");
      const base = confidence || closing || sector ? getComputedStyle(node) : null;
      const settledTransform = base?.transform || "none";
      const settledOpacity = base?.opacity || "1";
      const poses: Record<string, string> = {
        "confidence-scene": `translateX(${distance * 1.2}px) rotate(1.5deg) scale(1.03)`,
        "confidence-roll": `translate(-${distance}px,24px) rotate(-6deg)`,
        "confidence-layer": `translate(${distance * .4}px,32px) rotateY(-12deg)`,
        "confidence-center": "translateY(40px) scale(.96)",
        "confidence-fade": "scale(.96)",
        "closing-left": `translate(-${innerWidth < 768 ? 12 : 24}px,16px)`,
        "closing-right": `translate(${innerWidth < 768 ? 12 : 24}px,16px)`,
        "closing-up": "translateY(20px)",
        "sector-scene": `translateX(${distance}px) rotate(1.2deg) scale(1.025)`,
        "sector-detail": `translate(-${distance * .55}px,18px)`,
        "sector-drone": `translate(${distance * .6}px,-18px) rotate(-3deg) scale(.96)`,
        "sector-lines": "scale(.96)",
        "sector-inset": `translate(${distance * .3}px,24px) rotate(3deg)`,
      };
      const from = poses[kind] || (kind === "drone" ? "translate(72px,20px) scale(.94)" : kind === "photo" ? "translateX(48px) scale(.97)" : kind === "image" ? "translateX(48px)" : kind === "right" ? `translateX(${distance}px)` : kind === "left" ? `translateX(-${distance}px)` : "translateY(40px)");
      const initialTransform = (confidence || closing || sector) && settledTransform !== "none" ? `${from} ${settledTransform}` : from;
      const photo = kind === "photo";
      const animation = node.animate([
        { opacity: 0, transform: initialTransform, ...(photo ? { clipPath: "inset(0 0 100% 0)" } : {}) },
        { opacity: settledOpacity, transform: settledTransform, ...(photo ? { clipPath: "inset(0)" } : {}) },
      ], { duration: closing ? 950 : kind === "sector-scene" ? 1250 : sector ? 950 : kind === "confidence-scene" ? 1400 : kind === "confidence-roll" ? 1250 : kind === "drone" || photo || kind === "image" ? 1500 : 1100, easing: "cubic-bezier(.22,.7,.3,1)", fill: "both" });
      animation.pause(); animation.currentTime = 0;
      animations.set(node, animation);
      node.dataset.scrollEntrance = kind; node.dataset.scrollState = "waiting";
      animation.finished.then(() => { node.dataset.scrollState = "complete"; animations.delete(node); animation.cancel(); }, () => {});
      // Clipped photos and long quote tracks observe an unchanged visible frame.
      const target = node.dataset.skyiRevealTrigger ? root.querySelector(node.dataset.skyiRevealTrigger) ?? node : node.dataset.aboutEnter === "photo" ? node.parentElement! : node;
      watched.set(target, [...(watched.get(target) || []), node]);
      // Re-observe a shared frame to deliver an entry for newly rendered columns.
      observer.unobserve(target); observer.observe(target);
    };
    const scan = () => {
      scanFrame = 0;
      const candidates = new Set<HTMLElement>(root.querySelectorAll(explicit));
      root.querySelectorAll<HTMLElement>("main section:not(#opening),footer").forEach(section => {
        section.querySelectorAll<HTMLElement>("h2,h3,p,address,summary,label,a,button").forEach(node => {
          if (!node.closest(explicit) && !node.querySelector(explicit) && !node.closest("[data-testimonial-track]") && !(node.tagName === "H3" && node.closest("summary"))) candidates.add(node);
        });
      });
      candidates.forEach((node) => register(node, nodes.size));
      animations.forEach((animation, node) => {
        if (!node.isConnected) { animation.cancel(); animations.delete(node); visible.delete(node); }
      });
    };
    scan();
    // Native sector selection reuses this owner for a finite fresh entrance.
    // Cancel closed panels so rapid choices cannot retain hidden animations.
    const sectorToggle = (event: Event) => {
      const detail = event.target;
      if (!(detail instanceof HTMLDetailsElement) || !detail.dataset.sectorId) return;
      const targets = Array.from(detail.querySelectorAll<HTMLElement>("[data-skyi-reveal^='sector-']"));
      targets.forEach(node => {
        animations.get(node)?.cancel(); animations.delete(node);
        started.delete(node); visible.delete(node); nodes.delete(node);
        registered.delete(node); seen.current.delete(node);
        watched.forEach((group, target) => {
          const remaining = group.filter(item => item !== node);
          if (!remaining.length) { observer.unobserve(target); watched.delete(target); }
          else watched.set(target, remaining);
        });
        delete node.dataset.scrollState; delete node.dataset.scrollEntrance;
      });
      if (detail.open) {
        cancelAnimationFrame(sectorFrame);
        sectorFrame = requestAnimationFrame(() => {
          if (detail.open) targets.forEach(node => register(node, nodes.size));
        });
      }
    };
    root.addEventListener("toggle", sectorToggle, true);
    const changes = new MutationObserver(records => {
      if (!scanFrame && records.some(record => Array.from(record.addedNodes).some(node => node instanceof Element))) scanFrame = requestAnimationFrame(scan);
    });
    changes.observe(root, { childList: true, subtree: true });
    const sync = () => {
      animations.forEach((animation, node) => {
        if (document.hidden || menu.current || !visible.has(node)) animation.pause();
        else { start(node); animation.play(); }
      });
    };
    suspend.current = sync;
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      animations.forEach((animation, node) => {
        if (node.contains(event.target as Node)) {
          seen.current.add(node); node.dataset.scrollState = "complete"; animation.cancel(); animations.delete(node);
        }
      });
    };
    document.addEventListener("visibilitychange", sync);
    root.addEventListener("focusin", focus);
    return () => {
      observer.disconnect(); changes.disconnect(); cancelAnimationFrame(scanFrame); cancelAnimationFrame(sectorFrame);
      animations.forEach(animation => animation.cancel());
      nodes.forEach(node => { delete node.dataset.scrollEntrance; delete node.dataset.scrollState; });
      document.removeEventListener("visibilitychange", sync); root.removeEventListener("focusin", focus);
      root.removeEventListener("toggle", sectorToggle, true);
      suspend.current = () => {};
    };
  }, [paused]);
  return null;
}
