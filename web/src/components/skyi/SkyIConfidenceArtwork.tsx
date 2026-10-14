import Image from "next/image";
import styles from "./SkyIConfidence.module.css";
import { skyIConfidence } from "@/content/skyi-confidence";

// Decorative linework stays vector-sharp at every layout size. The reference
// screenshot is never a rendered asset; the three photographs are new sources.
export function ConfidenceContours() {
  const contour = "M-85 13c44-45 90-30 103 4s-18 57-8 90 62 41 74 79-12 70-55 83-78-19-95-48-50-26-66-63 4-60 24-82 1-44 23-63Z";
  return <svg className={styles.contours} viewBox="0 0 1916 730" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    <g stroke="currentColor" strokeWidth=".7">
      {[0, 1, 2, 3, 4, 5].map(i => <g key={i} transform={`translate(${340 + i * 8} ${-90 + i * 7}) scale(${1 + i * .16})`}><path d={contour} /></g>)}
      {[0, 1, 2, 3, 4].map(i => <g key={i} transform={`translate(${-50 + i * 8} ${350 + i * 8}) scale(${1 + i * .17})`}><path d={contour} /></g>)}
      {[0, 1, 2, 3].map(i => <g key={i} transform={`translate(${780 + i * 7} ${230 + i * 7}) scale(${1.2 + i * .18})`}><path d={contour} /></g>)}
      <path d="M0 53h95M0 92h95M28 0v110M55 0v110M88 0v110M0 480h1916M30 480v250M660 480v250M1308 480v250" />
      <path strokeDasharray="2 16" d="M0 22h1000M0 136h740M0 452h1916M94 0v730M655 0v730M1030 0v730" />
    </g>
  </svg>;
}

export function ConfidenceCompass() {
  return <svg className={styles.compass} viewBox="0 0 110 132" fill="none" aria-hidden="true" data-skyi-reveal="confidence-fade" data-scroll-delay="200">
    <g stroke="currentColor" strokeWidth=".8"><path d="m24 28-14 37 14-10 14 10-14-37Zm0 0v43M44 11h47M56 7h7l3 4-3 4h-7l-3-4Z" /><circle cx="80" cy="11" r="4" /><path d="M90 7v8M87 7h7M87 15h7" /></g>
    <g fill="currentColor" fontFamily="Arial,sans-serif"><text x="19" y="15" fontSize="10">N</text><text x="5" y="103" fontSize="6" letterSpacing="1.1">SITE ORIENTATION</text><text x="5" y="115" fontSize="6" letterSpacing="1.1">SCOPE BY BRIEF</text></g>
  </svg>;
}

export function ConfidenceScene() {
  return <figure className={styles.scene} data-skyi-reveal="confidence-scene" data-scroll-delay="80">
    <Image src={skyIConfidence.imagery.scene} alt="" fill sizes="(max-width: 1199px) 100vw, 66vw" quality={90} />
    <svg className={styles.sceneMarks} viewBox="0 0 1256 481" fill="none" preserveAspectRatio="none" aria-hidden="true" data-skyi-reveal="confidence-fade" data-scroll-delay="520">
      <path className={styles.route} d="M488-30c-89 54-216 150-180 264 24 80 151 119 330 86" />
      <path fill="#e99a4b" fillOpacity=".15" d="m669 107 169-36v256l-169 34Z" />
      <path className={styles.zone} d="m669 107 169-36v256l-169 34Z" />
      <path className={styles.fine} d="M667 101v17m-8-8h17m161-43v17m-9-9h18m-10 245v18m-9-9h18m-180 35v-18m-8 9h17M790 227l85-88h10V114m0 25v67" />
      <circle cx="790" cy="227" r="4" fill="#f2f6f6" /><circle cx="885" cy="114" r="1.7" fill="#f2f6f6" />
      <path className={styles.fine} d="M749 213v28m-14-14h28" />
      <circle cx="749" cy="227" r="17" stroke="#f99536" strokeWidth="1.3" />
      <g fill="#eff3f5" fontFamily="Arial,sans-serif" fontSize="9" letterSpacing="1.4"><text x="905" y="120">INSPECTION</text><text x="905" y="136">ZONE 03</text><text x="905" y="168" fontSize="7.5">VISUAL SCOPE</text><text x="905" y="184" fontSize="7.5">AGREED BY BRIEF</text></g>
      <path d="M905 201h86" stroke="#eff3f5" strokeWidth="1" /><path d="M905 201h70" stroke="#f99536" strokeWidth="3" />
      <g fill="#536b7b" fontFamily="Arial,sans-serif" fontSize="8" letterSpacing="1"><text x="237" y="355">ASSET A1</text><text x="237" y="370">STORAGE TANK</text></g>
    </svg>
    <figcaption>{skyIConfidence.imagery.caption}</figcaption>
  </figure>;
}

function EvidencePlanes() {
  return <div id="confidence-evidence" className={`${styles.detail} ${styles.evidence}`} aria-hidden="true">
    <div className={`${styles.plane} ${styles.reportPlane}`} data-skyi-reveal="confidence-layer" data-scroll-delay="80" data-skyi-reveal-trigger="#confidence-evidence"><Image src={skyIConfidence.imagery.evidence} alt="" fill sizes="(max-width:599px) 140px, 12vw" quality={90} /></div>
    <div className={`${styles.plane} ${styles.thermalPlane}`} data-skyi-reveal="confidence-layer" data-scroll-delay="200" data-skyi-reveal-trigger="#confidence-evidence"><Image src={skyIConfidence.imagery.evidence} alt="" fill sizes="(max-width:599px) 140px, 12vw" quality={90} /></div>
    <div className={`${styles.plane} ${styles.visualPlane}`} data-skyi-reveal="confidence-layer" data-scroll-delay="320" data-skyi-reveal-trigger="#confidence-evidence"><Image src={skyIConfidence.imagery.evidence} alt="" fill sizes="(max-width:599px) 140px, 12vw" quality={90} /></div>
    <svg className={styles.detailMarks} viewBox="0 0 300 220" fill="none" data-skyi-reveal="confidence-fade" data-scroll-delay="440" data-skyi-reveal-trigger="#confidence-evidence">
      <g stroke="#9cacb6" strokeWidth=".6"><path d="M174 51h37M158 98h53M141 146h70M211 51v111" /><path d="M157 46v10m-5-5h10M143 93v10m-5-5h10" /></g>
      <g fill="#e2e9ed"><circle cx="211" cy="51" r="1.5" /><circle cx="211" cy="98" r="1.5" /><circle cx="211" cy="146" r="1.5" /></g>
      <g fill="#d5e0e7" fontFamily="Arial,sans-serif" fontSize="7" letterSpacing="1.2"><text x="224" y="54">VISUAL</text><text x="224" y="101">THERMAL</text><text x="224" y="147">DETAILED</text><text x="224" y="159">REPORT</text></g>
    </svg>
  </div>;
}

function FollowOnDiagram() {
  return <svg className={`${styles.detail} ${styles.tank}`} viewBox="0 0 300 220" fill="none" aria-hidden="true" data-skyi-reveal="confidence-center" data-scroll-delay="200">
    <g stroke="#a9bdc9" strokeWidth=".65" opacity=".7">
      <ellipse cx="88" cy="31" rx="49" ry="12" /><ellipse cx="88" cy="19" rx="49" ry="12" />
      <path d="M39 19v181M137 19v181M39 31v169M137 31v169M38 200h101v10H36v-6M24 211h131M44 8v26M57 4v30M73 1v31M89 0v32M105 2v31M121 6v28M133 11v24" />
      {[51, 74, 98, 122, 147, 172, 197].map(y => <ellipse key={y} cx="88" cy={y} rx="49" ry="10" />)}
      {[48, 61, 75, 89, 103, 117, 130].map(x => <path key={x} d={`M${x} 31v169`} />)}
      <path d="m132 38 13 5v139l-13-5M134 50l10 4m-10 10 10 4m-10 10 10 4m-10 10 10 4m-10 10 10 4m-10 10 10 4m-10 10 10 4m-10 10 10 4m-10 10 10 4M34 58l-9 5v109l13 4M27 72l10-5m-10 17 10-5m-10 17 10-5m-10 17 10-5m-10 17 10-5m-10 17 10-5m-10 17 10-5m-10 17 10-5" />
      <path d="M117 49h82M117 106h82M117 164h82" />
    </g>
    <g fill="#fb8b32">{[49, 106, 164].map(y => <g key={y}><path d={`M114 ${y-3}h6v6h-6Z`} /><path d={`M196 ${y-3}h6v6h-6Z`} /></g>)}</g>
    <g fill="#d3dfe6" fontFamily="Arial,sans-serif" fontSize="6.8" letterSpacing="1"><text x="212" y="46">FURTHER</text><text x="212" y="58">INVESTIGATION</text><text x="212" y="103">MAINTENANCE</text><text x="212" y="115">PLANNING</text><text x="212" y="160">ROPE-ACCESS</text><text x="212" y="172">(AS REQUIRED)</text></g>
  </svg>;
}

export function ConfidenceDetail({ index }: { index: number }) {
  if (index === 0) return <div className={`${styles.detail} ${styles.access}`} aria-hidden="true" data-skyi-reveal="confidence-roll" data-scroll-delay="160"><Image src={skyIConfidence.imagery.access} alt="" fill sizes="(max-width:599px) 300px, (max-width:1199px) 45vw, 17vw" quality={90} /></div>;
  return index === 1 ? <EvidencePlanes /> : <FollowOnDiagram />;
}
