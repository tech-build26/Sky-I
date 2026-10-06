"use client";

import { useEffect, useRef, useState } from "react";
import { introductions } from "@/content/prelanding";

type Phase = "shown" | "leaving" | "entering";

export function RotatingIntro() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("shown");
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = true;
    let hovering = false;
    let timeout: number | undefined;
    let swapTimeout: number | undefined;
    let settleTimeout: number | undefined;

    const clearTimers = () => {
      window.clearTimeout(timeout);
      window.clearTimeout(swapTimeout);
      window.clearTimeout(settleTimeout);
    };

    const schedule = () => {
      clearTimers();
      setPhase("shown");
      if (document.hidden || !inView || hovering || reducedMotion.matches) return;
      timeout = window.setTimeout(() => {
        setPhase("leaving");
        swapTimeout = window.setTimeout(() => {
          setIndex((current) => (current + 1) % introductions.length);
          setPhase("entering");
          settleTimeout = window.setTimeout(schedule, 700);
        }, 500);
      }, 6500);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    });
    observer.observe(region);
    const pause = () => { hovering = true; schedule(); };
    const resume = () => { hovering = false; schedule(); };
    region.addEventListener("mouseenter", pause);
    region.addEventListener("mouseleave", resume);
    document.addEventListener("visibilitychange", schedule);
    reducedMotion.addEventListener("change", schedule);
    return () => {
      clearTimers();
      observer.disconnect();
      region.removeEventListener("mouseenter", pause);
      region.removeEventListener("mouseleave", resume);
      document.removeEventListener("visibilitychange", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  const introduction = introductions[index];
  return (
    <div className="intro" ref={regionRef} aria-live="off">
      <div className={`intro-message intro-message--${phase}`} key={index}>
        <p className="intro-eyebrow">{introduction.eyebrow}</p>
        <h1><span className="intro-lead">{introduction.lead}</span><span className="intro-headline">{introduction.headline}</span></h1>
        <p className="intro-summary">{introduction.summary}</p>
      </div>
    </div>
  );
}
