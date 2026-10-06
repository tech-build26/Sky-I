"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { skyISolutions } from "@/content/skyi-solutions";
import MotionButton from "../ui/motion-button";
import { useSkyIMotion } from "./SkyIProvider";
import styles from "./SkyI.module.css";
import { ScrambleText } from "../ui/scramble-text";

export function SkyIDrone() {
  const { paused, menuOpen } = useSkyIMotion();
  const node = useRef<HTMLDivElement>(null);
  const visible = useInView(node);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const change = () => setHidden(document.hidden);
    change(); document.addEventListener("visibilitychange", change);
    return () => document.removeEventListener("visibilitychange", change);
  }, []);

  const openSolution = (id: string) => {
    const target = document.getElementById(id);
    if (target instanceof HTMLDetailsElement) target.open = true;
  };

  return <div ref={node} className={`${styles.container} ${styles.solutions}`} data-running={!paused && !menuOpen && !hidden && visible}>
    <div className={styles.solutionsIntro}><p data-hero-motion="left" data-hero-delay="650" data-scramble-enter><ScrambleText text="Three ways to see the possibilities." /></p></div>
    <div className={styles.droneRow}>
      {skyISolutions.map((solution, index) => <article key={solution.id} className={styles.droneSolution} style={{ "--float-delay": `${index * -2.7}s`, "--float-duration": `${8 + index * 1.3}s` } as CSSProperties}>
        <a className={styles.droneStage} href={`#${solution.id}`} onClick={() => openSolution(solution.id)} aria-label={solution.title} aria-describedby={`${solution.id}-caption`} data-drone-stage data-scramble-trigger>
          <span className={styles.droneBack} aria-hidden="true"><span className={styles.serviceWord} data-hero-motion={index === 2 ? "right" : "left"} data-hero-delay={500 + index * 100}><ScrambleText text={solution.back} /></span></span>
          <span className={`${styles.droneArt} ${index === 0 ? styles.internalArt : ""}`} data-drone-depth data-hero-motion={["droneLeft", "droneRise", "droneRight"][index]} data-hero-delay={600 + index * 130} data-hero-duration="1350"><span className={styles.droneFloat}><Image src={solution.image} alt="" width={solution.width} height={solution.height} sizes="(max-width:600px) 30vw, (max-width:1279px) 29vw, 380px" /></span></span>
          <span className={styles.droneFront} aria-hidden="true"><span className={styles.serviceWord} data-hero-motion={index % 2 ? "top" : "bottom"} data-hero-delay={780 + index * 100}><ScrambleText text={solution.front} /></span></span>
        </a>
        <p id={`${solution.id}-caption`} className={styles.droneCaption}><ScrambleText text={solution.caption} /></p>
        <span className={styles.buttonEntry} data-hero-motion={index === 1 ? "bottom" : index === 0 ? "left" : "right"} data-hero-delay={920 + index * 100}><MotionButton label="Explore" href={`#${solution.id}`} aria-label={`Explore ${solution.title.toLowerCase()}`} onClick={() => openSolution(solution.id)} data-magnetic /></span>
      </article>)}
    </div>
  </div>;
}
