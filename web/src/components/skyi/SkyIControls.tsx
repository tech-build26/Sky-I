"use client";

// ===== User controls & consent =====
import { useState } from "react";
import { skyISite } from "@/config/site";
import styles from "./SkyI.module.css";

export function SkyIControls() {
  const [consent, setConsent] = useState<string | null>(null);
  function choose(value: string) {
    setConsent(value);
    try { localStorage.setItem("skyi-analytics-consent", value); } catch {}
  }
  return <>
    {/* ===== Optional analytics consent; no collector is loaded in foundations ===== */}
    {skyISite.analyticsId && !consent && <aside className={styles.consent} aria-label="Analytics preferences">
      <p>Optional analytics help us understand how this site is used. You can decline and continue using every feature.</p>
      <button onClick={() => choose("denied")}>Decline analytics</button><button onClick={() => choose("granted")}>Allow analytics</button>
    </aside>}
  </>;
}
