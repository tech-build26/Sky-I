import type { CSSProperties } from "react";
import styles from "./SkyITestimonials.module.css";

// Deterministic SVG paths keep server/client markup identical. The section owns
// the CSS animation lifecycle alongside its scrolling columns.
export function FloatingPathsBackground() {
  return <div className={styles.paths} aria-hidden="true">
    {[1, -1].map(position => <svg key={position} viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice" style={{ "--path-duration": `${position === 1 ? 26 : 32}s` } as CSSProperties}>
      {Array.from({ length: 36 }, (_, i) => <path key={i}
        d={`M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`}
        stroke="currentColor" strokeWidth={.5 + i * .03} strokeOpacity={.35 + i * .012}
      />)}
    </svg>)}
  </div>;
}
