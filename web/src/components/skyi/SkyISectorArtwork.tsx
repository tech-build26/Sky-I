import Image from "next/image";
import type { SkyISectorVisual } from "@/content/skyi-sectors";
import styles from "./SkyIIndustries.module.css";

// Native conceptual linework. No measured locations, scan data or findings.
function SectorDrawing({ kind }: { kind: SkyISectorVisual["kind"] }) {
  return <svg viewBox="0 0 180 200" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
      {kind === "boiler" && <><path d="m30 45 80-20 40 24v115l-80 23-40-26V45Zm0 0 40 25 80-21M70 70v117M110 25v26" /><path d="M85 78v70q0 15 9 12t9-16V73m12-3v69q0 15 9 12t9-16V66M30 90l-18-12v50l18 13" /></>}
      {(kind === "tank" || kind === "silo") && <><ellipse cx="90" cy="42" rx="55" ry="20" /><path d="M35 42v106c0 26 110 26 110 0V42M35 83c0 26 110 26 110 0M35 118c0 26 110 26 110 0M60 59v104m30-101v106m30-109v104" />{kind === "silo" ? <path d="m35 148 45 35h20l45-35M50 165v25m80-25v25M145 62l24-9v75l-24 11" /> : <path d="M38 46h-9v-8c0-34 122-34 122 0v8h-9M29 38c0 27 122 27 122 0M145 72l20 21-20 15 20 22-20 17" />}</>}
      {kind === "tower" && <><ellipse cx="90" cy="35" rx="50" ry="18" /><path d="M40 35v47c0 25 100 25 100 0V35M40 70c0 25 100 25 100 0M62 96l-16 91m72-91 16 91M65 97v90m50-90v90M55 143h70m-63-28 62 50m-6-50-62 50M32 189h116" /></>}
      {(kind === "frame" || kind === "building") && <><path d="m25 65 78-35 55 25v104l-78 31-55-26V65Zm0 0 55 26 78-36M80 91v99M103 30v32M25 104l55 26 78-34M25 143l55 27 78-31" /><path d="m43 74 0 98m18-89v98m40-98v99m28-112v102M43 43l60-27 55 25" />{kind === "frame" ? <path d="m25 104 55-13m0 39 78-75M25 143l55-13m0 40 78-74" /> : <path d="m30 62 73-30 48 22-72 29-49-21Zm5 33 13 6v21l-13-6V95m66 5 18-7v21l-18 7v-21" />}</>}
      <path d="M12 194h156M8 180v14h14m136 0h14v-14" opacity=".5" />
    </g>
  </svg>;
}

export function SkyISectorArtwork({ visual }: { visual: SkyISectorVisual }) {
  const trigger = `#sector-${visual.id}-scene`;
  return <div className={styles.artwork}>
    <figure className={styles.scene} id={trigger.slice(1)}>
      <div className={styles.photoPlane} data-skyi-reveal="sector-scene" data-skyi-reveal-trigger={trigger}>
        <Image src={visual.image} alt={visual.alt} fill quality={90} sizes="(max-width: 599px) 90vw, (max-width: 1023px) 82vw, (max-width: 1440px) 48vw, 680px" style={{ objectPosition: visual.position }} />
      </div>
      <svg className={styles.sceneLines} viewBox="0 0 680 390" preserveAspectRatio="none" fill="none" aria-hidden="true" data-skyi-reveal="sector-lines" data-skyi-reveal-trigger={trigger} data-scroll-delay="220">
        <g stroke="currentColor" strokeWidth="1"><path d="M135 1h544v344H1L135 1ZM156 1 20 345M610 8h50v50M10 312v24h40" /><path d="M290 36C400 12 560 34 604 162S570 309 475 341" strokeDasharray="4 7" opacity=".65" /><path d="m480 210 44-72h76M524 138v-12m-6 6h12" /><circle cx="480" cy="210" r="10" /><circle cx="480" cy="210" r="3" /></g>
      </svg>
      <div className={`${styles.aircraft} ${visual.kind === "boiler" ? styles.internalAircraft : ""}`} aria-hidden="true" data-skyi-reveal="sector-drone" data-skyi-reveal-trigger={trigger} data-scroll-delay="100"><Image src={visual.drone} alt="" fill sizes="(max-width: 599px) 110px, 180px" /></div>
      <figcaption className={styles.sceneCaption}><span>{visual.setting}</span><span>Illustrative setting</span></figcaption>
    </figure>
    <div className={styles.diagram} aria-hidden="true" data-skyi-reveal="sector-lines" data-skyi-reveal-trigger={trigger} data-scroll-delay="320"><SectorDrawing kind={visual.kind} /><span>Asset context</span></div>
    <div className={styles.inset} aria-hidden="true" data-skyi-reveal="sector-inset" data-skyi-reveal-trigger={trigger} data-scroll-delay="260"><div className={styles.insetPhoto}><Image src={visual.image} alt="" fill quality={90} sizes="150px" style={{ objectPosition: "80% 75%" }} /></div><span>{visual.detail}</span></div>
  </div>;
}
