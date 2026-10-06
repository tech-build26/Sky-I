"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { skyIScenes } from "@/content/skyi-scenes";
import { useSkyIMotion } from "./SkyIProvider";
import styles from "./SkyI.module.css";
import { ScrambleText } from "../ui/scramble-text";

export function SkyIPhotography() {
  const { paused, menuOpen } = useSkyIMotion();
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [hidden, setHidden] = useState(false);
  const [focused, setFocused] = useState(false);
  const [failed, setFailed] = useState<number[]>([]);
  const revealed = useRef(0);
  const current = failed.includes(active) ? skyIScenes.findIndex((_, index) => !failed.includes(index)) : active;
  const scene = skyIScenes[Math.max(0, current)];
  const stopped = paused || menuOpen || hidden || !visible || focused;

  useEffect(() => {
    const change = () => setHidden(document.hidden);
    const focus = () => setFocused(!!document.activeElement?.matches(":focus-visible") && !!document.activeElement.closest("#opening,#skyi-desktop-nav"));
    change();
    document.addEventListener("visibilitychange", change);
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", focus);
    return () => { document.removeEventListener("visibilitychange", change); document.removeEventListener("focusin", focus); document.removeEventListener("focusout", focus); };
  }, []);

  useEffect(() => {
    if (stopped || skyIScenes.length - failed.length < 2) return;
    const timer = window.setTimeout(() => {
      let next = (current + 1) % skyIScenes.length;
      while (failed.includes(next)) next = (next + 1) % skyIScenes.length;
      setPrevious(current); setActive(next);
    }, 8500);
    return () => clearTimeout(timer);
  }, [stopped, failed, current]);

  useEffect(() => {
    if (current < 0 || current === revealed.current) return;
    revealed.current = current;
    if (stopped || previous < 0) return;
    const node = root.current?.querySelector<HTMLElement>(`[data-scene="${current}"]`);
    if (!node) return;
    const recipes = [
      [{ opacity: 0, transform: "translateX(4%) scale(1.04)" }, { opacity: 1, transform: "none" }],
      [{ clipPath: "circle(0% at 72% 42%)", transform: "scale(1.06)" }, { clipPath: "circle(150% at 72% 42%)", transform: "none" }],
      [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0)" }],
    ];
    const animation = node.animate(recipes[current], { duration: 1400, easing: "cubic-bezier(.22,1,.36,1)" });
    return () => animation.cancel();
  }, [current, previous, stopped]);

  return <>
    <div ref={root} className={styles.photography} data-photography-paused={stopped} aria-hidden="true">
      {skyIScenes.map((item, index) => <div key={item.src} className={styles.scene} data-scene={index} data-active={current === index} data-previous={previous === index && current !== index} style={{ "--scene-desktop": item.desktop, "--scene-mobile": item.mobile } as CSSProperties}>
        <Image src={item.src} alt="" fill sizes="(max-width:767px) 1600px, 100vw" preload={index === 0} onError={() => setFailed(values => values.includes(index) ? values : [...values, index])} />
      </div>)}
    </div>
    <div className={`${styles.container} ${styles.sceneCopy}`} data-placement={scene.placement}>
      <div key={scene.src} className={styles.sceneWords}>
        <p className={styles.label} data-hero-motion="top" data-hero-delay="120" data-scramble-enter><ScrambleText text={scene.eyebrow} /></p>
        <h1 id="skyi-title" tabIndex={-1}>
          <span className={styles.titleMask}><span className={styles.titleLine} data-hero-motion={scene.placement === "left" ? "left" : "rise"} data-hero-delay="220" data-hero-duration="1150" data-scramble-enter><ScrambleText text={scene.title} /></span></span>
          <span className={styles.titleMask}><em className={styles.titleLine} data-hero-motion={scene.placement === "right" ? "right" : "fall"} data-hero-delay="350" data-hero-duration="1250" data-scramble-enter><ScrambleText text={scene.emphasis} /></em></span>
        </h1>
        <p className={styles.sceneDescription} data-hero-motion={scene.placement === "right" ? "right" : "left"} data-hero-delay="550" data-hero-duration="1100" data-scramble-enter><ScrambleText text={scene.description} /></p>
      </div>
    </div>
  </>;
}
