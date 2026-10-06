"use client";

// ===== Three-scene photography and accessible manual controls =====
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { skyIScenes } from "@/content/skyi-scenes";
import { useSkyIMotion } from "./SkyIProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./SkyI.module.css";

export function SkyIPhotography() {
  const { paused, menuOpen, togglePause } = useSkyIMotion();
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState(-1);
  const [serial, setSerial] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [focused, setFocused] = useState(false);
  const [failed, setFailed] = useState<number[]>([]);
  const [manual, setManual] = useState(false);
  const stopped = paused || menuOpen || hidden || !visible || focused;
  const current = failed.includes(active) ? skyIScenes.findIndex((_, index) => !failed.includes(index)) : active;
  const choose = (index: number) => {
    if (index === current || failed.includes(index)) return;
    setPrevious(current); setActive(index); setSerial(value => value + 1); setManual(true);
  };
  const step = (direction: number) => {
    for (let offset=1; offset<=skyIScenes.length; offset++) {
      const index=(current+direction*offset+skyIScenes.length*2)%skyIScenes.length;
      if (!failed.includes(index)) { choose(index); break; }
    }
  };
  // ===== Offscreen, visibility and keyboard suspension =====
  useEffect(() => {
    const change = () => setHidden(document.hidden);
    const focus = () => setFocused(!!document.activeElement?.matches(':focus-visible') && !!document.activeElement?.closest('#skyi-main a,#skyi-main summary,#skyi-main button,#skyi-desktop-nav'));
    document.addEventListener("visibilitychange", change);
    document.addEventListener("focusin", focus);
    document.addEventListener("focusout", focus);
    return () => { document.removeEventListener("visibilitychange", change); document.removeEventListener("focusin", focus); document.removeEventListener("focusout", focus); };
  }, []);
  // ===== Every photograph has its own reveal family =====
  useEffect(() => {
    if (!serial || paused || current < 0) return;
    const node = root.current?.querySelector<HTMLElement>(`[data-scene="${current}"]`);
    if (!node) return;
    const recipes = [
      [{opacity:0, transform:"translate3d(6%,0,0) scale(1.04)"},{opacity:1, transform:"translate3d(0,0,0) scale(1)"}],
      [{clipPath:"circle(0% at 72% 42%)", transform:"scale(1.08)"},{clipPath:"circle(150% at 72% 42%)", transform:"scale(1)"}],
      [{clipPath:"inset(0 0 100% 0)", transform:"translateY(-2%) scale(1.04)"},{clipPath:"inset(0 0 0% 0)", transform:"translateY(0) scale(1)"}],
    ];
    node.style.willChange = "transform, opacity, clip-path";
    const animation=node.animate(recipes[current], {duration:[1300,1700,1500][current], easing:["cubic-bezier(.22,1,.36,1)","cubic-bezier(.16,.7,.25,1)","cubic-bezier(.3,0,.2,1)"][current]});
    animation.finished.then(()=>node.style.removeProperty('will-change'),()=>{});
    return () => { animation.cancel(); node.style.removeProperty('will-change'); };
  }, [current, serial, paused]);
  // ===== Automatic playback; no unavailable scene is selected =====
  useEffect(() => {
    if (stopped || skyIScenes.length-failed.length < 2) return;
    const timer=window.setInterval(()=>{
      let next=(current+1)%skyIScenes.length;
      while(failed.includes(next)) next=(next+1)%skyIScenes.length;
      setPrevious(current); setActive(next); setSerial(value=>value+1); setManual(false);
    }, 8500);
    return ()=>clearInterval(timer);
  }, [stopped, failed, current]);
  return <>
    <div ref={root} className={styles.photography} data-photography-paused={stopped} aria-hidden="true">
      {skyIScenes.map((scene,index)=><div key={scene.src} className={styles.scene} data-scene={index} data-active={current===index} data-previous={previous===index && current!==index} data-transition={scene.transition} style={{"--scene-desktop":scene.desktop,"--scene-mobile":scene.mobile} as CSSProperties}>
        <Image src={scene.src} alt="" fill sizes="100vw" priority={index===0} onError={()=>setFailed(values=>values.includes(index)?values:[...values,index])} />
      </div>)}
    </div>
    <div className={styles.slideControls} aria-label="Hero photographs">
      <div className={styles.slideCaption}><span className={styles.slideLabel} aria-live={manual?"polite":"off"}>{current>=0?skyIScenes[current].label:"Industrial inspection"}</span>{reduced?<span className={styles.slideLabel}>Reduced motion active</span>:<button type="button" onClick={togglePause} aria-pressed={paused}>{paused?"Resume animation":"Pause animation"}</button>}</div>
      <div className={styles.slideButtons}>
        <button type="button" aria-label="Previous photograph" onClick={()=>step(-1)}>←</button>
        {skyIScenes.map((scene,index)=><button key={scene.src} type="button" aria-label={`Show ${scene.label.toLowerCase()}`} aria-pressed={current===index} disabled={failed.includes(index)} onClick={()=>choose(index)}>{String(index+1).padStart(2,"0")}</button>)}
        <button type="button" aria-label="Next photograph" onClick={()=>step(1)}>→</button>
      </div>
    </div>
  </>;
}
