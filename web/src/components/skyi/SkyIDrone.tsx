"use client";

// ===== Unlabelled desktop artwork; motion conveys no model-specific claim =====
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { useSkyIMotion } from "./SkyIProvider";
import styles from "./SkyI.module.css";

export function SkyIDrone() {
  const { paused, menuOpen } = useSkyIMotion();
  const node = useRef<HTMLDivElement>(null);
  const visible = useInView(node);
  const [hidden, setHidden] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const change = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);
  const running = !paused && !menuOpen && !hidden && visible;
  useEffect(() => {
    const root = node.current;
    if (!running || !root || !matchMedia("(min-width:1280px) and (pointer:fine)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--drone-pitch", `${(event.clientY / innerHeight - .5) * -3}deg`);
        root.style.setProperty("--drone-yaw", `${(event.clientX / innerWidth - .5) * 5}deg`);
      });
    };
    const reset = () => { root.style.removeProperty("--drone-pitch"); root.style.removeProperty("--drone-yaw"); };
    window.addEventListener("pointermove", move);
    window.addEventListener("blur", reset);
    return () => { cancelAnimationFrame(frame); reset(); window.removeEventListener("pointermove", move); window.removeEventListener("blur", reset); };
  }, [running]);
  if (failed) return null;
  return <div ref={node} className={styles.desktopDrone} data-running={running} aria-hidden="true">
    <div className={styles.droneHover}><Image src="/images/elios_3.png" alt="" width={1600} height={1000} sizes="(min-width:1280px) 43vw, 1px" draggable={false} onError={() => setFailed(true)} /></div>
  </div>;
}
