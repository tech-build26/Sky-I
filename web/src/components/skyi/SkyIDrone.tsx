"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { skyISolutions } from "@/content/skyi-solutions";
import { skyIHero } from "@/content/skyi-hero";
import styles from "./SkyIHero.module.css";

// Visible opaque bounds of the supplied PNGs. CSS offsets retain the originals
// while aligning cage / landing gear on one shared baseline.
const cutouts = [
  { aspect: "881 / 730", width: "181.612%", left: "-40.863%", top: "-16.849%" },
  { aspect: "1247 / 780", width: "100.561%", left: "-.321%", top: "-33.974%" },
  { aspect: "1234 / 741", width: "101.621%", left: "-.81%", top: "-37.112%" },
] as const;

export function SkyIDrone() {
  return <div className={styles.choices} aria-label="Choose a drone service" data-parallax-layer="3">
    {skyISolutions.map((solution, index) => <a
      key={solution.id}
      className={styles.choice}
      style={{ "--hover-roll": index === 1 ? "1.5deg" : "-1.5deg" } as CSSProperties}
      href={`#${solution.id}`}
      aria-labelledby={`${solution.id}-hero-title`}
      aria-describedby={`${solution.id}-hero-caption`}
      data-hero-choice
      onClick={event => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = document.getElementById(solution.id);
        if (target instanceof HTMLDetailsElement) {
          if (!target.open) target.dataset.heroSelected = "true";
          target.open = true;
          // Let native fragment navigation settle before moving keyboard focus.
          requestAnimationFrame(() => target.querySelector("summary")?.focus({ preventScroll: true }));
        }
      }}
    >
      <span className={`${styles.art} ${index === 0 ? styles.internal : ""}`} aria-hidden="true" data-hero-enter={index === 0 ? "left" : index === 1 ? "up" : "right"} data-hero-delay={240 + index * 120}>
        <span className={styles.shadow} />
        <span className={styles.arrival} data-hero-art style={{ "--cutout-aspect": cutouts[index].aspect, "--cutout-width": cutouts[index].width, "--cutout-left": cutouts[index].left, "--cutout-top": cutouts[index].top } as CSSProperties}>
          <Image src={solution.image} alt="" width={solution.width} height={solution.height}
            sizes={index === 0 ? "(max-width: 767px) 250px, 48vw" : "(max-width: 767px) 180px, 32vw"}
            priority />
        </span>
      </span>
      <span className={styles.copy}>
        <span className={styles.titleRow}>
          <span className={styles.revealMask}><span id={`${solution.id}-hero-title`} className={styles.serviceTitle} data-hero-enter={index === 1 ? "right" : "left"} data-hero-delay={360 + index * 120}>{solution.back}<br />{solution.front}</span></span>
          <span className={styles.arrow} aria-hidden="true" data-hero-enter="right" data-hero-delay={440 + index * 100}><ArrowUpRight strokeWidth={1.25} /></span>
        </span>
        <span id={`${solution.id}-hero-caption`} className={styles.caption} data-hero-enter="up" data-hero-delay={460 + index * 100}>{skyIHero.captions[solution.id]}</span>
      </span>
    </a>)}
  </div>;
}
