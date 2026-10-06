"use client";

// ===== User motion control =====
import { useState } from "react";
import { skyISite } from "@/config/site";
import { useSkyIMotion } from "./SkyIProvider";
import { useClientReady } from "@/hooks/useClientReady";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./SkyI.module.css";

export function SkyIControls() {
  const { paused, togglePause } = useSkyIMotion();
  const ready = useClientReady();
  const reduced = useReducedMotion();
  const [consent, setConsent] = useState<string | null>(null);
  function choose(value: string) {
    setConsent(value);
    try { localStorage.setItem("skyi-analytics-consent", value); } catch {}
  }
  return <>
    {ready && (reduced ? <span>Reduced motion active</span> : <button className={styles.pause} type="button" aria-pressed={paused} onClick={togglePause}>{paused ? "Resume animations" : "Pause animations"}</button>)}
    {/* ===== Optional analytics consent; no collector is loaded in foundations ===== */}
    {skyISite.analyticsId && !consent && <aside className={styles.consent} aria-label="Analytics preferences">
      <p>Optional analytics help us understand how this site is used. You can decline and continue using every feature.</p>
      <button onClick={() => choose("denied")}>Decline analytics</button><button onClick={() => choose("granted")}>Allow analytics</button>
    </aside>}
  </>;
}
