"use client";

import { useEffect, useRef } from "react";
import { useSkyIMotion } from "./SkyIProvider";

const ease = "cubic-bezier(.16,1,.3,1)";
const entrances: Record<string, Keyframe[]> = {
  left: [{ opacity: 0, transform: "translate3d(-75px,0,0)" }, { opacity: 1, transform: "none" }],
  right: [{ opacity: 0, transform: "translate3d(75px,0,0)" }, { opacity: 1, transform: "none" }],
  top: [{ opacity: 0, transform: "translate3d(0,-48px,0)" }, { opacity: 1, transform: "none" }],
  bottom: [{ opacity: 0, transform: "translate3d(0,48px,0)" }, { opacity: 1, transform: "none" }],
  rise: [{ transform: "translateY(115%) rotate(3deg)" }, { transform: "none" }],
  fall: [{ transform: "translateY(-115%) rotate(-2deg)" }, { transform: "none" }],
  droneLeft: [{ opacity: 0, transform: "translate3d(-95px,30px,0) rotate(-7deg) scale(.88)" }, { opacity: 1, transform: "none" }],
  droneRise: [{ opacity: 0, transform: "translate3d(0,85px,0) rotate(4deg) scale(.86)" }, { opacity: 1, transform: "none" }],
  droneRight: [{ opacity: 0, transform: "translate3d(95px,-25px,0) rotate(6deg) scale(.88)" }, { opacity: 1, transform: "none" }],
  icon: [{ opacity: 0, transform: "scale(.55) rotate(-24deg)" }, { opacity: 1, transform: "none" }],
};

type WordRun = { original: string; ink: HTMLElement; start: number; order: number[] };

export function SkyIHeroMotion() {
  const { paused, menuOpen } = useSkyIMotion();
  const introduced = useRef(new WeakSet<Element>());

  useEffect(() => {
    const hero = document.getElementById("opening");
    const page = hero?.closest<HTMLElement>(".sky-i-foundation");
    if (!hero || !page) return;
    if (paused) { hero.dataset.heroEffects = "still"; return; }

    const animations = new Set<Animation>();
    const words = new Map<HTMLElement, WordRun>();
    const timers = new Set<number>();
    const finePointer = matchMedia("(hover:hover) and (pointer:fine)");
    let visible = hero.getBoundingClientRect().bottom > 0;
    let frame = 0, pointerFrame = 0, lastInk = 0;
    let entryFrame = 0, started = false;
    let hoveredDrone: HTMLElement | null = null;

    const restoreWords = () => {
      cancelAnimationFrame(frame); frame = 0;
      words.forEach(run => { run.ink.textContent = run.original; }); words.clear();
    };
    const resetPointer = () => {
      cancelAnimationFrame(pointerFrame);
      hoveredDrone?.style.removeProperty("--drone-pointer-x");
      hoveredDrone?.style.removeProperty("--drone-pointer-y");
      hoveredDrone?.style.removeProperty("--drone-pointer-roll");
      hoveredDrone = null;
    };
    const stop = () => {
      animations.forEach(animation => animation.cancel()); animations.clear();
      timers.forEach(timer => clearTimeout(timer)); timers.clear();
      restoreWords(); resetPointer();
    };
    const shuffle = (letters: string[]) => {
      for (let index = letters.length - 1; index > 0; index--) {
        const next = Math.floor(Math.random() * (index + 1));
        [letters[index], letters[next]] = [letters[next], letters[index]];
      }
      return letters;
    };
    const tick = (now: number) => {
      frame = 0;
      if (document.hidden) { restoreWords(); return; }
      if (now - lastInk >= 34) {
        lastInk = now;
        words.forEach((run, node) => {
          const elapsed = now - run.start;
          if (elapsed < 0) return;
          const letters = Array.from(run.original);
          if (elapsed >= 560) { run.ink.textContent = run.original; words.delete(node); return; }
          const resolved = Math.floor(Math.max(0, elapsed - 120) / 440 * letters.length);
          const loose = run.order.slice(resolved);
          const mixed = shuffle(loose.map(index => letters[index]));
          loose.forEach((index, offset) => { letters[index] = letters[index] === letters[index].toUpperCase() ? mixed[offset].toUpperCase() : mixed[offset].toLowerCase(); });
          run.ink.textContent = letters.join("");
        });
      }
      if (words.size) frame = requestAnimationFrame(tick);
    };
    const scramble = (trigger: Element) => {
      if (document.hidden) return;
      trigger.querySelectorAll<HTMLElement>("[data-scramble-word]").forEach((node, index) => {
        const ink = node.querySelector<HTMLElement>("[data-scramble-ink]");
        const original = node.dataset.scrambleWord;
        if (!ink || !original || original.length < 3 || words.has(node)) return;
        const order = Array.from(original).map((letter, index) => /[\p{L}\p{N}]/u.test(letter) ? index : -1).filter(index => index >= 0).sort(() => Math.random() - .5);
        words.set(node, { ink, original, order, start: performance.now() + Math.min(index * 12, 100) });
      });
      if (!frame && words.size) frame = requestAnimationFrame(tick);
    };
    const enter = (scope: ParentNode) => {
      if (menuOpen || !started) return;
      scope.querySelectorAll<HTMLElement>("[data-hero-motion]").forEach(node => {
        if (introduced.current.has(node)) return;
        introduced.current.add(node);
        const rect = node.getBoundingClientRect();
        const delay = Number(node.dataset.heroDelay || 0);
        if (!document.hidden && visible && rect.width && node.hasAttribute("data-scramble-enter")) {
          const timer = window.setTimeout(() => { timers.delete(timer); scramble(node); }, delay + 280);
          timers.add(timer);
        }
        if (document.hidden || !visible || !rect.width || rect.bottom < 0 || rect.top > innerHeight) return;
        const recipe = entrances[node.dataset.heroMotion || ""];
        if (!recipe) return;
        const animation = node.animate(recipe, { duration: Number(node.dataset.heroDuration || 1000), delay, easing: ease, fill: "backwards" });
        animations.add(animation);
        animation.finished.then(() => { animations.delete(animation); animation.cancel(); }, () => {});
      });
    };
    const over = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const trigger = event.target instanceof Element ? event.target.closest("[data-scramble-trigger]") : null;
      if (!trigger || !page.contains(trigger) || (event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget))) return;
      scramble(trigger);
    };
    const focus = (event: FocusEvent) => {
      const trigger = event.target instanceof Element ? event.target.closest("[data-scramble-trigger]") : null;
      if (trigger && page.contains(trigger)) scramble(trigger);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || !visible || menuOpen || document.hidden) return;
      const stage = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-drone-stage]") : null;
      const art = stage?.querySelector<HTMLElement>("[data-drone-depth]");
      if (!stage || !art) { resetPointer(); return; }
      if (art !== hoveredDrone) { resetPointer(); hoveredDrone = art; }
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const x = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
        const y = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
        art.style.setProperty("--drone-pointer-x", `${x * 20}px`);
        art.style.setProperty("--drone-pointer-y", `${y * 14}px`);
        art.style.setProperty("--drone-pointer-roll", `${x * 4}deg`);
      });
    };
    const visibility = () => {
      hero.dataset.heroEffects = document.hidden || !visible || menuOpen ? "still" : "running";
      if (document.hidden) stop();
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visibility();
      if (!visible) stop();
    });
    const mutations = new MutationObserver(records => {
      // Text-node updates from scrambling do not create new choreography targets.
      if (records.some(record => Array.from(record.addedNodes).some(node => node instanceof Element && (node.matches("[data-hero-motion]") || node.querySelector("[data-hero-motion]"))))) enter(page);
    });
    // Defer until after the Strict Mode setup/cleanup pass and the brand cover.
    // An entry event may arrive before this component mounts; the DOM check covers that race.
    const begin = (force = false) => {
      if (started || document.hidden || menuOpen) return;
      const overlay = document.querySelector<HTMLElement>(".brand-entry-overlay");
      const covered = document.documentElement.hasAttribute("data-brand-entry") || (overlay && overlay.dataset.phase !== "idle");
      if (!force && covered) return;
      started = true;
      enter(page);
    };
    const ready = () => {
      cancelAnimationFrame(entryFrame);
      entryFrame = requestAnimationFrame(() => begin());
    };
    hero.dataset.heroEffects = menuOpen ? "still" : "running";
    ready();
    const fallback = window.setTimeout(() => { timers.delete(fallback); begin(true); }, 2000);
    timers.add(fallback);
    intersection.observe(hero);
    mutations.observe(page, { childList: true, subtree: true });
    page.addEventListener("pointerover", over);
    page.addEventListener("focusin", focus);
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", resetPointer);
    document.addEventListener("visibilitychange", visibility);
    document.addEventListener("visibilitychange", ready);
    window.addEventListener("brand-entry-ready", ready);
    window.addEventListener("blur", stop);
    return () => {
      stop(); hero.dataset.heroEffects = "still";
      cancelAnimationFrame(entryFrame);
      intersection.disconnect(); mutations.disconnect();
      page.removeEventListener("pointerover", over); page.removeEventListener("focusin", focus);
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", resetPointer);
      document.removeEventListener("visibilitychange", visibility); window.removeEventListener("blur", stop);
      document.removeEventListener("visibilitychange", ready); window.removeEventListener("brand-entry-ready", ready);
    };
  }, [paused, menuOpen]);

  return null;
}
