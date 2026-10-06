"use client";

import { useEffect, useRef } from "react";

// Independent translation composes with the subjects' CSS arrival/idle transforms.
export function SubjectInteractions() {
  const markerRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const scene = markerRef.current?.closest<HTMLElement>(".prelanding");
    if (!scene) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cleanups: (() => void)[] = [];
    scene.querySelectorAll<HTMLElement>(".destination").forEach((link) => {
      const image = link.querySelector<HTMLElement>(".destination-subject");
      if (!image) return;
      const drone = link.classList.contains("destination--skyi");
      let x = 0, y = 0, roll = 0, targetX = 0, targetY = 0, targetRoll = 0, frame = 0;
      const inactive = () => reduce.matches || document.hidden || scene.dataset.paused === "true";
      const draw = () => {
        frame = 0;
        if (inactive()) return;
        x += (targetX - x) * .065;
        y += (targetY - y) * .065;
        roll += (targetRoll - roll) * .065;
        image.style.translate = `${x.toFixed(3)}px ${y.toFixed(3)}px`;
        image.style.rotate = `${roll.toFixed(3)}deg`;
        if (Math.abs(x - targetX) + Math.abs(y - targetY) + Math.abs(roll - targetRoll) > .025) frame = requestAnimationFrame(draw);
      };
      const start = () => { if (!frame && !inactive()) frame = requestAnimationFrame(draw); };
      const move = (event: PointerEvent) => {
        if (inactive() || !fine.matches || event.pointerType !== "mouse") return;
        const rect = link.getBoundingClientRect();
        const horizontal = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
        const vertical = Math.max(-.5, Math.min(.5, (event.clientY - rect.top) / rect.height - .5));
        targetX = horizontal * (drone ? 24 : 8);
        targetY = vertical * (drone ? 18 : 10);
        targetRoll = horizontal * (drone ? 1.8 : .65);
        start();
      };
      const leave = () => { targetX = targetY = targetRoll = 0; start(); };
      const focus = () => {
        if (!link.matches(":focus-visible")) return;
        targetY = drone ? -5 : 3;
        targetRoll = drone ? .5 : .15;
        start();
      };
      const sync = () => {
        if (inactive()) {
          cancelAnimationFrame(frame);
          frame = 0;
          targetX = targetY = targetRoll = x = y = roll = 0;
          image.style.translate = "0px 0px";
          image.style.rotate = "0deg";
        }
      };
      const observer = new MutationObserver(sync);
      observer.observe(scene, { attributes: true, attributeFilter: ["data-paused"] });
      link.addEventListener("pointermove", move);
      link.addEventListener("pointerleave", leave);
      link.addEventListener("focus", focus);
      link.addEventListener("blur", leave);
      reduce.addEventListener("change", sync);
      document.addEventListener("visibilitychange", sync);
      cleanups.push(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        link.removeEventListener("pointermove", move);
        link.removeEventListener("pointerleave", leave);
        link.removeEventListener("focus", focus);
        link.removeEventListener("blur", leave);
        reduce.removeEventListener("change", sync);
        document.removeEventListener("visibilitychange", sync);
        image.style.translate = image.style.rotate = "";
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
  return <span ref={markerRef} hidden aria-hidden="true" />;
}
