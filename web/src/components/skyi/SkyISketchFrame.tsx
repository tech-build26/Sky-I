import type { ReactNode } from "react";
import styles from "./SkyISketchFrame.module.css";

// Static, code-native pencil contours. Decoration never changes the source photo.
export function SkyISketchFrame({ children, variant = "access", tone = "light", className = "" }: {
  children: ReactNode;
  variant?: "access" | "detail";
  tone?: "light" | "ink";
  className?: string;
}) {
  const detail = variant === "detail";
  return <div className={`${styles.frame} ${className}`} data-sketch-frame data-tone={tone}>
    {children}
    <svg className={styles.contour} viewBox="0 0 200 300" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
      <path className={styles.primary} d={detail
        ? "M17 292C12 260 15 229 10 196S13 126 9 90L12 19Q42 11 73 14T133 11L187 16Q194 45 189 80T192 147L188 225Q194 260 188 287L142 290Q110 287 79 293L17 292Z"
        : "M11 275L8 214Q13 179 9 144T12 76L9 16Q39 10 66 13L119 10Q151 14 187 9L191 65Q186 101 192 135L188 192Q192 230 188 286L136 292Q102 288 72 292L12 288L11 275Z"} />
      <path className={styles.secondary} d={detail
        ? "M7 244Q10 211 6 178L8 117Q4 67 7 24M24 8L86 9Q126 5 167 9L183 7M195 49L197 111Q193 152 196 198L194 274M158 297L101 295Q62 300 28 296"
        : "M18 7L75 6Q111 9 153 5L177 7M196 24L194 86Q198 124 195 171L197 247M174 297L113 296Q73 299 30 295M5 263L4 197Q8 163 5 122L7 41"} />
      <path className={styles.accent} d={detail
        ? "M148 4Q173 7 194 5L198 53M145 10L187 12"
        : "M4 250L6 293Q33 289 57 296M12 281L14 287L47 290"} />
    </svg>
  </div>;
}
